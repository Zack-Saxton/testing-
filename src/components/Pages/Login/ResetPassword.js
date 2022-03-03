import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import globalValidation from "../../../../src/assets/data/globalMessages.json";
import ResetPasswordController from "../../Controllers/ResetPasswordController";
import { ButtonPrimary, EmailTextField, PasswordField } from "../../FormsUI";
import ErrorLogger from "../../lib/ErrorLogger";
import ScrollToTopOnMount from "../../Pages/ScrollToTop";
import "./Login.css";
//Styling part
const useStyles = makeStyles((theme) => ({
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
    title: {
        fontSize: "25px",
        textAlign: "center",
        color: "#171717",
        fontWeight: "400",
    },

    loginButton: {
        textAlign: "center",
    },
    emailGrid: {
        lineHeight: "2",
        padding: "8px"
    },
}));

//Yup validations for all the input fields
const email = Cookies.get("email");
const ResetPasswordvalidationSchema = yup.object().shape({
    password: yup
        .string(globalValidation.PasswordEnter)
        .max(30, globalValidation.PasswordMax)
        .min(8, globalValidation.PasswordMin)
        .matches(
            /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30})$/,
            globalValidation.PasswordCriteria
        )
        .required(globalValidation.PasswordNewRequired),
    confirmPassword: yup
        .string(globalValidation.PasswordEnter)
        .oneOf(
            [ yup.ref("password"), null ],
            globalValidation.PasswordConfirmationMatch
        )
        .max(30, globalValidation.PasswordMax)
        .min(8, globalValidation.PasswordMin)
        .matches(
            /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30})$/,
            globalValidation.PasswordCriteria
        )
        .required(globalValidation.PasswordConfirmationRequired),
});
//Begin: Login page
export default function Login(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);
    let location = useLocation();
    //Form Submission
    const formik = useFormik({
        initialValues: {
            email: email,
            password: '',
            confirmPassword: ''
        },
        enableReinitialize: true,
        validationSchema: ResetPasswordvalidationSchema,
        // On login submit
        onSubmit: async (values) => {
            try {
                setLoading(true);
                //Sending value to  ResetPassword controller
                let retVal = await ResetPasswordController(values.password);
                if (retVal.status === 200) {
                    toast.success(globalValidation.PasswordChangedSuccessfully);
                    navigate("/customers/accountoverview");
                } else {
                    toast.error(globalValidation.TryAgain);
                    navigate("/login");
                };
            } catch (error) {
                ErrorLogger(' Error Reseting Password ::', error);
            }
        }
    });
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
            <div className={ classes.mainContentBackground } id="resetPasswordWrap">
                <Box>
                    <Grid container>
                        <Grid container
                            item
                            xl={ 6 }
                            lg={ 6 }
                            md={ 6 }
                            sm={ 10 }
                            xs={ 12 }
                            id="reset-main-content"
                            style={ {
                                opacity: loading ? 0.55 : 1,
                                pointerEvents: loading ? "none" : "initial",
                            } }
                        >
                            <Paper className={ classes.paper } id="signInContainer">
                                <Typography
                                    className={ classes.title }
                                    data-testid="title"
                                    color="textSecondary"
                                >
                                    Create New Password
                                </Typography>
                                <form onSubmit={ formik.handleSubmit }>
                                    <Grid container spacing={ 2 } style={ { paddingTop: "30px" } }>
                                        <Grid
                                            style={ { width: "100%" } }
                                            className={ classes.emailGrid }
                                        >
                                            <EmailTextField
                                                id="email"
                                                name="email"
                                                type="email"
                                                testid="email-input"
                                                disabled="true"
                                                InputLabelProps={ { style: { fontSize: 40 } } }
                                                label="Create new password for"
                                                materialProps={ { maxLength: "100" } }
                                                value={ location.state.Email }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={ 12 }
                                            style={ { width: "100%" } }
                                            container
                                            direction="row"
                                        >
                                            <PasswordField
                                                name="password"
                                                label="Password *"
                                                placeholder="Enter your password"
                                                id="password"
                                                type="password"
                                                onKeyDown={ preventSpace }
                                                materialProps={ { maxLength: "100" } }
                                                value={ formik.values.password }
                                                onChange={ formik.handleChange }
                                                onBlur={ formik.handleBlur }
                                                error={
                                                    formik.touched.password &&
                                                    Boolean(formik.errors.password)
                                                }
                                                helperText={
                                                    formik.touched.password && formik.errors.password
                                                }
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={ 12 }
                                            style={ { width: "100%", gap: 15, marginBottom: 10 } }
                                            container
                                            direction="row"
                                        >
                                            <PasswordField
                                                id="retypeNewPasswordWrap"
                                                name="confirmPassword"
                                                type="password"
                                                label="Confirm New Password"
                                                onKeyDown={ preventSpace }
                                                autoComplete="new-password"
                                                materialProps={ { maxLength: "30", autoComplete: "off" } }
                                                value={ formik.values.confirmPassword }
                                                onChange={ formik.handleChange }
                                                onBlur={ formik.handleBlur }
                                                error={
                                                    formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
                                                }
                                                helperText={ formik.touched.confirmPassword && formik.errors.confirmPassword }
                                                variant="standard"
                                                disabled={ false }
                                            />
                                        </Grid>
                                        <Grid item xs={ 12 } className={ classes.loginButton }>
                                            <ButtonPrimary
                                                type="submit"
                                                data-testid="submit"
                                                stylebutton='{"background": "", "color":"" , "fontSize" : "15px", "padding" : "0px 30px"}'
                                                disabled={ loading }
                                            >
                                                Reset Password
                                                <i
                                                    className="fa fa-refresh fa-spin customSpinner"
                                                    style={ {
                                                        marginRight: "10px",
                                                        display: loading ? "block" : "none",
                                                    } }
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
        </div>
    );
}
