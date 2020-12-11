"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Business = exports.Menu = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const menuItemSchema = new mongoose_1.default.Schema({
    name: String,
    description: String,
    price: Number
});
const menuSchema = new mongoose_1.default.Schema({
    name: String,
    items: [menuItemSchema]
});
exports.Menu = mongoose_1.default.model("menu", menuSchema);
const businessSchema = new mongoose_1.default.Schema({
    name: String,
    address: String,
    location: { lat: Number, lng: Number },
    opening_time: [String],
    keywords: [String],
    dine_in: Boolean,
    takeaway: Boolean,
    delivery: Boolean,
    price_level: Number,
    rating: Number,
    user_ratings_total: Number,
    parking: [String],
    payment: [String],
    menus: [menuSchema]
});
exports.Business = mongoose_1.default.model("business", businessSchema);
//# sourceMappingURL=models.js.map