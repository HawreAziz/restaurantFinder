import Yelp from "../api/YelpApi";
import { FETCH_RESTAURANTS, LIKE_JOB, CLEAR_JOBS } from "./types";

export const searchRestaurants = ({ longitude, latitude }, callback) => async (
  dispatch
) => {
  try {
    const restaurants = await Yelp.get("/search", {
      params: {
        longitude,
        latitude,
        limit: 20,
        radius: 15000,
      },
    });
    dispatch({ type: FETCH_RESTAURANTS, payload: restaurants.data.businesses });
    callback();
  } catch (error) {
    console.log(error);
  }
};

export const likeJob = (restaurant) => {
  return {
    type: LIKE_JOB,
    payload: restaurant,
  };
};

export const clearJobs = () => {
  return {
    type: CLEAR_JOBS,
  };
};
