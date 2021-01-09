import mongoose, { Document } from "mongoose";
import {orderItemObj} from "./orderItemObj";


const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    items: [orderItemObj],
    createTime: { type: Date, default: Date.now },
    complete: { type: Boolean, default: false },
});
orderSchema.set("toJSON", {
    transform: (document: Document, returnedObject: Document) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Order = mongoose.model("Order", orderSchema);

export {orderSchema};
export default Order;