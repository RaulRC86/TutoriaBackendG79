import { Router } from "express";
import {
  agregarClientsController,
  obtenerClientsController,
  eliminarClientsController,
  actualizarClientsController,
  obtenerIDClientController,
  obtenerClientsControllerLimit
} from "./controller/clientsController.js";
// import { indexController } from "./controller/indexControllers.js";

// import { serviceController } from "./controller/serviceController.js";
export const allRoutes = Router();

allRoutes.post("/clients", agregarClientsController);
allRoutes.get("/clients", obtenerClientsController);
allRoutes.get("/clients/:id", obtenerIDClientController);
allRoutes.get("/clientsLimit", obtenerClientsControllerLimit);
allRoutes.delete("/clients/:id", eliminarClientsController); 
allRoutes.put("/clients/:id", actualizarClientsController);
// allRoutes.get("/service", serviceController);
// allRoutes.get("/contact", contactController);
