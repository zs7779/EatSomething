export interface loginType {
    username: string;
    token: string;
}

export interface credentialType {
    username: string;
    password: string;
}

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
    id?: string;
    name: string;
    address: string;
    opening_time: string[];
    keywords:  string[];
    // dine_in: boolean;
    takeaway: boolean;
    delivery: boolean;
    // parking: string[];
    payment: string[];
    menus: menuType[];
    location: mapLocationType;
    price_level?: number;
    rating?: number;
    user_ratings_total?: number;
}

export interface managerType {
    username: string;
    name: string;
    restaurants: restaurantType[];
}

export interface orderItemBEType {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}
export interface orderBEType {
    id: string;
    createTime: Date,
    complete: boolean,
    rated: boolean,
    restaurant: {id: string, name: string},
    items: orderItemBEType[]
}