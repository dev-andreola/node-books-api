import express from "express";
import BookController from "../controllers/bookController.js";
import pagination from "../middlewares/pagination.js";

const router = express.Router();

router
  .get("/books", BookController.getBooks, pagination)
  .get("/books/search", BookController.getBooksByFilter, pagination)
  .get("/books/:id", BookController.getBookById)
  .post("/books", BookController.postBook)
  .put("/books/:id", BookController.putBook)
  .delete("/books/:id", BookController.deleteBook);

export default router;
