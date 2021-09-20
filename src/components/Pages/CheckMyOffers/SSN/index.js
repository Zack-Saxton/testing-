import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {ButtonPrimary, Checkbox} from "../../../FormsUI";
import Paper from "@material-ui/core/Paper";
import React, {useContext, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import SSNLogo from "../../../../assets/icon/Last-Step.png";
import {CheckMyOffers} from "../../../../contexts/CheckMyOffers";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ScrollToTopOnMount from '../scrollToTop';
import "../checkMyOffer.css";
import {checkMyOfferSubmit as submitApplication} from "../../../controllers/checkMyOffersController";
import axios from 'axios';


function SSN() {
	let response = [];
	const { data, setData } = useContext(CheckMyOffers);
	const [appliedInLast30Days, setAppliedInLast30Days] = useState(false);
	const [agree, setAgree] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [agreeDelaware, setAgreeDelaware] = useState(data.state !== "DE");
	const [agreeCalifornia, setAgreeCalifornia] = useState(data.state !== "CA");
	const [agreeNewMexico, setAgreeNewMexico] = useState(data.state !== "NM");
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleOnClick = async (event) => {

		data.completedPage = data.page.ssn;
		setLoading(true);
		let body = {
			"email": data.email
		}
		let result = await axios({
			method: "POST",
			url: "/customer/get_customer_by_email",
			data: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
				// Accept: "*/*",
				// Host: "psa-development.marinerfinance.io",
				// "Accept-Encoding": "gzip, deflate, br",
				// Connection: "keep-alive",
				// "Content-Length": "6774",
			},
			transformRequest: (data, headers) => {
				delete headers.common["Content-Type"];
				return data;
			},
		})
		if (result && result.data.AppSubmittedInLast30Days === true) {
			setAppliedInLast30Days(true);
			setSubmit(true);
			setLoading(false);

		}
		else if(result && result.data.AppSubmittedInLast30Days === false){
			setAppliedInLast30Days(false);
			response = await submitApplication(data);
			setSubmit(false);

			setData({
				...data,
				"result": response.appSubmissionResult ? response.appSubmissionResult : null,
				"completedPage": data.page.ssn

			});

			if (response.appSubmissionResult.status === 200) {
				setData({
					...data,
					"result": response.appSubmissionResult,
					"completedPage": data.page.ssn,
	
				});
	
	
				if (response.appSubmissionResult && response.appSubmissionResult?.data?.data?.applicationStatus === 'offers_available') {
	
					setData({
						...data,
						"applicationStatus": 'offers_available',
					});
					history.push({
						pathname: "/eligible-for-offers",
						formcomplete: "yes"
					});
				}
				else if (response.appSubmissionResult && response.appSubmissionResult.data.data.applicationStatus === 'rejected') {
	
					setData({
						...data,
						"applicationStatus": 'rejected',
					});
					history.push({
						pathname: "/no-offers-available",
						formcomplete: "yes"
					});
				}
				else if (response.appSubmissionResult && response.appSubmissionResult.data.data.applicationStatus === 'referred') {
	
					setData({
						...data,
						"applicationStatus": 'referred',
					});
					history.push({
						pathname: "/referred-to-branch",
						formcomplete: "yes"
					});
				}
			} else if (response.appSubmissionResult.status === 403) {
				setData({
					...data,
					"applicationStatus": 'rejected',
				});
				history.push({
					pathname: "/no-offers-available",
					formcomplete: "yes"
				});
			} else {
				alert("Network Error");
				setLoading(false);
			}

		}
		else{
			setSubmit(true);
			setLoading(false);
		}
	}


	if (data.completedPage < data.page.livingPlace || data.completedPage < data.page.activeDuty || data.formStatus === 'completed') {
		history.push("/select-amount");
	}
	const redirectNC = data.state === 'NC' ? '/active-duty' : 'living-place';


	window.onbeforeunload = function () {
		return "Are you sure you want to reload/refresh the page.?";
	};

	// if(logged) {
	// 	history.pushState(null, null, location.href);
	// 	window.onpopstate = function(event) {
	// 	  history.go(1);
	// 	};
	//   }


		window.history.pushState(null, document.title, window.location.href);
		window.addEventListener('popstate', function (event){
			window.history.pushState(null, document.title,  window.location.href);
		});
	
	 
	return (
		<div>
			<ScrollToTopOnMount />
			<div className="mainDiv">
				<Box>
					<Grid xs={12} item container justifyContent="center" style={{ width: "100%",paddingTop:"70px",paddingBottom:"70px" }}>
						<Grid
							xs={11}
							sm={10}
							md={6}
							lg={6}
							xl={6} item container
							className="cardWrapper"
							justifyContent="center"
							style={{ width: "100%" }}
						>
							<Paper
								className="cardWOPadding"
								justify="center"
								alignitems="center"
							>
								<div className="progress mt-0">
									<div id="determinate" className="det100  determinate " />
									<span className="floatLeft detNum3" />
								</div>
								<Grid className="floatLeft">

									<Link to={data.state === 'WI' ? "/marital-status" : redirectNC}>
										<i className="material-icons dp48 yellowText  ">arrow_back</i>
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
									className="borrowCSS"
								>
									One last step
								</Typography>

								<Grid
									md={12}
									className="blockDiv"
									container item
									justifyContent="center"
									style={{ width: "100%" }}
								>
									<Grid
										justifyContent="center"
										style={{ width: "100%" }} container
										item
										lg={8}
										md={8}
										xs={12}
										className="textBlockWithLessMargin"
									>
										{/* <SocialSecurityNumber
													disabled={true}
													value={data.ssn}
													name="ssn"
												/> */}
									</Grid>
									<Grid container
										justifyContent="center"
										style={{ width: "100%" }}
										item
										lg={8}
										md={8}
										xs={12}
										className="textBlockWithLessMargin"
									>
										{/* <p className="subText">
													Your social security number is required to pull your
													credit information
												</p> */}
									</Grid>
									<Grid
										justifyContent="flex-start"
										alignItems="flex-start" container
										item
										lg={8}
										md={8}
										xs={12}
										className="positionHead"
									>
										<p className="agreeTextHead">Please acknowledge and sign our disclosures.</p>
									</Grid>
									<Grid
										justifyContent="flex-start"
										alignItems="flex-start"
										container
										item
										lg={8}
										md={8}
										xs={12}
										className="textBlockWithLessMargin"
									>
										<Checkbox
											name="termsOfService"
											labelform="Terms & Service"
											value={agree}
											className="checkBoxClass"
											onChange={(e) => { setAgree(e.target.checked) }}
											label={
												<p className="agreeText">
													By clicking this box you acknowledge that you have
													received, reviewed and agree to the
													<br />

													<a
														className="formatURL"
														href={
															"https://loans.marinerfinance.com/application/form"
														}
														target="_blank"
														rel="noreferrer noopener"
													>
														{" "}
														E-Signature Disclosure and Consent,{" "}
													</a>
													<br />
													<a
														className="formatURL"
														href={
															"https://loans.marinerfinance.com/application/form"
														}
														target="_blank"
														rel="noreferrer noopener"
													>
														Credit and Contact Authorization,{" "}
													</a>
													<br />
													<a
														className="formatURL"
														href={
															"https://loans.marinerfinance.com/application/form"
														}
														target="_blank"
														rel="noreferrer noopener"
													>
														Website Terms of Use,{" "}
													</a>
													<br />
													<a
														className="formatURL"
														href={
															"https://loans.marinerfinance.com/application/form"
														}
														target="_blank"
														rel="noreferrer noopener"
													>
														Website Privacy Statement.
													</a>
												</p>
											}
											required={true}
											stylelabelform='{ "color":"" }'
											stylecheckbox='{ "color":"blue", "top": "0 px", "position": "absolute"}'
											stylecheckboxlabel='{ "color":"" }'
										/>
										<div className={
											data.state === "DE"


												? "showMsg space"
												: "hideMsg space"
											// : "showMsg space"

										}>
											<Checkbox
												name="delaware"
												labelform="delaware"
												value={agreeDelaware}
												onChange={(e) => { setAgreeDelaware(e.target.checked) }}
												label={
													<p className="agreeText">
														By clicking this box you acknowledge that you have received and reviewed the {" "}

														<span className="linkText" onClick={handleClickOpen}>
															Delaware Itemized Schedule Of Charges.,{" "}
														</span>
													</p>
												}
												stylelabelform='{ "color":"" }'
												stylecheckbox='{ "color":"blue" }'
												stylecheckboxlabel='{ "color":"" }'
											/>
										</div>
										<div className={
											data.state === "CA"


												? "showMsg space"
												: "hideMsg space"
											// : "showMsg space"

										}>
											<Checkbox
												name="california"
												labelform="california"
												value={agreeCalifornia}
												onChange={(e) => { setAgreeCalifornia(e.target.checked) }}
												label={
													<p className="agreeText">
														By clicking this box you acknowledge that you have been offered and had the opportunity to review this {" "}

														<a
															className="formatURL"
															href={
																"https://lms.moneyskill.org/yourcreditrating/module/mariner/en"
															}
															target="_blank"
															rel="noreferrer noopener"
														>
															Credit Education Program
														</a>
													</p>
												}
												stylelabelform='{ "color":"" }'
												stylecheckbox='{ "color":"blue" }'
												stylecheckboxlabel='{ "color":"" }'
											/>
										</div>
										<div className={
											data.state === "NM"


												? "showMsg space"
												: "hideMsg space"
											// : "showMsg space"

										}>
											<Checkbox
												name="newmexico"
												labelform="newmexico"
												value={agreeNewMexico}
												onChange={(e) => { setAgreeNewMexico(e.target.checked) }}
												label={
													<p className="agreeText">
														NM Residents: By clicking this box you acknowledge that you have reviewed the Important Consumer Information in Mariner’s New Mexico Consumer Brochure located at {" "}

														<a
															className="formatURL"
															href={
																"http://marfi.me/NMBrochure."
															}
															target="_blank"
															rel="noreferrer noopener"
														>
															http://marfi.me/NMBrochure.
														</a>
													</p>
												}
												stylelabelform='{ "color":"" }'
												stylecheckbox='{ "color":"blue" }'
												stylecheckboxlabel='{ "color":"" }'
											/>
										</div>
										<Typography className={ submit ? "showMsg" : "hideMsg"} style={{ textAlign: "left"}}>
										It looks like you have already submitted an application within the last 30 days.
										</Typography>
									</Grid>


									<Grid
										justifyContent="center"
										style={{ width: "100%" }}
										item container
										lg={8}
										md={8}
										xs={12}
										className="textBlockWithLessMargin alignButtonExtra alignButton"
									>
										<ButtonPrimary
											disabled={loading ? loading : !(agree && agreeDelaware && agreeCalifornia && agreeNewMexico)}
											onClick={handleOnClick}
											stylebutton='{"background": "#FFBC23", "height": "inherit", "color": "black"}'
										>
											<Typography align="center" className="textCSS button">
												Check My Offer

											</Typography>
											<i
												className="fa fa-refresh fa-spin customSpinner"
												style={{ marginRight: "10px", display: loading ? "block" : "none" }}
											/>
										</ButtonPrimary>
									</Grid>
								</Grid>

							</Paper>
						</Grid>
					</Grid>
				</Box>
			</div>
			<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Delware Itemized Shedule of Charges
				</DialogTitle>
				<DialogContent dividers>
					<Typography align="center" className="textCSS modalText"> Itemized Schedule of Charges (DE) </Typography>
					<Typography align="center" className="textCSS modalText"> Closed End Loans </Typography>
					<TableContainer component={Paper}>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell align="center" className="tableHeader">Description</TableCell>
									<TableCell align="center" className="tableHeader">Fee</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>

								<TableRow>
									<TableCell align="center"> Periodic Interest </TableCell>
									<TableCell align="center">0.00% - 36.00%</TableCell>
								</TableRow>
								<TableRow>
									<TableCell align="center"> Recording/Satisfaction Fee </TableCell>
									<TableCell align="center">$23 - 151</TableCell>
								</TableRow>
								<TableRow>
									<TableCell align="center"> Legal Fee </TableCell>
									<TableCell align="center">Actual cost Incurred</TableCell>
								</TableRow>
								<TableRow>
									<TableCell align="center"> Repossession Fee </TableCell>
									<TableCell align="center">Actual cost Incurred</TableCell>
								</TableRow>
								<TableRow>
									<TableCell align="center"> Late Fee </TableCell>
									<TableCell align="center">5% of Unpaid Installment</TableCell>
								</TableRow>
								<TableRow>
									<TableCell align="center"> Bad Check Fee </TableCell>
									<TableCell align="center">$15</TableCell>
								</TableRow>
								<TableRow>
									<TableCell align="center"> Check by Phone Fee </TableCell>
									<TableCell align="center">$6</TableCell>
								</TableRow>
								<TableRow>
									<TableCell align="center"> Internet Payment Fee </TableCell>
									<TableCell align="center">$2</TableCell>
								</TableRow>
								<TableRow>
									<TableCell align="center"> Loan by Mail Commitment Fee </TableCell>
									<TableCell align="center">$10</TableCell>
								</TableRow>
								<TableRow>
									<TableCell align="center"> Refinancing Fee </TableCell>
									<TableCell align="center">$150</TableCell>
								</TableRow>
								<TableRow>
									<TableCell align="center"> Non-Filing Insurance </TableCell>
									<TableCell align="center">$25</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>

				</DialogContent>
				<DialogActions className="modalAction">
					<ButtonPrimary
						stylebutton='{"background": "#FFBC23", "color": "black", "border-radius": "50px"}'
						onClick={handleClose}
						className="modalButton"
					>
						<Typography align="center">
							Ok
						</Typography>
					</ButtonPrimary>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default SSN;
