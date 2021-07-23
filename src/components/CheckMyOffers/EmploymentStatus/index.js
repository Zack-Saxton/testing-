import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { TextField, Button } from "../../FormsUI";
import Paper from "@material-ui/core/Paper";
import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import EmploymenyStatus from "../../../assets/icon/I-Employment-Status.png";
import { CheckMyOffers } from "../../../contexts/CheckMyOffers";
import "./employmentStatus.css";

function CitizenshipStatus() {
	const { data, setData } = useContext(CheckMyOffers);
	const [error, setError] = useState();
	const [helperText, setHelperText] = useState();
	const [employmentStatus, setEmploymentStatus] = useState(
		data.employmentStatus ? data.employmentStatus : ""
	);
	const history = useHistory();
	// useEffect(() => {
	// 	// Update the document title using the browser API
	// 	if(employmentStatus === 'Unemployed' || employmentStatus === 'Retired')
	// 	{
	// 		setData({ ...data, ["yearsAtEmployers"]: '0' });		
	// 	}
		
	//   });
	const handleRoute = () => {
		if (
			employmentStatus === "Hourly" ||
			employmentStatus === "Salary" || 
			employmentStatus === "selfEmployed"
		) {
			if (data.yearsAtEmployers !== "") {
				// alert("nil value");
				setError(false);
				setHelperText("");
				data.employmentStatus = employmentStatus;
				history.push("/annual-income");
			} else {
				// alert("Enter Anual income");
				setError(true);
				setHelperText("Enter Years at employer");
			}
		} else {
			setError(false);
			setHelperText("");
			// alert(employmentStatus);
			data.employmentStatus = employmentStatus;
			history.push("/annual-income");
		}
	};

	const onHandleChange = (event) => {
		const reg = /^[0-9\b]+$/;
		let acc = event.target.value;

		if (acc === "" || reg.test(acc) ) {
		
			setData({ ...data, ["yearsAtEmployers"]: parseInt(event.target.value ? event.target.value : '0') });
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
										className="det42 determinate slantDiv"
									></div>
									<span class="floatLeft detNum42">42%</span>
								</div>
								<Grid className="floatLeft">
									<Link to="/personal-info">
										<i class="material-icons dp48 yellowText  ">arrow_back</i>
									</Link>
								</Grid>
								<Grid>
									<img
										alt="Employment"
										src={EmploymenyStatus}
										className="spinAnimation"
									/>
								</Grid>

								<Typography
									variant="h5"
									align="center"
									justify="center"
									alignItems="center"
									className="borrowCSS"
								>
									Tell us about your employment status
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
											data-testid="Hourly"
											className={
												employmentStatus === "Hourly"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setEmploymentStatus("Hourly");
											}}
										>
											Employed - Hourly
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										<Paper
											elevation={3}
											data-testid="Salary"
											className={
												employmentStatus === "Salary"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setEmploymentStatus("Salary");
											}}
										>
											Employed - Salaried
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										<Paper
											elevation={3}
											data-testid="selfEmployed"
											className={
												employmentStatus === "selfEmployed"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setEmploymentStatus("selfEmployed");
											}}
										>
											Self Employed / 1099
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										<Paper
											elevation={3}
											data-testid="Unemployed"
											className={
												employmentStatus === "Unemployed"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setEmploymentStatus("Unemployed") ; setData({ ...data, ["yearsAtEmployers"]: 0 });
											}}
										>
											Unemployed
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										<Paper
											elevation={3}
											data-testid="Retired"
											className={
												employmentStatus === "Retired"
													? "activeBorder radioBlock "
													: "radioBlock "
											}
											onClick={() => {
												setEmploymentStatus("Retired"); setData({ ...data, ["yearsAtEmployers"]: 0 });
											}}
										>
											Retired
										</Paper>
									</Grid>
									<Grid item lg={8} md={8} xs={12}>
										<TextField
											name="yearsAtEmployers"
											className={
												employmentStatus === "Hourly" ||
												employmentStatus === "Salary" ||
												employmentStatus === "selfEmployed"
													? "showMsg"
													: "hideMsg"
											}
										
											label="Years at Employer"
											form={true}
											error={error}
											helperText={helperText}
											value={data.yearsAtEmployers}
											// onChange= { (event) => {setData({ ...data, ['yearsAtEmployers']: event.target.value })}}
											onChange={onHandleChange}
											materialProps={{
												"data-testid": "yearsAtEmployee",
												maxLength: "2",
											}}
										/>
										{/* <TextField
                                         className={employmentStatus === 'Hourly' || employmentStatus === 'Salary' || employmentStatus === 'selfEmployed' ? "showMsg" : "hideMsg"} name="yearsAtEmployer" label="Years at employer" 
                                        //  value= {data.yearsAtEmployers}
                                        //  onChanle={onHandleChange}
                                         materialProps={{"maxLength": "10"}}
                                         /> */}
									</Grid>

									<Grid item lg={8} md={8} xs={12} className="alignButton">
										<Button
											onClick={handleRoute}
											data-testid="cntButton"
											disabled={employmentStatus === "" ? true : false}
											stylebutton='{"background": "#FFBC23", "height": "inherit", "color": "black"}'
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

export default CitizenshipStatus;
