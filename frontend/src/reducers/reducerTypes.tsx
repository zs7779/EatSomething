import { menuItemType } from '../utils/types';

export interface actionType {
    type: string;
}

export interface modalActionType extends actionType {
    data: menuItemType|null;
}