import { Router } from "express";
import { listar, buscar, agregar, actualizar, eliminar, cambiarStatus } from "../controllers/turno.controller.js";

const router = Router();

//Consultas
router.get('/listar', listar);
router.get('/buscar/:idTurno/:curp_alumno', buscar);

//Agregar
router.post('/agregar', agregar);

//Actualizar
router.put('/actualizar/:idTurno', actualizar);
router.put('/cambiarStatus/:idTurno', cambiarStatus);

//Eliminar
router.delete('/eliminar/:idTurno', eliminar);

export default router;
