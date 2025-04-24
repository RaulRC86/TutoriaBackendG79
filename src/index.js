import express from "express";
import {readFileSync} from "fs";
import 'dotenv/config'
import { allRoutes } from "./router.js";
import { obtenerDB } from "./db/database.js";
import { librosRoutes } from "./librosRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

// app.get("/", (req, res) => {
// res.send("Desde mi servidor")
// })

// app.get("/clients", (req, res) => {
//   const leerUsuario = JSON.parse(readFileSync("./src/usuarios.json", "utf8"))
//   res.send(leerUsuario)
// })

app.use("/api/libros", librosRoutes)

app.use("/api", allRoutes);


if (process.env.JEST_WORKER_ID === undefined) {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
} 


// obtenerDB()

export default app;