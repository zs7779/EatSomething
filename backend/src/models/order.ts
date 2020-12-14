import mongoose, { Document } from "mongoose";
import {orderItemObj} from "./orderItemObj";


const orderSchema = new mongoose.Schema({
    items: [orderItemObj],
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