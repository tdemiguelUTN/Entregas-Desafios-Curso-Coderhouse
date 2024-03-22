import mongoose, { Schema, model } from "mongoose";
//defino esquema y modelo de los usuarios 
const usersCollection = "Users"
const usersSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Carts",
  },
  from_github: {
    type: Boolean,
    default: false,
  },
  from_google: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["admin", "premium", "client"],
    default: "client",
  }
});

export const usersModel = mongoose.model(usersCollection, usersSchema);