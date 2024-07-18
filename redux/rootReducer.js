import { combineReducers } from "redux";

import authReducer from "./reducer";
import RegisterReducer from "./registerReducer";

const rootReducer = combineReducers({
    auth : authReducer,
    register : RegisterReducer
})

export default rootReducer