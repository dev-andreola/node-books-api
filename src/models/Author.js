import mongoose from "mongoose";

// essa variável recebe o schema de um autor
const authorSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    // campo obrigatório
    // foi passado uma mensagem personalizada em caso de falta
    name: {
      type: String,
      required: [true, "O nome do(a) autor(a) é obrigatório!"],
    },
    nationality: { type: String },
  },
  {
    // especifico do mongodb, se trata de controle de versão
    versionKey: false,
  }
);

// essa variável recebe o model criado utilizando o schema
const author = mongoose.model("author", authorSchema);

export default author;
