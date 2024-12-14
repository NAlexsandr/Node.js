const http = require('http');
let up = 0;     // Счетчик /
let about = 0;  // Счетчик about/


const server = http.createServer((request, response) => {
  switch (request.url) {
    case `/`:
      up = ++up;
      response.writeHead(200, {"Content-Type": "text/html; charset=utf-8;"});
      response.write(`<h1>Вы переходили на эту страницу кол-во раз: ${up}</h1>`);
      response.end(`<a href="/about">Перейти на страницу описания сайта</a>`);
      break
    case `/about`:
      about = ++about;
      response.writeHead(200, {"Content-Type": "text/html; charset=utf-8;"});
      response.write(`<h1>Вы переходили на эту страницу кол-во раз: ${about}</h1>`);
      response.end(`<a href="/">Перейти на главную страницу</a>`);
      break
    default:
      response.writeHead(404, {"Content-Type": "text/html; charset=utf-8;"});
      response.end(`<h1>Страница 404</h1>`);
  }
});


const port = `3000`;
server.listen(port);
