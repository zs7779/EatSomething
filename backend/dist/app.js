"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const business_1 = __importDefault(require("./models/business"));
dotenv_1.default.config();
const dbname = "gofood";
const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.7mie9.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose_1.default.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => { console.log('connected to MongoDB'); })
    .catch((error) => { console.log('error connecting to MongoDB:', error.message); });
const requestLogger = (request, response, next) => {
    console.log(request.method, request.path);
    next();
};
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(requestLogger);
app.post('/api/business', (request, response) => {
    const newBusiness = new business_1.default({
        name: "Pizza Pizza",
        address: "8601 Warden Ave Unit #1B, Unionville",
        location: { lat: 43.8579871, lng: -79.3319334 },
        opening_time: ["09:00-21:30",
            "09:00-21:30",
            "09:00-21:30",
            "09:00-21:30",
            "09:00-21:30",
            "09:00-22:00",
            "09:00-22:00"],
        keywords: ["Pizza", "Italian", "Fast food"],
        dine_in: true,
        takeaway: true,
        delivery: true,
        price_level: 2,
        rating: 3.6,
        user_ratings_total: 296,
        parking: ["Public Lot"],
        payment: ["Visa", "MasterCard"],
        menus: [
            {
                name: "18\" Family Mammas Specialty Pizza",
                items: [
                    {
                        name: "18\" Mammas Meatball Pizza 1",
                        description: "Fourteen slices.  cheese, green and black olives, sundried tomatoes, and feta cheese.",
                        price: 21.99,
                    },
                    {
                        name: "18\" Mammas Meatball Pizza 2",
                        description: "Fourteen slices. Tomato sauce,  green and black olives, sundried tomatoes, and feta cheese.",
                        price: 22.99,
                    },
                    {
                        name: "18\" Mammas Meatball Pizza 3",
                        description: "Fourteen slices. Tomato sauce, cheese, sundried tomatoes, and feta cheese.",
                        price: 23.99,
                    },
                    {
                        name: "18\" Mammas Meatball Pizza 4",
                        description: "Fourteen slices. Tomato sauce, cheese, green and black olives, ",
                        price: 24.99,
                    },
                ],
            },
            {
                name: "18\" Family Gourmet Vegan Pizzas",
                items: [
                    {
                        name: "18\" Family Gourmet Vegan Pizzas 1",
                        description: " Olive oil, roasted potatoes, roasted red peppers, eggplant, broccoli, garlic, and oregano.",
                        price: 25.99,
                    },
                    {
                        name: "18\" Family Gourmet Vegan Pizzas 2",
                        description: "Fourteen oil, roasted potatoes, roasted red peppers, eggplant",
                        price: 26.99,
                    },
                    {
                        name: "18\" Family Gourmet Vegan Pizzas 3",
                        description: "Fourteen slices. Olive oil, roasted potatoes, roasted red peppers, garlic, and oregano.",
                        price: 27.99,
                    },
                ],
            },
        ],
    });
    newBusiness.save().then(res => {
        // mongoose.connection.close();
        response.json(newBusiness);
    });
});
app.get('/api/business', (request, response) => {
    business_1.default.find({}).then(res => {
        response.json(res);
    });
});
app.get('/api/business/:id', (request, response) => {
    const id = request.params.id;
    business_1.default.findById("5fd2d068c244ad0ab0e4fc85").then(res => {
        response.json(res);
    }).catch(error => {
        console.log(error);
        response.status(500).end();
    });
});
app.post('/api/order', (request, response) => {
    business_1.default.find({}).then(res => {
        // mongoose.connection.close();
        response.json(res);
    });
});
app.get('/api/order', (request, response) => {
    business_1.default.find({}).then(res => {
        response.json(res);
    });
});
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map