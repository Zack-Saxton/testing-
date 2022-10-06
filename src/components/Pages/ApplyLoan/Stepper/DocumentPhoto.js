import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DOMPurify from 'dompurify';
import { getIframe, saveIDScan } from "../../../Controllers/ApplyForLoanController";
import { ButtonPrimary } from "../../../FormsUI";
import APICall from "../../../lib/AxiosLib";
import messages from "../../../lib/Lang/applyForLoan.json";

//Styling
const useStyles = makeStyles(() => ({
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
	const [ resetIframe, setResetIframe ] = useState(0);
	const [ windowHeight, setWindowHeight ] = useState(screen.height);
	const [ windowWidth, setWindowWidth ] = useState(screen.width);

		//Refresh IFrame of the window size changed, so make the camera pointer align correclty
	let resizeTimeout;
	window.addEventListener('resize', function(_event) {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function(){
			if(Math.abs(screen.width - windowWidth) >= 500 ||  Math.abs(screen.height - windowHeight) >= 500){
				setResetIframe(resetIframe + 1);
				setWindowHeight(screen.height);
				setWindowWidth(screen.width);
			}
		}, 1500);
	});

		//Load the IFrame
	async function loadIframe() {
		let iframe = await getIframe();
		setIframeSrc(DOMPurify.sanitize(iframe?.data?.iframeSrc));
	}
	function getValueByLable(text, ctx) {
		return document.evaluate("//*[.='" + text + "']",
			ctx || document, null, XPathResult.ANY_TYPE, null).iterateNext();
	}
	const onMessageHandler = async (event) => {
		try {
			if (event.data.trace_id || event.data.request_id) {
				saveIDScan(event.data.request_id );
				event.source.window.postMessage({ isVerified: true, }, "*");
			} else if (event.data.idscanPayload) {
				//Commented this line because of uploding document multiple times
				//saveIDScanBeforeCAC(event.data);
			}
		} catch (errorAPI) {
			toast.error("Error uploading document "+errorAPI);
		}
	};

	const onClickNextBtn = async () => {
		let data = {};
		let res = await APICall('verification_steps_cac', '', data, 'POST', true);
		if (res?.data?.id_photo && res?.data?.id_document) {
			props.next();
			props.reference.current[ 4 ].current.scrollIntoView({ behavior: 'smooth' });
			getValueByLable("ID Document & Photo").scrollIntoView();
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
		loadIframe();
	}, []);

	//View part - JSX
	return (
		<div>
			<div className={classes.content_grid}>
				<p className={classes.pTagStyle} data-testid="documentPhotoTextTop">
					<span className={classes.spanStyle}>Please upload pictures of the front and back of your valid federal or state issued ID.
					</span>
					<br />
					<span className={classes.spanStyle}>Next, upload a picture of yourself for comparison.</span>
					<br/>
					<span className={classes.spanStyle}>Please ensure all photos are clear and in color. This is similar to an in-person ID check.</span>
				</p>
			</div>
			<Grid item sm={12} data-testid="iframe">
				{iframeSrc !== '' ? <iframe key={resetIframe} src={iframeSrc} allow="camera;" id="iframeDiv" title="document upload" height="650px" width="100%" /> : null}
			</Grid>
			<div>
				<p className={classes.pTagStyle} data-testid="documentPhotoTextBottom">
					Please upload a picture of yourself in which you are holding your
					state or federal government issued ID next to your face. Please ensure
					that the information on the ID is legible and that your hand is
					clearly visible and holding your ID. This will allow us to check that
					your ID document matches your appearance (similar to an in-person ID
					check)
				</p>
				<br />
				<p style={{ display: error ? "block" : "none" }} className={classes.errorStyle}>
					{messages.documentPhoto.verificationNotFound}
				</p>
			</div>

			<div className={props.classes.actionsContainer}>
				<div className={props.classes.button_div} >
					<ButtonPrimary
						variant="contained"
						color="primary"
						id="button_stepper_next"
						stylebutton='{"marginRight": "10px","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
						onClick={() => { onClickNextBtn(); }}
					>
						{props.activeStep === props?.steps.length - 1 ? "Finish" : "Next"}
					</ButtonPrimary>
				</div>
			</div>
		</div>
	);
}
DocumentPhoto.propTypes = {
	next: PropTypes.func,
	reference: PropTypes.object,
	classes: PropTypes.object,
	steps: PropTypes.array,
	activeStep: PropTypes.number

};