import { combineReducers } from "redux";
import categoryReducer from "./category";
import subCategoryReducer from "./subcategory";
import itemReducer from "./item";
export default combineReducers({
    categoryReducer,
subCategoryReducer,
itemReducer
});