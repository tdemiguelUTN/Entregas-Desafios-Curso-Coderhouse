import BasicManager from "../managers/BasicManager.js";
import { chatModel } from "../dao/db/models/chat.manager.js";

class ChatManager extends BasicManager {
    constructor() {
        super(chatModel);
    }

    // Función async/await para enviar un mensaje
    async enviarMensaje(user, message) {
        try {
            const nuevoMensaje = new this.model({ user, message });
            await nuevoMensaje.save();
            console.log('Mensaje guardado con éxito');
            return true;
        } catch (err) {
            console.error('Error al guardar el mensaje:', err);
            return false;
        }
    }

    // Función async/await para obtener mensajes
    async obtenerMensajes() {
        try {
            const mensajes = await this.model.find({});
            return mensajes;
        } catch (err) {
            console.error('Error al obtener los mensajes:', err);
            return null;
        }
    }
}

export const chatManager = new ChatManager();
