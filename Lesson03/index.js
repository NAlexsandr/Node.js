const fs = require(`fs`);
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

const counters = JSON.parse(fs.readFileSync(`counters.json`,`utf-8`));
console.log(counters);

app.listen(port, () => {
  console.log(`Мы обратились по адресу http://localhost:${port}`);
});

app.get('/', (req, res) => {
  ++counters.up;
  fs.writeFileSync(path.join(__dirname, "counters.json"), JSON.stringify(counters, null, 2));
 //console.log(JSON.stringify(counters));
  res.send(` <a href="/about">О нас</a><h1>Вы переходили на эту страницу кол-во раз: ${counters.up}</h1> `);
});

app.get('/about', (req, res) => {
  ++counters.about;
  fs.writeFileSync(path.join(__dirname, "counters.json"), JSON.stringify(counters, null, 2));
  res.send(` <a href="/">Главная</a><h1>Вы переходили на эту страницу кол-во раз: ${counters.about}</h1> `);
});
