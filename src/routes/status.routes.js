import { Router } from "express";
import { listar, agregar, actualizar } from "../controllers/status.controller.js";

const router = Router();

//Consultas
router.get('/listar', listar);

//Agregar
router.post('/agregar', agregar);

//Actualizar status a realizado
router.put('/actualizar/:idStatus', actualizar);


export default router;
