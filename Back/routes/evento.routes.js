import { Router } from 'express';
import { getListaEvento, createEvento, editEvento, deleteEvento } from '../controllers/evento.controllers.js';
import verificarSesion from '../middleware/verificarSesion.middleware.js'; 

const router = Router();
router.get('/', getListaEvento); 
router.post('/', verificarSesion, createEvento);
router.put('/:id_evento', verificarSesion, editEvento);
router.delete('/:id_evento', verificarSesion, deleteEvento);

export default router;
