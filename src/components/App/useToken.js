import { useState } from 'react';

export default function useToken() {
   
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.isLoggedIn
  };

  console.log(getToken());
  let foo = getToken();
  const [token, setToken] = useState(foo);
  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}