import express from "express";
import {readFileSync} from "fs";
import 'dotenv/config'
import { allRoutes } from "./router.js";
import { obtenerDB } from "./db/database.js";


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
res.send("Desde mi servidor")
})

app.get("/clients", (req, res) => {
  const leerUsuario = JSON.parse(readFileSync("./src/usuarios.json", "utf8"))
  res.send(leerUsuario)
})

app.use("/api", allRoutes);




app.listen(PORT, () => {
  console.log(`Conectado en http://localhost:${PORT}`);
})

obtenerDB()