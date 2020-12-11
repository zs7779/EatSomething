import mongoose from "mongoose";
import { menuItemSchema } from "./menuItem";


const menuSchema = new mongoose.Schema({
    name: String,
    items: [menuItemSchema]
});

const Menu = mongoose.model("menu", menuSchema);

export {menuSchema};
export default Menu;