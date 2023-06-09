import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoOffersAvailableLogo from "../../../../assets/gallery/No_Offers_Available.png";
import { preLoginStyle } from "../../../../assets/styles/preLoginStyle";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import { ButtonPrimary, ButtonSecondary } from "../../../FormsUI";
import globalMessages from "../../../../assets/data/globalMessages.json"
import "../CheckMyOffer.css";
import ScrollToTop from "../ScrollToTop";
import "./CheckMyOffer.css";

// NoOffersAvailable functional component initialization
function NoOffersAvailable(props) {
	const navigate = useNavigate();
	const classes = preLoginStyle();
	//handle
	const handleBlog = (_event) => {
		window.open(`${ process.env.REACT_APP_WEBSITE }/blog/`, "_self");
	};
	const handleHome = (_event) => {
		navigate("/customers/accountoverview");
	};
	const { data } = useContext(CheckMyOffers);
	data.formStatus = "completed";
	useEffect(() => {
		//Redirect to select amount if directly called
		if (data.completedPage < data?.page?.ssn && data?.applicationStatus?.toLowerCase() !== "rejected" && props?.location?.formcomplete?.toLowerCase() !== "yes") {
			navigate("/select-amount");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	window.onbeforeunload = null;
	//view part
	return (
		<div>
			<ScrollToTop />
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
								sm={10}
								md={7}
								lg={7}
								xl={7}
								className="cardWrapperImg row"
								container
								justifyContent="center"
								alignItems="center"
							>
								<img data-testid="noOffersAvailableImage" className="noOffersAvailableImage" src={NoOffersAvailableLogo} alt="NoOffersAvailable" />
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
									data-testid="noOffersTypography"
									variant="h4"
									className="mobileFontSize lessBorrowCSS margin2p"
								>
									We are sorry!
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
								lg={7}
								xl={7}
								className=" row"
								container
								justifyContent="center"
								alignItems="center"
							>
								<Typography
									data-testid="noOffersBrifTypography"
									variant="h6"
									className="mobileFontParagraph lessBorrowCSS "
								>
									{ globalMessages.Could_Not_Provide_An_Offer }
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
								className="noOffersButtonWrap "
								container
								justifyContent="center"
								alignItems="center"
							>
								<Grid
									item
									xs={7}
									sm={6}
									md={4}
									lg={4}
									xl={4}
									className="paddingButton buttonStart"
									container
									justifyContent="center"
									alignItems="flex-start"
								>
									<ButtonSecondary
										stylebutton='{"background": "", "color":"", "fontSize": "0.938rem", "padding": "5px 30px" }'
										onClick={handleBlog}
									>
										Blog
									</ButtonSecondary>
								</Grid>
								<Grid
									item
									xs={7}
									sm={6}
									md={4}
									lg={4}
									xl={4}
									className="paddingButton buttonEnd"
									container
									justifyContent="center"
									alignItems="center"
								>
									<ButtonPrimary
										stylebutton='{"background": "", "color":"", "fontSize": "0.938rem", "padding": "5px 30px"}'
										onClick={handleHome}
									>
										Back to Home
									</ButtonPrimary>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</div>
		</div>
	);
}

NoOffersAvailable.propTypes = {
	location: PropTypes.object,
};

export default NoOffersAvailable;
