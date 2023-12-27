
import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';

import userReducer from "../Reducers/userReducer";
import productReducer from "../Reducers/productReducer";

const configureStore = ()=>
{
    const store = createStore(combineReducers({
        user: userReducer, 
    }), applyMiddleware(thunk))

    return store;
};

export default configureStore; 
