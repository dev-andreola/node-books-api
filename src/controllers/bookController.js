import Book from "../models/Book.js";

class BookController {
  static async getBooks(req, res) {
    const bookList = Book.find();
    res.status(200).json(bookList);
  }
}

export default BookController;
