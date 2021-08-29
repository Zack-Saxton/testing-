import "./checkMyOffer.css";
import "../checkMyOffer.css";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Slider, TextField,  ButtonPrimary } from "../../../FormsUI";
import Paper from "@material-ui/core/Paper";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import ScrollToTopOnMount from '../scrollToTop';
import { CheckMyOffers as Check } from "../../../../contexts/CheckMyOffers";

function CheckMyOffers(props) {
	const { data, setData, resetData } = useContext(Check);
	const [hasOffercode, setOffercode] = useState();
	
	const history = useHistory();

	if(data.formStatus === '' || data.completedPage === 0 || data.formStatus === 'completed' || props.location.fromLoanPurpose !== 'yes'){
		console.log("log",props.location.fromLoanPurpose);
		resetData();
		data.loanAmount = 10000;
	}
	const [select, setSelect] = useState(data.loanAmount ? data.loanAmount : 10000);
	const handleRoute = (e) => {

		data.loanAmount = select;
		data.formStatus = 'started';
		data.completedPage = data.page.selectAmount;
		setData({ ...data, "loanAmount": select });
		history.push({
			pathname: "/loan-purpose",
		});
	};

	const getLoggedOut = () => {
		let userToken = {isLoggedIn: false};
		localStorage.setItem('token', JSON.stringify(userToken));
	}

	console.log(props.location.fromLoanPurpose);
	return (
		<div>
			<ScrollToTopOnMount />
			<div className="mainDiv">
				<Box>
					<Grid xs={12} container justify="center" alignItems="center">
						<Grid
							xs={11}
							sm={10}
							md={6}
							lg={6}
							xl={6}
							className="cardWrapper"
							container
							justify="center"
							alignItems="center"
						>
							<Paper className="card" justify="center" alignItems="center">
								<Typography variant="h5" align="center" className="borrowCSS CMOheading">
									Tell us how much you would like to borrow
								</Typography>
								<Grid
									xs={12}
									className="alignSlider"
									container
									justify="center"
									alignItems="center"
								>
									<Grid xs={11} sm={10} md={8} lg={8} xl={8}>
										<Slider
											className="setSlider"
											name="slider"
											defaultValue={select ? select : 10000}
											setSelect={setSelect}
											label="Select Loan Amount"
										/>
									</Grid>
								</Grid>
								<Grid
									xs={12}
									className="alignSlider"
									container
									justify="center"
									alignItems="center"
								>
									<Grid
										xs={11}
										sm={10}
										md={8}
										lg={8}
										xl={8}
										justify="center"
										alignItems="center"
									>
										<Typography
											data-testid="offerCodeTriggerText"
											variant="p"
											className="setGreenColor cursorPointer"
											align="center"
											onClick={(e) => {
												setOffercode(hasOffercode ? false : true);
											}}
										>
											I have an offer code
										</Typography>
										<div className={hasOffercode ? "open" : "close"}>
											<TextField
												name="firstName"
												form={true}
												value={data.offerCode}
												onChange={(event) => {
													setData({
														...data,
														"offerCode": event.target.value,
													});
												}}
												label="Enter Offer Code"
												materialProps={{
													"data-testid": "offer",
													maxLength: "10",
												}}
											/>
										</div>

										<Grid className="alignButton">
											<ButtonPrimary
												data-testid="contButton"
												stylebutton='{"background": "#FFBC23", "color":"black"}'
												onClick={handleRoute}
											>
												Continue
											</ButtonPrimary>
										</Grid>
									

										<Typography variant="p" align="center">
											Checking your offers will not impact your credit score.*
										</Typography>
									</Grid>
									<Grid className="alignTextInsideCard justifyText">
										<Typography
											data-testid="descriptionInside"
											className="alignText justifyText"
											variant="p"
											align="center"
										>
											†We offer personal loans from $1,000 to $25,000, with
											minimum and maximum amounts dependent on an applicant’s
											state of residence and the underwriting of the loan. Loans
											between $1,500 and $15,000 may be funded online. Loans
											greater than $15,000 or less than $1,500 are funded
											through our branch network. Specific interest rates and
											fees are determined as permitted under applicable state
											law and depend upon loan amount, term, and the applicant’s
											ability to meet our credit criteria, including, but not
											limited to, credit history, income, debt payment
											obligations, and other factors such as availability of
											collateral. Not all rates and loan amounts are available
											in all states. Not all applicants will qualify for the
											lowest rates or larger loan amounts, which may require a
											first lien on a motor vehicle not more than ten years old
											titled in the applicant’s name with valid insurance.
										</Typography>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
						<Grid
							xs={11}
							sm={10}
							md={10}
							lg={10}
							xl={10}
							data-testid="descriptionOutside"
							className="alignSmallText"
							container
							justify="center"
							alignItems="center"
						>
							<Typography
								className="smallText justifyText"
								variant="p"
								align="justify"
							>
								To help the government fight the funding of terrorism and money
								laundering activities, Federal law requires all financial
								institutions to obtain, verify, and record information that
								identifies each person who opens an account. As a result, under
								our customer identification program, we must ask for your name,
								street address, mailing address, date of birth, and other
								information that will allow us to identify you. We may also ask
								to see your driver's license or other identifying documents.
							</Typography>
							<br />
							<Typography
								className="smallText justifyText"
								variant="p"
								align="justify"
							>
								*The process uses a “soft” credit inquiry to determine whether a
								loan offer is available, which does not impact your credit
								score. If you continue with the application process online and
								accept a loan offer, or are referred to a branch and continue
								your application there, we will pull your credit report and
								credit score again using a “hard” credit inquiry. This “hard”
								credit inquiry may impact your credit score.
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</div>
		</div>
	);
}

export default CheckMyOffers;
