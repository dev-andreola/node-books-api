import mongoose from "mongoose";

// essa variável recebe o schema de um livro
const bookSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
    publisher: { type: String, required: true },
    pages: { type: Number },
  },
  {
    // especifico do mongodb, se trata de controle de versão
    versionKey: false,
  }
);

// essa variável recebe o model criado utilizando o schema
const book = mongoose.model("book", bookSchema);

export default book;
