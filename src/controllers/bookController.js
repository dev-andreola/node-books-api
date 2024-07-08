import Book from "../models/Book.js";

class BookController {
  static async getBooks(req, res) {
    const bookList = await Book.find();
    res.status(200).json(bookList);
  }

  static async postBook(req, res) {
    try {
      const newBook = await Book.create(req.body);
      res
        .status(201)
        .json({ message: "Livro criado com sucesso!", book: newBook });
    } catch (error) {
      res.status(500).json({
        message: `${error.message} - Falha ao cadastrar livro!`,
      });
    }
  }
}

export default BookController;
