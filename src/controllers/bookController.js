import NotFound from "../errors/NotFound.js";
import book from "../models/Book.js";

class BookController {
  static getBooks = async (req, res, next) => {
    try {
      // essa variável recebe todos os objetos de modelo livro encontrados no banco de dados
      const booksFound = await book.find();

      // respondendo com os objetos de livro encontrados em forma de json
      // 200 OK - HTTP response status code
      res.status(200).json(booksFound);
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

  static getBooksByPublisher = async (req, res, next) => {
    try {
      // essa variável recebe o valor digitado na query publisher digitada na url
      const publisher = req.query.publisher;

      // essa variável recebe todos os objetos de livro encontrados no banco de dados
      // todos os objetos onde o valor publisher é igual ao recebido na query
      const booksFound = await book.find({ publisher: publisher });

      res.status(200).json(booksFound);
    } catch (error) {
      next(error);
    }
  };
}

export default BookController;
