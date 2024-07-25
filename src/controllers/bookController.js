import book from "../models/Book.js";

class BookController {
  static getBooks = async (req, res) => {
    try {
      // essa variável recebe todos os objetos de modelo livro encontrados no banco de dados
      const booksFound = await book.find();

      // respondendo com os objetos de livro encontrados em forma de json
      // 200 OK - HTTP response status code
      res.status(200).json(booksFound);
    } catch (error) {
      // respondendo com um objeto passando a message
      // 500 Internal Server Error - HTTP response status code
      res
        .status(500)
        .json({ message: `${error.message} - Erro interno do servidor!` });
    }
  };

  static getBookById = async (req, res) => {
    // essa variável recebe o id passado como parâmetro na url da rota de requisição
    const id = req.params.id;
    try {
      // essa variável recebe o objeto de modelo livro encontrado pelo id
      const bookFound = await book.findById(id);

      // respondendo com o objeto do livro encontrado em forma de json
      // 200 OK - HTTP response status code
      res.status(200).json(bookFound);
    } catch (error) {
      // respondendo com um objeto passando a message
      // 400 Bad Request - HTTP response status code
      res
        .status(400)
        .json({ message: `${error.message} - ID do livro não encontrado!` });
    }
  };

  static postBook = async (req, res) => {
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
      // respondendo com um objeto passando a message
      // 500 Internal Server Error - HTTP response status code
      res
        .status(500)
        .json({ message: `${error.message} - Falha ao cadastrar livro!` });
    }
  };

  static putBook = async (req, res) => {
    // essa variável recebe o id passado como parâmetro na url da rota de requisição
    const id = req.params.id;
    try {
      // atualizando o livro pelo id de forma assíncrona
      await book.findByIdAndUpdate(id, { $set: req.body });

      // respondendo com um objeto passando a message
      // 200 OK - HTTP response status code
      res.status(200).json({ message: "Livro atualizado com sucesso!" });
    } catch (error) {
      // respondendo com um objeto passando a message
      // 400 Bad Request - HTTP response status code
      res
        .status(400)
        .json({ message: `${error.message} - ID do livro não encontrado!` });
    }
  };

  static deleteBook = async (req, res) => {
    // essa variável recebe o id passado como parâmetro na url da rota de requisição
    const id = req.params.id;

    try {
      // deletando o livro pelo id de forma assíncrona
      await book.findByIdAndDelete(id);

      // respondendo com um objeto passando a message
      // 200 OK - HTTP response status code
      res.status(200).json({ message: "Livro deletado com sucesso!" });
    } catch (error) {
      // respondendo com um objeto passando a message
      // 400 Bad Request - HTTP response status code
      res
        .status(400)
        .json({ message: `${error.message} - ID do livro não encontrado!` });
    }
  };

  static getBooksByPublisher = async (req, res) => {
    try {
      // essa variável recebe o valor digitado na query publisher digitada na url
      const publisher = req.query.publisher;

      // essa variável recebe todos os objetos de livro encontrados no banco de dados
      // todos os objetos onde o valor publisher é igual ao recebido na query
      const booksFound = await book.find({ publisher: publisher });

      res.status(200).json(booksFound);
    } catch (error) {
      // respondendo com um objeto passando a message
      // 500 Internal Server Error - HTTP response status code
      res
        .status(500)
        .json({ message: `${error.message} - Falha ao cadastrar livro!` });
    }
  };
}

export default BookController;
