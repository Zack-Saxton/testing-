import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReferToBranchLogo from "../../../../assets/gallery/Referred-to-Branch.png";
import { preLoginStyle } from "../../../../assets/styles/preLoginStyle";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import { ButtonPrimary } from "../../../FormsUI";
import "../CheckMyOffer.css";
import ScrollToTopOnMount from "../ScrollToTop";
import globalMessages from "../../../../assets/data/globalMessages.json";

//reffered to branch functional component initialization
function ReferredToBranch(props) {
	//get context values
	const { data } = useContext(CheckMyOffers);
	const navigate = useNavigate();
	const classes = preLoginStyle();
	data.formStatus = "completed";

	useEffect(() => {
		//redirects to select amount of directly called
		if (data?.completedPage < data?.page?.ssn && data?.applicationStatus?.toLowerCase() !== "referred" && props?.location?.formcomplete?.toLowerCase() !== "yes") {
			navigate("/select-amount");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	window.onbeforeunload = null;

	//JSX part
	return (
		<div data-testid = "referredToBranch_Component">
			<ScrollToTopOnMount />
			<div className={classes.mainDiv}>
				<Box>
					<Grid
						container
						item
						xs={12}
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
								sm={10}
								md={7}
								lg={7}
								xl={7}
								className="congratulationsImg row"
								container
								justifyContent="center"
								alignItems="center"
							>
								<img data-testid = "ReferToBranchLogo" src={ReferToBranchLogo} alt="NoOffersAvailable" />
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
								className=" row"
								container
								justifyContent="center"
								alignItems="center"
							>
								<Typography
									data-testid="congratsTypography"
									id="referCongratsTxt"
									variant="h3"
									className="margin2p mainTextMsg smallLineHeight"
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
								data-testid="receiveMoneyGrid"
								className=" row"
								container
								justifyContent="center"
								alignItems="center"
							>
								<Typography
									variant="h6"
									className="smallTextImgNoOffOne smallTextImg"
								>
									Your local representative is waiting to talk to you.
								</Typography>
								<Typography
									variant="h6"
									className="smallTextImgNoOff smallTextImg "
								>
									Complete the application process from the comfort of your home
									and you could receive your money as soon as today*
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
								className="bottomSpace "
								container
								justifyContent="center"
								alignItems="center"
							>
								<Grid
									container
									justifyContent="center"
									alignItems="center"
									mt={3}
								>
									<ButtonPrimary
										stylebutton='{"background": "", "color":"","marginRight":"10px"}'
										href="customers/myBranch"
										data-testid = "finishByPhone_button"
									>
										Finish by Phone
									</ButtonPrimary>
									<ButtonPrimary
										stylebutton='{"background": "", "color":""}'
										href="customers/myBranch"
										data-testid = "finishByBranch_button"
									>
										Finish by Branch
									</ButtonPrimary>
								</Grid>
								<br />
								<Typography data-testid="beforeVisitingTypography"
									variant="h6"
									className=" smallTextImg beforeVisitOne"
								>
									Things you should know before you call or visit.
								</Typography>
								<Typography data-testid="precautionsTypography"
									variant="h6"
									className=" minText beforeVisit"
								>
									Mariner Branch locations are still open and operational;
									however, due to the health risks surrounding COVID-19, Mariner
									will not be accepting unscheduled walk-ins at this time.
									Instead, please call to schedule an appointment to meet with
									one of our team members or finish the process by phone in the
									comfort your home.*
								</Typography>
								<div data-testid="loanApprovalTextDiv" className="leftAlign">
									<Typography
										variant="h6"
										className=" minText bullet leftAlignment"
									>
										{"It's"} a good idea to know how much money you make a year.
									</Typography>
									<Typography
										variant="h6"
										className=" minText bullet leftAlignment"
									>
										pen and paper may be helpful to take note of any documents
										you may need at loan closing.
									</Typography>
								</div>
								<Typography data-testid="loanApprovalApplicationTypography"
									variant="h6"
									className="minText"
								>
							    {globalMessages.Approval_Loan}
							    </Typography>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</div>
		</div>
	);
}

ReferredToBranch.propTypes = {
	location: PropTypes.object,
};

export default ReferredToBranch;
