import { Router } from "express";
import { listar, buscar, agregar, actualizar, eliminar } from "../controllers/nivel.controller.js";

const router = Router();

//Consultas
router.get('/listar', listar);
router.get('/buscar/:idNivel', buscar);

//Agregar
router.post('/agregar', agregar);

//Actualizar
router.put('/actualizar/:idNivel', actualizar);

//Eliminar
router.delete('/eliminar/:idNivel', eliminar);

export default router;
