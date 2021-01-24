import mongoose, { Document } from "mongoose";
import { menuObj } from "./menuObj";


interface IRestaurant {
    rating: number;
    user_ratings_total: number;
}

const restaurantSchema = new mongoose.Schema({
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, minlength: 1 },
    address: { type: String, required: true, minlength: 1 },
    opening_time: [String],
    keywords: {
        type: [String],
        required: true,
        validate: [(field: string) => field.length > 0, "Keywords cannot be empty"] },
    // dine_in: Boolean,
    takeaway: Boolean,
    delivery: Boolean,
    // parking: [String],
    payment: [String],
    menus: {
        type: [menuObj],
        required: true,
        validate: [(field: typeof menuObj[]) => field.length > 0 && field.filter(f => f.items.length === 0).length === 0, "Menus cannot be empty"] },
    location: { lat: Number, lng: Number },
    price_level: { type: Number, required: true, min: 0, max: 5 },
    rating: { type: Number, required: true, min: 0, max: 5 },
    user_ratings_total: { type: Number, required: true, min: 0 }
});
restaurantSchema.set("toJSON", {
    transform: (document: Document, returnedObject: Document) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Restaurant = mongoose.model<IRestaurant & Document>("Restaurant", restaurantSchema);

export { restaurantSchema };
export default Restaurant;