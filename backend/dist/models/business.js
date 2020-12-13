"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
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
    menus: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Menu"
        }]
});
exports.businessSchema = businessSchema;
businessSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Business = mongoose_1.default.model("Business", businessSchema);
exports.default = Business;
//# sourceMappingURL=business.js.map