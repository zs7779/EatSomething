import mongoose from "mongoose";
import { menuSchema } from "./menu";


const businessSchema = new mongoose.Schema({
    name: String,
    address: String,
    location: { lat: Number, lng: Number },
    opening_time: [String],
    keywords: [String],
    dine_in: Boolean,
    takeaway: Boolean,
    delivery: Boolean,
    price_level: Number,
    rating:  Number,
    user_ratings_total:  Number,
    parking: [String],
    payment: [String],
    menus: [menuSchema]
});

const Business = mongoose.model("business", businessSchema);

export {businessSchema};
export default Business;