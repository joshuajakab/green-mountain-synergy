import ordersTypes from './orders.types';

const INITIAL_STATE = {
    orderHistory: [],
    orderDetails: {
        address: {
            line1: 'line 1',
            line2: 'line 2',
            city: 'city',
            state: 'state',
            zip_code: 'zip code',
            country: 'country',
            phone: 'phone',
            email: 'email'
        },
        discount: "",
        documentID: "",
        firstName: "",
        lastName: "",
        orderCreatedDate: '',
        orderItems: [],
        orderTotal: "",
        orderedBy: ""
    },
    ordersHistory: []
}

const ordersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
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
