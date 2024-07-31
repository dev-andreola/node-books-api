import express from "express";
import AuthorController from "../controllers/authorController.js";
import pagination from "../middlewares/pagination.js";

const router = express.Router();

router
  .get("/authors", AuthorController.getAuthors, pagination)
  .get("/authors/:id", AuthorController.getAuthorById)
  .post("/authors", AuthorController.postAuthor)
  .put("/authors/:id", AuthorController.putAuthor)

  .delete("/authors/:id", AuthorController.deleteAuthor);

export default router;
