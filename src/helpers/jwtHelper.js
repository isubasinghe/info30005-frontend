
import jwtDecode from 'jwt-decode';

const TOKEN_KEY = 'token';


export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};


export const storeToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};


export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLoggedIn = () => {
  let token = localStorage.getItem(TOKEN_KEY);
  if(token === null) {
    return false;
  }

  let decoded = jwtDecode(token);
  // CONVERT TO SECONDS
  let currentTime = (new Date()).getTime()/1000;
  
  return currentTime < decoded.exp;

}

export const timeToLive = () => {
  let token = localStorage.getItem(TOKEN_KEY);
  if(token === null) {
    return 0;
  }

  let decoded = jwtDecode(token);
  // CONVERT TO SECONDS
  let currentTime = (new Date()).getTime()/1000;
  
  return decoded.exp - currentTime;

}

export const getLocation = () => {
  let token = localStorage.getItem(TOKEN_KEY);
  if(token === null) {
    return false;
  }

  let decoded = jwtDecode(token);

  return decoded.defaultloc;
}