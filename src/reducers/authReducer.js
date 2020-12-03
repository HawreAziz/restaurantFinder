import { FB_LOGIN_SUCCESS,
         FB_LOGIN_FAILED,
         FB_LOGOUT } from '../actions/types';


const INITIAL_STATE = { token: '' };

export default (state= {}, action) => {
    switch(action.type){
        case FB_LOGIN_SUCCESS:
          return { token: action.payload };
        case FB_LOGIN_FAILED:
          return { token: null };
        case FB_LOGOUT:
          return INITIAL_STATE;
        default:
          return state;
    }
}