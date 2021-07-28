import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { SocialSecurityNumber, Button, Checkbox } from "../../FormsUI";
import Paper from "@material-ui/core/Paper";
import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import SSNLogo from "../../../assets/icon/I-SSN.png";
import { useFormik, Formik } from "formik";
import * as yup from "yup";
import { CheckMyOffers } from "../../../contexts/CheckMyOffers";
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
import "../checkMyOffer.css";
import {
	checkMyOfferSubmit,
	testing,
} from "../../controllers/checkMyOffersController";


function SSN() {
	const { data } = useContext(CheckMyOffers);
	const history = useHistory();
	const [agree, setAgree] = useState();
	const [delaware, serDelaware] = useState();
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
	  setOpen(true);
	};
	const handleClose = () => {
	  setOpen(false);
	};

	const handleOnClick = (event) => {
		console.log("finalData:", data);
		console.log(checkMyOfferSubmit(data));
		setAgree(false);
		console.log(agree);
	}
console.log(agree);
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
												className="textBlockWithLessMargin"
											>
												<Checkbox
													name="termsOfService"
													labelform="Terms & Service"
													value= {agree}
													onChange={(e) => { setAgree(e.target.value) }}
													label={
														<p className="agreeText">
															By clicking this box you acknowledge that you have
															received, reviewed and agree to the
															<br />
															<br />
															<a
																className="formatURL"
																href={
																	"https://loans.marinerfinance.com/application/form"
																}
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
															>
																Credit and Contact Authorization,{" "}
															</a>
															<br />
															<a
																className="formatURL"
																href={
																	"https://loans.marinerfinance.com/application/form"
																}
															>
																Website Terms of Use,{" "}
															</a>
															<br />
															<a
																className="formatURL"
																href={
																	"https://loans.marinerfinance.com/application/form"
																}
															>
																Website Privacy Statement.
															</a>
														</p>
													}
													required={true}
													stylelabelform='{ "color":"" }'
													stylecheckbox='{ "color":"blue" }'
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
												<Button
													onClick={handleOnClick}
													stylebutton='{"background": "#FFBC23", "height": "inherit", "color": "black"}'
												>
													<Typography align="center" className="textCSS ">
														Check My Offer
													</Typography>
												</Button>
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
				<Button
					stylebutton='{"background": "#FFBC23", "color": "black", "border-radius": "50px"}'
					onClick={handleClose}
					className="modalButton"
				>
					<Typography align="center">
						Ok
					</Typography>
				</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default SSN;
