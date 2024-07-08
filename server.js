import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Mensagem que trafega na rota raiz");
});

server.listen(3000, () => {
  console.log("Servidor escutando...");
});
