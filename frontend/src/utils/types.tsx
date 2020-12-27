export interface coordinatesType {
    latitude: number;
    longitude: number;
}

export interface locationType {
    coords: coordinatesType; 
}

export interface searchQueryType {
    lastQuery?: string;
    lastLocation?: string;
}

export interface mapLocationType {
    lat: number;
    lng: number;
}

export interface mapQueryType {
    keyword: string;
    location?: mapLocationType;
    address?: string;
}

export interface menuItemType {
    name: string;
    description: string;
    price: number;
}

export interface menuType {
    name: string;
    items: menuItemType[];
}

export interface orderItemType {
    name: string;
    price: number;
    quantity: number;
}

export interface restaurantType {
    name: string;
    address: string;
    location: mapLocationType;
    opening_time: string[];
    keywords:  string[];
    dine_in: boolean;
    takeaway: boolean;
    delivery: boolean;
    price_level: number;
    rating: number;
    user_ratings_total: number;
    parking: string[];
    payment: string[];
    menus: menuType[];
}