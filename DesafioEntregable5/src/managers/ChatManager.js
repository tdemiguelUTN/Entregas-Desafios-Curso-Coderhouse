import BasicManager from "../managers/BasicManager.js";
import { chatModel } from "../dao/db/models/chat.manager.js";

class ChatManager extends BasicManager {
    constructor() {
        super(chatModel);
    }
}

export const chatManager = new ChatManager();
