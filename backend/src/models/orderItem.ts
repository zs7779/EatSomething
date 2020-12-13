import mongoose, { Document } from "mongoose";


const orderItemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem"
    },
    quantity: Number
});
orderItemSchema.set("toJSON", {
    transform: (document: Document, returnedObject: Document) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export {orderItemSchema};
export default OrderItem;