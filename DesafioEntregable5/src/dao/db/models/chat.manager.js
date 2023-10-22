import mongoose from "mongoose";

//esquema del chat 
const messageSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
)

export const chatModel = mongoose.model('Message', messageSchema);
