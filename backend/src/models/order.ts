import mongoose, { Document } from "mongoose";
import {orderItemObj} from "./orderItemObj";

interface IOrder {
    restaurant: String;
    complete: Boolean;
    rated: Boolean;
}
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: {
        type: [orderItemObj],
        required: true,
        validate: [(field: typeof orderItemObj[]) => field.length > 0, "Order items cannot be empty"]
     },
    createTime: { type: Date, required: true, default: Date.now },
    complete: { type: Boolean, required: true, default: false },
    rated: { type: Boolean, required: true, default: false },
});
orderSchema.set("toJSON", {
    transform: (document: Document, returnedObject: Document) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Order = mongoose.model<IOrder & Document>("Order", orderSchema);

export {orderSchema};
export default Order;