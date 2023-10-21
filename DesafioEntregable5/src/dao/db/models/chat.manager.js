import mongoose from "mongoose";

//esquema del chat 
const messageSchema = new mongoose.Schema({
  user: {
    type: String
  },
  message: {
    type: String
  },
}
)

export const chatModel = mongoose.model('Message', messageSchema);
