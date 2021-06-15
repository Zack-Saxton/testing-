import React from "react";
import { Formik, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Logo from "../../assets/images/MarinerLogo.png";
import { TextField, DataGrid, 
		TextFieldWithIcon, 
		Button, 
		ButtonWithIcon,
		PasswordWithIcon,
		EmailWithIcon,
		EmailTextField,
		PasswordField,
		SocialSecurityNumber,
		Slider,
		Checkbox,
		Select,
		Radio,
		Multiselect,
		DatePicker,
		TextArea,
		Zipcode,
		PhoneNumber,
		AccountNumber,
		BankRoutingNumber,
		AutoComplete,
		AutoCompleteMultiple,
		ButtonSwitch
	
	} from "../FormsUI";
import Month from "../../assets/data/month.json";
import "../App/app.css";
import RadioButtonBox from "../FormsUI/RadioButtonBox";

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: "20px",
		fontWeight: "bold",
	},
	pos: {
		marginBottom: 12,
	},
	form: {
		width: "25%",
	},
});

const INITIAL_FORM_STATE = {
	firstName: "",
	lastName: "",
};

export default function OutlinedCard() {
	const classes = useStyles();
	const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "firstName", headerName: "First name", width: 150 },
        { field: "lastName", headerName: "Last name", width: 150 },
        {field: "age", headerName: "Age", type: "number", width: 150 },
      ];

      const rows = [
        { id: 1, "lastName": "Snow", "firstName": "Jon", "age": 35 },
        { id: 2, "lastName": "Lannister", "firstName": "Cersei", "age": 42 },
        { id: 3, "lastName": "Lannister", "firstName": "Jaime", "age": 45 },
      ];

	return (
		<div>
			<Grid>
				<Grid item xs={4}>
					<img className={classes.logoFormat} src={Logo} alt="MF logo" />
				</Grid>
				<Grid item xs={4}>
					<Typography
						className={classes.title}
						color="textSecondary"
						gutterBottom
					>
						Custom Components
					</Typography>
				</Grid>
			</Grid>

			<Formik
				className="form"
				initialValues={{
					...INITIAL_FORM_STATE,
				}}
			
			>
				<Form className="form">
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Text Field
									</Typography>
									<TextField
										name="firstName"
										form={true}
										label="Enter your first name"
										required={true}
										type="email"
										materialProps={{
											pattern: "[0-9]+",
										}}
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										TextField with Icon
									</Typography>
									<TextFieldWithIcon
										name="userName"
										label="Enter Username"
										icon="cloud"
										iconColor="#595E6E"
										iconPosition="right"

										// customClass='fa fa-plus-circle'
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Button
									</Typography>
									<Button
										stylebutton='{"background": "", "color":"" }'
										background="0F4EB3"
									
									>
										Sign IN
									</Button>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Button with Icon
									</Typography>
									<ButtonWithIcon
										icon="close"
										iconposition="left"
										stylebutton='{"background": "", "color":"" }'
										styleicon='{ "color":"" }'
									>
										Cancel
									</ButtonWithIcon>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Email Field
									</Typography>
									<EmailTextField
										name="email"
										label="Email"
										suffix="@marinerfinance.com"
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Email with Icon
									</Typography>
									<EmailWithIcon
										name="emailwithicon"
										label="Enter Email"
										icon="lock"
										iconColor="#595E6E"
										iconPosition="left"
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Password
									</Typography>
									<PasswordField
										name="password"
										label="password"
										type="password"
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Password with Icon
									</Typography>
									<PasswordWithIcon
										name="userName"
										label="Enter Username"
										icon="lock"
										iconColor="#595E6E"
										iconPosition="left"
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Social Security Number
									</Typography>
									<SocialSecurityNumber
										name="ssn"
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Check Box
									</Typography>
									<Checkbox
										name="termsOfService"
										labelform="Terms & Service"
										label="I agree"
										required={true}
										stylelabelform='{ "color":"" }'
										stylecheckbox='{ "color":"blue" }'
										stylecheckboxlabel='{ "color":"" }'
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Select Box
									</Typography>
									<Select
										name="Month"
										label="Month"
										variant="outlined"
										required={true}
										options={Month}
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Radio Button
									</Typography>
									<Radio
										name="gender"
										labelforform="Gender"
										radiolabel='[{"label":"Male", "value":"male"}, {"label":"Female", "value":"female"}]'
										value="male"
										row={true}
										required={true}
										labelplacement={"end"}
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Multi Select
									</Typography>
									<Multiselect
										name="multiselect"
										labelform="Language Known"
										value='["Tamil","English"]'
										multiselect='[{"value":"Tamil"}, {"value":"Eng"}]'
										checkboxcolor="red"
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Text Area
									</Typography>
									<TextArea placeholder="Enter here..." 
									 row="4"
									 label="TextArea"
									 variant="outlined"
									  required={true}
									 character_limit="20"
									 name="TextArea"
									 value="TextArea"
									 
									 />
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Slider
									</Typography>
									<Slider
										name="slider"
										label="Select Loan Amount"
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Date Picker
									</Typography>
									<DatePicker name="date" />
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Zipcode
									</Typography>
									<Zipcode name="zipcode" label="Enter Zip Code"/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Mobile Number
									</Typography>
									<PhoneNumber name="mobile" />
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Account Number
									</Typography>
									<AccountNumber name="acc" label="Enter Account number" required = {true}/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Bank Routing Number
									</Typography>
									<BankRoutingNumber name="brn" label="Enter Bank Routing number"/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Auto Complete
									</Typography>
									<AutoComplete
										textfieldlabel="AutoComplete"
										variant="outlined"
										jsonInput='[{"value":"India"}, {"value":"USA"}]'
										placeholder="Choose Country"

									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Autocomplete Multiple
									</Typography>
									<AutoCompleteMultiple
										textfieldlabel="AutoComplete"
										variant="outlined"
										jsonInput='[{"value":"India"}, {"value":"USA"}]'
										placeholder="Choose Country"

									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Toggle Button
									</Typography>
									<ButtonSwitch
									value="switch"
									label="Auto pay is"
									labelPlacement="end"
									/>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Radio Button Box
									</Typography>
									<RadioButtonBox
										stylebutton='{"background": "", "color":"" }'
										type="radio"
										id="radiobox"
									
									>
										U.S Citizen
									</RadioButtonBox>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={8}>
							<Card className={classes.root} variant="outlined">
								<CardContent>
									<Typography
										className={classes.title}
										color="textSecondary"
										gutterBottom
									>
										Data grid
									</Typography>
									<DataGrid rows={rows} columns={columns} height="300px" width="100%"/>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Form>
			</Formik>
		</div>
	);
}
