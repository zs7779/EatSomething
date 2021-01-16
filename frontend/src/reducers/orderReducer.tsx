import { orderActionType } from './reducerTypes';
import { orderItemType } from '../utils/types';


const orderReducer = (state:orderItemType[]=[], action: orderActionType) => {
    switch(action.type) {
        case "ORDER_FOOD":
            // Pile everything up in one action?
            if (state.filter(item => item.name === action.data?.name).length === 0) {
                return state.concat(action.data as orderItemType);
            } else {
                if (action.data?.quantity === 0) {
                    return state.filter(item => item.name !== action.data?.name);
                } else {
                    return state.map(item => item.name === action.data?.name ? action.data : item);
                }
            }
        case "ORDER_CLEAR":
            return [];
        default:
            return state;
    }
};

export const orderChange = (item:orderItemType) => {
    return {
        type: "ORDER_FOOD",
        data: item,
    };
}

export const orderClear = () => {
    return {
        type: "ORDER_CLEAR",
    };
}

export default orderReducer;