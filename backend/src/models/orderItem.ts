import mongoose from "mongoose";
import { menuItemSchema } from "./menuItem";


const orderItemSchema = new mongoose.Schema({
    item: menuItemSchema,
    quantity: Number
});

const OrderItem = mongoose.model("orderItem", orderItemSchema);

export {orderItemSchema};
export default OrderItem;