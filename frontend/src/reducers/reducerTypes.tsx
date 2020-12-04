import { menuItemType, orderItemType } from '../utils/types';

export interface modalActionType {
    type: string;
    data: menuItemType|null;
}

export interface orderActionType {
    type: string;
    data: orderItemType;
}