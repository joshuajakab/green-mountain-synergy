import { createSelector } from 'reselect';

export const selectCartData = state => state.cartData;


export const selectCartItems = createSelector(
    [selectCartData],
    cartData => cartData.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (quantity, cartItem) =>
                quantity + cartItem.quantity
            , 0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    
    cartItems => 
    
    cartItems.reduce(
        
        (quantity, cartItem) => 
        
        ((quantity + cartItem.quantity * cartItem.fiveHundredPrice) || (quantity + cartItem.quantity * cartItem.oneThousandPrice) || (quantity + cartItem.quantity * cartItem.twoTHousandPrice)) ,
        0
        
        
    )
);

export const selectOtherCartTotal = createSelector(
    [selectCartItems],
    otherCartItems => 
    otherCartItems.reduce(
        (quantity, otherCartItem) => 
        
        (quantity + otherCartItem.quantity) * (otherCartItem.secondProductPrice),
        0
        
        
    )
);
