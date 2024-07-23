import express from "express";
import dbConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";

const dbConnection = await dbConnect();

dbConnection.on("error", (error) => {
  console.error("Erro ao conectar com o Banco de Dados!", error);
});

dbConnection.once("open", () => {
  console.log("Conectado ao Banco de Dados!");
});

const app = express();
routes(app);

export default app;
