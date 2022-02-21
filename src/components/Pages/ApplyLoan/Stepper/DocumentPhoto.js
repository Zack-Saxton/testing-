import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getIframe } from "../../../Controllers/ApplyForLoanController";
import { ButtonPrimary } from "../../../FormsUI";
import APICall from "../../../lib/AxiosLib";
import messages from "../../../lib/Lang/applyForLoan.json";

//Styling
const useStyles = makeStyles((theme) => ({
	content_grid: {
		marginTop: "15px",
	},
	pTagStyle: {
		textAlign: "justify",
		fontSize: "0.938rem",
		lineHeight: "1.5",
		color: "#595959"
	},
	listStyle: {
		textAlign: "justify"
	},
	spanStyle: {
		paddingLeft: "21px"
	},
	errorStyle: {
		textAlign: "justify",
		color: "red"
	}
}));

//View Part
export default function DocumentPhoto(props) {
	const classes = useStyles();
	const [ iframeSrc, setIframeSrc ] = useState("");
	const [ error, setError ] = useState(false);
	//Load the IFrame
	async function loadIframe() {
		let iframe = await getIframe();
		setIframeSrc(iframe?.data?.iframeSrc);
	}

	const onMessageHandler = async (event) => {
		try {
			if (event.data.trace_id || event.data.request_id) {
				const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : "{ }");

				const options = {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						"x-access-token": loginToken.apiKey,
					},
					body: JSON.stringify({ requestID: event.data.request_id }),
				};
				await fetch("/idscan/save_response_cac", options);
				event.source.window.postMessage({ isVerified: true, }, "*");
			} else if (event.data.idscanPayload) {
				const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : "{ }");

				const options = {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						"x-access-token": loginToken.apiKey,
					},
					body: JSON.stringify(event.data),
				};
				await fetch("/idscan/save_response_before_cac", options);
			}
		} catch (errorAPI) {
			toast.error("Error uploading document");
		}
	};

	const onClickNextBtn = async () => {
		let data = {};
		let res = await APICall('verification_steps_cac', '', data, 'POST', true);
		if (res?.data?.id_photo === true && res?.data?.id_document === true) {
			props.next();
			props.reference.current[ 4 ].current.scrollIntoView({ behavior: 'smooth' });
		} else {
			setError(true);
		}
	};

	useEffect(() => {
		if (window.addEventListener) {
			window.addEventListener("message", onMessageHandler, false);
		} else {
			window.attachEvent("onmessage", onMessageHandler);
		}
	});

	//call function load
	useEffect(() => {
		loadIframe();
	}, []);

	//View part - JSX
	return (
		<div>
			<div className={ classes.content_grid }>
				<p className={ classes.pTagStyle }>
					<span className={ classes.spanStyle }> Please upload an image or your driver‘s license, passport,
						state-issued photo ID card, or military/federal government photo ID.
					</span>
					<span className={ classes.spanStyle }>Please ensure:</span>
					<li className={ classes.listStyle }>Document is currently valid</li>
					<li className={ classes.listStyle }>The entire document is visible and all information is legible</li>
				</p>
			</div>
			<Grid item sm={ 12 }>
				{ iframeSrc !== '' ? <iframe src={ iframeSrc } allow="camera;" id="iframeDiv" title="document upload" height="650px" width="100%" /> : null }
			</Grid>
			<div>
				<p className={ classes.pTagStyle }>
					Please upload a picture of yourself in which you are holding your
					state or federal government issued ID next to your face. Please ensure
					that the information on the ID is legible and that your hand is
					clearly visible and holding your ID. This will allow us to check that
					your ID document matches your appearance (similar to an in-person ID
					check)
				</p>
				<br />
				<p style={ { display: error ? "block" : "none" } } className={ classes.errorStyle }>
					{ messages.documentPhoto.verificationNotFound }
				</p>
			</div>

			<div className={ props.classes.actionsContainer }>
				<div className={ props.classes.button_div } >
					<ButtonPrimary
						variant="contained"
						color="primary"
						id="button_stepper_next"
						stylebutton='{"marginRight": "10px","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
						onClick={ () => { onClickNextBtn(); } }
					>
						{ props.activeStep === props?.steps.length - 1 ? "Finish" : "Next" }
					</ButtonPrimary>
				</div>
			</div>
		</div>
	);
}
