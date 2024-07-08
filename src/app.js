import express from "express";
import dbConnect from "./config/dbConnect.js";
import book from "./models/Book.js";

const app = express();
app.use(express.json());

const dbConnection = await dbConnect();

dbConnection.on("error", (error) => {
  console.error("Erro ao conectar com o Banco de Dados!", error);
});

dbConnection.once("open", () => {
  console.log("Conectado ao Banco de Dados!");
});

app.get("/", (req, res) => {
  res.status(200).send("Mensagem que trafega na rota raiz");
});

app.get("/books", async (req, res) => {
  const bookList = await book.find();
  res.status(200).json(bookList);
});

app.post("/books", (req, res) => {
  books.push(req.body);
  res.status(200).send("Livro adicionado com sucesso!");
});

app.get("/book/:id", (req, res) => {
  const i = getBookByID(req.params.id);
  if (i === -1) {
    res.status(404).send("Livro não encontrado!");
  } else {
    res.status(200).json(books[i]);
  }
});

app.put("/book/:id", (req, res) => {
  const i = getBookByID(req.params.id);
  if (i == -1) {
    res.status(404).send("Livro não encontrado!");
  } else {
    books[i].title = req.body.title;
    res.status(200).send("Livro alterado com sucesso!");
  }
});

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
