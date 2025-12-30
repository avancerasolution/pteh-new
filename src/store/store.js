import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./slices/loaderSlice";
import steeringReducer from "./slices/SteeringSlice";

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    steering: steeringReducer
  }
});
