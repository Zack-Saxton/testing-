import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EligibleForOffersLogo from "../../../../assets/gallery/Eligible-for-Offers.png";
import { preLoginStyle } from "../../../../assets/styles/preLoginStyle";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import { ButtonPrimary } from "../../../FormsUI";
import "../CheckMyOffer.css";
import ScrollToTopOnMount from "../ScrollToTop";

//Initializing functional component EligibleForOffers
function EligibleForOffers(props) {
	const navigate = useNavigate();
	const classes = preLoginStyle();
	//Handle button click redirecting to account overview page
	const handleRoute = async (event) => {
		navigate("/customers/selectOffer");
	};

	const { data } = useContext(CheckMyOffers);
	data.formStatus = "completed";
	window.onbeforeunload = null;
	useEffect(() => {
		if (data?.completedPage < data?.page?.ssn && data?.applicationStatus?.toLowerCase() !== "referred" && props?.location?.formcomplete?.toLowerCase() !== "yes") {
			navigate("/select-amount");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	//JSX part
	return (
		<div>
			<ScrollToTopOnMount />
			<div className={classes.mainDiv}>
				<Box>
					<Grid
						item
						xs={12}
						container
						justifyContent="center"
						alignItems="center"
					>
						<Grid
							item
							xs={12}
							container
							justifyContent="center"
							alignItems="center"
						>
							<Grid
								item
								xs={11}
								sm={5}
								md={4}
								lg={4}
								xl={4}
								className="cardWrapperImg row"
								container
								justifyContent="center"
								alignItems="center"
							>
								<img data-testid="EligibleForOffersImage" src={EligibleForOffersLogo} className="imgFullWidth" alt="EligibleForOffers" />
							</Grid>
						</Grid>
						<br />
						<Grid
							item
							xs={12}
							container
							justifyContent="center"
							alignItems="center"
						>
							<Grid
								item
								xs={11}
								sm={10}
								md={6}
								lg={6}
								xl={6}
								className="alignCenter row"
								container
								justifyContent="center"
								alignItems="center"
							>
								<Typography
									data-testid="congratsTypography"
									id="CongratsTxt"
									variant="h3"
									className="margin2p mainTextMsg"
								>
									Congratulations!
								</Typography>
							</Grid>
						</Grid>
						<Grid
							item
							xs={12}
							container
							justifyContent="center"
							alignItems="center"
						>
							<Grid
								item
								xs={11}
								sm={10}
								md={6}
								lg={6}
								xl={6}
								className=" row"
								container
								justifyContent="center"
								alignItems="center"
							>
								<Typography
									data-testid="eligibleTypography"
									variant="h6"
									className="smalTextImg smalTextImgNoOff"
								>
									You are eligible for a loan offer*. <br />
									Complete your application process and receive your money as
									soon as the same day**
								</Typography>
							</Grid>
						</Grid>
						<Grid
							xs={12}
							item
							container
							justifyContent="center"
							alignItems="center"
						>
							<Grid
								item
								xs={11}
								sm={10}
								md={6}
								lg={6}
								xl={6}
								className="bottomSpace "
								container
								justifyContent="center"
								alignItems="center"
							>
								<Grid
									item
									xs={7}
									sm={6}
									md={3}
									lg={3}
									xl={3}
									className="buttonWithSmallMargin"
									container
									justifyContent="center"
									alignItems="center"
								>
									<ButtonPrimary
										stylebutton='{"background": "", "color":"", "fontSize": "0.938rem","padding":"0px 30px"}'
										onClick={handleRoute}
									>
										View Offers
									</ButtonPrimary>
								</Grid>
								<Typography
									data-testid="loanFundingTypography"
									variant="h6"
									className=" minText CongratsSmallTxt"
								>
									*Loan funding and disbursement is conditioned upon our
									satisfactory review of any documents and other information
									that we require from you to verify your loan applications
									and/or your identity. This loan may not be consummated if you
									obtain another loan from us prior to our disbursing funds for
									this loan.
								</Typography>
								<br />
								<Typography
									data-testid="approvalLoanTextTypography"
									variant="h6"
									className=" minText CongratsSmallTxt"
								>
									**Approval of a loan and the loan disbursement process may
									take longer if additional documentation is required. Loan
									terms may vary based on credit determination and state law.
									Completion of a loan application will result in a hard credit
									pull.
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</div>
		</div>
	);
}

EligibleForOffers.propTypes = {
	location: PropTypes.object,
};

export default EligibleForOffers;
