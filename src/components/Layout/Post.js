import { Grid } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "../App/App.css";
import LoginController from "../Controllers/LoginController";
import LogoutController from "../Controllers/LogoutController";
import { ButtonPrimary } from "../FormsUI";
import Footer from "../Layout/Footer/Footer";
import { decryptAES, encryptAES } from "../lib/Crypto";
import AppBar from "./AppBar/SideNav";

const Post = ({ children }) => {
	const history = useHistory();
	const expiryMinute = process.env.REACT_APP_SESSION_EXPIRY_MINUTES;
	const tokenString = Cookies.get("token") ? Cookies.get("token") : '{ }';
	const userToken = JSON.parse(tokenString);
	var min = expiryMinute;
	var actualSetupTime = userToken?.setupTime ?? 0;
	var nowTime = new Date().getTime();
	const [ openPopUp, setOpenPopUp ] = useState(false);

	const handleClosePopUp = () => {
		setOpenPopUp(false);
	};

	const backgroundLogin = async () => {
		const cred = JSON.parse(Cookies.get("cred") ? decryptAES(Cookies.get("cred")) : "{ }");
		var now = new Date().getTime();
		actualSetupTime = now;
		if (!cred) {
			history.push({
				pathname: "/login",
				state: { redirect: window.location.pathname },
			});
		} else {
			let retVal = await LoginController(cred.email, cred.password, "");
			if (retVal?.data?.user && retVal?.data?.userFound === true) {
				// On login success storing the needed data in the local storage
				let nowTimeStamp = new Date().getTime();
				Cookies.set(
					"token",
					JSON.stringify({
						isLoggedIn: true,
						apiKey:
							retVal?.data?.user?.extensionattributes?.login?.jwt_token,
						setupTime: nowTimeStamp,
						applicantGuid:
							retVal?.data?.user?.attributes?.sor_data?.applicant_guid,
					})
				);
				Cookies.set(
					"cred",
					encryptAES(JSON.stringify({ email: cred.email, password: cred.password }))
				);
				actualSetupTime = now;
			} else if (
				retVal?.data?.result === "error" ||
				retVal?.data?.hasError === true
			) {
				Cookies.set(
					"token",
					JSON.stringify({
						isLoggedIn: false,
						apiKey: "",
						setupTime: "",
						applicantGuid: "",
					})
				);
				Cookies.set(
					"cred",
					encryptAES(JSON.stringify({ email: "", password: "" }))
				);
				history.push({
					pathname: "/login",
					state: { redirect: window.location.pathname },
				});
			} else {
				alert("Network error");
				history.push({
					pathname: "/login",
					state: { redirect: window.location.pathname },
				});
			}
		}
		return true;
	};
	const handleOnIdle = (event) => {
		setOpenPopUp(true);
	};

	const handleOnIdleLogout = (event) => {
		LogoutController();
		Cookies.set("redirec", JSON.stringify({ to: "/select-amount" }));
		history.push({
			pathname: "/login",
		});
		toast.success("You are being logged out of the system");
	};

	const handleOnAction = (event) => {
		nowTime = new Date().getTime();
		if (userToken?.isLoggedIn && nowTime - actualSetupTime > min * 60 * 1000) {
			backgroundLogin();
		}
	};
	useIdleTimer({
		timeout: 1000 * 60 * 5,
		onIdle: handleOnIdle,
		onAction: handleOnAction,
		debounce: 500,
	});

	useIdleTimer({
		timeout: 1000 * 60 * 7,
		onIdle: handleOnIdleLogout,
		debounce: 500,
	});
	return (
		<div>
			<div id="body">
				<Grid className="sample" />
				<AppBar />
				{ children }
			</div>
			<Footer />
			<Dialog
				onClose={ handleClosePopUp }
				aria-labelledby="customized-dialog-title"
				maxWidth="xs"
				// style={{maxWidth: "90% !important"}}
				open={ openPopUp }
			>
				<div id="printableArea">
					<DialogTitle id="customized-dialog-title" onClose={ handleClosePopUp }>
						Alert
					</DialogTitle>
					<DialogContent dividers>
						<Typography align="justify" gutterBottom>
							You will be logged out due to inactivity. Press Ok to remain logged into the system
						</Typography>
						<br />
					</DialogContent>
				</div>
				<DialogActions className="modalAction">
					<ButtonPrimary
						stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
						onClick={ handleClosePopUp }
					>
						<Typography align="center">Ok</Typography>
					</ButtonPrimary>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Post;
