import { Router } from "express";
import {
  agregarClientsController,
  obtenerClientsController,
  eliminarClientsController,
  actualizarClientsController,
  obtenerIDClientController,
  obtenerClientsControllerLimit,
  loginController
} from "./controller/clientsController.js";

export const allRoutes = Router();

allRoutes.post("/clients", agregarClientsController);
allRoutes.get("/clients", obtenerClientsController);
allRoutes.get("/clients/:id", obtenerIDClientController);
allRoutes.get("/clientsLimit", obtenerClientsControllerLimit);
allRoutes.delete("/clients/:id", eliminarClientsController); 
allRoutes.put("/clients/:id", actualizarClientsController);

allRoutes.post("/login", loginController);