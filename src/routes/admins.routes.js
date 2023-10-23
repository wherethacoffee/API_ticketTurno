import { Router } from "express";
import { listar, buscar, agregar, actualizar, eliminar, login, logout } from "../controllers/admin.controller.js";

const router = Router();

//Consultas
router.get('/listar', listar);
router.get('/buscar/:idAdmin', buscar);

//Agregar
router.post('/agregar', agregar);

//Actualizar
router.put('/actualizar/:idAdmin', actualizar);

//Eliminar
router.delete('/eliminar/:idAdmin', eliminar);

//Login
router.post('/login', login);

//Logout
router.post('/logout', logout);

export default router;
