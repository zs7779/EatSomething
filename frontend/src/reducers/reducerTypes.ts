import { menuItemType, orderItemType, loginType } from '../utils/types';

export interface modalActionType {
    type: string;
    data: menuItemType|null;
}

export interface orderActionType {
    type: string;
    data: orderItemType;
}

export interface loginActionType {
    type: string;
    data: loginType;
}