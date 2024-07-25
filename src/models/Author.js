import mongoose from "mongoose";

// essa variável recebe o schema de um autor
const authorSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
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
