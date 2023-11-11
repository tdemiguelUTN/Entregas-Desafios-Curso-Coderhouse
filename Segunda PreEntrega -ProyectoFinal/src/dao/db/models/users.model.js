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
});

export const usersModel = mongoose.model(usersCollection, usersSchema);