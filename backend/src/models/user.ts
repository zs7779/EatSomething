import mongoose, { Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

import { restaurantType } from "../types";
import { restaurantObj } from "./businessObj";


interface UserDocument extends Document {
    username: String,
    name: String,
    passwordHash?: String;
    restaurants: restaurantType[];
}
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    restaurants: [restaurantObj]
});
userSchema.plugin(uniqueValidator);
userSchema.set("toJSON", {
    transform: (document: Document, returnedObject: UserDocument) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});
const User = mongoose.model<UserDocument>("User", userSchema);

export {userSchema, UserDocument};
export default User;