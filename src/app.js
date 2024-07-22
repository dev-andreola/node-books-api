import express from "express";
import dbConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";

const dbConnection = await dbConnect();

dbConnection.on("error", (error) => {
  console.error("Erro ao conectar com o Banco de Dados!", error);
});

dbConnection.once("open", () => {
  console.log("Conectado ao Banco de Dados!");
});

const app = express();
routes(app);

app.delete("/book/:id", (req, res) => {
  const i = getBookByID(req.params.id);
  if (i === -1) {
    res.status(404).send("Livro não encontrado!");
  } else {
    books.splice(i, 1);
    res.status(200).send("Livro apagado com sucesso!");
  }
});

export default app;
