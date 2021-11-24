import "./CheckMyOffer.css";
import "../CheckMyOffer.css";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {ButtonPrimary, Slider, TextField} from "../../../FormsUI";
import Paper from "@material-ui/core/Paper";
import React, {useContext, useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import ScrollToTopOnMount from '../ScrollToTop';
import {CheckMyOffers as Check} from "../../../../contexts/CheckMyOffers";
import { toast } from "react-toastify";



//initializing check my offers functonal component 
function CheckMyOffers(props) {
	const { data, setData, resetData } = useContext(Check);
	const [hasOfferCode, setOfferCode] = useState('');
	const [select, setSelect] = useState(null);
	const history = useHistory();

	useEffect(() => {
		
		if(data.formStatus === '' || data.completedPage === 0 || data.formStatus === 'completed' || props.location.fromLoanPurpose !== 'yes'){
			setData({ ...data, "loading": true });
			resetData();
			setSelect(data.loanAmount ? data.loanAmount : 10000)
		}	 
	 }, []);

	 if(data?.isActiveUser === "closed"){
		
		toast.error("Your account is closed to new applications. Please contact us to reapply.", {
			position: "bottom-left",
			autoClose: 2500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		  });
		  history.push({
			pathname: "/customers/accountOverview",
		});
	}
	const handleRoute = (e) => {
		data.loanAmount = select;
		data.formStatus = 'started';
		data.completedPage = data.page.selectAmount;
		setData({ ...data, "loanAmount": select });
		history.push({
			pathname: "/loan-purpose",
		});
	};

	// jsx part
	return (
		<div>
			<ScrollToTopOnMount />
			<div className="mainDiv">
				<Box>
					<Grid item xs={12} container justifyContent="center" alignItems="center" >
						<Grid item
							xs={11}
							sm={10}
							md={6}
							lg={6}
							xl={6}
							className="cardWrapper"
						    style={{paddingTop:"70px"}}
						>
							<Paper className="card" justify="center" alignitems="center">
								<Typography variant="h5" align="center" className="borrowCSS CMOHeading">
									Tell us how much you would like to borrow
								</Typography>
								<Grid item
									xs={12}
									className="alignSlider"
									container
									justifyContent="center"
									alignItems="center"
								>
									<Grid item xs={11} sm={10} md={8} lg={8} xl={8}>
										<Slider
											className="setSlider"
											name="slider"
											defaultValue={select ? select : 10000}
											setSelect={setSelect}
											label="Select Loan Amount"
										/>
									</Grid>
								</Grid>
								<Grid item
									xs={12}
									className="alignSlider"
									container
									justifyContent="center"
									alignItems="center"
								>
									<Grid  item
										xs={11}
										sm={10}
										md={8}
										lg={8}
										xl={8}
									>
										<Typography
											data-testid="offerCodeTriggerText"
											className="setGreenColor cursorPointer"
											align="center"
											onClick={(e) => {
												setOfferCode(!hasOfferCode);
											}}
										>
											I have an offer code
										</Typography>
										</Grid>
										<Grid  item
										xs={11}
										sm={10}
										md={8}
										lg={8}
										xl={8}
									>
										<div className={hasOfferCode ? "open" : "close"}>
											<TextField
												name="offerCode"
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
													"data-test-id": "offer",
													maxLength: "10",
												}}
											/>
										</div>
										</Grid>
										<Grid  item
										xs={11}
										sm={10}
										md={8}
										lg={8}
										xl={8}
									>
										<Grid  className="alignButton">
											<ButtonPrimary
												data-testid="contButton"
												stylebutton='{"background": "#FFBC23", "color":"black"}'
												onClick={handleRoute}
												disabled={data.loading}
											>
											<Typography align="center" className="textCSS ">
												Continue
											</Typography>
											<i
                                                    className="fa fa-refresh fa-spin customSpinner"
                                                    style={{
                                                        marginRight: "10px",
                                                        display: data.loading ? "block" : "none",
                                                    }}
                                                />
											</ButtonPrimary>
										</Grid>
										</Grid>

										<Typography  align="center">
											Checking your offers will not impact your credit score.*
										</Typography>
									<Grid className="alignTextInsideCard justifyText">
										<Typography
											data-testid="descriptionInside"
											className="alignText justifyText"
											
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
						<Grid item
							xs={11}
							sm={10}
							md={10}
							lg={10}
							xl={10}
							data-testid="descriptionOutside"
							className="alignSmallText"
							container
							justifyContent="center"
							alignItems="center"
							style={{paddingTop:"25px",paddingBottom:"70px"}}
						>
							<Typography
								className="smallText" align="center"
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
							<Typography className="smallText" align="center"
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
