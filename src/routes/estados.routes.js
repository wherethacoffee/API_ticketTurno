import { Router } from "express";
import { listar, buscar, agregar, actualizar, eliminar } from "../controllers/estado.controller.js";

const router = Router();

//Consultas
router.get('/listar', listar);
router.get('/buscar/:idEstado', buscar);

//Agregar
router.post('/agregar', agregar);

//Actualizar
router.put('/actualizar/:idEstado', actualizar);

//Eliminar
router.delete('/eliminar/:idEstado', eliminar);

export default router;
