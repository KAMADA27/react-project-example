import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true 
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnBDVb3VpsNIALUptHLg_kEt97Z72fHsM';

    if (!isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnBDVb3VpsNIALUptHLg_kEt97Z72fHsM'; 
    }

    axios.post(url, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      })
  };
};