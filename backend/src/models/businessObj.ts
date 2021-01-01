import mongoose, { Document } from "mongoose";
import { menuObj } from "./menuObj";


const restaurantObj = {
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
};

export { restaurantObj };
