"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderItem_1 = require("./orderItem");
const orderSchema = new mongoose_1.default.Schema({
    items: [orderItem_1.orderItemSchema],
});
exports.orderSchema = orderSchema;
orderSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Order = mongoose_1.default.model("order", orderSchema);
exports.default = Order;
//# sourceMappingURL=order.js.map