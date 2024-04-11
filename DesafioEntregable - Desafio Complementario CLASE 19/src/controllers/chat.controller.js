import { chatService } from "../services/chat.service.js"

class ChatController {

    findAllmessages = async (req, res) => {
        try {
            const result = await chatService.findAll();
            res.status(200).json({ messages: result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    findMessageById = async (req, res) => {
        const { idMessage } = req.params;
        try {
            const result = await chatService.findById(idMessage);
            res.status(200).json({ message: result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    createMessage = async (req, res) => {
        const { fromUser, contentMessage, toUser } = req.body;
        try {
            if (!fromUser || !contentMessage || !toUser) {
                return res.status(400).json({ message: "All data is required" });
            }
            const createdMessage = await messagesService.createOne(req.body);
            // res.status(200).json({ message: "message created", message: createdMessage });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    deleteMessage = async (req, res) => {
        const { id } = req.body
        try {
            const result = await chatService.deleteOne(id)
            res.status(200).json({ message: "message delete", result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export const chatController = new ChatController();