import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { citizenshipData } from "../../../../assets/data/constants";
import CitizenshipStatusLogo from "../../../../assets/icon/I-Citizenship-status.png";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";

import { ButtonPrimary } from "../../../FormsUI";
import ScrollToTopOnMount from "../ScrollToTop";
import { preLoginStyle } from "../../../../assets/styles/preLoginStyle"
import "./CitizenshipStatus.css";

	//styling
	const useStyles = makeStyles((Theme) =>
		createStyles({
			paperStyle: {
					justify: "center",
					alignItems: "center",
					width: "inherit",
					textAlign: "center"
			},
			gridStyle:{
					padding: "4% 0px 4% 0px"
			}
		})
	);

//Initializing functional component CitizenshipStatus
function CitizenshipStatus() {
	//Retrieving Context values
	const { data } = useContext(CheckMyOffers);
	const [ citizenship, setCitizenship ] = useState(data.citizenship ? data.citizenship : "");
	const navigate = useNavigate();
	const classes = preLoginStyle();
	const innerClasses = useStyles();

	//Handle the button click
	const handleRoute = () => {
		data.citizenship = citizenship;
		data.completedPage = data.page.citizenship;
		navigate("/home-address");
	};

	//Procced to next step with validation
	const goNext = (val) => {
		data.citizenship = val;
		setCitizenship(val);
		if (data.completedPage < data.page.citizenship) {
			data.completedPage = data.page.citizenship;
			navigate("/home-address");
		}
		//redirects to select amount on direct call
	};
	if (
		data.completedPage < data.page.loanPurpose ||
		data.formStatus === "completed"
	) {
		navigate("/select-amount");
	}
	//JSK part
	return (
		<div>
			<ScrollToTopOnMount />
			<div className={classes.mainDiv}>
				<Box>
					<Grid
						item
						xs={ 12 }
						container
						justifyContent="center"
						alignItems="center"
						className={innerClasses.gridStyle}
					>
						<Grid
							container
							item
							xs={ 11 }
							sm={ 10 }
							md={ 6 }
							lg={ 6 }
							xl={ 6 }
							className="cardWrapper"
							justifyContent="center"
							alignItems="center"
						>
							<Paper
								id="citizenshipWrap"
								className={innerClasses.paperStyle}
							>
								<div className="progress mt-0">
									<div id="determinate" className="det2 determinate slantDiv" />
									<span className="floatLeft detNum2">17%</span>
								</div>
								<Grid className="floatLeft">
									<Link className="arrowBack" to="/loan-purpose">
										<i className="material-icons dp48 yellowText floatingButton">
											arrow_back
										</i>
									</Link>
								</Grid>
								<Grid>
									<img
										alt="Citizenship"
										src={ CitizenshipStatusLogo }
										className="spinAnimation"
									/>
								</Grid>

								<Typography
									variant="h6"
									className="checkMyOfferText borrowCSSLP "
								>
									Describe your citizenship status
								</Typography>
								<Grid
									item
									md={ 12 }
									className="blockDiv"
									container
									justifyContent="center"
									alignItems="center"
								>
									<Grid
										container
										justifyContent="center"
										alignItems="center"
										item
										lg={ 8 }
										md={ 8 }
										xs={ 12 }
									>
										<Paper
											id="usButton"
											elevation={ 3 }
											data-test-id="usCitizen"
											className={
												citizenship === citizenshipData.USCitizen
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={ () => {
												goNext(citizenshipData.USCitizen);
											} }
										>
											U.S Citizen
										</Paper>
									</Grid>
									<Grid item lg={ 8 } md={ 8 } xs={ 12 }>
										<Paper
											id="permanentResidentButton"
											elevation={ 3 }
											data-test-id="permanentResident"
											className={
												citizenship === citizenshipData.permanentResident
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={ () => {
												goNext(citizenshipData.permanentResident);
											} }
										>
											Permanent Resident
										</Paper>
									</Grid>
									<Grid item lg={ 8 } md={ 8 } xs={ 12 }>
										<Paper
											id="foreignResidentButton"
											elevation={ 3 }
											data-test-id="foreignResident"
											className={
												citizenship === citizenshipData.foreignResident
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={ () => {
												setCitizenship(citizenshipData.foreignResident);
											} }
										>
											Foreign Resident
										</Paper>
									</Grid>

									<h4
										className={
											citizenship === citizenshipData.foreignResident ? "showMsg" : "hideMsg"
										}
									>
										We are sorry. We do not offer loans to foreign residents.
									</h4>

									<Grid item lg={ 8 } md={ 8 } xs={ 12 } className="alignButton">
										<ButtonPrimary
											onClick={ handleRoute }
											data-test-id="citizenshipContButton"
											disabled={
												citizenship === "" || citizenship === citizenshipData.foreignResident
											}
											stylebutton='{"background": "#FFBC23", "color": "black","fontSize":"0.938rem" , "padding": "0px 30px"}'
										>
											Continue
										</ButtonPrimary>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
					</Grid>
				</Box>
			</div>
		</div>
	);
}

export default CitizenshipStatus;
