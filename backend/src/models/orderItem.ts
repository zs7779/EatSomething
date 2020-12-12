import mongoose, { Document } from "mongoose";
import { menuItemSchema } from "./menuItem";


const orderItemSchema = new mongoose.Schema({
    item: menuItemSchema,
    quantity: Number
});
orderItemSchema.set("toJSON", {
    transform: (document: Document, returnedObject: Document) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const OrderItem = mongoose.model("orderItem", orderItemSchema);

export {orderItemSchema};
export default OrderItem;