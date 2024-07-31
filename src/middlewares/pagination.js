import InvalidReq from "../errors/InvalidReq.js";

async function pagination(req, res, next) {
  try {
    let { limit = 5, page = 1, ordenation = "title:-1" } = req.query;

    let [orderBy, direction] = (
      typeof ordenation === "string" ? ordenation : "title:-1"
    ).split(":");

    limit = parseInt(limit);
    page = parseInt(page);
    direction = parseInt(direction);

    const result = req.result;

    if (limit > 0 && page > 0) {
      // essa variável recebe todos os objetos de modelo livro encontrados no banco de dados
      const paginatedBooksFound = await result
        .find()
        .sort({ [orderBy]: direction })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      // respondendo com os objetos de livro encontrados em forma de json
      // 200 OK - HTTP response status code
      res.status(200).json(paginatedBooksFound);
    } else {
      next(new InvalidReq());
    }
  } catch (error) {
    next(error);
  }
}

export default pagination;
