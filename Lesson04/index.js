const express = require('express');
const app = express();
const port = 3000;
const joi = require('joi');
const fs = require(`fs`);
const path = require('path');
const { error } = require('console');

app.listen(port, () => {
  console.log(`Мы обратились по адресу http://localhost:${port}`);
});
app.use(express.json());

const data = JSON.parse(fs.readFileSync(`data.json`,`utf-8`));

const userShema = joi.object({
  firstName: joi.string().min(2).required(),
  secondName: joi.string().min(2).required(),
  age: joi.number().min(10).max(110).required()
})


app.get('/users', (req, res) => {
  res.send(JSON.stringify(data.users, null, 2));
  //console.log(JSON.stringify(data.users, null, 2));
});

app.post('/users', (req, res) => {
  const result = userShema.validate(req.body);
  if (result.error) {
    return res.status(404).send({error: result.error.details});
  };
  const data = JSON.parse(fs.readFileSync(`data.json`,`utf-8`));                      // Считываем данные файла
  data.uniqueID = data.uniqueID + 1;                                                  // Увеличиваем уникальный код на 1
  data.users.push({                                                                   //Добавляем нового пользователя
    id : data.uniqueID, ...req.body});
  res.send(JSON.stringify({id: data.uniqueID,...req.body}, null, 2));
  fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(data, null, 2)); //Записываем измененные данные в файл
});

app.put('/users/:id', (req, res) => {
  const result = userShema.validate(req.body);
  if (result.error) {
    return res.status(404).send({error: result.error.details});
  };
  const userID = req.params.id;
  const data = JSON.parse(fs.readFileSync(`data.json`,`utf-8`));
  const user = data.users.find(user => user.id === Number(userID));
  console.log(user);
  if (user){
    const { name, age } = req.body;
    user.name = name;
    user.age = age;
    res.send({ user })
  } else {
    res.status(404);
    res.send({user: null});
  }
  fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(data, null, 2)); //Записываем измененные данные в файл
});

app.delete('/users/:id', (req, res) => {
  const userID = req.params.id;
  const data = JSON.parse(fs.readFileSync(`data.json`,`utf-8`));
  const user = data.users.find(user => user.id === Number(userID));
  console.log(user);
  if (user){
    const indexUser = data.users.indexOf(user);
    data.users.splice(indexUser, 1);
    res.send({ user });
  } else {
    res.status(404);
    res.send({user: null});
  }
  fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(data, null, 2)); //Записываем измененные данные в файл
});