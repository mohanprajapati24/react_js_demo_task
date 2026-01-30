import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slice/CounerSlice"

const store = configureStore({
  reducer: {
    counter: counterReducer
  },
});

export default store;
