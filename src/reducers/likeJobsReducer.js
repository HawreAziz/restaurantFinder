import { LIKE_JOB, CLEAR_JOBS } from "../actions/types";
import _ from "lodash";

const INITIAL_STATE = [];
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIKE_JOB:
      return _.uniqBy([...state, action.payload], "id");
    case CLEAR_JOBS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
