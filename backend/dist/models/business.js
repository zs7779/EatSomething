"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const menu_1 = require("./menu");
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
    menus: [menu_1.menuSchema]
});
exports.businessSchema = businessSchema;
const Business = mongoose_1.default.model("business", businessSchema);
exports.default = Business;
//# sourceMappingURL=business.js.map