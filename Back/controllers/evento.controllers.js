import Evento from '../models/evento.js';


export async function getListaEvento (req, res) {
  try {
    const eventos = await Evento.findAll();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de eventos' });
  }
}

// Crear un nuevo evento (para administradores)

export async function createEvento (req, res) {
  const usuarioActual = req.isAuthenticated() ? req.user.correo_electronico : null;

  if (!usuarioActual) {
    return res.status(403).json({ error: 'Acceso no autorizado' });
  }

  const { nombre, descripcion, precio, stock, imagen_url } = req.body;

  try {
    const evento = await Evento.create({ nombre, descripcion, precio, stock, imagen_url });
    res.json(evento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear evento', message: error.message });
  }
}

export async function editEvento (req, res) {
  const usuarioActual = req.isAuthenticated() ? req.user.correo_electronico : null;

  if (!usuarioActual) {
    return res.status(403).json({ error: 'Acceso no autorizado' });
  }

  const { id_evento } = req.params;
  const { nombre, descripcion, precio, stock, imagen_url } = req.body;

  try {
    const evento = await Evento.findByPk(id_evento);

    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }


    evento.nombre = nombre;
    evento.descripcion = descripcion;
    evento.precio = precio;
    evento.stock = stock;
    evento.imagen_url = imagen_url;


    await evento.save();

    res.json(evento);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar evento', message: error.message });
  }
}

export async function deleteEvento (req, res) {
  const usuarioActual = req.isAuthenticated() ? req.user.correo_electronico : null;

  if (usuarioActual !== 'peperj7@gmail.com') {
    return res.status(403).json({ error: 'Acceso no autorizado' });
  }

  const { id_evento } = req.params;

  try {
    const evento = await Evento.findByPk(id_evento);
    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    await evento.destroy();
    res.json({ message: 'Evento eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar evento' });
  }
}