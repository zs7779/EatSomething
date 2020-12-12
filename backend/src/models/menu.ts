import mongoose, { Document } from "mongoose";
import { menuItemSchema } from "./menuItem";


const menuSchema = new mongoose.Schema({
    name: String,
    items: [menuItemSchema]
});
menuSchema.set("toJSON", {
    transform: (document: Document, returnedObject: Document) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Menu = mongoose.model("menu", menuSchema);

export {menuSchema};
export default Menu;