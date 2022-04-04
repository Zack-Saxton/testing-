import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CheckLoginStatus from "../../../App/CheckLoginStatus";
import { ButtonWithIcon } from "../../../FormsUI";
import ScrollToTopOnMount from "../../ScrollToTop";
import "../SelectOffer/SelectOffer.css";
import TabSection from "../TabSection";
import TabPanel from "../TabPanel"

//Styling part
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		color: theme.palette.text.secondary,
	},
	heading: {
		color: "#214476",
		fontWeight: "400",
		fontSize: "1.64rem",
	},
	centerGrid: {
		marginTop: "20px",
		paddingRight: "23px",
		paddingLeft: "23px",
	},
	greenText: {
		color: "green !important",
	},
	tabLabel: {
		background: "white",
		margin: "0px 20px 10px 0px",
		color: "#3f51b5",
		fontFamily: "'Muli', sans-serif !important",
		fontSize: "1rem",
		textTransform: "none",
		fontWeight: "700",
	},
	table: {
		minWidth: 650,
	},
	columnColor: {
		lineHeight: 0,
		color: "#0f4eb3",
		fontSize: 25,
		fontWeight: 400,
	},
	rightBorder: {
		padding: "0px 15px",
		borderRight: "1px solid",
		lineHeight: 1,
	},
	columnHeading: {
		fontSize: "14px",
		color: "#171717",
	},
	gridStyle: {
		width: "100%", 
		marginBottom: "20px"
	},
	textDecor: {
		textDecoration: "none"
	},
	tabPanelStyle: {
		paddingBottom: "300px", 
		marginTop: "10px"
	},
	paraTagStyle: {
		textAlign: "justify", 
		fontSize: "0.938rem", 
		lineHeight: "1.5"
	},
	fullWidth: {
		width: "100%"
	}
}));

// Initializing Recive your money component
export default function ReceiveYourMoney() {
	const classes = useStyles();
	//Initializing state variables
	const [ value, setValue ] = useState(3);
	const handleChange = (event, newValue) => setValue(newValue);

	//JSX part
	return (
		<div>
			<CheckLoginStatus />
			<ScrollToTopOnMount />
			<Grid
				container
				justifyContent="center"
				className={ classes.centerGrid }
			>
				<Grid
					item
					xs={ 12 }
					container
					direction="row"
					className={classes.gridStyle}
				>
					<Typography className={ classes.heading } variant="h3">
						<NavLink
							to="/customers/accountOverview"
							className={classes.textDecor}
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
						</NavLink>{ " " }
						Apply for a Loan
					</Typography>
				</Grid>
				<Grid item xs={ 12 }>
					<TabSection value={ value } handleChange={ handleChange } classes={ classes } ay={ 3 } />
					<TabPanel value={ value } index={ 3 } className={classes.tabPanelStyle}>
						<Grid item xs={ 12 } className={classes.fullWidth} container direction="row">
							<Paper className={ classes.paper }>
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
