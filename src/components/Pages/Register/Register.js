import React from "react";
import { Formik, Form, useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as yup from "yup";
import Box from "@material-ui/core/Box";
import {  Icon } from '@material-ui/core';

import {
  Button,
  PasswordWithIcon,
  EmailWithIcon,
  TextFieldWithIcon,
  SocialSecurityNumber,
  DatePicker,
  Zipcode,
} from "../../FormsUI";

import Paper from "@material-ui/core/Paper";
import Logo from "../../../assets/images/loginbg.png";
import "./register.css";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundImage: "url(" + Logo + ")",
  },
  root: {
    flexGrow: 1,
  },

  maingrid: {
    boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%), 
    0 6px 30px 5px rgb(0 0 0 / 12%), 
    0 8px 10px -7px rgb(0 0 0 / 20%)`,
    background: "#f5f2f2",
  },
  title: {
    fontSize: "20px",
    textAlign: "initial",
    fontWeight: 400,
    color: "black",
  },
  passwordtitle: {
    fontSize: "12px",
    textAlign: "justify",
    marginLeft: "40px",
  },
  dobtitle: {
    fontSize: "12px",
    textAlign: "justify",
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

  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = yup.object({
  firstname: yup
    .string("Enter your firstname")
    .max(30, "Firstname can be upto 30 characters length")
    .matches(/^[a-zA-Z]+$/, "Name should be in alphabets")
    .required("Firstname is required"),

  lastname: yup
    .string("Enter your Lastname")
    .max(30, "Lastname can be upto 30 characters length")
    .matches(/^[a-zA-Z]+$/, "Name should be in alphabets")
    .required("Lastname is required"),

  email: yup
    .string("Enter your email")
    .email("Email should be as (you@example.com)")
    //.matches( /^[a-zA-Z][a-zA-Z0-9+_.-]+@[a-zA-Z.-]+$/, "Enter a valid mail id")
    .matches(
      /^[a-zA-Z](([^<>()|?{}=/+'[\]\\.,;:#!$%^&*_-\s@\"]+(\.[^<>()|?{}=/+'[\]\\.,;:#!$%^&*_-\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid Email"
    )
    .required("Email is required"),

  date: yup
    .date("Please enter valid date")
    .nullable()
    .required("Date of birth is required"),

  password: yup
    .string("Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,30}$/,
      "Your password doesn't meet the criteria"
    )
    .required("Password is required"),

  confirmpassword: yup
    .string()
    .required("Please confirm your password")
    .when("password", {
      is: (password) => (password && password.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref("password")], "Password doesn't match"),
    }),

  zip: yup
    .string("Enter your Zip")
    .min(5, "Zipcode should be of minimum 5 characters length")
    .required("Zipcode is required"),

  ssn: yup
    .string("Enter a name")
    .required("SSN is required")
    .transform((value) => value.replace(/[^\d]/g, ""))
    .min(9, "Name must contain at least 9 digits"),
});

export default function Register() {
  const classes = useStyles();
  var myDate = new Date();
  myDate.setDate(myDate.getDate() - 6570);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
      zip: "",
      ssn: "",

      date: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <div className={classes.main} id="main">
        <Box>
          <Grid xs={12} container justify="center" alignItems="center">
            <Grid
              xs={11}
              sm={10}
              md={8}
              lg={6}
              xl={7}
              className="cardWrapper"
              justify="center"
              alignItems="center"
            >
              <Paper className={classes.paper}>
                <Typography
                  className={classes.title}
                  data-testid="title"
                  color="textSecondary"
                >
                  Sign In help / Register
                </Typography>
                <p className={classes.subtitle} data-testid="subtitle">
                  {" "}
                  Let us help you get signed in another way
                </p>

                <form onSubmit={formik.handleSubmit}>
                  <Grid
                    className="textBlock"
                    container
                    justify="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={12} sm={6} fullWidth={true} direction="row">
                      <TextFieldWithIcon
                        name="firstname"
                        id="firstname"
                        label="Firstname *"
                        placeholder="Enter your firstname"
                        materialProps={{ maxLength: "30" }}
                        icon="perm_identity"
                        iconColor="#595E6E"
                        iconPosition="left"
                        data-testid="textbox"
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.firstname &&
                          Boolean(formik.errors.firstname)
                        }
                        helperText={
                          formik.touched.firstname && formik.errors.firstname
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} fullWidth={true} direction="row">
                      <TextFieldWithIcon
                        name="lastname"
                        id="lastname"
                        label="Lastname *"
                        placeholder="Enter your lastname"
                        icon="perm_identity"
                        iconColor="#595E6E"
                        iconPosition="left"
                        materialProps={{ maxLength: "30" }}
                        // required={true}
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.lastname &&
                          Boolean(formik.errors.lastname)
                        }
                        helperText={
                          formik.touched.lastname && formik.errors.lastname
                        }
                      />
                    </Grid>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Grid item xs={12} fullWidth={true} direction="row">
                      <EmailWithIcon
                        id="email"
                        name="email"
                        label="Email *"
                        placeholder="Enter your email address"
                        icon="emailIcon"
                        iconColor="#595E6E"
                        iconPosition="left"
                        materialProps={{ maxLength: "100" }}
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
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      direction="row"
                      style={{ display: "inline-flex" }}
                    >
                      <Grid
                        style={{ paddingTop: "20px", paddingRight: "10px" }}
                      >
                        <Icon>securityIcon</Icon>
                      </Grid>

                      <SocialSecurityNumber
                        name="ssn"
                        label="Social Security Number *"
                        placeholder="Enter your Social Security Number"
                        id="ssn"
                        type="ssn"
                        value={formik.values.ssn}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.ssn && Boolean(formik.errors.ssn)}
                        helperText={formik.touched.ssn && formik.errors.ssn}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      direction="row"
                      style={{ display: "inline-flex" }}
                    >
                      <Grid
                        style={{ paddingTop: "20px", paddingRight: "10px" }}
                      >
                        <Icon>mapIcon</Icon>
                      </Grid>
                      <Zipcode
                        fullWidth
                        id="zip"
                        name="zip"
                        label="Zipcode *"
                        placeholder="Enter your zipcode"
                        value={formik.values.zip}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.zip && Boolean(formik.errors.zip)}
                        helperText={formik.touched.zip && formik.errors.zip}
                      />
                    </Grid>
                    <br></br>
                    <br></br>
                    <br></br> <br></br>
                    <Grid
                      item
                      xs={12}
                      direction="row"
                      style={{ display: "inline-flex" }}
                    >
                      <Grid
                        style={{ paddingTop: "20px", paddingRight: "10px" }}
                      >
                        <Icon>cakeIcon</Icon>
                      </Grid>
                      <DatePicker
                        name="date"
                        label="Date of Birth *"
                        id="date"
                        placeholder="DD-MM-YYYY"
                        maxdate={myDate}
                        value={formik.values.date}
                        onChange={(values) => {
                          formik.setFieldValue("date", values);
                        }}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.date && Boolean(formik.errors.date)
                        }
                        helperText={formik.touched.date && formik.errors.date}
                      />
                    </Grid>
                    <p id="subtitle" className={classes.dobtitle}>
                      Please ensure your DOB meets the following criteria: Your
                      age must be greater than or equal to 18 years.
                    </p>
                    <Grid item xs={12} fullWidth={true} direction="row">
                      <PasswordWithIcon
                        name="password"
                        label="Confirm Password *"
                        placeholder="Enter your password"
                        icon="lock"
                        iconColor="#595E6E"
                        iconPosition="left"
                        id="password"
                        type="password"
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
                    <p id="subtitle" className={classes.passwordtitle}>
                      Please ensure your password meets the following criteria:
                      between 8 and 30 characters in length, at least 1
                      uppercase letter, at least 1 lowercase letter, at least 1
                      symbol and at least 1 number.
                    </p>
                    <Grid item xs={12} fullWidth={true} direction="row">
                      <PasswordWithIcon
                        name="confirmpassword"
                        label="Re-enter your Password *"
                        placeholder="Enter your confirm password"
                        icon="lock_openIcon"
                        iconColor="#595E6E"
                        iconPosition="left"
                        id="cpass"
                        type="password"
                        materialProps={{ maxLength: "30" }}
                        value={formik.values.confirmpassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.confirmpassword &&
                          Boolean(formik.errors.confirmpassword)
                        }
                        helperText={
                          formik.touched.confirmpassword &&
                          formik.errors.confirmpassword
                        }
                      />
                    </Grid>
                    <br></br>
                    <br></br>
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
