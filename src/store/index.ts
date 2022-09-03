import thunk, {ThunkDispatch} from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { Store, AnyAction } from "redux";
import { userReducer } from "./reducers/login"
import { TypedUseSelectorHook, useDispatch as reduxUseDispatch, useSelector as reduxUseSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer,persistStore } from "redux-persist";
import { combineReducers } from "redux";

export type TypedDispatch = ThunkDispatch<GlobalState, any, GenericAction>;

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

const store: StoreType= createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
export const persistor = persistStore(store)
export const useDispatch = () => reduxUseDispatch<TypedDispatch>();
export const useSelector: TypedUseSelectorHook<GlobalState> = reduxUseSelector;

export default store;

