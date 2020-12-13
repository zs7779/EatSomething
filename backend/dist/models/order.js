"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    items: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "OrderItem"
        }],
});
exports.orderSchema = orderSchema;
orderSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
//# sourceMappingURL=order.js.map