import mongoose, { Document } from "mongoose";
import { menuObj } from "./menuObj";


const restaurantSchema = new mongoose.Schema({
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    address: String,
    opening_time: [String],
    keywords: [String],
    // dine_in: Boolean,
    takeaway: Boolean,
    delivery: Boolean,
    // parking: [String],
    payment: [String],
    menus: [menuObj],
    location: { lat: Number, lng: Number },
    price_level: Number,
    rating: Number,
    user_ratings_total: Number
});
restaurantSchema.set("toJSON", {
    transform: (document: Document, returnedObject: Document) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export { restaurantSchema };
export default Restaurant;