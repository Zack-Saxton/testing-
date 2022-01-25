import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import APICall from "../../../App/APIcall";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

//To validate the token comming in the verify email
const ValidateToken = () => {
	const useQuery = () => new URLSearchParams(useLocation().search);
	const query = useQuery();
	const getResponse = async (data) => {
		let res = await APICall(
			"/verification/verify_user_email_cac",
			data,
			"POST",
			true
		);
		return res;
	};

	//get the token values from link
	const required = query.get("required");
	const activationToken = query.get("activation_token");
	const history = useHistory();

	//Function to check and validate the teken and redirect depends on the api respose
	const redirect = () => {
		const tokenString = Cookies.get("token") ? Cookies.get("token") : "{ }";
		const userToken = JSON.parse(tokenString);
		const userEmail = Cookies.get("email");
		const expiryMinute = process.env.REACT_APP_SESSION_EXPIRY_MINUTES;
		var min = expiryMinute; // Reset when storage is more than given time
		var now = new Date().getTime();
		var actualSetupTime = userToken?.setupTime ?? "";
		const returnURL = window.location.pathname + window.location.search;
		if (!userToken?.isLoggedIn) {
			history.push({
				pathname: "/login",
				state: {
					redirect: returnURL,
					required: required,
					activationToken: activationToken,
				},
			});
		} else if (now - actualSetupTime > min * 60 * 1000) {
			alert("Your session has been ended, Please login again to continue");
			history.push({
				pathname: "/login",
				state: { redirect: returnURL },
			});
		} else {
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
				} else if (
					res?.data?.result === "error" &&
					res?.data?.statusText === "Token not valid"
				) {
					toast.error(`Your token is Expired, please try again.`);
					history.push({
						pathname: "/customers/accountOverview",
					});
				} else if (res?.data?.result === "error") {
					toast.error(res?.data?.statusText? res?.data?.statusText: "Your Email verification is failed, Please try again");
					history.push({
						pathname: "/customers/accountOverview",
					});
				} else {
					toast.error("Your Email verification is failed, Please try again");
					history.push({
						pathname: "/customers/accountOverview",
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
