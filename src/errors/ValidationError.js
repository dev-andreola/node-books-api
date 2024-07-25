import InvalidReq from "./InvalidReq.js";

class ValidationError extends InvalidReq {
  constructor(error) {
    const errorMessages = Object.values(error.errors)
      .map((error) => error.message)
      .join("; ");

    super(`Os seguintes erros foram encontrados: ${errorMessages}`);
  }
}

export default ValidationError;
