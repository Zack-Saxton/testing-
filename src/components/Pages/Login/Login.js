import React from "react";
import { Formik, Form, useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import * as yup from "yup";
import Box from "@material-ui/core/Box";
import FormHelperText from "@material-ui/core/FormHelperText";

import {
  Button,
  EmailTextField,
  PasswordWithIcon,
  EmailWithIcon,
  TextFieldWithIcon,
  Checkbox,
  SocialSecurityNumber,
  Slider,
  Select,
  Radio,
  Multiselect,
  DatePicker,
  TextArea,
  Zipcode,
  TextField,
  PasswordField,
} from "../../FormsUI";
import Paper from "@material-ui/core/Paper";
import Logo from "../../../assets/images/loginbg.png";
import { Link, NavLink } from "react-router-dom";
import { FormControl, Icon } from "@material-ui/core";

import "./login.css";
const useStyles = makeStyles((theme) => ({
  main: {
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
  },
  button: {
    padding: "10px",
  },
  title: {
    fontSize: "25px",
    textAlign: "initial",
  },
  register: {
    fontSize: "12px",
    textDecoration: "none",
    color: "blue",
  },
  maingrid: {
    boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%), 
		0 6px 30px 5px rgb(0 0 0 / 12%), 
		0 8px 10px -7px rgb(0 0 0 / 20%)`,
    background: "#f5f2f2",
  },
}));

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Email should be as (you@example.com)")
    .matches(
      /^[a-zA-Z](([^<>()|?{}=/+'[\]\\.,;:#!$%^&*_-\s@\"]+(\.[^<>()|?{}=/+'[\]\\.,;:#!$%^&*_-\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,
      "Invalid Email"
    )
    .required("Your email address is required"),

  password: yup
    .string("Enter your password")
    .max(30, "Password can be upto 30 characters length")
    .min(8, "Password should be minimum of 8 characters length")
    .required("Your password is required"),
});

export default function Login() {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const preventSpace = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };

  return (
    <div>
      <div className={classes.main} id="main">
        <Box>
          <Grid xs={12} container justify="center" alignItems="center">
            <Grid
              xs={10}
              sm={7}
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
                  Sign In
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                  <Grid className="textBlock" container spacing={2}>
                    <Grid item xs={12} fullWidth={true} direction="row">
                      <EmailWithIcon
                        id="email"
                        name="email"
                        type="email"
                        testid="email-input"
                        placeholder="Enter your email address"
                        label="Email *"
                        icon="emailIcon"
                        iconColor="#595E6E"
                        iconPosition="left"
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
                    <br></br>
                    <br></br>
                    <br></br> <br></br>
                    <Grid item xs={12} fullWidth={true} direction="row">
                      <PasswordWithIcon
                        name="password"
                        label="Password *"
                        placeholder="Enter your password"
                        icon="lock"
                        iconColor="#595E6E"
                        iconPosition="left"
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
                    </Grid>
                    <br></br>
                    <br></br>
                    <br></br> <br></br>
                    <Grid className={classes.checkbox}>
                      <Checkbox
                        name="rememberme"
                        label="Remember Me"
                        labelid="rememberme"
                        testid="checkbox"
                        stylelabelform='{ "color":"" }'
                        stylecheckbox='{ "color":"blue","paddingRight":"15px" }'
                        stylecheckboxlabel='{ "color":"" }'
                      />
                    </Grid>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        data-testid="submit"
                        stylebutton='{"background": "", "color":"" }'
                        background="0F4EB3!important"
                      >
                        Sign In
                      </Button>
                    </Grid>
                    <div>
                      <NavLink
                        to="/register"
                        style={{ textDecoration: "none" }}
                      >
                        <p className={classes.register}>
                          Sign In Help / Register
                        </p>
                      </NavLink>
                    </div>
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
