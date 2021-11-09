import React, { useState } from "react";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as yup from "yup";
import Box from "@material-ui/core/Box";
import { EmailTextField, PasswordField, Checkbox, ButtonPrimary } from "../../FormsUI";
import Paper from "@material-ui/core/Paper";
import Logo from "../../../assets/images/loginbg.png";
import { NavLink, useHistory } from "react-router-dom";
import "./Login.css";
import loginSubmit from "../../Controllers/LoginController";
import branchDetails from "../../Controllers/MyBranchController";
import ScrollToTopOnMount from "../../Pages/ScrollToTop";


//Styling part
const useStyles = makeStyles((theme) => ({
    mainContentBackground: {
        backgroundImage: "url(" + Logo + ")",
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
        fontFamily: "'Muli', sans-serif !important"
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
            /^[a-zA-Z](?!.*[+/._-][+/._-])(([^<>()|?{}='[\]\\,;:#!$%^&*\s@\"]+(\.[^<>()|?{}=/+'[\]\\.,;_:#!$%^&*-\s@\"]+)*)|(\".+\"))[a-zA-Z0-9]@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,3}))$/, //eslint-disable-line
            "A valid email address is required"
        )
        .required("Your email address is required"),
    password: yup
        .string("Enter your password")
        .max(30, "Password can be upto 30 characters length")
        .min(8, "Password should be minimum of 8 characters length")
        .required("Your password is required"),
});

//Begin: Login page
export default function Login(props) {
    const classes = useStyles();
    const history = useHistory();
    const [loginFailed, setLoginFailed] = useState("");
    const [loading, setLoading] = useState(false);
    
    //checking remember me is activated or not
    const remMe = localStorage.getItem('rememberMe');
    const remMeJSON = remMe ? JSON.parse(remMe) : {};
	const [rememberMe, setRememberMe] = useState(remMeJSON.selected === true ? true : false);

    //Form Submission
    const formik = useFormik({
        initialValues: {
            email: remMeJSON?.email === undefined ? '' : remMeJSON?.email,
            password: remMeJSON?.password === undefined ? '' : remMeJSON?.password,
            rememberMe: false
        },
        validationSchema: validationSchema,
        // On login submit
        onSubmit: async (values) => {
			setLoading(true);
            
            //Sending value to  login controller

			let retVal = await loginSubmit(values.email, values.password, props.setToken);
			if (retVal?.data?.data?.user && retVal?.data?.data?.userFound === true) {
                var now = new Date().getTime();
                // On login success storing the needed data in the local storage
				localStorage.clear();
				localStorage.setItem("token", JSON.stringify({ isLoggedIn: true, apiKey: retVal?.data?.data?.user?.extensionattributes?.login?.jwt_token, setupTime: now, applicantGuid: retVal?.data?.data?.user?.attributes?.sor_data?.applicant_guid }));
                localStorage.setItem("email",values.email);
                let branchVal=await branchDetails(); 
                localStorage.setItem('branchname',branchVal?.data?.data?.branchName) 
                localStorage.setItem('branchphone',branchVal?.data?.data?.PhoneNumber) 
                localStorage.setItem('branchopenstatus',branchVal?.data?.data?.date_closed) 
                
                // set Remember me 
				rememberMe === true ?
					localStorage.setItem("rememberMe", JSON.stringify({ selected: true, email: values.email, password: values.password })) :
					localStorage.setItem("rememberMe", JSON.stringify({ selected: false, email: '', password: '' }));

				setLoading(false);
                    history.push({
                        // pathname: (props.location.state?.required && props.location.state?.activationToken) ? "/customers/verification/email?required=" + props.location.state?.required + "&activation_token=" + props.location.state?.activationToken : "/customers/accountoverview",
                        pathname: (props.location.state?.redirect) ? props.location.state?.redirect : "/customers/accountoverview",
                    }); 
              
			}
			else if (retVal?.data?.data?.result === "error" || retVal?.data?.data?.hasError === true) {
				localStorage.setItem('token', JSON.stringify({ isLoggedIn: false, apiKey: '', setupTime: '', applicantGuid: '' }));
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
                            xs={8}
                            sm={6}
                            md={5}
                            lg={4}
                            xl={5}
                            id="main-content"
                            justifyContent="center"
                            item container
                            alignItems="center"
                        >
                            <Paper className={classes.paper}>
                                <Typography
                                    className={classes.title}
                                    data-testid="title"
                                    color="textSecondary"
                                >
                                    Sign in
                                </Typography> 


                                <form onSubmit={formik.handleSubmit}>
                                    <Grid container spacing={5} style={{ paddingTop: "30px" }}>
                                        <Grid
                                            item
                                            xs={12}
                                            style={{ width:"100%" }}
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
                                                materialProps={{ maxLength: "30" }}
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

                                        <Grid className={classes.checkbox}>
                                            <Checkbox
                                                name="rememberMe"
                                                label="Remember Me"
                                                value={rememberMe}
                                                checked={rememberMe}
                                                onChange={(e) => { setRememberMe(e.target.checked) }}
                                                onBlur={(e) => { setRememberMe(e.target.checked) }}
                                                labelid="remember-me"
                                                testid="checkbox"
                                                stylelabelform='{ "paddingTop":"0px" }'
                                                stylecheckbox='{ "color":"#0F4EB3", "marginLeft":"7px","paddingRight":"15px" }'
                                                stylecheckboxlabel='{ "color":"" }'
                                            />
                                        </Grid>

                                        <Grid item xs={12} className={classes.loginButton}>
                                            <ButtonPrimary
                                                type="submit"
                                                data-testid="submit"
                                                stylebutton='{"background": "", "color":"" }'
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
