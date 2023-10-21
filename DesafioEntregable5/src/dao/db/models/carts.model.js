import mongoose from "mongoose"
//defino esquema y modelo de los carritos

const cartsSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Products",
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

export const cartsModel = mongoose.model("Carts", cartsSchema);