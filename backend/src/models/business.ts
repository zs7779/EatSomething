import mongoose, { Document } from "mongoose";


const businessSchema = new mongoose.Schema({
    name: String,
    address: String,
    location: { lat: Number, lng: Number },
    opening_time: [String],
    keywords: [String],
    dine_in: Boolean,
    takeaway: Boolean,
    delivery: Boolean,
    price_level: Number,
    rating:  Number,
    user_ratings_total:  Number,
    parking: [String],
    payment: [String],
    menus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu"
    }]
});
businessSchema.set("toJSON", {
    transform: (document: Document, returnedObject: Document) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Business = mongoose.model("Business", businessSchema);

export {businessSchema};
export default Business;