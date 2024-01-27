import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2';

//defino esquema y modelo de los carritos
const cartsCollection = "Carts";
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
cartsSchema.pre(["find","findOne","findById","findOneAndUpdate"], function(){
  this.populate("products.product");
})

cartsSchema.plugin(mongoosePaginate);

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);


