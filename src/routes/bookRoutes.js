import express from "express";
import BookController from "../controllers/bookController.js";

const routes = express.Router();

routes.get("/books", BookController.getBooks);
routes.post("/books", BookController.postBook);
routes.get("/book:id", BookController.getBookById);

export default routes;
