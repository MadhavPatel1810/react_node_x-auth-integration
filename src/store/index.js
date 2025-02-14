import { configureStore } from "@reduxjs/toolkit";
import reducer from "@/store/reducers";
const store = configureStore({ reducer });
export default store;
