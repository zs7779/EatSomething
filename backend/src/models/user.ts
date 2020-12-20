import mongoose, { Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";


interface UserDocument extends Document {
    username: String,
    name: String,
    passwordHash: String;
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
    business: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business"
    }]
});
userSchema.plugin(uniqueValidator);
userSchema.set("toJSON", {
    transform: (document: Document, returnedObject: Document) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        // delete returnedObject.passwordHash;
    }
});
const User = mongoose.model<UserDocument>("User", userSchema);

export {userSchema, UserDocument};
export default User;