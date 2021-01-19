import mongoose, { Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";


interface UserDocument extends Document {
    username: String,
    name: String,
    passwordHash?: String;
    restaurants: mongoose.Schema.Types.ObjectId[];
}
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        unique: true
    },
    email: {
        type: String,
        minlength: 3,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    restaurants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    }]
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

export { userSchema, UserDocument };
export default User;