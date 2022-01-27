import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ButtonPrimary } from "../../../FormsUI";
import Paper from "@material-ui/core/Paper";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CitizenshipStatusLogo from "../../../../assets/icon/I-Citizenship-status.png";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import ScrollToTopOnMount from "../ScrollToTop";
import "./CitizenshipStatus.css";

//Initializing functional component CitizenshipStatus
function CitizenshipStatus() {
	//Retrieving Context values
	const { data } = useContext(CheckMyOffers);
	const [citizenship, setCitizenship] = useState(data.citizenship ? data.citizenship : "");
	const history = useHistory();

	//Handle the button click
	const handleRoute = () => {
		data.citizenship = citizenship;
		data.completedPage = data.page.citizenship;
		history.push("/home-address");
	};

	//Procced to next step with validation
	const goNext = (val) => {
		data.citizenship = val;
		setCitizenship(val);
		if (data.completedPage < data.page.citizenship) {
			data.completedPage = data.page.citizenship;
			history.push("/home-address");
		}
		//redirects to select amount on direct call
	};
	if (
		data.completedPage < data.page.loanPurpose ||
		data.formStatus === "completed"
	) {
		history.push("/select-amount");
	}
	//JSK part
	return (
		<div>
			<ScrollToTopOnMount />
			<div className="mainDiv">
				<Box>
					<Grid
						item
						xs={12}
						container
						justifyContent="center"
						alignItems="center"
					>
						<Grid
							container
							item
							xs={11}
							sm={10}
							md={6}
							lg={6}
							xl={6}
							className="cardWrapper"
							justifyContent="center"
							alignItems="center"
						>
							<Paper
								id="citizenshipWrap"
								className="cardWOPadding"
								style={{
									justify: "center",
									alignItems: "center",
									width: "inherit",
									marginBottom: "10%",
									marginTop: "10%",
								}}
							>
								<div className="progress mt-0">
									<div id="determinate" className="det2 determinate slantDiv" />
									<span className="floatLeft detNum2">17%</span>
								</div>
								<Grid className="floatLeft">
									<Link to="/loan-purpose">
										<i className="material-icons dp48 yellowText  ">
											arrow_back
										</i>
									</Link>
								</Grid>
								<Grid>
									<img
										alt="Citizenship"
										src={CitizenshipStatusLogo}
										className="spinAnimation"
									/>
								</Grid>

								<Typography
									variant="h6"
									style={{
										align: "center",
										justify: "center",
										alignItems: "center",
									}}
									className="borrowCSSLP"
								>
									Describe your citizenship status
								</Typography>
								<Grid
									item
									md={12}
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
										lg={8}
										md={8}
										xs={12}
									>
										<Paper
											elevation={3}
											data-test-id="usCitizen"
											className={
												citizenship === "USA Citizen"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												goNext("USA Citizen");
											}}
										>
											U.S Citizen
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										<Paper
											elevation={3}
											data-test-id="permanentResident"
											className={
												citizenship === "Permanent Resident"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												goNext("Permanent Resident");
											}}
										>
											Permanent Resident
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										<Paper
											elevation={3}
											data-test-id="foreignResident"
											className={
												citizenship === "Foreign Resident"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setCitizenship("Foreign Resident");
											}}
										>
											Foreign Resident
										</Paper>
									</Grid>

									<h4
										className={
											citizenship === "Foreign Resident" ? "showMsg" : "hideMsg"
										}
									>
										We are sorry. We do not offer loans to foreign residents.
									</h4>

									<Grid item lg={8} md={8} xs={12} className="alignButton">
										<ButtonPrimary
											onClick={handleRoute}
											data-test-id="citizenshipContButton"
											disabled={
												citizenship === "" || citizenship === "Foreign Resident"
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
