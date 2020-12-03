import { combineReducers } from "redux";
import auth from "./authReducer";
import restaurants from "./restaurantReducer";
import likedJobs from "./likeJobsReducer";

export default combineReducers({
  auth,
  restaurants,
  likedJobs,
});
