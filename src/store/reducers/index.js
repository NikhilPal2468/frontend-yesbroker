import { combineReducers } from "redux";
import userReducer from "./userReducer.js";
// Import other reducers if needed

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
