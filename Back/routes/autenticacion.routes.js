import { Router } from 'express';
import  passport  from 'passport';
import { registro, inicioSesion, cerrarSesion, obtenerDatosUsuario, editarPerfil } from '../controllers/autenticacion.controllers.js';
import verificarSesion from '../middleware/verificarSesion.middleware.js';

const router = Router();
// Ruta para registro
router.post('/registro', registro);

// Ruta para inicio de sesión
router.post('/inicio-sesion', passport.authenticate('local'), inicioSesion);

// Ruta para cerrar sesión
router.post('/cerrar-sesion', cerrarSesion);

// Ruta para obtener los datos actuales de un usuario (protegida con verificarToken)
router.get('/perfil/:id_usuario', verificarSesion, obtenerDatosUsuario);

// Ruta para editar los datos de un usuario y sus teléfonos (protegida con verificarToken)
router.put('/perfil/:id_usuario', verificarSesion, editarPerfil);

export default router;
