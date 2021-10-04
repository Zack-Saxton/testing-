import React, {useState} from "react";
import {useFormik} from "formik";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as yup from "yup";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {
    ButtonPrimary,
    Select,
    TextField,
    Zipcode
} from "../../FormsUI";
import Paper from "@material-ui/core/Paper";
import Logo from "../../../assets/images/loginbg.png";
import "./creditkarma.css";
import creditkarmalogo from "../../../assets/images/ck_logo.png";

//Styling
const useStyles = makeStyles((theme) => ({
	mainContentBackground: {
		backgroundImage: "url(" + Logo + ")",
        backgroundSize:"cover"
	},
	root: {
		flexGrow: 1,
	},

	mainGrid: {
		boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%), 
    0 6px 30px 5px rgb(0 0 0 / 12%), 
    0 8px 10px -7px rgb(0 0 0 / 20%)`,
		background: "#f5f2f2",
	},
	title: {
		fontSize: "20px",
		textAlign: "center",
		fontWeight: 400,
		color: "black",
	},
	subtitle: {
		textAlign: "center",
	},
	passwordTitle: {
		fontSize: "14px",
		textAlign: "justify",
	},
	dobTitle: {
		fontSize: "12px",
		textAlign: "justify",
	},
	paper: {
		// marginTop: theme.spacing(8),
		padding: theme.spacing(3),
		display: "flex",
		flexDirection: "column",
		backgroundColor: `rgba(255, 255, 255, .8)`,
		color: theme.palette.text.secondary,
		boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%), 
  0 6px 30px 5px rgb(0 0 0 / 12%), 
  0 8px 10px -7px rgb(0 0 0 / 20%)`,
	},

	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	signInButtonGrid: {
		textAlign: "center",
		paddingTop: "20px!important",
	},
}));

//Yup validations for all the input fields
const validationSchema = yup.object({
    name: yup
    .string("Enter a name")
    .trim()
    .max(30, "Should be less than 30 characters")
    .matches(/^(?!\s+$).*/g, "* This field cannot contain only backspaces")
    .required("Your name is required"),

    streetAddress: yup    
    .string("Enter Street Address")
    .trim()
    .max(100, "Should be less than 100 characters")
    .matches(/^(?!\s+$).*/g, "* This field cannot contain only backspaces")
    .required("Your Street Address is required"),

    city: yup
    .string("Enter City")
    .max(30, "Should be less than 30 characters")
    .required(
        "Your home city is required. Please re-enter your zip code to populate your city"
    ),
    state: yup
    .string("Enter State")
    .max(30, "Should be less than 30 characters")
    .required("Your home state is required."),

    zip: yup
    .string("Enter your Zip")
    .min(5, "Zipcode should be of minimum 5 characters length")
    .required("Your home ZIP Code is required"),

    citizenship: yup
    .string("Enter citizenship") 
    .max(30, "Should be less than 30 characters") 
    .required("Your citizenship is required"), 

    employementStatus: yup
    .string("Enter Employement Status")
    .max(30, "Should be less than 30 characters")
    .required("Your Employement Status is required"),

    personalIncome:yup
    .string("Enter Personal Income Status")
	.transform((value) =>  value.replace(/\$/g, "").replace(/,/g, ""))
    .required("Your Personal Income is required"),

    householdIncome:yup
    .string("Enter Household Income Status")	
	.transform((value) =>  value.replace(/\$/g, "").replace(/,/g, ""))
    .required("Your Household Income is required"),
});

//Begin: Login page
export default function CreditKarma() {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [validZip, setValidZip] = useState(true);
	const [errorMsg, setErrorMsg] = useState("");
    const [open, setOpen] = useState(false);
	const [openOhio, setOpenOhio] = useState(false);
	const [citizenship, setCitizenship] = useState(false)


  //Date implementation for verifying 18 years
    const myDate = new Date();
    myDate.setDate(myDate.getDate() - 6571);
	//Form Submission
	const formik = useFormik({
		initialValues: {
			name: "",
            streetAddress: "",
			city: "",
			state: "",
			zip: "",
			address: "",
            citizenship:"",
            personalIncome:"",
            householdIncome:"",
            employementStatus:""
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			setLoading(true);
            console.log(values)
		},
	});


    const onBlurAddress = (e) => {
		formik.setFieldValue("streetAddress", e.target.value.trim());
	};

    const fetchAddress = (e) => {
		setErrorMsg(e.target.value === "" ? "Please enter zipcode" : errorMsg);
		if (e.target.value !== "" && e.target.value.length === 5) {
			fetch("https://api.zippopotam.us/us/" + e.target.value)
				.then((res) => res.json())
				.then(
					(result) => {
						fetchAddressValidate(result);
					},
					() => {
						formik.setFieldValue("city", "");
						formik.setFieldValue("state", "");
						setValidZip(false);
						setErrorMsg("Please enter valid Zipcode");
					}
				);
		} else {
			formik.setFieldValue("city", "");
			formik.setFieldValue("state", "");
			setValidZip(true);
		}

		formik.handleChange(e);
	};

    const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleClickOpenOhio = () => {
		setOpenOhio(true);
	};

	const handleCloseOhio = () => {
		setOpenOhio(false);
	}; 
	
    const onHandleChange = (event) => {
		const reg = /^[0-9.,$\b]+$/;
		let acc = event.target.value;

		if (acc === "" || reg.test(acc)) {
			formik.handleChange(event);
		}
	};

    const preventUnwanted = (event) => {
		if (event.keyCode === 190 || event.keyCode === 188) {
			event.preventDefault();
		}
	};

    const currencyFormat = (event) => {
		const inputName=event.target.name 
		if(inputName==='personalIncome' || inputName ==='householdIncome'){ 
			const n = event.target.value.replace(/\$/g, "").replace(/,/g, "").substr(0, 7); 
			const formated = parseFloat(n);
			const currency = '$';
			const forCur = currency + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
			formik.setFieldValue(event.target.name, forCur.slice(0, -3));
			const modPersonalIncome = parseInt(formik.values.personalIncome.replace(/\$/g, "").replace(/,/g, ""));
			const modHouseholdIncome = parseInt(formik.values.householdIncome.replace(/\$/g, "").replace(/,/g, ""));
			if(isNaN(modPersonalIncome)){ 
				return false
			}else{
				if (!isNaN(modPersonalIncome) && !isNaN(modHouseholdIncome)) {
					return ((modPersonalIncome <= modHouseholdIncome) ? true : false); 		
				}
			}
		} 
    }


	const onNameChange = (event) => {  
		const reg = /^([a-zA-Z]+[.]?[ ]?|[a-z]+['-]?)+$/;
		let acc = event.target.value;

		if (acc === "" || reg.test(acc)) {
			formik.handleChange(event);
		}
	};

	
	function fetchAddressValidate(result) {
		if (result.places) {
			formik.setFieldValue("city", result.places[0]["place name"]);
			formik.setFieldValue("state", result.places[0]["state"]);
			setValidZip(true);
			if (result.places[0]["state"] === "California") {
				handleClickOpen();
			}
			if (result.places[0]["state"] === "Ohio") {
				handleClickOpenOhio();
			}
		} else {
			formik.setFieldValue("city", "");
			formik.setFieldValue("state", "");
			setValidZip(false);
			setErrorMsg("Please enter valid Zipcode");
		}
	}

	function autoFocus() {
		var name = document.getElementById("name").value 
		if (name === '') {
			document.getElementById("name").focus();
		} 
	}

	const changeCitizenship = (event) => { 
		let acc = event.target.value; 
		if(acc === '3' ){ 
			setCitizenship(true);  
			formik.handleChange(event);
		} else{
			setCitizenship(false);
			formik.handleChange(event);
		}
	}
 

	//View Part
	return (
		<div>
			<div
				className={classes.mainContentBackground}
				id="mainContentBackground"
			>
				<Box>
					<Grid xs={12}  item  justifyContent="center" alignItems="center" style={{paddingTop:"30px",paddingBottom:"40px",margin:"auto",width:"100%"}}>
						<Grid
							xs={11}
							sm={10}
							md={6}
							lg={6} 
							xl={6}
							className="cardWrapper"
                            justifyContent="center"
							alignItems="center" item
                            style={{margin:"auto"}}
						>
							<Paper className={classes.paper}>
                                  <Typography
									className={classes.title}
									data-testid="title"
									color="textSecondary" >Welcome to Mariner Finance </Typography>
                                  <p style={{textAlign:"center"}}>Please review and confirm the information that <a href="https://www.creditkarma.com/" target="blank"> <img src={creditkarmalogo} style={{height: "13px"}} alt="creditkarmalogo"/></a> provided about you, it will only take a minute.</p>
                              {/* </div> */}

								<form onSubmit={formik.handleSubmit}>
									<Grid
										container
                                        justifyContent="center"
										alignItems="center"
										spacing={4}
									
>

										<Grid item xs={12} style={{ width:"100%" }} >
											<TextField
                                            	autoFocus
												fullWidth
												id="name"
												name="name"
												label="Name"
												materialProps={{
													"data-test-id": "name",
													maxLength: "30",
												}}
												value={formik.values.name}												
												onChange={onNameChange}												
												onBlur={formik.handleBlur} 
												error={
													formik.touched.name &&
													Boolean(formik.errors.name)
												}
												helperText={
													formik.touched.name &&
													formik.errors.name
												}
											/>
										</Grid>

										<Grid item xs={12}>
											<TextField
												fullWidth
												id="streetAddress"
												name="streetAddress" 
												label="Address"
												materialProps={{
													"data-test-id": "streetAddress",
													maxLength: "100",
												}}
												value={formik.values.streetAddress}
												onChange={formik.handleChange}
												onBlur={onBlurAddress}
												error={
													formik.touched.streetAddress &&
													Boolean(formik.errors.streetAddress)
												}
												helperText={
													formik.touched.streetAddress &&
													formik.errors.streetAddress
												}
											/>
										</Grid>
									
                                        <Grid item xs={12} sm={4}  container direction ="row"  >
                                        <Zipcode
												fullWidth
												id="zip"
												name="zip"
												label="Zipcode *"
												materialProps={{ "data-test-id": "zipcode" }}
												value={formik.values.zip}
												onChange={fetchAddress}
												onBlur={formik.handleBlur}
												error={
													(formik.touched.zip && Boolean(formik.errors.zip)) ||
													!validZip
												}
												helperText={
													validZip
														? formik.touched.zip && formik.errors.zip
														: "Please enter your valid ZIP Code"
												}
											/>
										</Grid>
										<Grid item xs={12} sm={4}  container direction ="row">
                                        <TextField
													fullWidth
													id="city"
													name="city"
													label="City"
													disabled={true}
													materialProps={{ "data-test-id": "city" }}
													value={formik.values.city}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													error={
														formik.touched.city && Boolean(formik.errors.city)
													}
													helperText={formik.touched.city && formik.errors.city}
												/>
										</Grid>

										<Grid item xs={12} sm={4}  container direction ="row">
                                        <TextField
													fullWidth
													id="state"
													name="state"
													label="State"
													disabled={true}
													materialProps={{ "data-test-id": "state" }}
													value={formik.values.state}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													error={
														formik.touched.state && Boolean(formik.errors.state)
													}
													helperText={
														formik.touched.state && formik.errors.state
													}
												/>
										</Grid>

										<Grid item xs={12}>
                                        <Grid item xs={12} style={{ paddingTop: "10px"}}>
                                        <Select
                                        id="citizenship"
                                        name="citizenship"
                                        labelform="Citizenship"
                                        value={formik.values.citizenship} 
										onChange={changeCitizenship}
                                        onBlur={formik.handleBlur} 
                                        error={
                                            ( formik.touched.citizenship && Boolean(formik.errors.citizenship) ) || citizenship
                                        }
                                        helperText={
											! citizenship
											? formik.touched.citizenship && formik.errors.citizenship
											: "We are sorry. We do not offer loans to foreign residents." 
                                        }
                                        select='[{ "label": "U.S Citizen", "value": "1"}, 
                                        {"label": "Permanent Resident","value": "2"}, 
                                        { "label": "Foreign Resident","value": "3"}]'
                                        />										 
                                        </Grid>
										</Grid>
                                        <Grid item xs={12} sm={4}  container direction ="row">
                                        <TextField
												name="personalIncome"
												label="Annual Personal Income"
												id="personalincome"
												value={formik.values.personalIncome}
												onChange={onHandleChange}
												materialProps={{
													"data-testid": "personalIncome",
													maxLength: "10",
												}}
												autoComplete='off' 
												onBlur={currencyFormat}
												onKeyDown={preventUnwanted}
												error={
                                                    formik.touched.personalIncome && Boolean(formik.errors.personalIncome)
                                                }
                                                helperText={formik.touched.personalIncome && formik.errors.personalIncome}
											/>
										</Grid>
										<Grid item xs={12} sm={4}  container direction ="row">
                                        <TextField
												name="householdIncome"
												label="Annual Household Income" 
												id="annualhousehold"
												value={formik.values.householdIncome}
												// startAdornment={<InputAdornment position="start">$</InputAdornment>}
												materialProps={{
													"data-testid": "annualIncome",
													maxLength: "10",
												}}
												autoComplete='off'
												onChange={onHandleChange}
												onBlur={currencyFormat}
												onKeyDown={preventUnwanted}
												error={
                                                    formik.touched.householdIncome && Boolean(formik.errors.householdIncome)
                                                }
                                                helperText={formik.touched.householdIncome && formik.errors.householdIncome}
											/>
										</Grid>

										<Grid item xs={12} sm={4}  container direction ="row">
                                        <Select
                                        id="employementStatus"
                                        name="employementStatus"
                                        labelform="Employement Status"
                                        value={formik.values.employementStatus}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.employementStatus && Boolean(formik.errors.employementStatus)
                                        }
                                        helperText={
                                            formik.touched.employementStatus && formik.errors.employementStatus
                                        }
                                        select='[{ "label": "Employed - Hourly", "value": "1"}, 
                                        {"label": "Employed - Salaried","value": "2"}, 
                                        { "label": "Self Employed / 1099","value": "3"},
                                        { "label": "Unemployed","value": "4"},
                                        { "label": "Retired","value": "5"}]'
                                        />
										</Grid>

										<Grid item xs={12} className={classes.signInButtonGrid}>
											<ButtonPrimary		
												onClick={autoFocus}										
												type="submit"
												data-testid="submit"
												stylebutton='{"background": "", "color":"" }'
												disabled={loading}
											>
											<Typography align="center" className="textCSS ">
												Continue
											</Typography>
												<i
													className="fa fa-refresh fa-spin customSpinner"
													style={{
														marginRight: "10px",
														display: loading ? "block" : "none",
													}}
												/>
											</ButtonPrimary>
										</Grid>
									</Grid>
								</form>
							</Paper>
						</Grid>
					</Grid>
				</Box>
			</div>
			<Dialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Notice to CA Residents
				</DialogTitle>
				<DialogContent dividers>
					<Typography align="justify" gutterBottom>
						If you are married, you may apply for a separate account.
					</Typography>
				</DialogContent>
				<DialogActions className="modalAction">
					<ButtonPrimary
						stylebutton='{"background": "#FFBC23", "color": "black", "border-radius": "50px"}'
						onClick={handleClose}
						className="modalButton"
					>
						<Typography align="center">Ok</Typography>
					</ButtonPrimary>
				</DialogActions>
			</Dialog>

			<Dialog
				onClose={handleCloseOhio}
				aria-labelledby="customized-dialog-title"
				open={openOhio}
			>
				<DialogTitle id="customized-dialog-title" onClose={handleCloseOhio}>
					Notice to OH Residents
				</DialogTitle>
				<DialogContent dividers>
					<Typography align="justify" gutterBottom>
						The Ohio laws against discrimination require that all creditors make
						credit equally available to all credit worthy customers, and that
						credit reporting agencies maintain separate credit histories on each
						individual upon request. The Ohio civil rights commission
						administers compliance with this law.
					</Typography>
				</DialogContent>
				<DialogActions className="modalAction">
					<ButtonPrimary
						stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
						onClick={handleCloseOhio}
						className="modalButton"
					>
						<Typography align="center">Ok</Typography>
					</ButtonPrimary>
				</DialogActions>
			</Dialog>
		</div>
	);
}
