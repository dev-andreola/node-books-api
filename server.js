import http from "http";

const routes = {
  "/": "Mensagem que trafega na rota raiz",
  "/books": "Mensagem que trafega na rota books",
  "/authors": "Mensagem que trafega na rota authors",
};

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(routes[req.url]);
});

server.listen(3000, () => {
  console.log("Servidor escutando...");
});
