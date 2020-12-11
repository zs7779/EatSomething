"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItemSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const menuItemSchema = new mongoose_1.default.Schema({
    name: String,
    description: String,
    price: Number
});
exports.menuItemSchema = menuItemSchema;
const MenuItem = mongoose_1.default.model("menuItem", menuItemSchema);
exports.default = MenuItem;
//# sourceMappingURL=menuItem.js.map