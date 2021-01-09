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

export interface restaurantType {
    id: String;
    name: String;
    address: String;
    location: {
        lat:number;
        lng:number;
    };
    // dine_in: Boolean;
    takeaway: Boolean;
    delivery: Boolean;
    price_level: number;
    rating: number;
    user_ratings_total: number;
    opening_time: String[];
    keywords: String[];
    // parking: String[];
    payment: String[];
    menus: menuSectionType[];    
}

export interface jwtType {
    id: string;
}