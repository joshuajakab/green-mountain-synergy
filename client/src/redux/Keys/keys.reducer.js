import keysTypes from "./keys.types";

const INITIAL_STATE = {
    idempotencyKey: null
}

const keysReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case keysTypes.CREATE_IDEMPOTENCY_KEY:
            return {
                ...state,
                idempotencyKey: action.payload
            }
        case keysTypes.DELETE_IDEMPOTENCY_KEY:
            return {
                ...state,
                ...INITIAL_STATE
            }
        default:
            return state;
    }
}

export default keysReducer;
