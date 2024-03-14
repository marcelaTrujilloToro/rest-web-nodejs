import http from 'http';

const server = http.createServer((req, res) => {
  console.log(req.url);

  res.write('Hola mundo');
  res.end();
});

server.listen(8080, () => {
  console.log('server running port: 8080');
});
