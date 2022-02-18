import Cookies from "js-cookie";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import APICall from "../../../lib/AxiosLib";
import messages from "../../../lib/Lang/applyForLoan.json";

//To validate the token comming in the verify email
const ValidateToken = () => {
	const useQuery = () => new URLSearchParams(useLocation().search);
	const query = useQuery();
	const getResponse = (data) => {
		return APICall("verify_user_email_cac", '', data, "POST", true);
	};

	//get the token values from link
	const required = query.get("required");
	const activationToken = query.get("activation_token");
	const navigate = useNavigate();

	//Function to check and validate the teken and redirect depends on the api respose
	const redirect = () => {
		const tokenString = Cookies.get("token") ? Cookies.get("token") : "{ }";
		const userToken = JSON.parse(tokenString);
		const userEmail = Cookies.get("email");
		const min = process.env.REACT_APP_SESSION_EXPIRY_MINUTES;
		let now = new Date().getTime();
		let actualSetupTime = userToken?.setupTime ?? "";
		const returnURL = window.location.pathname + window.location.search;
		if (!userToken?.isLoggedIn) {
			navigate("/login",
				{
					state: {
						redirect: returnURL,
						required: required,
						activationToken: activationToken,
					},
				});
		} else if (now - actualSetupTime > min * 60 * 1000) {
			alert(messages?.emailVerification?.sessionEnded);
			navigate("/login", { state: { redirect: returnURL }, });
		} else {
			let result = {
				user_email: userEmail,
				required: required,
				activation_token: activationToken,
			};
			getResponse(result).then((res) => {
				if (res?.data === true) {
					navigate("/customers/finalVerification");
				} else if (
					res?.data?.result === "error" &&
					res?.data?.statusText === "Token not valid"
				) {
					toast.error(messages?.emailVerification?.tokenExpired);
					navigate("/customers/accountOverview");
				} else if (res?.data?.result === "error") {
					toast.error(res?.data?.statusText ?? messages?.emailVerification?.verificationFailed);
					navigate("/customers/accountOverview");
				} else {
					toast.error(messages?.emailVerification?.verificationFailed);
					navigate("/customers/accountOverview");
				}
			});
		}
	};

	//Use effect to call the redirect() method on page load
	useEffect(() => {
		redirect();
		return null
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return null;
};

export default ValidateToken;