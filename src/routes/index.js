import express from "express";
import bookRoutes from "../routes/bookRoutes.js";
import authorRoutes from "../routes/authorRoutes.js";

const routes = (app) => {
  // criando a rota raíz
  app.route("/").get((req, res) => {
    res.status(200).send({ title: "Curso de Node" });
  });

  // usando as rotas criadas
  app.use(express.json(), bookRoutes, authorRoutes);
};

export default routes;
