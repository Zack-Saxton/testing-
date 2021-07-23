import Header from "../../Layout/NormalHeader/NormalHeader";
import Footer from "../../Layout/NormalFooter/NormalFooter";
import "../checkMyOffer.css";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Slider, TextField, Button } from "../../FormsUI";
import Paper from "@material-ui/core/Paper";
import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import CitizenshipStatusLogo from "../../../assets/icon/I-Citizenship-status.png";
import { CheckMyOffers } from "../../../contexts/CheckMyOffers";

function LivingPlace() {
	const { data, setData } = useContext(CheckMyOffers);
	const [error, setError] = useState();
	const [helperText, setHelperText] = useState();
	const [livingPlace, setLivingPlace] = useState(data.homeOwnership ?? "");
	const history = useHistory();
	// const handleRoute = () =>{
	//     data.livingPlace = livingPlace;
	//     history.push("/active-duty");
	//   }

	const handleRoute = () => {
		if (livingPlace === "Renting" || livingPlace === "HomeWithMortage") {
			if (data.rentMortageAmount !== "") {
				// alert("nil value");
				setError(false);
				setHelperText("");
				data.homeOwnership = livingPlace;
				history.push("/active-duty");
			} else {
				// alert("Enter Anual income");
				setError(true);
				setHelperText("Enter Years at employer");
			}
		} else {
			setError(false);
			setHelperText("");
			// alert(employmentStatus);
			data.homeOwnership = livingPlace;
			data.state === 'North Carolina' ? history.push("/active-duty") : history.push("/marital-status");
			if (data.state === 'North Carolina'){
				history.push("/active-duty")
			}
			else if (data.state === 'Wisconsin'){
				history.push("/marital-status")
			}
			else{
				history.push("/ssn")
			}
			// history.push("/active-duty");
		}
	};

	const onHandleChange = (event) => {
		const reg = /^[0-9\b]+$/;
		let acc = event.target.value;

		if (acc === "" || reg.test(acc)) {
			setData({ ...data, ["rentMortageAmount"]: parseInt(event.target.value ? event.target.value : '0')  });
		}
	};
	return (
		<div>
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
							justify="center"
							alignItems="center"
						>
							<Paper
								className="cardWOPadding"
								justify="center"
								alignItems="center"
							>
								<div className="progress mt-0">
									<div
										id="determinate"
										className="det75 determinate slantDiv"
									></div>
									<span class="floatLeft detNum75">75%</span>
								</div>
								<Grid className="floatLeft">
									<Link to="/annual-income">
										<i class="material-icons dp48 yellowText  ">arrow_back</i>
									</Link>
								</Grid>
								<Grid>
									<img src={CitizenshipStatusLogo} className="spinAnimation" />
								</Grid>

								<Typography
									variant="h5"
									align="center"
									justify="center"
									alignItems="center"
									className="borrowCSS"
								>
									Do you own or rent?
								</Typography>
								<Grid
									md={12}
									className="blockDiv"
									container
									justify="center"
									alignItems="center"
								>
									<Grid
										justify="center"
										alignItems="center"
										item
										lg={8}
										md={8}
										xs={12}
									>
										<Paper
											elevation={3}
											data-testid="Renting"
											className={
												livingPlace === "Renting"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setLivingPlace("Renting");
											}}
										>
											Renting
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										<Paper
											elevation={3}
											data-testid="HomeWithMortage"
											className={
												livingPlace === "HomeWithMortage"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setLivingPlace("HomeWithMortage");
											}}
										>
											Own a home with mortgage
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										<Paper
											elevation={3}
											data-testid="HomeWithNoMortage"
											className={
												livingPlace === "HomeWithNoMortage"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setLivingPlace("HomeWithNoMortage") ; setData({ ...data, ["rentMortageAmount"]: 0 });
											}}
										>
											Own a home with no mortgage
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										<Paper
											elevation={3}
											data-testid="MobileHome"
											className={
												livingPlace === "MobileHome"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setLivingPlace("MobileHome") ; setData({ ...data, ["rentMortageAmount"]: 0 });
											}}
										>
											Own a mobile home
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										<Paper
											elevation={3}
											data-testid="LivingWithRelatives"
											className={
												livingPlace === "LivingWithRelatives"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setLivingPlace("LivingWithRelatives"); setData({ ...data, ["rentMortageAmount"]: 0 });
											}}
										>
											Living with relatives
										</Paper>
									</Grid>

									<Grid item lg={8} md={8} xs={12}>
										{/* <TextField className={livingPlace === 'HomeWithMortage' || livingPlace === 'HomeWithMortage' ? "showMsg" : "hideMsg"} name="RentOrMortageAmount" label="Monthly Rent / Mortgage Amount" /> */}
										<TextField
											className={
												livingPlace === "Renting" ||
												livingPlace === "HomeWithMortage"
													? "showMsg"
													: "hideMsg"
											}
											name="RentOrMortageAmount"
											label="Monthly Rent / Mortgage Amount"
											form={true}
											error={error}
											helperText={helperText}
											value={data.rentMortageAmount}
											// onChange= { (event) => {setData({ ...data, ['yearsAtEmployers']: event.target.value })}}
											onChange={onHandleChange}
											materialProps={{
												"data-testid": "rentMortageAmount",
												maxLength: "5",
											}}
										/>
									</Grid>

									<Grid item lg={8} md={8} xs={12} className="alignButton">
										<Button
											onClick={handleRoute}
											data-testid="cntButton"
											disabled={livingPlace === "" ? true : false}
											stylebutton='{"background": "#FFBC23", "height": "inherit", "black": "white"}'
										>
											<Typography align="center" className="textCSS ">
												Continue
											</Typography>
										</Button>
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

export default LivingPlace;
