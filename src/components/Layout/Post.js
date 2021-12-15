import React, { useState } from "react";
import AppBar from "./AppBar/SideNav";
import { Grid } from "@material-ui/core";
import "../App/App.css";
import Footer from "../Layout/Footer/Footer";
import { useHistory } from "react-router-dom";
import loginSubmit from "../Controllers/LoginController";
import { useIdleTimer } from "react-idle-timer";
import Dialog from "@material-ui/core/Dialog";
import { ButtonPrimary } from "../FormsUI";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import { toast } from "react-toastify";

const Post = ({ children }) => {
	const history = useHistory();
	const expiryMinute = process.env.REACT_APP_SESSION_EXPIRY_MINUTES;
	const tokenString = localStorage.getItem("token");
	const userToken = JSON.parse(tokenString);
	var min = expiryMinute; 
	var actualSetupTime = userToken?.setupTime ?? 0;
	var nowTime = new Date().getTime();
	const [openPopUp, setOpenPopUp] = useState(false);

	const handleClosePopUp = () => {
		setOpenPopUp(false);
	};

	const backgroundLogin = async () => {
		const cred = JSON.parse(localStorage.getItem("cred"));
		var now = new Date().getTime();
		actualSetupTime = now;
		if (!cred) {
			history.push({
				pathname: "/login",
				state: { redirect: window.location.pathname },
			});
		} else {
			let retVal = await loginSubmit(cred.email, cred.password, "");
			if (retVal?.data?.data?.user && retVal?.data?.data?.userFound === true) {
				// On login success storing the needed data in the local storage
				let nowTimeStamp = new Date().getTime();
				localStorage.setItem(
					"token",
					JSON.stringify({
						isLoggedIn: true,
						apiKey:
							retVal?.data?.data?.user?.extensionattributes?.login?.jwt_token,
						setupTime: nowTimeStamp,
						applicantGuid:
							retVal?.data?.data?.user?.attributes?.sor_data?.applicant_guid,
					})
				);
				localStorage.setItem(
					"cred",
					JSON.stringify({ email: cred.email, password: cred.password })
				);
				actualSetupTime = now;
			} else if (
				retVal?.data?.data?.result === "error" ||
				retVal?.data?.data?.hasError === true
			) {
				localStorage.setItem(
					"token",
					JSON.stringify({
						isLoggedIn: false,
						apiKey: "",
						setupTime: "",
						applicantGuid: "",
					})
				);
				localStorage.setItem(
					"cred",
					JSON.stringify({ email: "", password: "" })
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
		let userToken = { isLoggedIn: false };
        localStorage.setItem("token", JSON.stringify(userToken));
        localStorage.setItem("cred", JSON.stringify({email: "", password: "" }));
        localStorage.setItem("branchname", JSON.stringify({ }));
        localStorage.setItem("branchopenstatus", JSON.stringify({ }));
        localStorage.setItem("login_date", JSON.stringify({ }));
        localStorage.setItem("user", JSON.stringify({ }));
        localStorage.setItem("branchphone", JSON.stringify({ }));
        localStorage.setItem("profile_picture", JSON.stringify({ }));
        localStorage.setItem("redirec", JSON.stringify({ to: "/select-amount" }));
		history.push({
			pathname: "/login",
		});
		toast.success("You are being logged out of the system", {
			position: "bottom-left",
			autoClose: 2500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
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
				{children}
			</div>
			<Footer />
			<Dialog
				onClose={handleClosePopUp}
				aria-labelledby="customized-dialog-title"
				maxWidth="xs"
				// style={{maxWidth: "90% !important"}}
				open={openPopUp}
			>
				<div id="printableArea">
					<DialogTitle id="customized-dialog-title" onClose={handleClosePopUp}>
						Alert
					</DialogTitle>
					<DialogContent dividers>
						<Typography align="justify" gutterBottom>
							You have been ideal for a while, click ok to continue, else you
							will be logged out of the application!
						</Typography>
						<br />
					</DialogContent>
				</div>
				<DialogActions className="modalAction">
					<ButtonPrimary
						stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
						onClick={handleClosePopUp}
					>
						<Typography align="center">Continue</Typography>
					</ButtonPrimary>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Post;
