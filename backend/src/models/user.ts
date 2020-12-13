import mongoose, { Document } from "mongoose";


interface UserDocument extends Document {
    passwordHash?: String;
}
const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    business: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business"
    }]
});
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