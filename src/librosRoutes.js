import { Router } from "express";
import { eliminarLibrosController } from "./controller/librosController.js";
import { authMiddleware } from "./middleware/auth.js";



export const librosRoutes = Router();

librosRoutes.delete("/:id", authMiddleware, eliminarLibrosController);

