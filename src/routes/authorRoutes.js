import express from "express";
import AuthorController from "../controllers/authorController.js";

const routes = express.Router();

routes.get("/authors", AuthorController.getAuthors);
routes.get("/author/:id", AuthorController.getAuthorById);
routes.post("/authors", AuthorController.postAuthor);
routes.put("/author/:id", AuthorController.putAuthorById);
routes.delete("/author/:id", AuthorController.deleteAuthorById);

export default routes;
