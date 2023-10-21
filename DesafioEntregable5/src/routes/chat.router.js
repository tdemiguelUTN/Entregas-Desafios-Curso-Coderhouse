import { Router } from 'express'
import { chatManager } from '../managers/ChatManager.js';

const router = Router();

router.post('/', async (req, res) => {
  const { user, message } = req.body;

  const exito = await chatManager.enviarMensaje(user, message);

  if (exito) {
    res.redirect('/chat');
  } else {
    res.status(500).send('Error al guardar el mensaje');
  }
});

router.get('/getMessages', async (req, res) => {
  const mensajes = await chatManager.obtenerMensajes();

  if (mensajes !== null) {
    res.json(mensajes);
  } else {
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
});

export default router;

