import express from "express";
import BookController from "../controllers/bookController.js";

const routes = express.Router();

routes.get("/books", BookController.getBooks);
routes.get("/book:id", BookController.getBookById);
routes.post("/books", BookController.postBook);
routes.put("/book:id", BookController.putBookById);
routes.delete("/book:id", BookController.deleteBookById);

export default routes;
