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

function getBookByID(id) {
  return books.findIndex((book) => {
    return book.id === Number(id);
  });
}

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
