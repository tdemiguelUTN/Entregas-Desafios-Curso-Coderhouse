import BasicManager from "../mongoDAO/BasicManager.js"
import { chatModel } from "../../db/models/chat.model.js"

class ChatManager extends BasicManager {
    constructor() {
        super(chatModel);
    }
}

export const chatManager = new ChatManager();
