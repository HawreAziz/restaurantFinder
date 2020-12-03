import { FB_LOGIN_SUCCESS,
         FB_LOGIN_FAILED,
         FB_LOGOUT } from './types';
import * as Facebook from 'expo-facebook';
import { AsyncStorage } from 'react-native';

export const facebookLogin = () => {
    return async dispatch => {
        const token = await AsyncStorage.getItem('fb_token');
        if(token){
            return dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
        }
        getFacebookToken(dispatch);
    }
}


const getFacebookToken = async dispatch => {
    await Facebook.initializeAsync({
        appId: "385663709276339"
    });
    const { token, type } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile']
    })

    if (type === "cancel"){
        return dispatch({ type: FB_LOGIN_FAILED })
    }
    await AsyncStorage.setItem('fb_token', token)
    dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
}


export const facebookLogout = () => {
    return async dispatch =>  {
      await AsyncStorage.removeItem('fb_token');
      dispatch({ type: FB_LOGOUT });
    }
}