import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EligibleForOffersLogo from "../../../../assets/gallery/Eligible-for-Offers.png";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import { ButtonPrimary } from "../../../FormsUI";
import "../CheckMyOffer.css";
import ScrollToTopOnMount from "../ScrollToTop";

//Initializing functional component EligibleForOffers
function EligibleForOffers(props) {
	const navigate = useNavigate();	
	
	//Handle button click redirecting to account overview page
	const handleRoute = async (event) => {
		navigate("/customers/selectOffer");
	};

	const { data } = useContext(CheckMyOffers);
	data.formStatus = "completed";	
	window.onbeforeunload = null;
	useEffect(() => {
		if (data.completedPage < data.page.ssn && data.applicationStatus !== "referred" && props?.location?.formcomplete !== "yes") {
			navigate("/select-amount");
		}
	}, []);
	//JSX part
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
							xs={ 12 }
							container
							justifyContent="center"
							alignItems="center"
						>
							<Grid
								item
								xs={ 11 }
								sm={ 10 }
								md={ 7 }
								lg={ 7 }
								xl={ 7 }
								className="cardWrapperImg row"
								container
								justifyContent="center"
								alignItems="center"
							>
								<img src={ EligibleForOffersLogo } alt="EligibleForOffers" />
							</Grid>
						</Grid>
						<br />
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
								className=" row"
								container
								justifyContent="center"
								alignItems="center"
							>
								<Typography
									id="CongratsTxt"
									variant="h3"
									style={ {
										align: "center",
										justify: "center",
										alignItems: "center",
									} }
									className="margin2p textWhite mainTextMsg"
								>
									Congratulations!
								</Typography>
							</Grid>
						</Grid>
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
								className=" row"
								container
								justifyContent="center"
								alignItems="center"
							>
								<Typography
									variant="h6"
									style={ {
										align: "center",
										justify: "center",
										alignItems: "center",
									} }
									className=" textWhite smalTextImg smalTextImgNoOff"
								>
									You are eligible for a loan offer*. <br />
									Complete your application process and receive your money as
									soon as the same day**
								</Typography>
							</Grid>
						</Grid>
						<Grid
							xs={ 12 }
							item
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
								className="bottomSpace "
								container
								justifyContent="center"
								alignItems="center"
							>
								<Grid
									item
									xs={ 7 }
									sm={ 6 }
									md={ 3 }
									lg={ 3 }
									xl={ 3 }
									className="  buttonWithSmallMargin"
									container
									justifyContent="center"
									alignItems="center"
								>
									<ButtonPrimary
										stylebutton='{"background": "", "color":"", "fontSize": "0.938rem","padding":"0px 30px"}'
										onClick={ handleRoute }
									>
										View Offers
									</ButtonPrimary>
								</Grid>
								<Typography
									variant="h6"
									className=" textWhite minText CongratsSmallTxt"
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
									variant="h6"
									className=" textWhite minText CongratsSmallTxt"
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

export default EligibleForOffers;
