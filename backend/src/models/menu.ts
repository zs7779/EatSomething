import mongoose, { Document } from "mongoose";


const menuSchema = new mongoose.Schema({
    name: String,
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem"
    }]
});
menuSchema.set("toJSON", {
    transform: (document: Document, returnedObject: Document) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Menu = mongoose.model("Menu", menuSchema);

export {menuSchema};
export default Menu;