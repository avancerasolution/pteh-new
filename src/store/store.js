import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./slices/loaderSlice";
import steeringReducer from "./slices/SteeringSlice";
import BackgroundReducer from "./slices/BackgroundSlice";
import VideoReducer from "./slices/VideoSlice";
import CommunityReducer from "./slices/CommunitySlice";
import ExecutiveReducer from "./slices/ExecutiveSlice";
import AckReducer from "./slices/AckSlice";
import GitReducer from "./slices/GitSlice";
import gitFormReducer from "./slices/GitFormSlice";
import PrivacyReducer from "./slices/PrivacySlice";
import DataPageReducer from "./slices/DataPageSlice";
import dataReducer from "./slices/DataSlice";
import FutureReducer from "./slices/FutureSlice";
import FutureEthosReducer from "./slices/futureEthosSlice";
import PriorityPageReducer from "./slices/PriorityPageSlice";
import pillarReducer from "./slices/pillarSlice";
import DashboardPageReducer from "./slices/DashboardPageSlice";
import pillarStatsReducer from "./slices/pillarStatsSlice";

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    steering: steeringReducer,
    Background: BackgroundReducer,
    Video: VideoReducer,
    Community: CommunityReducer,
    Executive: ExecutiveReducer,
    Ack: AckReducer,
    Git: GitReducer,
    gitForm: gitFormReducer,
    Privacy: PrivacyReducer,
    DataPage: DataPageReducer,
    data: dataReducer,
    Future: FutureReducer,
    FutureEthos: FutureEthosReducer,
    PriorityPage: PriorityPageReducer,
    pillars: pillarReducer,
    DashboardPage: DashboardPageReducer,
    pillarStats: pillarStatsReducer,
  },
});
