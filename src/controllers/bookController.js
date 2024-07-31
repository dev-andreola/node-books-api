import NotFound from "../errors/NotFound.js";
import { author, book } from "../models/index.js";
import InvalidReq from "../errors/InvalidReq.js";

class BookController {
  static getBooks = async (req, res, next) => {
    try {
      let { limit = 5, page = 1 } = req.query;

      limit = parseInt(limit);
      page = parseInt(page);

      if (limit > 0 && page > 0) {
        // essa variável recebe todos os objetos de modelo livro encontrados no banco de dados
        const booksFound = await book
          .find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("author")
          .exec();

        // respondendo com os objetos de livro encontrados em forma de json
        // 200 OK - HTTP response status code
        res.status(200).json(booksFound);
      } else {
        next(new InvalidReq());
      }
    } catch (error) {
      next(error);
    }
  };

  static getBookById = async (req, res, next) => {
    // essa variável recebe o id passado como parâmetro na url da rota de requisição
    const id = req.params.id;
    try {
      // essa variável recebe o objeto de modelo livro encontrado pelo id
      const bookFound = await book.findById(id);

      if (bookFound !== null) {
        // respondendo com o objeto do livro encontrado em forma de json
        // 200 OK - HTTP response status code
        res.status(200).json(bookFound);
      } else {
        // respondendo com o erro criado passando uma mensagem personalizada
        next(new NotFound("ID do livro não encontrado!"));
      }
    } catch (error) {
      next(error);
    }
  };

  static postBook = async (req, res, next) => {
    try {
      // essa variável recebe o objeto passado no corpo da requisição
      const newBook = new book(req.body);

      // criando o objeto no banco de dados de forma assíncrona
      // book model
      await book.create(newBook);

      // respondendo com o objeto do livro criado em forma de json
      // 201 Created - HTTP response status code
      res.status(201).json(newBook);
    } catch (error) {
      next(error);
    }
  };

  static putBook = async (req, res, next) => {
    // essa variável recebe o id passado como parâmetro na url da rota de requisição
    const id = req.params.id;
    try {
      // atualizando o livro pelo id de forma assíncrona
      const bookFound = await book.findByIdAndUpdate(id, { $set: req.body });

      if (bookFound !== null) {
        // respondendo com um objeto passando a message
        // 200 OK - HTTP response status code
        res.status(200).json({ message: "Livro atualizado com sucesso!" });
      } else {
        next(new NotFound("ID do livro não encontrado!"));
      }
    } catch (error) {
      next(error);
    }
  };

  static deleteBook = async (req, res, next) => {
    // essa variável recebe o id passado como parâmetro na url da rota de requisição
    const id = req.params.id;

    try {
      // deletando o livro pelo id de forma assíncrona
      const bookFound = await book.findByIdAndDelete(id);

      if (bookFound !== null) {
        // respondendo com um objeto passando a message
        // 200 OK - HTTP response status code
        res.status(200).json({ message: "Livro deletado com sucesso!" });
      } else {
        next(new NotFound("ID do livro não encontrado!"));
      }
    } catch (error) {
      next(error);
    }
  };

  static getBooksByFilter = async (req, res, next) => {
    try {
      const search = await handleSearch(req.query);

      if (search !== null) {
        // essa variável recebe todos os objetos de livro encontrados no banco de dados
        const booksFound = await book.find(search).populate("author");

        res.status(200).json(booksFound);
      } else {
        res.status(200).send([]);
      }
    } catch (error) {
      next(error);
    }
  };
}

async function handleSearch(params) {
  // essa variável recebe o valor digitado na query publisher digitada na url
  const { publisher, title, minPages, maxPages, authorName } = params;

  let search = {};

  if (publisher) search.publisher = { $regex: publisher, $options: "i" };
  if (title) search.title = { $regex: title, $options: "i" };

  if (minPages || maxPages) search.pages = {};

  if (minPages) search.pages.$gte = minPages;
  if (maxPages) search.pages.$lte = maxPages;

  if (authorName) {
    const authorFound = await author.findOne({
      name: { $regex: authorName, $options: "i" },
    });

    if (authorFound !== null) {
      search.author = authorFound._id;
    } else {
      search = null;
    }
  }

  return search;
}

export default BookController;
