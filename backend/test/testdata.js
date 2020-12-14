var fs = require('fs');

// const obj = {
//     name: "Pizza Pizza",
//     address: "8601 Warden Ave Unit #1B, Unionville",
//     location: {lat: 43.8579871, lng: -79.3319334},
//     opening_time: ["09:00-21:30",
//                    "09:00-21:30",
//                    "09:00-21:30",
//                    "09:00-21:30",
//                    "09:00-21:30",
//                    "09:00-22:00",
//                    "09:00-22:00"],
//     keywords: ["Pizza", "Italian", "Fast food"],
//     dine_in: true,
//     takeaway: true,
//     delivery: true,
//     price_level: 2,
//     rating: 3.6,
//     user_ratings_total: 296,
//     parking: ["Public Lot"],
//     payment: ["Visa", "MasterCard"],
//     menus: [
//         {
//             name: "18\" Family Mammas Specialty Pizza",
//             items: [
//                 {
//                     name: "18\" Mammas Meatball Pizza 1",
//                     description: "Fourteen slices.  cheese, green and black olives, sundried tomatoes, and feta cheese.",
//                     price: 21.99,
//                 },
//                 {
//                     name: "18\" Mammas Meatball Pizza 2",
//                     description: "Fourteen slices. Tomato sauce,  green and black olives, sundried tomatoes, and feta cheese.",
//                     price: 22.99,
//                 },
//                 {
//                     name: "18\" Mammas Meatball Pizza 3",
//                     description: "Fourteen slices. Tomato sauce, cheese, sundried tomatoes, and feta cheese.",
//                     price: 23.99,
//                 },
//                 {
//                     name: "18\" Mammas Meatball Pizza 4",
//                     description: "Fourteen slices. Tomato sauce, cheese, green and black olives, ",
//                     price: 24.99,
//                 },
//             ],
//         },
//         {
//             name: "18\" Family Gourmet Vegan Pizzas",
//             items: [
//                 {
//                     name: "18\" Family Gourmet Vegan Pizzas 1",
//                     description: " Olive oil, roasted potatoes, roasted red peppers, eggplant, broccoli, garlic, and oregano.",
//                     price: 25.99,
//                 },
//                 {
//                     name: "18\" Family Gourmet Vegan Pizzas 2",
//                     description: "Fourteen oil, roasted potatoes, roasted red peppers, eggplant",
//                     price: 26.99,
//                 },
//                 {
//                     name: "18\" Family Gourmet Vegan Pizzas 3",
//                     description: "Fourteen slices. Olive oil, roasted potatoes, roasted red peppers, garlic, and oregano.",
//                     price: 27.99,
//                 },
//             ],
//         },
//     ],
// };

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

const data = fs.readFileSync(inputFile, 'utf8');
const lines = data.split("\n");
console.log("Data size", lines.length);

const sampleSize = 5;
const shuffled = lines.sort(() => 0.5 - Math.random());
const selected = shuffled.slice(0, sampleSize);
for (let l of selected) {
    const obj = JSON.parse(l);
    console.log(`${obj.properties.number} ${obj.properties.street}, ${obj.properties.city}: ${obj.geometry.coordinates[0]}, ${obj.geometry.coordinates[1]}`);
}