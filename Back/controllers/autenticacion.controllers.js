import  passport  from 'passport';
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js';
import {usersValidations}  from '../validations/users.validations.js';
import dotenv from 'dotenv';

dotenv.config();

export async function registro(req, res) {
  //const { nombre, apellidos, correo_electronico, direccion, contrasenya, numero } = req.body;
  const datos = req.body;

  try {
  
    usersValidations.validateSync(datos, { abortEarly: false, stripUnknown: true });

   // console.log("usuadatos", datos.correo_electronico)

    const usuarioExistente = await Usuario.findOne({ where: {correo_electronico: datos.correo_electronico}});

    console.log("usua", datos)

    if (usuarioExistente) {
      return res.status(400).json({ error: 'El usuario ya existe', message: 'Este correo electrónico ya está registrado' });
    }

    const hashedPassword = await hash(datos.contrasenya, 10);

    const nuevoUsuario = await Usuario.create({
      nombre: datos.nombre,
      apellidos: datos.apellidos,
      correo_electronico: datos.correo_electronico,
      direccion: datos.direccion,
      contrasenya: hashedPassword
    });

    req.login(nuevoUsuario, async (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }

    
      res.cookie('sesion_usuario', req.sessionID, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000, 
      });

    
      res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.header('Access-Control-Allow-Credentials', 'true');

      res.json({ message: 'Registro e inicio de sesión exitosos', usuario: nuevoUsuario });
    });
  } catch (error) {
    console.error(error);

    
    if (error.message.includes('Validation error')) {
      res.status(400).json({ error: 'Error en el registro', message: 'Error de validación. Asegúrate de proporcionar todos los campos requeridos.' });
    } else {
      res.status(500).json({ error: 'Error en el registro', message: error.message });
    }
  }
}

export function inicioSesion(req, res, next) {
  passport.authenticate('local', (err, usuario, info) => {
    if (err) {
      return next(err);
    }

    if (!usuario) {
      return res.status(401).json({ error: 'Inicio de sesión fallido', message: info.message });
    }

    req.logIn(usuario, async (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }

      // Configurar la cookie de sesión
      res.cookie('sesion_usuario', req.sessionID, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000, 
      });

      // Configurar los encabezados CORS
      res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.header('Access-Control-Allow-Credentials', 'true');

      //console.log("usuari", usuario.dataValues)


      var tokengen = jwt.sign(usuario.dataValues, process.env.JWT_SECRET, {
        expiresIn: 604800 //7 dias de duración
    });

      res.json({ message: 'Inicio de sesión exitoso', token: tokengen , usuario });
    });
  })(req, res, next);
}



export function cerrarSesion(req, res) {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al cerrar la sesión' });
      }

      // Destruir la sesión
      req.session.destroy((destroyErr) => {
        if (destroyErr) {
          return res.status(500).json({ error: 'Error al destruir la sesión' });
        }

  
res.cookie('connect.sid', '', { expires: new Date(0), httpOnly: true, path: '/' });


        // Limpiar la cookie de sesión al cerrar sesión
        res.clearCookie('sesion_usuario', { httpOnly: true, secure: false, path: '/' });

       
        res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.json({ message: 'Sesión cerrada exitosamente' });
      });
    });
  } else {
    res.status(401).json({ error: 'No has iniciado sesión' });
  }
}


export async function editarPerfil(req, res) {
  try {
    if (req.isAuthenticated()) {
      const usuarioId = req.params.id_usuario;


      const { contrasenya, direccion, numero } = req.body;

    
      if (!contrasenya && !direccion && (!numero || numero.length === 0)) {
        return res.status(400).json({ error: 'No se proporcionaron datos para actualizar' });
      }

      try {
        
        if (contrasenya) {
          
          if (!contrasenya.trim()) {
            return res.status(400).json({ error: 'La contraseña no puede estar vacía' });
          }

          const hashedPassword = await hash(contrasenya, 10);
          await Usuario.update({ contrasenya: hashedPassword }, { where: { id: usuarioId } });
        }

       
        if (direccion) {
          await Usuario.update({ direccion }, { where: { id: usuarioId } });
        }


      
        res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
        res.header('Access-Control-Allow-Credentials', 'true');

        res.json({ message: 'Perfil actualizado exitosamente' });
      } catch (error) {
        throw error;
      }
    } else {
      res.status(401).json({ error: 'No has iniciado sesión' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al editar el perfil', message: error.message });
  }
}

export async function obtenerDatosUsuario(req, res) {
  try {
    
    if (req.isAuthenticated()) {
      const usuarioAutenticadoId = req.user.id; 
      const usuarioSolicitadoId = req.params.id_usuario; 

     
      if (usuarioAutenticadoId != usuarioSolicitadoId) {
        return res.status(403).json({ error: 'Acceso no autorizado: No tienes permisos para acceder a este perfil' });
      }

    
      const usuario = await Usuario.findByPk(usuarioSolicitadoId, {
        attributes: ['nombre', 'apellidos', 'correo_electronico', 'direccion'],
      });

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
      const datosUsuario = {
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        correo_electronico: usuario.correo_electronico,
        direccion: usuario.direccion,
      };

      
      res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
      res.header('Access-Control-Allow-Credentials', 'true');

      res.json(datosUsuario);
    } else {
      
      res.status(401).json({ error: 'No has iniciado sesión' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos del usuario', message: error.message });
  }
}
