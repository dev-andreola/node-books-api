import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  // se o id passado como parâmetro tiver caracteres inválidos ou não tiver 12 ou 24 caracteres (mongoose.Types.ObjectId)
  // o mongoose lança um Cast Error (erro de conversão)
  // ao tentar converter a String para um mongoose.Types.ObjectId
  if (error instanceof mongoose.Error.CastError) {
    // respondendo com um objeto passando a message de erro
    // 400 Bad Request - HTTP response status code
    res.status(400).json({ message: "ID inválido!" });
  }
  // se os dados passados no corpo da requisição não forem validos
  // o mongoose lança um Validation Error (erro de validação)
  // por exemplo quando não encontrar propriedades obrigatórias (required)
  else if (error instanceof mongoose.Error.ValidationError) {
    const errorMessages = Object.values(error.errors)
      .map((error) => error.message)
      .join("; ");

    // respondendo com um objeto passando a message de erro
    // 400 Bad Request - HTTP response status code
    res.status(400).json({
      message: `Os seguintes erros foram encontrados: ${errorMessages}`,
    });
  } else {
    // respondendo com um objeto passando a message de erro
    // 500 Internal Server Error - HTTP response status code
    res.status(500).json({ message: `Erro interno de servidor!` });
  }
}

export default errorHandler;
