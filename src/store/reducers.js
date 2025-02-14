import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "@/modules/login/slice/loginSlice";
import profileReducer from "@/modules/profile/slice/ProfileSlice";
const reducer = combineReducers({
  login: loginReducer,
  profile: profileReducer,
});
export default reducer;
