import {
    CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST,MY_ORDER_SUCCESS,MY_ORDER_FAIL,
    CLEAR_ERRORS
} from "../constants/orderConstants"

export const orderReducer = (state={},{type,payload}) => {
    
    switch (type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order :payload
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: payload
            }
        case CLEAR_ERRORS:
            return {
                ...state, 
                error:null
            }
        default:
            return state
    }
}

export const myOrderReducer = (state={orders:[]},{type,payload}) => {
    
    switch (type) {
        case MY_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case MY_ORDER_SUCCESS:
            return {
                loading: false,
                orders :payload
            }
        case MY_ORDER_FAIL:
            return {
                loading: false,
                error: payload
            }
        case CLEAR_ERRORS:
            return {
                ...state, 
                error:null
            }
        default:
            return state
    }
}