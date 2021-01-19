import { loginActionType } from './reducerTypes';
import { loginType } from '../utils/types';


const loginReducer = (state: loginType|null=null, action: loginActionType) => {
    switch(action.type) {
        case "LOGIN":
            return {
                username: action.data?.username,
                token: action.data?.token,
            } as loginType;
        case "LOGOUT":
            return null;
        default:
            return state;
    }
};

export const login = (user: loginType) => {
    return {
        type: "LOGIN",
        data: user,
    }
}

export const logout = () => {
    return {
        type: "LOGOUT",
        data: null,
    }
}

export default loginReducer;