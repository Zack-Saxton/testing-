import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CheckMyOffers as Check } from "../../../../contexts/CheckMyOffers";
import { ButtonPrimary, Slider, TextField } from "../../../FormsUI";
import "../CheckMyOffer.css";
import ScrollToTopOnMount from "../ScrollToTop";
import "./CheckMyOffer.css";

//initializing check my offers functonal component
function CheckMyOffers(props) {
	const { data, setData, resetData } = useContext(Check);
	const [ hasOfferCode, setOfferCode ] = useState("");
	const getValidValue = (selectedValue) => {
		let validValue = (selectedValue > 5000 && (selectedValue % 500) === 250 ? selectedValue + 250 : selectedValue);
		if (validValue < 1000) {
			return 1000;
		} else if (validValue > 25000) {
			return 25000;
		}
		return validValue;
	};
	let params = useParams();
	let selectedAmount = getValidValue(params?.amount);
	const [ select, setSelect ] = useState(data.loanAmount ? data.loanAmount : (selectedAmount ? parseInt(selectedAmount) : 10000));
	const navigate = useNavigate();
	let location = useLocation();
	useEffect(() => {
		if (selectedAmount) {
			data.loanAmount = select;
			data.formStatus = "started";
			data.completedPage = data.page.selectAmount;
			setData({ ...data, loanAmount: select, loading: false });
			navigate("/loan-purpose");
		} else if (data.formStatus === "" || data.completedPage === 0 || data.formStatus === "completed" || location?.fromLoanPurpose !== "yes") {
			setData({ ...data, loading: true });
			resetData();
			setSelect(data.loanAmount ? data.loanAmount : 10000);
		}
	}, []);

	if (data?.isActiveUser === "closed") {
		toast.error("Your account is closed to new applications. Please contact us to reapply.");
		navigate("/customers/accountOverview");
	}
	const handleRoute = (event) => {
		data.loanAmount = select;
		data.formStatus = "started";
		data.completedPage = data.page.selectAmount;
		setData({ ...data, loanAmount: select });
		navigate("/loan-purpose");
	};

	// jsx part
	return (
		<div>
			<ScrollToTopOnMount />
			<div className="mainDiv">
				<Box>
					<Grid
						item
						xs={ 12 }
						container
						justifyContent="center"
						alignItems="center"
					>
						<Grid
							item
							xs={ 11 }
							sm={ 10 }
							md={ 6 }
							lg={ 6 }
							xl={ 6 }
							className="cardWrapper"
							style={ { paddingTop: "4%" } }
						>
							<Paper
								className="checkMyOffersWrap"
								justify="center"
								alignitems="center"
								id="selectAmountWrap"
							>
								<Typography align="center" className="checkMyOffersHeading">
									Tell us how much you would like to borrow
								</Typography>
								<Grid
									item
									xs={ 12 }
									className="selectAmountGrid"
									container
									justifyContent="center"
									alignItems="center"
								>
									<Grid item xs={ 11 } sm={ 10 } md={ 8 } lg={ 8 } xl={ 8 }>
										<Slider
											id="sliderBar"
											className="setSlider"
											name="slider"
											defaultValue={ select ? select : 10000 }
											setSelect={ setSelect }
											label="Select Loan Amount"
										/>
									</Grid>
								</Grid>
								<Grid
									id="checkMyOffersText"
									item
									xs={ 12 }
									className="alignSlider"
									container
									justifyContent="center"
									alignItems="center"
								>
									<Grid item xs={ 11 } sm={ 10 } md={ 8 } lg={ 8 } xl={ 8 }>
										<Typography
											data-testid="offerCodeTriggerText"
											className="setGreenColor cursorPointer"
											align="center"
											onClick={ (event) => {
												setOfferCode(!hasOfferCode);
											} }
										>
											I have an offer code
										</Typography>
									</Grid>
									<Grid item xs={ 11 } sm={ 10 } md={ 8 } lg={ 8 } xl={ 8 }>
										<div className={ hasOfferCode ? "open" : "close" }>
											<TextField
												id="offerCodeInput"
												name="offerCode"
												form={ true }
												value={ data.offerCode }
												onChange={ (event) => {
													setData({
														...data,
														offerCode: event.target.value,
													});
												} }
												label="Enter Offer Code"
												materialProps={ {
													"data-test-id": "offer",
													maxLength: "10",
												} }
											/>
										</div>
									</Grid>
									<Grid item xs={ 11 } sm={ 10 } md={ 8 } lg={ 8 } xl={ 8 }>
										<Grid className="alignButton">
											<ButtonPrimary
												data-testid="contButton"
												stylebutton='{"background": "#FFBC23", "color":"black","fontSize":"15px","padding":"0px 30px"}'
												onClick={ handleRoute }
												disabled={ data.loading }
											>
												Continue
												<i
													className="fa fa-refresh fa-spin customSpinner"
													style={ {
														marginRight: "10px",
														display: data.loading ? "block" : "none",
													} }
												/>
											</ButtonPrimary>
										</Grid>
									</Grid>

									<Typography className="checkMyoffersSubHeading" align="center">
										Checking your offers will not impact your credit score.*
									</Typography>
									<Grid className="alignTextInsideCard justifyText">
										<Typography
											data-testid="descriptionInside"
											className="alignText justifyText checkMyOffersText"
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
							item
							xs={ 11 }
							sm={ 10 }
							md={ 10 }
							lg={ 10 }
							xl={ 10 }
							data-testid="descriptionOutside"
							className="alignSmallText"
							container
							justifyContent="center"
							alignItems="center"
							style={ { paddingTop: "25px", paddingBottom: "70px" } }
						>
							<Typography className="smallText" align="center">
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
							<Typography className="smallText" align="center">
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
