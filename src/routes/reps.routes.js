import { Router } from "express";
import { listar, buscar, agregar, actualizar, eliminar } from "../controllers/rep.controller.js";

const router = Router();

//Consultas
router.get('/listar', listar);
router.get('/buscar/:idRep', buscar);

//Agregar
router.post('/agregar', agregar);

//Actualizar
router.put('/actualizar/:idRep', actualizar);

//Eliminar
router.delete('/eliminar/:idRep', eliminar);

export default router;
