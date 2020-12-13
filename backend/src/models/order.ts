import mongoose, { Document } from "mongoose";


const orderSchema = new mongoose.Schema({
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem"
    }],
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