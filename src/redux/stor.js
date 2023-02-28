import { createStore, combineReducers } from "redux";

import phoneReducers from "./redusers/phoneReducers";
import categoriesReducer from "./redusers/categoriesReducer";

const rootReducer = combineReducers({
    phonesState: phoneReducers,
    categoriesState: categoriesReducer
})

const store = createStore(rootReducer)

export default store