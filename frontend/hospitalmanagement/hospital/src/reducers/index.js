import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import patientReducer from "../reducers/patientReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
  errors: errorReducer,
  patient: patientReducer,
  security: securityReducer,
});
