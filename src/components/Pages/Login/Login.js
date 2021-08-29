import React, { useState } from "react";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as yup from "yup";
import Box from "@material-ui/core/Box";
import {
  EmailTextField,  
  PasswordField,
  Checkbox,
  ButtonPrimary
  
} from "../../FormsUI";
import Paper from "@material-ui/core/Paper";
import Logo from "../../../assets/images/loginbg.png";
import { NavLink, useHistory } from "react-router-dom";
import "./login.css";
import loginSubmit from '../../controllers/loginController';

//Styling
const useStyles = makeStyles((theme) => ({
  maincontent_background: {
    backgroundImage: "url(" + Logo + ")",
  },

  root: {
    flexGrow: 1,
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
  heading: {
    color: "white",
    justify: "center",
   
  },

  checkbox: {
    textAlign: "initial",
    fontFamily: "Segoe UI"
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
    fontFamily: "Segoe UI"
    
  },
  maingrid: {
    boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%), 
		0 6px 30px 5px rgb(0 0 0 / 12%), 
		0 8px 10px -7px rgb(0 0 0 / 20%)`,
    background: "#f5f2f2",
  },
  loginbutton:{
    textAlign: "center"
  },
  emailgrid:{
    lineHeight: "2"
  },
  registergrid:{
    textAlign: "center",
    width: "100%"
  }
}));

//Yup validations for all the input fields
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Email should be as (you@example.com)")
    .matches(
      /^[a-zA-Z](?!.*[+/._-][+/._-])(([^<>()|?{}='[\]\\,;:#!$%^&*\s@\"]+(\.[^<>()|?{}=/+'[\]\\.,;_:#!$%^&*-\s@\"]+)*)|(\".+\"))[a-zA-Z0-9]@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,3}))$/,  //eslint-disable-line
      "Invalid Email"
    )
    .required("Your email address is required"),

    // email: yup
    // .string("Enter your email")
    // .email("Email should be as (you@example.com)")
    // .matches(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, "Invalid email")
    // .required("Your email address is required"),

  password: yup
    .string("Enter your password")
    .max(30, "Password can be upto 30 characters length")
    .min(8, "Password should be minimum of 8 characters length")
    .required("Your password is required"),
});

//Begin: Login page
export default function Login({ setToken }) {
  const classes = useStyles();
  const history = useHistory();
  const [loginFailed, setLoginFailed] = useState('');
  const [loading, setLoading] = useState(false);

  //Form Submission
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let retVal = await loginSubmit(values.email, values.password, setToken);
      if(retVal?.data?.data?.user && retVal?.data?.data?.userFound === true ){
        localStorage.setItem('token', JSON.stringify({isLoggedIn: true}));  
        setLoading(false);
        history.push({
          pathname: "/customers/accountoverview",
        });
      }
      else if (retVal?.data?.data?.result === "error" || retVal?.data?.data?.hasError === true){
        localStorage.setItem('token', JSON.stringify({isLoggedIn: false}));
        setLoading(false);
        setLoginFailed(retVal?.data?.data?.errorMessage);
      }
      else{
        setLoading(false);
        alert("Network error");
      }
      console.log("retval",retVal);
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
    <div>
      <div className={classes.maincontent_background} id="maincontent_background">
        <Box>
          <Grid xs={12} container justify="center" alignItems="center">
            <Grid
              xs={8}
              sm={6}
              md={5}
              lg={4}
              xl={5}
              id="maincontent"
              justify="center"
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
                  <Grid  container spacing={5}  style={{ paddingTop: "30px" }}>
                    <Grid item xs={12} fullWidth={true} id="text"  direction="row" className={classes.emailgrid}>
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </Grid>
                    {/* <br></br>
                    <br></br>
                    <br></br> <br></br> */}
                    <Grid item xs={12} fullWidth={true} direction="row"  >
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
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                      />
                        <p className={ loginFailed !== '' ? "showError addPadd" : "hideError" } data-testid="subtitle">
                        {" "}
                        {loginFailed}                 
                      </p>
                    </Grid>
                    {/* <br></br>
                    <br></br>
                    <br></br> <br></br> */}
                    <Grid className={classes.checkbox}>
                      <Checkbox
                        name="rememberme"
                        label="Remember Me"
                        labelid="rememberme"
                        testid="checkbox"
                        stylelabelform='{ "paddingTop":"10px" }'
                        stylecheckbox='{ "color":"#0F4EB3", "marginLeft":"7px","paddingRight":"15px" }'
                        stylecheckboxlabel='{ "color":"" }'
                      />
                    </Grid>
                  
                    {/* <br></br>
                    <br></br>
                    <br></br> */}
                    <Grid item xs={12} className={classes.loginbutton}>
                      <ButtonPrimary
                        type="submit"
                        data-testid="submit"
                        stylebutton='{"background": "", "color":"" }'
                        disabled = { loading }
                      >
                        Sign In
                        <i
                            className="fa fa-refresh fa-spin customSpinner"
                            style={{ marginRight: "10px", display: loading ? "block" : "none" }}
                          />
                      </ButtonPrimary>
                    </Grid>
                    <Grid   className={classes.registergrid}>
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
