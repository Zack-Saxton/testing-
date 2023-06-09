import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useFormik } from "formik";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import globalValidation from "../../../../src/assets/data/globalMessages.json";
import ResetPasswordController from "../../Controllers/ResetPasswordController";
import { ButtonPrimary, EmailTextField, PasswordField } from "../../FormsUI";
import ErrorLogger from "../../lib/ErrorLogger";
import ScrollToTop from "../../Pages/ScrollToTop";
import "./Login.css";
import { useStylesLogin } from "./style";
import validateUserEnteredInput from "./ValidateUserEnteredInput";


//Yup validations for all the input fields
const email = Cookies.get("email");
const ResetPasswordvalidationSchema = yup.object().shape({
  password: yup
    .string(globalValidation.PasswordEnter)
    .max(30, globalValidation.PasswordMax)
    .min(10, globalValidation.PasswordMin)
    .matches(
      /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,30})$/,
      globalValidation.PasswordCriteria
    )
    .required(globalValidation.PasswordNewRequired),
  confirmPassword: yup
    .string(globalValidation.PasswordEnter)
    .oneOf(
      [yup.ref("password"), null],
      globalValidation.PasswordConfirmationMatch
    )
    .max(30, globalValidation.PasswordMax)
    .min(10, globalValidation.PasswordMin)
    .matches(
      /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,30})$/,
      globalValidation.PasswordCriteria
    )
    .required(globalValidation.PasswordConfirmationRequired),
});
//Begin: Login page
export default function ResetPassword(_props) {
  const classes = useStylesLogin();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let location = useLocation();
  useEffect(() => {
		if (!location?.state?.Email) {
			navigate("/login");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
  //Form Submission
  const formik = useFormik({
    initialValues: {
      email: email,
      password: "",
      confirmPassword: "",
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
          navigate("/login");
        }else if (retVal?.data?.statusCode === 400) {
          toast.error(retVal?.data?.errorMessage);
          setLoading(false);
        }else {
          toast.error(globalValidation.TryAgain);
          navigate("/login");
        }
      } catch (error) {
        ErrorLogger(" Error Reseting Password ::", error);
      }
    },
  });
  //Preventing space key
  const preventSpace = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };
  //View Part
  return (
    <div data-testid = "ResetPassword_component">
      <ScrollToTop />
      <div className={classes.mainContentBackground} id="resetPasswordWrap">
        <Grid
          container
          item
          xl={6}
          lg={6}
          md={6}
          sm={10}
          xs={12}
          id="reset-main-content"
          style={{
            opacity: loading ? 0.55 : 1,
            pointerEvents: loading ? "none" : "initial",
          }}
        >
          <Paper className={classes.createPasswordPaper} id="signInContainer">
            <Typography
              className={classes.title}
              data-testid="title"
              color="textSecondary"
            >
              Create New Password
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container className={classes.logInGrid}>
                <Grid id="fullWidth" className={classes.emailInputGrid}>
                  <EmailTextField
                    id="email"
                    name="email"
                    testid="email-input"
                    disabled={true}
                    InputLabelProps={{ style: { fontSize: 40 } }}
                    label="Create new password for"
                    materialProps={{ maxLength: "100" }}
                    value={location?.state?.Email}
                  />
                </Grid>
                <Grid
                  className="fullWidth passwordInputGrid"
                  item
                  xs={12}
                  container
                  direction="row"
                >
                  <PasswordField
                    name="password"
                    label="Password *"
                    placeholder="Enter your password"
                    id="password"
                    type="password"
                    onKeyDown={preventSpace}
                    materialProps={{ maxLength: "30" }}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>
              </Grid>
              <Grid>
                <Grid container className="errorValidationWrap">
                  <Grid
                    item
                    md={7}
                    sm={7}
                    xs={12}
                    className="errorValidationOne"
                  >
                    <ul>
                      {validateUserEnteredInput(formik.values.password,1)}
                    </ul>
                  </Grid>
                  <Grid
                    item
                    md={5}
                    sm={5}
                    xs={12}
                    className="errorValidationTwo"
                  >
                    <ul>
                    {validateUserEnteredInput(formik.values.password,0)}
                    </ul>
                  </Grid>
                </Grid>

                <Grid
                  className={classes.passwordWrap}
                  item
                  xs={12}
                  container
                  direction="row"
                >
                  <PasswordField
                    id="retypeNewPasswordWrap"
                    name="confirmPassword"
                    type="password"
                    label="Confirm New Password *"
                    onKeyDown={preventSpace}
                    autoComplete="new-password"
                    materialProps={{ maxLength: "30", autoComplete: "off" }}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    variant="standard"
                    disabled={false}
                  />
                </Grid>
                <Grid item xs={12} className={classes.resetButton}>
                  <ButtonPrimary
                    type="submit"
                    data-testid="submitButton"
                    stylebutton='{"background": "", "color":"" , "fontSize" : "15px", "padding" : "0px 30px"}'
                    disabled={loading}
                  >
                    Reset Password
                    <AutorenewIcon className="rotatingIcon"
                        style={{
                        display: loading ? "block" : "none",
                    }}/>
                  </ButtonPrimary>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </div>
    </div>
  );
}
