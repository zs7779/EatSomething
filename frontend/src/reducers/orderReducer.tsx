import { orderActionType } from './reducerTypes';
import { orderItemType } from '../utils/types';


const orderReducer = (state:orderItemType[]=[], action: orderActionType) => {
    switch(action.type) {
        case "ORDER_ADD":
            console.log("ORDER_ADD");
            return state.concat({
                name: action.data?.name,
                price: action.data?.price,
                quantity: action.data?.quantity,
            } as orderItemType);
        case "ORDER_CHANGE":
            console.log("ORDER_CHANGE");
            return [];
        case "ORDER_REMOVE":
            console.log("ORDER_REMOVE");
            return [];
        default:
            return state;
    }
};

export const orderAdd = (item:orderItemType) => {
    return {
        type: "ORDER_ADD",
        data: item,
    }
}

export default orderReducer;