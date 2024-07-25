import db from "./config/dbConnect.js";
import express from "express";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

db.on("error", console.log.bind(console, "Erro de conexão!"));
db.once("open", () => {
  console.log("Conexão com o banco feita com sucesso!");
});

const app = express();

// middleware nativo do Express que converte os dados de uma requisição para o formato JSON;
app.use(express.json());

routes(app);

// middleware criado para tratar os erros
app.use(errorHandler);

export default app;
