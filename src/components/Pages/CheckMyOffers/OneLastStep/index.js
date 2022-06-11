import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { Link, useNavigate } from "react-router-dom";
import SSNLogo from "../../../../assets/icon/Last-Step.png";
import { preLoginStyle } from "../../../../assets/styles/preLoginStyle";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import usrAccountDetails from "../../../Controllers/AccountOverviewController";
import {
	checkMyOfferSubmit as submitApplication,
	getCustomerByEmail
} from "../../../Controllers/CheckMyOffersController";
import { ButtonPrimary, Checkbox, Popup, RenderContent } from "../../../FormsUI";
import "../CheckMyOffer.css";
import ScrollToTopOnMount from "../ScrollToTop";
import globalMessages from "../../../../assets/data/globalMessages.json";
//oneLastStep component initialization
function SSN() {
	let response = [];
	const { data, setData, setApplicationLoading } = useContext(CheckMyOffers);
	const preLoginClasses = preLoginStyle();
	const [ agree, setAgree ] = useState(false);
	const [ submit, setSubmit ] = useState(false);
	const [ agreeDelaware, setAgreeDelaware ] = useState(data.state !== "DE");
	const [ agreeCalifornia, setAgreeCalifornia ] = useState(data.state !== "CA");
	const [ agreeNewMexico, setAgreeNewMexico ] = useState(data.state !== "NM");
	const [ open, setOpen ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const [ esignPopup, setEsignPopup ] = useState(false);
	const [ creditPopup, setCreditPopup ] = useState(false);
	const [ webTOUPopup, setWebTOUPopup ] = useState(false);
	const [ privacyPopup, setPrivacyPopup ] = useState(false);
	const { refetch } = useQuery('loan-data', usrAccountDetails);
	const navigate = useNavigate();
	const useStyles = makeStyles((theme) => ({
		linkDesign: {
			marginTop: "3px !important",
			marginBottom: "3px !important",
			textDecoration: "underline !important",
			color: "#0F4EB3 !important",
			display: "block !important"
		},
		paddingOneSide: {
			padding: "4% 0px"
		},
		fullWidth: {
			width: "100%"
		},
		typoAlign: {
			textAlign: "left",
			marginLeft: "8%",
			marginTop: "2%",
		}
	}));
	const classes = useStyles();

	//handle modal actions
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const stopLoading = () => {
		setSubmit(true);
		setLoading(false);
		setApplicationLoading(false);
	};
	const handleOnClickEsign = () => {
		setEsignPopup(true);
	};
	const handleOnClickEsignClose = () => {
		setEsignPopup(false);
	};
	const handleOnClickCredit = () => {
		setCreditPopup(true);
	};
	const handleOnClickCreditClose = () => {
		setCreditPopup(false);
	};
	const handleOnClickwebTOU = () => {
		setWebTOUPopup(true);
	};

	const handleOnClickwebTOUClose = () => {
		setWebTOUPopup(false);
	};
	const handleOnClickPrivacy = () => {
		setPrivacyPopup(true);
	};
	const handleOnClickPrivacyClose = () => {
		setPrivacyPopup(false);
	};
	const handleValidResponse = () => {
		setData({
			...data,
			result: response.appSubmissionResult,
			completedPage: data.page.ssn,
		});
		setApplicationLoading(false);
		if ( response?.appSubmissionResult?.data?.applicationStatus === "offers_available") {
			setData({ ...data, applicationStatus: "offers_available" });
			navigate("/eligible-for-offers", { formcomplete: "yes" });
		} else if ( response?.appSubmissionResult?.data?.applicationStatus === "rejected" && response?.appSubmissionResult?.data?.borrowerType === "new borrower") {
			setData({ ...data, applicationStatus: "rejected" });
			navigate("/no-offers", { formcomplete: "yes" });
		} else if ( response?.appSubmissionResult?.data?.applicationStatus === "rejected") {
			setData({ ...data, applicationStatus: "rejected" });
			navigate("/no-offers-available", { formcomplete: "yes" });
		} else if ( response?.appSubmissionResult?.data?.applicationStatus === "referred") {
			setData({ ...data, applicationStatus: "referred" });
			navigate("/referred-to-branch", { formcomplete: "yes" });
		}
	};
	const handleOnClick = async (event) => {
		data.completedPage = data.page.ssn;
		setLoading(true);
		setApplicationLoading(true);
		let result = await getCustomerByEmail(data.email);
		if (result?.data?.AppSubmittedInLast30Days) {
			stopLoading();
		} else if (!result?.data?.AppSubmittedInLast30Days) {
			response = await submitApplication(data);
			setSubmit(false);
			setData({
				...data,
				result: response.appSubmissionResult
					? response.appSubmissionResult
					: null,
				completedPage: data.page.ssn,
			});
			if (response.appSubmissionResult.status === 200) {
				handleValidResponse();
				refetch();
			} else if (response.appSubmissionResult.status === 403) {
				setData({ ...data, applicationStatus: "rejected" });
				setApplicationLoading(false);
				refetch();
				navigate("/no-offers-available", { formcomplete: "yes" });
			} else {
				alert(globalMessages.Network_Error_Please_Try_Again);
				setLoading(false);
				setApplicationLoading(false);
			}
		} else {
			stopLoading();
		}
	};
	useEffect(() => {
		//redirect to select amount if accessed directly
		if (data.completedPage < data?.page?.livingPlace || data?.completedPage < data?.page?.activeDuty || data?.formStatus?.toLowerCase() === "completed") {
			navigate("/select-amount");
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const redirectNC = data.state === "NC" ? "/active-duty" : "/living-place";

	//alert when the user tries to close before form submit
	window.onbeforeunload = function () {
		return "Are you sure you want to reload/refresh the page.?";
	};
	window.onunload = function () {
		window.onbeforeunload = null;
	};
	window.history.pushState(null, document.title, window.location.href);
	window.addEventListener("popstate", function (event) {
		window.history.pushState(null, document.title, window.location.href);
	});

	//JSX poart
	return (
		<div>
			<ScrollToTopOnMount />
			<div className={preLoginClasses.mainDiv}>
				<Box>
					<Grid
						xs={12}
						item
						container
						justifyContent="center"
						className={`${ classes.fullWidth } ${ classes.paddingOneSide } `}
					>
						<Grid
							xs={11}
							sm={10}
							md={6}
							lg={6}
							xl={6}
							item
							container
							className="cardWrapper fullWidth"
							justifyContent="center"
						>
							<Paper
								id="oneLastStepWrap"
								className="cardWOPadding"
								justify="center"
								alignitems="center"
								style={{
									opacity: loading ? 0.55 : 1,
									pointerEvents: loading ? "none" : "initial",
								}}
							>
								<div className="progress mt-0">
									<div id="determinate" className="det100  determinate " />
									<span className="floatLeft detNum3" />
								</div>
								<Grid className="floatLeft">
									<Link
										id="arrowBack"
										to={data.state === "WI" ? "/marital-status" : redirectNC}
									>
										<i className="material-icons dp48 yellowText  floatingButton">
											arrow_back
										</i>
									</Link>
								</Grid>
								<Grid className="liftImage">
									<img alt="ssn" src={SSNLogo} className="spinAnimation" />
								</Grid>
								<Typography
									variant="h5"
									align="center"
									justify="center"
									alignitems="center"
									className="borrowCSSLP checkMyOfferText zeroMargin"
								>
									One last step
								</Typography>
								<Grid
									id="signDiv"
									md={12}
									className="blockDiv fullWidth"
									container
									item
									justifyContent="center"
								>
									<Grid
										justifyContent="center"
										container
										item
										lg={8}
										md={8}
										xs={12}
										className="textBlockWithLessMargin fullWidth"
									></Grid>
									<Grid
										container
										justifyContent="center"
										item
										lg={8}
										md={8}
										xs={12}
										className="textBlockWithLessMargin fullWidth"
									></Grid>
									<Grid
										justifyContent="flex-start"
										alignItems="flex-start"
										container
										item
										lg={8}
										md={8}
										xs={12}
										className="positionHead"
									>
										<p className="agreeTextHead">
											Please acknowledge and sign our disclosures.
										</p>
									</Grid>
									<Grid
										justifyContent="flex-start"
										alignItems="flex-start"
										container
										item
										lg={8}
										md={8}
										xs={12}
										className="textBlockWithLessMargin disclosuresWrap"
									>
										<Checkbox
											name="termsOfService"
											labelform="Terms & Service"
											value={agree}
											className="checkBoxClass"
											onChange={(event) => {
												setAgree(event.target.checked);
											}}
											data-testid="reviewedcheckbox"
											label={
												<p className="agreeText">
													By clicking this box, you acknowledge that you have received,
													reviewed and agree to the following disclosures and consents:
													<br />
													<span data-testid="eSignatureLink" className={classes.linkDesign} onClick={() => { handleOnClickEsign(); }}>E-Signature Disclosure and Consent,</span>
													<span data-testid="creditContactAuth"className={classes.linkDesign} onClick={() => { handleOnClickCredit(); }}>Credit and Contact Authorization,</span>
													<span data-testid="websiteTerms" className={classes.linkDesign} onClick={() => { handleOnClickwebTOU(); }}>Website Terms of Use,</span>
													<span data-testid="websitePrivacy" className={classes.linkDesign} onClick={() => { handleOnClickPrivacy(); }}>Website Privacy Statement.</span>
												</p>
											}
											required={true}
											stylelabelform='{ "color":"" }'
											stylecheckbox='{ "color":"blue", "top": "0", "position": "absolute"}'
											stylecheckboxlabel='{ "color":"" }'
										/>
										<div
											className={data.state === "DE" ? "showCB " : "hideMsg "}
										>
											<Checkbox
												name="delaware"
												labelform="delaware"
												value={agreeDelaware}
												onChange={(event) => {
													setAgreeDelaware(event.target.checked);
												}}
												className={"space checkBoxClass"}

												label={
													<p className="agreeText MT5">
														By clicking this box you acknowledge that you have
														received and reviewed the{" "}
														<span
															className="formatURLStyle"
															onClick={handleClickOpen}
														>
															Delaware Itemized Schedule Of Charges.,{" "}
														</span>
													</p>
												}
												stylelabelform='{ "color":"" }'
												stylecheckbox='{ "color":"blue", "top": "0", "position": "absolute", "marginTop": "10px"}'
												stylecheckboxlabel='{ "color":"" }'
											/>
										</div>
										<div
											className={data.state === "CA" ? "showCB " : "hideMsg "}
										>
											<Checkbox
												name="california"
												labelform="california"
												className={"space checkBoxClass"}
												value={agreeCalifornia}
												onChange={(event) => {
													setAgreeCalifornia(event.target.checked);
												}}
												label={
													<p className="agreeText MT5">
														By clicking this box you acknowledge that you have
														been offered and had the opportunity to review this{" "}
														<a
															className="formatURL"
															href={
																"https://lms.moneyskill.org/yourcreditrating/mariner"
															}
															target="_blank"
															rel="noreferrer noopener"
														>
															Credit Education Program
														</a>
													</p>
												}
												stylelabelform='{ "color":"" }'
												stylecheckbox='{ "color":"blue", "top": "0", "position": "absolute", "marginTop": "10px"}'
												stylecheckboxlabel='{ "color":"" }'
											/>
										</div>
										<div
											className={data.state === "NM" ? "showCB " : "hideMsg "}
										>
											<Checkbox
												name="newmexico"
												labelform="newmexico"
												className={"space checkBoxClass"}
												value={agreeNewMexico}
												onChange={(event) => {
													setAgreeNewMexico(event.target.checked);
												}}
												label={
													<p className="agreeText MT5">
														NM Residents: By clicking this box you acknowledge
														that you have reviewed the Important Consumer
														Information in Mariner’s New Mexico Consumer
														Brochure located at{" "}
														<a
															className="formatURL"
															href={"http://marfi.me/NMBrochure."}
															target="_blank"
															rel="noreferrer noopener"
														>
															http://marfi.me/NMBrochure.
														</a>
													</p>
												}
												stylelabelform='{ "color":"" }'
												stylecheckbox='{ "color":"blue", "top": "0", "position": "absolute", "marginTop": "10px"}'
												stylecheckboxlabel='{ "color":"" }'
											/>
										</div>
										<Typography
											className={`typegraphAlignment ${ submit ? "showMsg" : "hideMsg" }`}
										>
											It looks like you have already submitted an application
											within the last 30 days.
										</Typography>
									</Grid>
									<Grid
										justifyContent="center"
										item
										container
										lg={8}
										md={8}
										xs={12}
										className="textBlockWithLessMargin alignButtonExtra alignButton fullWidth"
									>
										<ButtonPrimary
											disabled={
												loading
													? loading
													: !(
														agree &&
														agreeDelaware &&
														agreeCalifornia &&
														agreeNewMexico
													)
											}
											onClick={handleOnClick}
											data-testid="submit-application"
											stylebutton='{"background": "#FFBC23", "fontSize": "0.938rem","color": "black", "padding": "0px 30px"}'
										>
											Submit Application
											<i
												className="fa fa-refresh fa-spin customSpinner"
												style={{
													marginRight: "10px",
													display: loading ? "block" : "none",
												}}
											/>
										</ButtonPrimary>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					</Grid>
				</Box>
			</div>

			<Popup popupFlag={esignPopup} closePopup={handleOnClickEsignClose} title="E-Signature Disclosure and Consent">
				<Typography className="printPage" onClick={() => window.print()}>Print This Page</Typography>
				<RenderContent disclosureLink="/eSign" />
			</Popup>
			<Popup popupFlag={creditPopup} closePopup={handleOnClickCreditClose} title="Credit and Contact Authorization">
				<Typography className="printPage" onClick={() => window.print()}>Print This Page</Typography>
				<RenderContent disclosureLink="/credit" />
			</Popup>
			<Popup popupFlag={webTOUPopup} closePopup={handleOnClickwebTOUClose} title="Terms of Use">
				<Typography className="printPage" onClick={() => window.print()}>Print This Page</Typography>
				<RenderContent disclosureLink="/websiteTermsOfUse" />
			</Popup>
			<Popup popupFlag={privacyPopup} closePopup={handleOnClickPrivacyClose} title="Privacy Statement">
				<Typography className="printPage" onClick={() => window.print()}>Print This Page</Typography>
				<RenderContent disclosureLink="/privacy" />
			</Popup>
			<Popup popupFlag={open} closePopup={handleClose} title="Delaware Itemized Schedule of Charges" >
				<Typography className="printPage" onClick={() => window.print()}>Print This Page</Typography>
				<RenderContent disclosureLink="/delaware" />
			</Popup>
		</div>
	);
}

export default SSN;
