import express from "express";
import bookRoutes from "../routes/bookRoutes.js";
import authorRoutes from "../routes/authorRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ title: "Curso de Node" });
  });

  app.use(express.json(), bookRoutes, authorRoutes);
};

export default routes;
