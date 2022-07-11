import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CheckLoginStatus from "../../../App/CheckLoginStatus";
import { ButtonWithIcon } from "../../../FormsUI";
import ScrollToTopOnMount from "../../ScrollToTop";
import "../SelectOffer/SelectOffer.css";
import { useStylesApplyForLoan } from "../Style";
import TabPanel from "../TabPanel";
import TabSection from "../TabSection";

// Initializing Recive your money component
export default function ReceiveYourMoney() {
	const classes = useStylesApplyForLoan();
	//Initializing state variables
	const [ value, setValue ] = useState(3);
	const handleChange = (_event, newValue) => setValue(newValue);

	//JSX part
	return (
		<div>
			<CheckLoginStatus />
			<ScrollToTopOnMount />
			<Grid
				container
				justifyContent="center"
				className={classes.centerGrid}
			>
				<Grid
					item
					xs={12}
					container
					direction="row"
					className={classes.gridStyle}
				>
					<Typography className={classes.applyLoanHeadingText} variant="h3">
						<NavLink
							to="/customers/accountOverview"
							className={classes.textDecoration}
						>
							<ButtonWithIcon
								icon="arrow_backwardIcon"
								iconposition="left"
								stylebutton='{"background": "#fff", "color":"#214476",
                        "minWidth": "0px",
                        "width": "36px",
                        "padding": "0px",
                        "marginRight": "5px", "marginTop":"unset" }'
								styleicon='{ "color":"" }'
							/>
						</NavLink>{" "}
						Apply for a Loan
					</Typography>
				</Grid>
				<Grid className={classes.receiveMoneyGrid} item xs={12}>
					<TabSection value={value} handleChange={handleChange} classes={classes} ay={3} />
					<TabPanel value={value} index={3} className={classes.tabPanelStyle}>
						<Grid item xs={12} className={classes.fullWidth} container direction="row">
							<Paper className={`${ classes.applicationPapper } ${ classes.paper }`}>
								<div>
									<h3>Your Application is Complete</h3>
									<p className={classes.paraTagStyle}>
										<b>
											Thank you for submitting your verification information!
										</b>
										<br />
										You should receive an email regarding the funds by the end
										of the next business day provided that we require no
										additional information, in which case we will reach out to
										you.
									</p>
								</div>
							</Paper>
						</Grid>
					</TabPanel>
				</Grid>
			</Grid>
		</div>
	);
}
