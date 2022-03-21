import keysTypes from "./keys.types";

export const createIdempotencyKey = () => ({
    type: keysTypes.CREATE_IDEMPOTENCY_KEY
});

export const deleteIdempotencyKey = () => ({
    type: keysTypes.DELETE_IDEMPOTENCY_KEY
});
