import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
  console.log(req.url);

  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.write(`<h1>URL ${req.url}</h1>`);
  // res.end();

  // const data = { name: 'Marcela Trujillo', age: 32, city: 'Manizales' };
  // res.writeHead(200, { 'Content-Type': 'application/json' });
  // res.end(JSON.stringify(data));

  if (req.url === '/') {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlFile);
    return;
  }
  // else {
  //   res.writeHead(404, { 'Content-Type': 'text/html' });
  //   res.end();
  // }

  if (req.url?.endsWith('.css')) {
    res.writeHead(200, { 'Content-Type': 'text/css' });
  } else if (req.url?.endsWith('.js')) {
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
  }

  const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');

  res.end(responseContent);
});

server.listen(8080, () => {
  console.log('server running port: 8080');
});
