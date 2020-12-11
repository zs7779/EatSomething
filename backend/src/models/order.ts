import mongoose from "mongoose";
import { orderItemSchema } from "./orderItem";


const orderSchema = new mongoose.Schema({
    items: [orderItemSchema],
});

const Order = mongoose.model("order", orderSchema);

export {orderSchema};
export default Order;