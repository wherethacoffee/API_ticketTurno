import { Router } from "express";
import { listar, buscar, agregar, actualizar, eliminar } from "../controllers/asunto.controller.js";

const router = Router();

//Consultas
router.get('/listar', listar);
router.get('/buscar/:idAsunto', buscar);

//Agregar
router.post('/agregar', agregar);

//Actualizar
router.put('/actualizar/:idAsunto', actualizar);

//Eliminar
router.delete('/eliminar/:idAsunto', eliminar);

export default router;
