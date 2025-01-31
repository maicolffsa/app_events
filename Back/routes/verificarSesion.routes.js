import { Router } from 'express';
import verificarToken from '../middleware/verificarSesion.middleware.js';
const router = Router();

app.get('/ruta-protegida', verificarToken, (req, res) => {

  res.json({ mensaje: 'Acceso autorizado', usuario: req.usuario });
});
