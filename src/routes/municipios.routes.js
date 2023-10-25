import { Router } from "express";
import { listar, buscar, agregar, actualizar, eliminar, listarPorEstado } from "../controllers/municipio.controller.js";

const router = Router();

//Consultas
router.get('/listar', listar);
router.get('/buscar/:idMunicipio', buscar);
router.get('/listarPorEstado/:idEstado', listarPorEstado);

//Agregar
router.post('/agregar', agregar);

//Actualizar
router.put('/actualizar/:idMunicipio', actualizar);

//Eliminar
router.delete('/eliminar/:idMunicipio', eliminar);

export default router;
