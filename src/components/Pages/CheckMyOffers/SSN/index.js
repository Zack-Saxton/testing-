import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {  ButtonPrimary , Checkbox } from "../../../FormsUI";
import Paper from "@material-ui/core/Paper";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SSNLogo from "../../../../assets/icon/Last-Step.png";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ScrollToTopOnMount from '../scrollToTop';
import "../checkMyOffer.css";
import {
	checkMyOfferSubmit as submitApplication
} from "../../../controllers/checkMyOffersController";


function  SSN() {
	let response = [];
	const { data, setData } = useContext(CheckMyOffers);
	const [agree, setAgree] = useState(false);
	const [agreeDelaware, setAgreeDelaware] = useState(data.state === "DE" ? false : true);
	const [agreeCalifornia, setAgreeCalifornia] = useState(data.state === "CA" ? false : true);
	const [agreeNewMexico, setAgreeNewMexico] = useState(data.state === "NM" ? false : true);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const handleClickOpen = () => {
	  setOpen(true);
	};
	const handleClose = () => {
	  setOpen(false);
	};

	const handleOnClick = async (event) => {
		
		data.completedPage = data.page.ssn;
		setLoading(true);
		
		response = await submitApplication(data);
		// checkMyOfferSubmitTest(data);
		// checkMyOfferSubmit(data);	
		setData({
			...data,
			"result": response.appSubmissionResult ? response.appSubmissionResult : null,
			"completedPage": data.page.ssn

		});
		// console.log("responce", response.appSubmissionResult.data);
		if(response.appSubmissionResult.status === 200){
			setData({
				...data,
				"result": response.appSubmissionResult,
				"completedPage": data.page.ssn,

			});

		
		if(response.appSubmissionResult && response.appSubmissionResult?.data?.data?.applicationStatus === 'offers_available'){
			console.log("valid");
			setData({
				...data,
				"applicationStatus": 'offers_available',
			});
					history.push({
						pathname: "/eligible-for-offers",
						formcomplete: "yes"
					});
		}
		else if(response.appSubmissionResult && response.appSubmissionResult.data.data.applicationStatus === 'rejected'){
			console.log("Invalid");
			setData({
				...data,
				"applicationStatus": 'rejected',
			});
					history.push({
						pathname: "/no-offers-available",
						formcomplete: "yes"
					});
		}
		else if(response.appSubmissionResult && response.appSubmissionResult.data.data.applicationStatus === 'referred'){
			// console.log("Invalid");
			setData({
				...data,
				"applicationStatus": 'referred',
			});
					history.push({
						pathname: "/reffered-to-branch",
						formcomplete: "yes"
					});
		}
	} else if(response.appSubmissionResult.status === 403) {
		console.log("Invalid");
		setData({
			...data,
			"applicationStatus": 'rejected',
		});
					history.push({
						pathname: "/no-offers-available",
						formcomplete: "yes"
					});
	} else{
		alert("Network Error");
		setLoading(false);
	}
	

	}

	if (data.completedPage < data.page.livingPlace || data.completedPage < data.page.activeDuty || data.formStatus === 'completed'){
		history.push("/select-amount");
	}
	return (
		<div>
			<ScrollToTopOnMount />
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
									<div id="determinate" className="det100  determinate "></div>
									<span class="floatLeft detNum3"></span>
								</div>
								<Grid className="floatLeft">
									
									<Link to= {data.state === 'WI' ? "/marital-status" : data.state === 'NC' ? '/active-duty' : 'living-place'}>
										<i class="material-icons dp48 yellowText  ">arrow_back</i>
									</Link>
								</Grid>
								<Grid className="liftImage">
									<img alt="ssn" src={SSNLogo} className="spinAnimation" />
								</Grid>

								<Typography
									variant="h5"
									align="center"
									justify="center"
									alignItems="center"
									className="borrowCSS"
								>
									One last step
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
												className="textBlockWithLessMargin"
											>
												{/* <SocialSecurityNumber
													disabled={true}
													value={data.ssn}
													name="ssn"
												/> */}
											</Grid>
											<Grid
												justify="center"
												alignItems="center"
												item
												lg={8}
												md={8}
												xs={12}
												className="textBlockWithLessMargin"
											>
												{/* <p className="subText">
													Your social security number is required to pull your
													credit information
												</p> */}
											</Grid>
											<Grid
												justify="left"
												alignItems="left"
												item
												lg={8}
												md={8}
												xs={12}
												className="positionHead"
											>
												<p className="agreeTextHead">Please acknowledge and sign our disclosures.</p>
											</Grid>
											<Grid
												justify="left"
												alignItems="left"
												item
												lg={8}
												md={8}
												xs={12}
												className="textBlockWithLessMargin"
											>
												<Checkbox
													name="termsOfService"
													labelform="Terms & Service"
													value= {agree}
													className="checkBoxClass"
													onChange={(e) => { setAgree(e.target.checked) }}
													label={
														<p className="agreeText">
															By clicking this box you acknowledge that you have
															received, reviewed and agree to the
															<br />
															
															<a
																className="formatURL"
																href={
																	"https://loans.marinerfinance.com/application/form"
																}
																target="_blank"
																rel="noreferrer noopener"
															>
																{" "}
																E-Signature Disclosure and Consent,{" "}
															</a>
															<br />
															<a
																className="formatURL"
																href={
																	"https://loans.marinerfinance.com/application/form"
																}
																target="_blank"
																rel="noreferrer noopener"
															>
																Credit and Contact Authorization,{" "}
															</a>
															<br />
															<a
																className="formatURL"
																href={
																	"https://loans.marinerfinance.com/application/form"
																}
																target="_blank"
																rel="noreferrer noopener"
															>
																Website Terms of Use,{" "}
															</a>
															<br />
															<a
																className="formatURL"
																href={
																	"https://loans.marinerfinance.com/application/form"
																}
																target="_blank"
																rel="noreferrer noopener"
															>
																Website Privacy Statement.
															</a>
														</p>
													}
													required={true}
													stylelabelform='{ "color":"" }'
													stylecheckbox='{ "color":"blue", "top": "0 px", "position": "absolute"}'
													stylecheckboxlabel='{ "color":"" }'
												/>
												<div className={
												data.state === "DE" 
												
													
													? "showMsg space"
													: "hideMsg space"
													// : "showMsg space"

											}>
												<Checkbox 
													name="delaware"
													labelform="delaware"
													value= {agreeDelaware}
													onChange={(e) => { setAgreeDelaware(e.target.checked) }}
													label={
														<p className="agreeText">
															By clicking this box you acknowledge that you have received and reviewed the {" "}
														
															<span className="linkText" onClick={handleClickOpen}>
																Delaware Itemized Schedule Of Charges.,{" "}
															</span>
														</p>
													}
													stylelabelform='{ "color":"" }'
													stylecheckbox='{ "color":"blue" }'
													stylecheckboxlabel='{ "color":"" }'
												/>
												</div>
												<div className={
												data.state === "CA" 
												
													
													? "showMsg space"
													: "hideMsg space"
													// : "showMsg space"

											}>
												<Checkbox 
													name="california"
													labelform="california"
													value= {agreeCalifornia}
													onChange={(e) => { setAgreeCalifornia(e.target.checked) }}
													label={
														<p className="agreeText">
															By clicking this box you acknowledge that you have been offered and had the opportunity to review this {" "}
														
															<a
																className="formatURL"
																href={
																	"https://lms.moneyskill.org/yourcreditrating/module/mariner/en"
																}
																target="_blank"
																rel="noreferrer noopener"
															>
																Credit Education Program
															</a>
														</p>
													}
													stylelabelform='{ "color":"" }'
													stylecheckbox='{ "color":"blue" }'
													stylecheckboxlabel='{ "color":"" }'
												/>
												</div>
												<div className={
												data.state === "NM" 
												
													
													? "showMsg space"
													: "hideMsg space"
													// : "showMsg space"

											}>
												<Checkbox 
													name="newmexico"
													labelform="newmexico"
													value= {agreeNewMexico}
													onChange={(e) => { setAgreeNewMexico(e.target.checked) }}
													label={
														<p className="agreeText">
															NM Residents: By clicking this box you acknowledge that you have reviewed the Important Consumer Information in Mariner’s New Mexico Consumer Brochure located at {" "}
														
															<a
																className="formatURL"
																href={
																	"http://marfi.me/NMBrochure."
																}
																target="_blank"
																rel="noreferrer noopener"
															>
																http://marfi.me/NMBrochure.
															</a>
														</p>
													}
													stylelabelform='{ "color":"" }'
													stylecheckbox='{ "color":"blue" }'
													stylecheckboxlabel='{ "color":"" }'
												/>
												</div>
											</Grid>

											<Grid
												justify="center"
												alignItems="center"
												item
												lg={8}
												md={8}
												xs={12}
												className="textBlockWithLessMargin alignButtonExtra alignButton"
											>
												<ButtonPrimary
													disabled = { loading ? loading : !(agree && agreeDelaware && agreeCalifornia && agreeNewMexico)}
													onClick={handleOnClick}
													stylebutton='{"background": "#FFBC23", "height": "inherit", "color": "black"}'
												>
													<Typography align="center" className="textCSS button">
														Check My Offer
														{/* {loading && (	 */}
														
														{/* )}
														{loading && <span>Checking your offer</span>}
														{!loading && <span>Check My Offers</span>} */}
													</Typography>
													<i
															className="fa fa-refresh fa-spin customSpinner"
															style={{ marginRight: "10px", display: loading ? "block" : "none" }}
															/>
												</ButtonPrimary>
											</Grid>
										</Grid>
								
							</Paper>
						</Grid>
					</Grid>
				</Box>
			</div>
			<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
				Delware Itemized Shedule of Charges
				</DialogTitle>
				<DialogContent dividers>
				<Typography align="center" className="textCSS modalText"> Itemized Schedule of Charges (DE) </Typography>
				<Typography align="center" className="textCSS modalText"> Closed End Loans </Typography>
				<TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className="tableHeader">Description</TableCell>
            <TableCell align="center" className="tableHeader">Fee</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
            <TableRow>
              <TableCell align="center"> Periodic Interest </TableCell>
              <TableCell align="center">0.00% - 36.00%</TableCell>
            </TableRow>
			<TableRow>
              <TableCell align="center"> Recording/Satisfaction Fee </TableCell>
              <TableCell align="center">$23 - 151</TableCell>
            </TableRow>
			<TableRow>
              <TableCell align="center"> Legal Fee </TableCell>
              <TableCell align="center">Actual cost Incurred</TableCell>
            </TableRow>
			<TableRow>
              <TableCell align="center"> Repossession Fee </TableCell>
              <TableCell align="center">Actual cost Incurred</TableCell>
            </TableRow>
			<TableRow>
              <TableCell align="center"> Late Fee </TableCell>
              <TableCell align="center">5% of Unpaid Installment</TableCell>
            </TableRow>
			<TableRow>
              <TableCell align="center"> Bad Check Fee </TableCell>
              <TableCell align="center">$15</TableCell>
            </TableRow>
			<TableRow>
              <TableCell align="center"> Check by Phone Fee </TableCell>
              <TableCell align="center">$6</TableCell>
            </TableRow>
			<TableRow>
              <TableCell align="center"> Internet Payment Fee </TableCell>
              <TableCell align="center">$2</TableCell>
            </TableRow>
			<TableRow>
              <TableCell align="center"> Loan by Mail Commitment Fee </TableCell>
              <TableCell align="center">$10</TableCell>
            </TableRow>
			<TableRow>
              <TableCell align="center"> Refinancing Fee </TableCell>
              <TableCell align="center">$150</TableCell>
            </TableRow>
			<TableRow>
              <TableCell align="center"> Non-Filing Insurance </TableCell>
              <TableCell align="center">$25</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
				
				</DialogContent>
				<DialogActions className="modalAction">
				<ButtonPrimary
					stylebutton='{"background": "#FFBC23", "color": "black", "border-radius": "50px"}'
					onClick={handleClose}
					className="modalButton"
				>
					<Typography align="center">
						Ok
					</Typography>
				</ButtonPrimary>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default SSN;
