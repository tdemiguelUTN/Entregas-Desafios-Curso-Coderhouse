import mongoose from "mongoose";

//esquema del chat 
const chatCollection = 'Message'
const messageSchema = new mongoose.Schema({
  fromUser: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  toUser: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
)

export const chatModel = mongoose.model(chatCollection, messageSchema);
