export const existingCartItem = ({
    prevCartItems,
    nextCartItem,
    
}) => {
    return prevCartItems.find(
        cartItem => ((cartItem.productName) === (nextCartItem.productName))
    )
};

export const handleAddOneToCart = ({
    prevCartItems,
    nextCartItem
}) => {
    const increment = 1;
    const cartItemExists = existingCartItem({ prevCartItems, nextCartItem })
    if (cartItemExists) {
        
        return prevCartItems.map(cartItem =>
            
                ((cartItem.documentID) === (nextCartItem.documentID)) 
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity + increment
                } : cartItem
        )
    }

    return [
        ...prevCartItems,
        {
            ...nextCartItem,
            quantity: increment
        }
    ]
}

export const handleAddToCart = ({
    prevCartItems,
    nextCartItem
}) => {
    
    const quantityIncrement = nextCartItem.productQuantity;
    const cartItemExists = existingCartItem({ prevCartItems, nextCartItem })
    
    if (cartItemExists) {
        
        return prevCartItems.map(cartItem =>
            
                ((cartItem.productName) === (nextCartItem.productName))
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity + quantityIncrement
                } : cartItem
        )
    }

    return [
        ...prevCartItems,
        {
            ...nextCartItem,
            quantity: quantityIncrement
        }
    ]
    
};

export const handleRemoveCartItem = ({
    prevCartItems,
    cartItemToRemove
}) => {
    const existingCartItems = prevCartItems.find(cartItem => 
        ((cartItem.productName) === (cartItemToRemove.productName)));
        //console.log(existingCartItems)
        return prevCartItems.filter(item => (item.productName) !== (existingCartItems.productName));
    
};

export const handleReduceCartItem = ({
    prevCartItems,
    cartItemToReduce
}) => {
    const existingCartItem = prevCartItems.find(cartItem => 
        ((cartItem.productName) === (cartItemToReduce.productName)));
        //console.log(existingCartItem)
        if (existingCartItem.quantity === 1) {
            
            return prevCartItems.filter(
                cartItem => (cartItem.productName) !== (existingCartItem.productName)
            );
        }
        
        return prevCartItems.map(cartItem => 
            
            (cartItem.productName) === (existingCartItem.productName) ?
            {
                ...cartItem,
                quantity: cartItem.quantity - 1
            } : cartItem)
};
