import mongoose, { Document } from "mongoose";
import { orderItemSchema } from "./orderItem";


const orderSchema = new mongoose.Schema({
    items: [orderItemSchema],
});
orderSchema.set("toJSON", {
    transform: (document: Document, returnedObject: Document) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Order = mongoose.model("order", orderSchema);

export {orderSchema};
export default Order;