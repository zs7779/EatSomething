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