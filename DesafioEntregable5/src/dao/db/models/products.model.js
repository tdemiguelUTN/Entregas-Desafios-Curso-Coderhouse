import { Schema, model } from "mongoose";
//defino esquema y modelo de los productos
const productsSchema = new Schema({
    name: {
        type: String,
        requerid: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
    },
});

export const productsModel = model("Products", productsSchema);