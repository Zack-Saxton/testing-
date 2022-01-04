import React, { useState } from "react";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as yup from "yup";
import Box from "@material-ui/core/Box";
import { EmailTextField, PasswordField, ButtonPrimary } from "../../FormsUI";
import Paper from "@material-ui/core/Paper";
import Logo from "../../../assets/images/loginbg.png";
import { NavLink, useHistory } from "react-router-dom";
import "./Login.css";
import loginSubmit from "../../Controllers/LoginController";
import ScrollToTopOnMount from "../../Pages/ScrollToTop";
import Cookies from "js-cookie";
import { encryptAES } from "../../lib/Crypto"

const moment = require('moment');
const moment_timezone = require('moment-timezone');
let addVal = (moment_timezone().tz("America/New_York").isDST()) ? 4 : 5;


//Styling part
const useStyles = makeStyles((theme) => ({
    mainContentBackground: {
        backgroundImage: "url(" + Logo + ")",
        backgroundSize: "cover",
        backgroundSizeRepeat:"noRepeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(3),
        display: "flex",
        flexDirection: "column",
        backgroundColor: `rgba(255, 255, 255, .8)`,
        color: theme.palette.text.secondary,
        boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%), 
		0 6px 30px 5px rgb(0 0 0 / 12%), 
		0 8px 10px -7px rgb(0 0 0 / 20%)`,
    },
    heading: {
        color: "white",
        justify: "center",
    },
    checkbox: {
        textAlign: "initial",
        fontFamily: "'Muli', sans-serif !important"
    },
    title: {
        fontSize: "25px",
        textAlign: "center",
        color: "#171717",
        fontWeight: "400"
    },
    register: {
        fontSize: ".9rem",
        textDecoration: "none",
        color: "#0F4EB3",
        fontFamily: "'Muli', sans-serif !important",
        marginBottom:"25px"
    },
    mainGrid: {
        boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%), 
		0 6px 30px 5px rgb(0 0 0 / 12%), 
		0 8px 10px -7px rgb(0 0 0 / 20%)`,
        background: "#f5f2f2",
    },
    loginButton: {
        textAlign: "center",
    },
    emailGrid: {
        lineHeight: "2",
    },
    registerGrid: {
        textAlign: "center",
        width: "100%",
    },
}));

//Yup validations for all the input fields
const validationSchema = yup.object({
    email: yup
        .string("Your email is required")
        .email("A valid email address is required")
        .matches(
            /^[a-zA-Z](?!.*[+/._-][+/._-])(([^<>()|?{}='[\]\\,;:#!$%^&*\s@\"]+(\.[^<>()|?{}=/+'[\]\\.,;_:#!$%^&*-\s@\"]+)*)|(\".+\"))[a-zA-Z0-9]@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,3}))$/, //eslint-disable-line
            "A valid email address is required"
        )
        .required("Your email address is required"),
    password: yup
        .string("Enter your password")
        .max(100, "Password can be upto 100 characters length")
        .required("Your password is required"),
});

//Begin: Login page
export default function Login(props) {
    const classes = useStyles();
    const history = useHistory();
    const [loginFailed, setLoginFailed] = useState("");
    const [loading, setLoading] = useState(false);


    //Form Submission
    const formik = useFormik({
        initialValues: {
            email: undefined,
            password: undefined
        },
        validationSchema: validationSchema,
        // On login submit
        onSubmit: async (values) => {
			setLoading(true);
            
            //Sending value to  login controller
			let retVal = await loginSubmit(values.email, values.password, props.setToken);
			if (retVal?.data?.data?.user && retVal?.data?.data?.userFound === true) {
                let login_date = (retVal.data.data.user.extensionattributes?.login?.last_timestamp_date) ? moment(retVal.data.data.user.extensionattributes.login.last_timestamp_date).subtract(addVal, 'hours').format('MM/DD/YYYY'): '';
                var now = new Date().getTime();
                // On login success storing the needed data in the local storage
				Cookies.set("token", JSON.stringify({ isLoggedIn: true, apiKey: retVal?.data?.data?.user?.extensionattributes?.login?.jwt_token, setupTime: now, applicantGuid: retVal?.data?.data?.user?.attributes?.sor_data?.applicant_guid }));
				Cookies.set("cred", encryptAES(JSON.stringify({email: values.email, password: values.password })));
                Cookies.set("email",values.email);
                Cookies.set("profile_picture",retVal?.data?.data?.user?.mobile?.profile_picture ? retVal?.data?.data?.user?.mobile?.profile_picture : "");
                Cookies.set('login_date',login_date) 
                Cookies.set('userToken', retVal?.data?.data?.user?.attributes?.UserToken)
				localStorage.setItem("userToken", retVal?.data?.data?.user?.attributes?.UserToken);

				setLoading(false);
                    history.push({
                        pathname: (props.location.state?.redirect) ? props.location.state?.redirect : "/customers/accountoverview",
                    }); 
                    if(props.location.state?.activationToken){
                        history.go(0);
                    }
			}
			else if (retVal?.data?.data?.result === "error" || retVal?.data?.data?.hasError === true) {
				Cookies.set('token', JSON.stringify({ isLoggedIn: false, apiKey: '', setupTime: '', applicantGuid: '' }));
				setLoading(false);
				setLoginFailed(retVal?.data?.data?.errorMessage);
			}
			else {
				setLoading(false);
				alert("Network error");
			}

		},
    });

    const passwordOnChange = (e) => {
        setLoginFailed('');
        formik.handleChange(e);

    }

    //Preventing space key
    const preventSpace = (event) => {
        if (event.keyCode === 32) {
            event.preventDefault();
        }
    };

    //View Part
    return (
        <div>
            <ScrollToTopOnMount />
            <div
                className={classes.mainContentBackground}
                id="mainContentBackground"
            >
                <Box>
                    <Grid xs={12} item container justifyContent="center" alignItems="center">
                        <Grid
                            xs={10}
                            sm={7}
                            md={5}
                            lg={4}
                            xl={4}
                            id="main-content"
                            justifyContent="center"
                            item container
                            alignItems="center"
                            style={{
                                opacity: loading ? 0.55 : 1,
                                pointerEvents: loading ? "none" : "initial"
                              }}
                        >
                            <Paper className={classes.paper} id="signInContainer">
                                <Typography
                                    className={classes.title}
                                    data-testid="title"
                                    color="textSecondary"
                                >
                                    Sign in
                                </Typography> 


                                <form onSubmit={formik.handleSubmit}>
                                    <Grid container spacing={7} style={{ paddingTop: "30px" }}>
                                        <Grid
                                            item
                                            xs={12}
                                            style={{ width:"100%", }}
                                            id="text"
                                            container
                                            direction="row"
                                            className={classes.emailGrid}
                                        >
                                            <EmailTextField
                                                id="email"
                                                name="email"
                                                type="email"
                                                testid="email-input"
                                                placeholder="Enter your email address"
                                                label="Email Address *"
                                                materialProps={{ maxLength: "100" }}
                                                onKeyDown={preventSpace}
                                                value={formik.values.email}
                                                onChange={passwordOnChange}
                                                onBlur={formik.handleBlur}
                                                error={
                                                    formik.touched.email && Boolean(formik.errors.email)
                                                }
                                                helperText={formik.touched.email && formik.errors.email}
                                            />
                                        </Grid>

                                        <Grid item xs={12} style={{ width:"100%" }}
                                              container
                                              direction="row">
                                            <PasswordField
                                                name="password"
                                                label="Password *"
                                                placeholder="Enter your password"
                                                id="password"
                                                type="password"
                                                onKeyDown={preventSpace}
                                                materialProps={{ maxLength: "100" }}
                                                value={formik.values.password}
                                                onChange={passwordOnChange}
                                                onBlur={formik.handleBlur}
                                                error={
                                                    formik.touched.password &&
                                                    Boolean(formik.errors.password)
                                                }
                                                helperText={
                                                    formik.touched.password && formik.errors.password
                                                }
                                            />
                                            <p className={loginFailed !== "" ? "showError add Pad" : "hideError"} data-testid="subtitle" >
                                                {" "}  Invalid email or password. Please try again or click on Sign In help/Register for help signing in.
                                            </p>
                                        </Grid>

                                        <Grid item xs={12} className={classes.loginButton}>
                                            <ButtonPrimary
                                                type="submit"
                                                data-testid="submit"
                                                stylebutton='{"background": "", "color":"" , "fontSize" : "15px", "padding" : "0px 30px"}'
                                                disabled={loading}
                                            >
                                                Sign In
                                                <i
                                                    className="fa fa-refresh fa-spin customSpinner"
                                                    style={{
                                                        marginRight: "10px",
                                                        display: loading ? "block" : "none",
                                                    }}
                                                />
                                            </ButtonPrimary>
                                        </Grid>
                                        <Grid className={classes.registerGrid}>
                                            <NavLink
                                                to="/register"
                                                style={{ textDecoration: "none" }}
                                            >
                                                <p className={classes.register}>
                                                    Sign in Help / Register
                                                </p>
                                            </NavLink>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
}
