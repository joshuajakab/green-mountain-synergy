import productsTypes from './products.types';

export const addProductStart = productsData => ({
    type: productsTypes.ADD_NEW_PRODUCT_START,
    payload: productsData
});

export const fetchProductsStart = (filters={}) => ({
    type: productsTypes.FETCH_PRODUCTS_START,
    payload: filters
});

export const setProducts = products => ({
    type: productsTypes.SET_PRODUCTS,
    payload: products
});

export const setProduct = product => ({
    type: productsTypes.SET_PRODUCT,
    payload: product
});

export const deleteProductStart = productID => ({
    type: productsTypes.DELETE_PRODUCT_START,
    payload: productID
});


