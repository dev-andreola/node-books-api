import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Mensagem que trafega na rota raiz");
});

export default app;
