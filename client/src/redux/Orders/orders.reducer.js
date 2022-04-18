import ordersTypes from './orders.types';

const INITIAL_STATE = {
    orderHistory: [],
    orderDetails: {
        address:{
            city: "city",
            country: "",
            email: "",
            line1: "line1",
            line2: "line2",
            phone: "phone",
            state: "state",
            zip_code: "zip_code"},
        discount: "",
        documentID: "",
        firstName: "",
        lastName: "",
        orderCreatedDate: '',
        orderItems: [],
        orderTotal: "",
        orderedBy: ""},
    ordersHistory: []
}

const ordersReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case ordersTypes.SET_USER_ORDER_HISTORY:
            return {
                ...state,
                orderHistory: action.payload
            };
        case ordersTypes.SET_ORDER_HISTORY:
            return {
                ...state,
                ordersHistory: action.payload
            }
        case ordersTypes.SET_ORDER_DETAILS:
            return {
                ...state,
                orderDetails: action.payload
            };
        default:
            return state
    }
};

export default ordersReducer;
