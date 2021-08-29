import React from "react";
import { useHistory } from "react-router-dom";
const CheckLoginStatus = () => {
    const history = useHistory();
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    if(!userToken?.isLoggedIn){
        history.push({
			pathname: "/login",
		});
    }
    return null;
}
 
export default CheckLoginStatus;