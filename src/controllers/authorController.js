import { author } from "../models/Author.js";

class AuthorController {
  static async getAuthors(req, res) {
    try {
      const authorList = await author.find();
      res.status(200).json(authorList);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Falha na requisição` });
    }
  }

  static async getAuthorById(req, res) {
    try {
      const id = req.params.id;
      const author = await author.findById(id);
      res.status(200).json(author);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Falha na requisição` });
    }
  }

  static async postAuthor(req, res) {
    try {
      const newAuthor = await author.create(req.body);
      res
        .status(201)
        .json({ message: "Autor criado com sucesso!", author: newAuthor });
    } catch (error) {
      res.status(500).json({
        message: `${error.message} - Falha ao cadastrar autor!`,
      });
    }
  }

  static async putAuthorById(req, res) {
    try {
      const id = req.params.id;
      await author.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Autor atualizado" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Falha ao alterar autor` });
    }
  }

  static async deleteAuthorById(req, res) {
    try {
      const id = req.params.id;
      await author.findByIdAndDelete(id);
      res.status(200).json({ message: "Autor excluído" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - Falha ao deletar autor` });
    }
  }
}

export default AuthorController;
