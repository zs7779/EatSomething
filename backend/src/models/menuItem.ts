import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
});

const MenuItem = mongoose.model("menuItem", menuItemSchema);

export {menuItemSchema};
export default MenuItem;