import { useState } from "react";
import Cookies from "js-cookie";

export default function useToken() {
	const getToken = () => {
		const tokenString = Cookies.get("token") ? Cookies.get("token") : '{ }';
		const userToken = JSON.parse(tokenString);
		return userToken?.isLoggedIn;
	};

	const [token, setToken] = useState(getToken());
	const saveToken = (userToken) => {
		Cookies.set("token", JSON.stringify(userToken));
		setToken(userToken.token);
	};

	return {
		setToken: saveToken,
		token,
	};
}
