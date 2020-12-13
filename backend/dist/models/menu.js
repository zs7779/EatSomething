"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const menuSchema = new mongoose_1.default.Schema({
    name: String,
    items: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "MenuItem"
        }]
});
exports.menuSchema = menuSchema;
menuSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Menu = mongoose_1.default.model("Menu", menuSchema);
exports.default = Menu;
//# sourceMappingURL=menu.js.map