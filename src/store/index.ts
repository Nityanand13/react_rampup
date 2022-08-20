import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore,applyMiddleware } from "redux";
import { Store,AnyAction } from "redux";
import { userReducer } from "./reducers/login"
// multiple reducer to store ke liye redux as reducer is object

import { combineReducers } from "redux";

console.log("55555555555555555555");

// GlobalState ya undefined bhi ho skta h joki state ka type h, AnyAction hai vo action ka type h aur dispatch  ka type DispatchType hai 
type StoreType = Store<GlobalState | undefined, AnyAction> & {
    dispatch: DispatchType;
};

const rootReducer = combineReducers({
    user:userReducer
});

// thunk se hm ek saath kayi saare ek series me action dispatch kr skte h
const store:StoreType= createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;

// thunk pdhna hai