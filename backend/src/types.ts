export interface menuItemType {
    name: String;
    description: String;
    price: number;
    image?: String;
}

export interface menuSectionType {
    name: String;
    items: menuItemType[];
}

export interface businessType {
    id: String;
    name: String;
    address: String;
    location: {
        lat:number;
        lng:number;
    };
    dine_in: Boolean;
    takeaway: Boolean;
    delivery: Boolean;
    price_level: number;
    rating: number;
    user_ratings_total: number;
    opening_time: String[];
    types: String[];
    parking: String[];
    payment: String[];
    menu: menuSectionType[];    
}