import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import APICall from "../../../App/APIcall";

//To validate the token comming in the verify email
const ValidateToken = () => {
	const useQuery = () => new URLSearchParams(useLocation().search);
	const query = useQuery();
	const getResponse = async (data) => {
		let res = await APICall("/verification/verify_user_email_cac", data, "POST", true);
		return res;
	};

    //get the token values from link
	const required = query.get("required");
	const activationToken = query.get("activation_token");
	const history = useHistory();

    //Function to check and validate the teken and redirect depends on the api respose
	const redirect = () => {
		const tokenString = localStorage.getItem("token");
		const userToken = JSON.parse(tokenString);
		const userEmail = localStorage.getItem("email");
		const expiryMinute = process.env.REACT_APP_SESSION_EXPIRY_MINUTES
		var min = expiryMinute; // Reset when storage is more than given time
		var now = new Date().getTime();
		var actualSetupTime = userToken?.setupTime ?? '';
 const returnURL = window.location.pathname + window.location.search;
		if (!userToken?.isLoggedIn) {
			history.push({
				pathname: "/login",
				state: { redirect: returnURL, required: required, activationToken: activationToken },
			});
		}
		else if ((now - actualSetupTime) > min * 60 * 1000) {
			alert("Your session has been ended, Please login again to continue");
			history.push({
			  pathname: "/login",
			  state: { redirect: returnURL}
			});
		  }
		else { 
			let data = {
				user_email: userEmail,
				required: required,
				activation_token: activationToken,
			};
			getResponse(data).then((res) => {
				if (res?.data?.data === true) {
					history.push({
						pathname: "/customers/finalVerification",
					});
				}
			});
		}
	};

    //Use effect to call the redirect() method on page load
	useEffect(() => {
		redirect();
	}, []);

	return null;
};

export default ValidateToken;
