import app from "./src/app.js";
import dotenv from "dotenv";

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Servidor escutando...");
});
