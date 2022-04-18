import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import React from "react";
import { resendVerificationEmail } from "../../../Controllers/ApplyForLoanController";
import { ButtonSecondary } from "../../../FormsUI";

export default function EmailVerification(props) {
	//Send verification Email to logged in user
	const sendVerificationEmail = async () => {
		await resendVerificationEmail();
	};

	//View Part
	return (
		<div>
			<Grid item style={ { width: "100%" } }>
				<p
					style={ {
						textAlign: "justify",
						fontSize: "0.938rem",
						lineHeight: "1.5",
						color: "#595959",
						fontWeight: "normal",
					} }
				>
					In Progress: Your email address has not been verified. Please check
					your inbox for our email verification message. Alternatively, please
					click on the button to be resent the verification email. If you have
					completed email verification. please refresh this page.
				</p>
			</Grid>

			<Grid item xs={ 12 } style={ { lineHeight: 3 } }>
				<ButtonSecondary
					stylebutton='{"fontWeight":"normal" }'
					styleicon='{ "color":"" }'
					fullWidth={ true }
					onClick={ () => {
						sendVerificationEmail();
					} }
				>
					Resend the verification link
				</ButtonSecondary>
			</Grid>
			<div className={ props.classes.actionsContainer }>
				<div className={ props.classes.button_div }></div>
			</div>
		</div>
	);
}
EmailVerification.propTypes = {
	classes: PropTypes.object,
};