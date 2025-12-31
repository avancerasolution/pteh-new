import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./slices/loaderSlice";
import steeringReducer from "./slices/SteeringSlice";
import BackgroundReducer from "./slices/BackgroundSlice";
import VideoReducer from "./slices/VideoSlice";
import CommunityReducer from "./slices/CommunitySlice";

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    steering: steeringReducer,
    Background: BackgroundReducer,
    Video: VideoReducer,
    Community: CommunityReducer,
  },
});
