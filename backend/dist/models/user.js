"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: String,
    name: String,
    passwordHash: String,
    business: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Business"
        }]
});
exports.userSchema = userSchema;
userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map