"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderItemSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderItemSchema = new mongoose_1.default.Schema({
    item: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "MenuItem"
    },
    quantity: Number
});
exports.orderItemSchema = orderItemSchema;
orderItemSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const OrderItem = mongoose_1.default.model("OrderItem", orderItemSchema);
exports.default = OrderItem;
//# sourceMappingURL=orderItem.js.map