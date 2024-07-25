import { chatManager} from "../persistencia/DAOs/mongoDAO/ChatManager.js"

class ChatService{ 
    async findAll() {
        const response = await chatManager.findAll();
        return response;
    }

    async findById(id) {
        const response = await chatManager.findById(id);
        return response;
    }

    async createOne(obj) {
        const response = await chatManager.createOne(obj);
        return response;
    }

    async deleteOne(id) {
        const response = await chatManager.deleteOne(id);
        return response;
    }
}

export const chatService = new ChatService;