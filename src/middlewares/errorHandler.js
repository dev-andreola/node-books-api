import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import InvalidReq from "../errors/InvalidReq.js";
import ValidationError from "../errors/ValidationError.js";

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  // se o id passado como parâmetro tiver caracteres inválidos ou não tiver 12 ou 24 caracteres (mongoose.Types.ObjectId)
  // o mongoose lança um Cast Error (erro de conversão)
  // ao tentar converter a String para um mongoose.Types.ObjectId
  if (error instanceof mongoose.Error.CastError) {
    // respondendo com um objeto passando a message de erro
    // 400 Bad Request - HTTP response status code
    new InvalidReq().sendResponse(res);
  }
  // se os dados passados no corpo da requisição não forem validos
  // o mongoose lança um Validation Error (erro de validação)
  // por exemplo quando não encontrar propriedades obrigatórias (required)
  else if (error instanceof mongoose.Error.ValidationError) {
    // respondendo com um objeto passando a message de erro
    // 400 Bad Request - HTTP response status code
    new ValidationError(error).sendResponse(res);
  } else {
    // respondendo com um objeto passando a message de erro
    // 500 Internal Server Error - HTTP response status code
    new BaseError().sendResponse(res);
  }
}

export default errorHandler;
