import { Router } from "express";
import { listar, buscar, agregar, actualizar, eliminar } from "../controllers/alumno.controller.js";

const router = Router();

//Consultas
router.get('/listar', listar);
router.get('/buscar/:curp', buscar);

//Agregar
router.post('/agregar', agregar);

//Actualizar
router.put('/actualizar/:curp', actualizar);

//Eliminar
router.delete('/eliminar/:curp', eliminar);

export default router;
