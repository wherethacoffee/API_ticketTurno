import { Router } from "express";
import { listar, buscar, agregar, actualizar, eliminar, statusRealizado } from "../controllers/turno.controller.js";

const router = Router();

//Consultas
router.get('/listar', listar);
router.get('/buscar/:idTurno', buscar);

//Agregar
router.post('/agregar', agregar);

//Actualizar
router.put('/actualizar/:idTurno', actualizar);
router.put('/statusRealizado/:idTurno', statusRealizado);

//Eliminar
router.delete('/eliminar/:idTurno', eliminar);

export default router;
