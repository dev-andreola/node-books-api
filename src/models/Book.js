import mongoose from "mongoose";

// essa variável recebe o schema de um livro
const bookSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    // campo obrigatório
    // foi passado uma mensagem personalizada em caso de falta
    title: {
      type: String,
      required: [true, "O título do livro é obrigatório!"],
    },
    // campo obrigatório
    // foi passado uma mensagem personalizada em caso de falta
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: [true, "O(a) autor(a) é obrigatório!"],
    },
    // campo obrigatório
    // foi passado uma mensagem personalizada em caso de falta
    publisher: {
      type: String,
      required: [true, "A editora é obrigatória!"],
      enum: {
        values: ["Lvm", "Nee", "etanasia"],
        message: "A editora {VALUE} não está cadastrada!",
      },
    },
    pages: {
      type: Number,
      min: [10, "O número de páginas deve ser maior que 10"],
      max: [5000, "O número de páginas deve ser menor que 5000"],
    },
  },
  {
    // especifico do mongodb, se trata de controle de versão
    versionKey: false,
  }
);

// essa variável recebe o model criado utilizando o schema
const book = mongoose.model("book", bookSchema);

export default book;
