/* ARQUIVO PRINCIPAL */

var arDrone = require('ar-drone');
var http    = require('http');

console.log('Conectando ao Drone ...');

var pngStream = arDrone.createClient().getPngStream();

var lastPng;
pngStream
  .on('error', console.log)
  .on('data', function(pngBuffer) {
    lastPng = pngBuffer;
  });

var server = http.createServer(function(req, res) {
  if (!lastPng) {
    res.writeHead(503);
    res.end('Erro: Nao estamos recebendo nada!.');
    return;
  }

  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(lastPng);
});

server.listen(8080, function() {
  console.log('Servico rodando na porta 8080..');
  console.log('http://localhost:8080');

});
