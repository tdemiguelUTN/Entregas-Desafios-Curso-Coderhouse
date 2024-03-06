import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2';

//defino esquema y modelo de los carritos
const ticketsCollection = "Ticket";
const ticketsSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        default: false,
    },
    products: [
        {
            idProduct: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products"
            },
            qty: {
                type: Number,
            },
        }],
    purchaser: {
        type: String,
    },
});

ticketsSchema.plugin(mongoosePaginate);

export const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema);