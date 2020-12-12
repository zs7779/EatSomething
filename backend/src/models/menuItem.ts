import mongoose, { Document } from "mongoose";

const menuItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
});
menuItemSchema.set("toJSON", {
    transform: (document: Document, returnedObject: Document) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const MenuItem = mongoose.model("menuItem", menuItemSchema);

export {menuItemSchema};
export default MenuItem;