import { modalActionType } from './reducerTypes';
import { menuItemType } from '../utils/types';


const modalReducer = (state:menuItemType|null=null, action: modalActionType) => {
    switch(action.type) {
        case "MODAL_SHOW":
            console.log("MODAL_SHOW");
            return {
                name: action.data?.name,
                description: action.data?.description,
                price: action.data?.price,
            } as menuItemType;
        case "MODAL_HIDE":
            console.log("MODAL_HIDE");
            return null;
        default:
            return state;
    }
};

export const modalShow = (item:menuItemType) => {
    return {
        type: "MODAL_SHOW",
        data: item,
    }
}

export const modalHide = () => {
    return {
        type: "MODAL_HIDE",
        data: null,
    }
}

export default modalReducer;