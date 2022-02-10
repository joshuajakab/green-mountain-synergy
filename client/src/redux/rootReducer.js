import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import blogsReducer from './Blogs/blogs.reducer';
import cartReducer from './Cart/cart.reducer';
import ordersReducer from './Orders/orders.reducer';
import productsReducer from './Products/products.reducer';
import userReducer from './Users/users.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    productsData: productsReducer,
    blogsData: blogsReducer,
    cartData: cartReducer,
    orderData: ordersReducer
});

const configStorage = {
    key: 'root',
    storage,
    
}

export default persistReducer(configStorage, rootReducer);