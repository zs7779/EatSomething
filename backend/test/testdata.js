var fs = require('fs');

// const json = JSON.stringify(obj);

// fs.writeFile('testdata.json', json, 'utf8', (err) => {
//     if (err) console.log(err);
//     else console.log('The file has been saved!');
// });

// fs.readFile('testdata.json', 'utf8', function readFileCallback(err, data){
//     if (err){
//         console.log(err);
//     } else {
//         console.log(JSON.parse(data));
//     }
// });


const inputFile = 'ca_on_city_of_markham-addresses-city.geojson';
const addrData = fs.readFileSync(inputFile, 'utf8');
const addrLines = addrData.split("\n");
console.log("Data size", addrLines.length);

// const sampleSize = 5;
// const shuffled = lines.sort(() => 0.5 - Math.random());
// const selected = shuffled.slice(0, sampleSize);
// for (let l of selected) {
//     const obj = JSON.parse(l);
//     console.log(`${obj.properties.number} ${obj.properties.street}, ${obj.properties.city}: ${obj.geometry.coordinates[0]}, ${obj.geometry.coordinates[1]}`);
// }


function name() {
    const firstNames = ["", "", "", "", "", "The", "The", "The", "The", "The", "Mama\'s", "Mamma\'s", "Daisy\'s", "Joe\'s", "James\'", "Nikki\'s", "Elephant", "Fox", "Maple",
    "Seo-Jun", "Le Goût de", "La Perle de", "Yuma\'s", "Kaito\'s", "Sakura", "The Taste of", "Olivia\'s", "Little", "La Nuit", "Le Saphir", "L\'Ultima", "Il Capitano"];
    const middleNames = ["", "", "", "", "", "Pizza", "Spicy", "Favourite", "Lemon", "Magical", "Homemade", "Teppanyaki", "Bento", "Sweet", "Tulip", "Olive", "Seafood",
    "Korean", "Szechuan", "Texas", "Japanese", "Mediterranean", "Mexican", "Thai", "Chinese", "Indian", "Mongolian"];
    const lastNames = ["Pizza", "Noddle", "Dumpling", "Pho", "BBQ", "Wings", "Pasta", "Pastascuiutta", "Don", "Sushi",
    "Gem", "Factory", "Steakhouse", "Garden", "Cena", "Kitchen and Bar", "Kitchen", "Mirage", "Sunset", "Breakfast", "Corner", "Avenue", "Bistro", "Banquet", "Ristorante"];
    let randomName = [];
    randomName.push(firstNames[Math.floor(Math.random() * firstNames.length)]);
    randomName.push(middleNames[Math.floor(Math.random() * middleNames.length)]);
    randomName.push(lastNames[Math.floor(Math.random() * lastNames.length)]);
    return randomName.join(" ").replace(/\s\s+/g, ' ').trim();
}
function address() {
    const addrObj = JSON.parse(addrLines[Math.floor(Math.random() * addrLines.length)]);
    return `${addrObj.properties.number} ${addrObj.properties.street}, ${addrObj.properties.city}`;
}
function location() {
    const addrObj = JSON.parse(addrLines[Math.floor(Math.random() * addrLines.length)]);
    return {lat: addrObj.geometry.coordinates[0], lng: addrObj.geometry.coordinates[1]};
}
function opening_time() {
    if (Math.random() < 0.1) {
        return Array(7).fill("Open 24 hours");
    } else {
        const openH = [7, 9, 10, 12, 16, 17][Math.floor(Math.random() * 6)];
        const closeH = [21, 22, 23, 0, 1, 2][Math.floor(Math.random() * 6)];
        const M = [0, 30][Math.floor(Math.random() * 2)];
        return Array(7).fill(`${("0"+openH).slice(-2)}:${("0"+M).slice(-2)}-${("0"+closeH).slice(-2)}:${("0"+M).slice(-2)}`);
    }
}
function keywords() {
    const locationKey = ["Canadian", "Korean", "Chinese", "Indian", "Italian", "French", "Turkish", "American", "Mexican", "Japanese", "Thai",
    "Vietnam", "Mongolian", "Spanish",
    "European", "Asian", "Mediterranean", "African", "Fusion", "Continental"];
    const otherKey = ["Breakfast", "Lunch", "Brunch", "Fast food", "Fine dining", "Farm-to-table", "Comfort food", "Pub", "Bar", "Wine tasting",
    "Noddle", "Dumpling", "Pizza", "Pho", "BBQ", "Wings", "Steakhouse", "Pasta", "Sushi", "Teppanyaki", "Seafood", "Burger",
    "Cocktail", "Wine", "Beer"];
    let pickKey = [locationKey[Math.floor(Math.random() * locationKey.length)]];
    const shuffled = otherKey.sort(() => 0.5 - Math.random());
    pickKey.push(...shuffled.slice(0, Math.floor(Math.random() * 4)))
    return pickKey;
}
function parking() {
    const allParking = ["Complimentary parking", "Public parking", "Street parking", "Underground parking", "Valet parking"];
    return allParking.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);
}
function payment() {
    const allPayment = ["Visa", "MasterCard", "AMEX", "Discover"];
    return allPayment.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 1);
}
function menu(mainKey="") {
    const menuKey = ["Appetizers", "Mains", "Sides", "Dessert",
    "Salad", "Pizza", "Sandwich", "Burger", "Pasta", "Noodle", "Soup",
    "Drinks", "Wine", "Beer", "Cocktail"];
    const adjective = {
        Appetizers:["Spicy", "Sweet", "Marinated", "Fresh", "House", "Daily", "Baked", "Grilled", "Green",
            "Miso", "Avocado", "Salmon", "Egg", "Seaweed", "Tuna", "Crispy", "Kimchi", "Mango", "Lemon"],
        Mains:["Spicy", "Sweet", "Marinated", "Fresh", "House", "Daily", "Baked", "Grilled", "Signiture",
            "Beef", "Pao", "Butter", "Garlic", "BBQ", "Cajun", "Braised", "Roasted", "Smoked", "Sautéed"],
        Sides:["Spicy", "Sweet", "Marinated", "Fresh", "House", "Daily", "Baked", "Grilled", "Green",
            "Miso", "Avocado", "Salmon", "Egg", "Seaweed", "Tuna", "Crispy", "Kimchi", "Mango", "Lemon"],
        Dessert:["Chocolate", "Apple", "Cranberry", "Vanilla", "Molten", "Carrot", "Mini", "Caramel", "Banana", "Rainbow", "Fruit", "Mango", "Masala", "Cinnamon"],
        Salad:["Miso", "Avocado", "Salmon", "Egg", "Seaweed", "Tuna", "Crispy", "Kimchi", "Mango", "Lemon", "Greek", "Caesar"],
        Pizza:["12\"", "Funghi", "Pesto", "Venezia", "Mediterranean", "Anchovy", "Pepperoni", "Artichoke", "Bolognese", "Tropical", "Hawaiian", "Canadian", "Chili"],
        Sandwich:["Jerk", "Beef", "Cheese", "Fish", "Chicken", "Lamb", "Pork", "Shrimp"],
        Burger:["Jerk", "Beef", "Cheese", "Fish", "Chicken", "Lamb", "Pork", "Shrimp"],
        Pasta:["Polpette", "Meat Ball", "Bolognese", "Meat Sauce", "Funghi", "Pesto", "Venezia", "Calabrese", "Gamberi", "Zucca", "Melanzane"],
        Noodle:["Beef", "Fish", "Chicken", "Lamb", "Pork", "Shrimp", "Stir Fried"],
        Soup:["Miso", "Daily", "Tomato"],
        Drinks: ["Coffee", "Tea", "Espresso", "Cappuccino", "Latte", "Mocha", "Americano", "Hot Chocolate", "Bourbon", "Rye", "Scotch"],
        Wine: ["Malbec", "Cabernet Sauvignon", "Sauvignon Blanc", "Chardonnay", "Nigori", "Sake", "Pinot Grigio", "Sancerre", "Merlot", "Ice Wine", "Baco Noir",
            "Pinot Gris", "Pinot Noir"],
        Beer:["Sapporo", "Asahi", "Lager", "Pale Ale", "Cider", "Brown Ale"],
        Cocktail:["Lychee", "Sakura", "Plum", "Jeju", "Ginger", "Citrus", "Twisted", "Blueberry", "Cranberry", "Espresso", "Osaka", "Melon", "Long Island",
            "Vodka", "Gin", "Rum", "Coke", "Whiskey", "Scotch", "Soda", "Toronto", "Astro", "Red", "White", "Black", "Pink", "Lemon", "Salty", "Bloody", "Cuban"]
    };
    const substantive = {
        Appetizers:["Salad", "Soup", "Tofu", "Pancake", "Appetizer", "Salami", "Cheese", "Fries", "Plate", "Roll", "Tataki", "Sashimi", "Gyoza", "Tacos", "Teriyaki"],
        Mains:["Fillet", "Ribs", "Cod", "Noodle", "Lasagna", "Ravioli", "Risotto", "Spaghetti", "Lamb", "Tuna", "Steak", "Sausage", "Ribeye", "Tacos", "Chicken", "Fajitas",
            "Bibimbap", "Bowl", "Salmon", "Bento Box", "Roll", "Noodle", "Rice", "Udon", "Sirloin", "Lobster", "Sushi"],
        Sides:["Salad", "Soup", "Tofu", "Pancake", "Appetizer", "Salami", "Cheese", "Fries", "Plate", "Roll", "Tataki", "Sashimi", "Gyoza", "Tacos"],
        Dessert:["Cake", "Brownie", "Crisp", "Pie", "Pudding", "Sundae", "Cream", "Cheesecake"],
        Salad:["Salad"],
        Pizza:["Pizza"],
        Sandwich:["Sandwich"],
        Burger:["Burger", "Mini Burger"],
        Pasta:["Lasagna", "Pasta", "Spaghetti", "Ravioli", "Tagliatelle", "Fettuccine", "Linguini", "Penne"],
        Noodle:["Noodle", "Udon", "Pasta", "Pho", "Pad Thai"],
        Soup:["Soup"],
        Drinks: [],
        Wine: [],
        Beer:[],
        Cocktail:["Caesar", "Saketini", "Martini", "Ice Tea", "Sunset", "Colada", "Breeze", "Old Fashined", "Mai Tai", "Mary", "Margarita", "Spiritz", "Mojito",
            "Manhattan", "Sour", "Volcano", "Punch", "Cocktail", "Sunrise", "Blanco", "Russian", "Lemonade"]
    };
    const ingredients = ["sprouts", "tofu", "mushroom", "egg", "onion", "sesame", "tomato", "grapefruit", "ponzu", "lettuce", "soy beans", "cucumber", "radish",
        "cabbage", "wasabi", "mayo", "avocado", "chili sauce", "sweet chili", "butter", "garlic", "leeks", "tuna", "shrimp", "salmon", "crab", "cream", "cheese",
        "eel", "seasonal vegetable", "kimchi", "maple syrup", "jalapeno", "honey", "pickle", "olive oil", "garlic", "peppers", "roasted nuts", "kale", "chicken",
        "mozzarella", "basil", "spinach", "oilves", "red onions", "goat cheese", "penna sauce", "dried fruits", "kiwi", "curry", "mixed herbs", "coconut shavings",
        "chocolate", "coleslaw", "French Fries", "Chef's signiture dressing", "cajun mayo", "sesame oil"];
    
    const randomMenus = [];
    const randomMenuInt = Math.floor(Math.random() * 4) + 1; // 1 to 4 menus
    const randomMenuKey = menuKey.sort(() => 0.5 - Math.random());
    for ( let m = 0; m < randomMenuInt; m++ ) {
        const randomMenu = {
            name: randomMenuKey.pop(),
            items: []
        };
        const randomItemInt = Math.floor(Math.random() * 5) + 4; // number of items on a menu range between 4 to 8
        const randomBasePrice = Math.floor(Math.random() * 27) + 3 + (Math.random() > 0.5 ? 0.5 : 0) + (Math.random() > 0.5 ? 0.99 : 0); // random + $0.99
        for ( let i = 0; i < randomItemInt ; i++ ) {
            if (["Drinks", "Wine", "Beer"].includes(randomMenu.name)) {
                const randomAdjs = adjective[randomMenu.name].sort(() => 0.5 - Math.random()).slice(0, 1); // 1 to 4 adjectives
                randomMenu.items.push({
                    name: [...randomAdjs].join(" "),
                    description: "",
                    price: `$${(randomBasePrice + Math.floor(Math.random() * 16)).toFixed(2)}` // add $0 to $15 to base price
                });
            } else {
                const randomAdjs = adjective[randomMenu.name].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1); // 1 to 3 adjectives
                const randomSubj = substantive[randomMenu.name].sort(() => 0.5 - Math.random()).slice(0, 1); // at most 1 substantive
                const randomIngredients = ingredients.sort(() => 0.5 - Math.random()); // 2 to 9 random ingredients
                randomMenu.items.push({
                    name: [...randomAdjs, ...randomSubj].join(" "),
                    description: randomIngredients.slice(0, Math.floor(Math.random() * 6) + 2).join(", ").concat(`, and ${randomIngredients[randomIngredients.length-1]}`),
                    price: `$${(randomBasePrice + Math.floor(Math.random() * 16)).toFixed(2)}` // add $0 to $15 to base price
                });
            }
        }
        randomMenus.push(randomMenu);
    }
    
    return randomMenus;
}

function makeNewBusiness() {
    const business = {
        name: name(),
        address: address(),
        location: location(),
        opening_time: opening_time(),
        keywords: keywords(),
        dine_in: Math.random() < 0.5 ? true : false,
        takeaway: Math.random() < 0.9 ? true : false,
        delivery: Math.random() < 0.5 ? true : false,
        price_level: Math.floor(Math.random() * 5) + 1, // range between 1 to 5
        rating: (Math.floor(Math.random() * 30) + 20) / 10, // range between 2.0 to 4.9
        user_ratings_total: Math.floor(Math.random() * 2000), // range between 0 to 1999
        parking: parking(),
        payment: payment(),
        menus: menu()
    };
    console.log(business);
}
makeNewBusiness();