import express from "express";

const app = express();
app.use(express.json());

const books = [
  {
    id: 1,
    title: "Taxi Driver",
  },
  {
    id: 2,
    title: "The Godfather",
  },
  {
    id: 3,
    title: "Iron Man",
  },
];

app.get("/", (req, res) => {
  res.status(200).send("Mensagem que trafega na rota raiz");
});

app.get("/books", (req, res) => {
  res.status(200).json(books);
});

app.post("/books", (req, res) => {
  books.push(req.body);
  res.status(200).send("Livro adicionado com sucesso!");
});

export default app;
