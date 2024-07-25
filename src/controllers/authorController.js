import author from "../models/Author.js";

class AuthorController {
  static getAuthors = async (req, res) => {
    try {
      // essa variável recebe todos os objetos do modelo author encontrados no banco de dados
      const authorsFound = await author.find();

      // respondendo com os objetos de autor encontrados em forma de json
      // 200 OK - HTTP response status code
      res.status(200).json(authorsFound);
    } catch (error) {
      // respondendo com um objeto passando a message
      // 500 Internal Server Error - HTTP response status code
      res
        .status(500)
        .json({ message: `${error.message} - Erro interno do servidor!` });
    }
  };

  static getAuthorById = async (req, res, next) => {
    // essa variável recebe o id passado como parâmetro na url da rota de requisição
    const id = req.params.id;
    try {
      // essa variável recebe o objeto de modelo author encontrado pelo id
      // o método findById do Mongoose espera receber um ID do tipo ObjectId
      // se for passado um id ObjectId mas não encontrado retornará null
      // se não for passado um id ObjectId o mongoose lançará um Cast Error
      const authorFound = await author.findById(id);

      if (authorFound !== null) {
        // respondendo com o objeto do autor encontrado em forma de json
        // 200 OK - HTTP response status code
        res.status(200).json(authorFound);
      } else {
        // respondendo com um objeto passando a message de erro
        // 400 Not Found - HTTP response status code
        res.status(404).json({ message: "ID do autor não encontrado!" });
      }
    } catch (error) {
      next(error);
    }
  };

  static postAuthor = async (req, res, next) => {
    try {
      // essa variável recebe o objeto passado no corpo da requisição
      const newAuthor = new author(req.body);

      // criando o objeto no banco de dados de forma assíncrona
      // author model
      await author.create(newAuthor);

      // respondendo com o objeto do autor criado em forma de json
      // 201 Created - HTTP response status code
      res.status(201).json(newAuthor);
    } catch (error) {
      next(error);
    }
  };

  static putAuthor = async (req, res, next) => {
    // essa variável recebe o id passado como parâmetro na url da rota de requisição
    const id = req.params.id;
    try {
      // atualizando o autor pelo id de forma assíncrona
      await author.findByIdAndUpdate(id, { $set: req.body });

      // respondendo com um objeto passando a message
      // 200 OK - HTTP response status code
      res.status(200).json({ message: "Livro alterado com sucesso!" });
    } catch (error) {
      next(error);
    }
  };

  static deleteAuthor = async (req, res, next) => {
    // essa variável recebe o id passado como parâmetro na url da rota de requisição
    const id = req.params.id;

    try {
      // deletando o autor pelo id de forma assíncrona
      await author.findByIdAndDelete(id);

      // respondendo com um objeto passando a message
      // 200 OK - HTTP response status code
      res.status(200).json({ message: "Autor deletado com sucesso!" });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthorController;
