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
    const firstNames = ["", "", "", "", "", "The", "The", "The", "The", "The", "Mama\'s", "Mamma\'s", "Daisy\'s", "Joe\'s", "James\'", "Nikki\'s",
    "Guud", "Le Goût de", "La Perle de", "Yuma\'s", "The Taste of", "Olivia\'s", "Little", "La Nuit", "Le Saphir", "L\'Ultima", "Il Capitano"];
    const middleNames = ["", "", "", "", "", "Pizza", "Salt", "Sugar", "Lemon", "Magical", "Korean", "Szechuan", "Texas", "Japanese", "Homemade",
    "Teppanyaki", "Chinese", "Indian", "Bento", "Sweet", "Tulip", "Olive", "Seafood", "Mediterranean", "Mexican", "Thai"];
    const lastNames = ["Elephant", "Summer", "Autumn", "Fox", "Avenue", "Maple", "Pizza", "Noddle", "Dumpling", "Sunset",
    "Mirage", "Gem", "Factory", "Kitchen", "Pho", "BBQ", "Kitchen and Bar", "Wings", "Steakhouse", "Garden", "Cena", "Pasta", "Pastascuiutta",
    "Don", "Sushi", "Bistro", "Banquet", "Ristorante", "Breakfast"];
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
    "European", "Asian", "Mediterranean", "African", "Fusion"];
    const otherKey = ["Breakfast", "Lunch", "Fast food", "Fine dining", "Farm-to-table", "Comfort food", "Pub", "Bar", "Wine tasting",
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
        price_level: Math.floor(Math.random() * 4) + 1,
        rating: (Math.floor(Math.random() * 40) + 10) / 10,
        user_ratings_total: Math.floor(Math.random() * 2000),
        parking: parking(),
        payment: payment(),
//         menus: [
//             {
//                 name: "18\" Family Mammas Specialty Pizza",
//                 items: [
//                     {
//                         name: "18\" Mammas Meatball Pizza 1",
//                         description: "Fourteen slices.  cheese, green and black olives, sundried tomatoes, and feta cheese.",
//                         price: 21.99,
//                     },
//                     {
//                         name: "18\" Mammas Meatball Pizza 2",
//                         description: "Fourteen slices. Tomato sauce,  green and black olives, sundried tomatoes, and feta cheese.",
//                         price: 22.99,
//                     },
//                     {
//                         name: "18\" Mammas Meatball Pizza 3",
//                         description: "Fourteen slices. Tomato sauce, cheese, sundried tomatoes, and feta cheese.",
//                         price: 23.99,
//                     },
//                     {
//                         name: "18\" Mammas Meatball Pizza 4",
//                         description: "Fourteen slices. Tomato sauce, cheese, green and black olives, ",
//                         price: 24.99,
//                     },
//                 ],
//             },
//             {
//                 name: "18\" Family Gourmet Vegan Pizzas",
//                 items: [
//                     {
//                         name: "18\" Family Gourmet Vegan Pizzas 1",
//                         description: " Olive oil, roasted potatoes, roasted red peppers, eggplant, broccoli, garlic, and oregano.",
//                         price: 25.99,
//                     },
//                     {
//                         name: "18\" Family Gourmet Vegan Pizzas 2",
//                         description: "Fourteen oil, roasted potatoes, roasted red peppers, eggplant",
//                         price: 26.99,
//                     },
//                     {
//                         name: "18\" Family Gourmet Vegan Pizzas 3",
//                         description: "Fourteen slices. Olive oil, roasted potatoes, roasted red peppers, garlic, and oregano.",
//                         price: 27.99,
//                     },
//                 ],
//             },
//         ],
    };
    console.log(business);
}
makeNewBusiness();