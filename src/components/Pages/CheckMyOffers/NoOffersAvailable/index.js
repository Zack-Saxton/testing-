import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoOffersAvailableLogo from "../../../../assets/gallery/No_Offers_Available.png";
import { preLoginStyle } from "../../../../assets/styles/preLoginStyle";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import { ButtonPrimary, ButtonSecondary } from "../../../FormsUI";
import "../CheckMyOffer.css";
import ScrollToTopOnMount from "../ScrollToTop";
import "./CheckMyOffer.css";

// NoOffersAvailable functional component initialization
function NoOffersAvailable(props) {
	const navigate = useNavigate();
	const classes = preLoginStyle();
	//handle
	const handleBlog = (event) => {
		window.open("https://www.marinerfinance.com/blog/", "_self");
	};
	const handleHome = (event) => {
		navigate("/customers/accountoverview");
	};
	const { data } = useContext(CheckMyOffers);
	data.formStatus = "completed";
	useEffect(() => {
		//Redirect to select amount if directly called
		if (data.completedPage < data.page.ssn && data.applicationStatus !== "rejected" && props?.location?.formcomplete !== "yes") {
			navigate("/select-amount");
		}
		return null;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	window.onbeforeunload = null;
	//view part
	return (
		<div>
			<ScrollToTopOnMount />
			<div className={ classes.mainDiv }>
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
								<img src={ NoOffersAvailableLogo } alt="NoOffersAvailable" />
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
									variant="h4"
									style={ {
										align: "center",
										justify: "center",
										alignItems: "center",
									} }
									className="lessBorrowCSS margin2p"
								>
									We are sorry!
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
								lg={ 7 }
								xl={ 7 }
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
										textAlign: "justify",
									} }
									className="lessBorrowCSS smalTextImgNoOff "
								>
									Unfortunately, we could not provide an offer for you at this
									time. However, you may reapply in 30 days if you feel that
									your circumstances have changed. Feel free to read our blog
									articles to understand how you can increase your credit score.
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
								className="bottomSpace "
								container
								justifyContent="center"
								alignItems="center"
							>
								<Grid
									item
									xs={ 7 }
									sm={ 6 }
									md={ 4 }
									lg={ 4 }
									xl={ 4 }
									className="alignButton paddingButton buttonStart"
									container
									justifyContent="center"
									alignItems="flex-start"
								>
									<ButtonSecondary
										stylebutton='{"background": "", "color":"", "fontSize": "0.938rem", "padding": "5px 30px" }'
										onClick={ handleBlog }
									>
										Blogs
									</ButtonSecondary>
								</Grid>
								<Grid
									item
									xs={ 7 }
									sm={ 6 }
									md={ 4 }
									lg={ 4 }
									xl={ 4 }
									className="alignButton paddingButton buttonEnd"
									container
									justifyContent="center"
									alignItems="center"
								>
									<ButtonPrimary
										stylebutton='{"background": "", "color":"", "fontSize": "0.938rem", "padding": "5px 30px"}'
										onClick={ handleHome }
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
