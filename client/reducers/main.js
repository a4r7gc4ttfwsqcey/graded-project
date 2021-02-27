import { createStore, combineReducers } from "redux";
import auth from "./jwt_auth";
const reducer = combineReducers({
  auth: auth,
});
const store = createStore(reducer);
export default store;
