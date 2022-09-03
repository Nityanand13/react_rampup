import thunk, {ThunkDispatch} from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { Store, AnyAction } from "redux";
import { userReducer } from "./reducers/login"
import { TypedUseSelectorHook, useDispatch as reduxUseDispatch, useSelector as reduxUseSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer,persistStore } from "redux-persist";
// multiple reducer to store ke liye redux as reducer is object
import { combineReducers } from "redux";

export type TypedDispatch = ThunkDispatch<GlobalState, any, GenericAction>;

// GlobalState ya undefined bhi ho skta h joki state ka type h, AnyAction hai vo action ka type h aur dispatch  ka type DispatchType hai 
type StoreType = Store<GlobalState | undefined, AnyAction> & {
    dispatch: TypedDispatch;
};

export const rootReducer = combineReducers({
    user:userReducer
});


const persistConfig={
    key: 'presist-store',
    storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

// thunk se hm ek saath kayi saare ek series me action dispatch kr skte h
const store: StoreType= createStore(
    persistedReducer,
    // rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
export const persistor = persistStore(store)
export const useDispatch = () => reduxUseDispatch<TypedDispatch>();
export const useSelector: TypedUseSelectorHook<GlobalState> = reduxUseSelector;

export default store;

// 1. red color
// 2. error ok left allign
// 3. card ko bada kro overall login button ander ana chahiye
// 4. Code refracting means code sunder bnana h
// 5. loading indicator and disable button while loading
// 6. Public private 
// 7. DEM follow krna h aur scss me likhna h
// component me jo reusable content hota h
// container me hm jo use krte h vo component ka hota h
// 8. Navbar component create krna hai
// Navbar me left to right 1. github icon 2.search feild  search feild left me
// react bootstrap popover
