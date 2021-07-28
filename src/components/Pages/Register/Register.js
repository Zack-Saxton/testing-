import React, { useState } from "react";
import { useFormik  } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import * as yup from "yup";
import Box from "@material-ui/core/Box";
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
import {  Icon } from "@material-ui/core";

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
    marginLeft: "32px",
   
  },
  dobtitle: {
    fontSize: "12px",
    textAlign: "justify",
    marginLeft: "40px",
   
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
}));

const validationSchema = yup.object({
  firstname: yup
    .string("Enter your firstname")
    .max(30, "Firstname can be upto 30 characters length")
    .min(2, "Firstname should be minimum of 2 letters")
    .required("Your first name is required"),

  lastname: yup
    .string("Enter your Lastname")
    .max(30, "Lastname can be upto 30 characters length")
    .min(2, "Lastname should be minimum of 2 letters")
    .required("Your last name is required"),

  email: yup
    .string("Enter your email")
    .email("Email should be as (you@example.com)")

    .matches(
      /^[a-zA-Z](([^<>()|?{}=/+'[\]\\.,;:#!$%^&*_-\s@\"]+(\.[^<>()|?{}=/+'[\]\\.,;:#!$%^&*_-\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/,
      "Invalid Email"
    )
    .required("Your email address is required"),

  date: yup
    .date("Please enter valid date")
    .nullable()
    .required("Your date of birth is required")
    .max(new Date(Date.now() - 567648000000), "You must be at least 18 years"),

  password: yup
    .string("Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/,
      "Your password doesn't meet the criteria"
    )
    .max(30, "Password can be upto 30 characters length")
    .min(8, "Password should be minimum of 8 characters length")
    .required("Your password is required"),

  confirmpassword: yup
    .string()
    .max(30, "Password can be upto 30 characters length")
    .min(8, "Password should be minimum of 8 characters length")
    .required("Your confirm password is required")
    .when("password", {
      is: (password) => (password && password.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref("password")], "Password doesn't match"),
    }),

  zip: yup
    .string("Enter your Zip")
    .min(5, "Zipcode should be of minimum 5 characters length")
    .required("Your home ZIP code is required"),

  ssn: yup
    .string()
    .min(11, "Social Security Number must be up to 9 digits")
    .required("Your SSN is required"),
});

export default function Register() {
  const classes = useStyles();
  const [validZip, setValidZip] = useState(true);
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

  const onHandleChange = (event) => {
    const reg = /^([a-zA-Z]+[ ]?|[a-z]+['-]?)+$/;

    let acc = event.target.value;

    if (acc === "" || reg.test(acc)) {
      formik.handleChange(event);
    }
  };

  const preventSpace = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };

  const fetchAddress = (e) => {
    console.log("im calling");
    fetch("https://api.zippopotam.us/us/" + e.target.value)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.places) {
            setValidZip(true);
          } else {
            setValidZip(false);
          }
        },
        (error) => {
          console.log("error:", error);
          setValidZip(false);
        }
      );
    formik.handleChange(e);
  };

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
                        label="First Name *"
                        placeholder="Enter your firstname"
                        icon="perm_identity"
                        iconColor="#595E6E"
                        iconPosition="left"
                        data-testid="textbox"
                        // required={true}
                        materialProps={{ maxLength: "30" }}
                        value={formik.values.firstname}
                        onChange={onHandleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.firstname &&
                          Boolean(formik.errors.firstname)
                        }
                        helperText={
                          formik.touched.firstname && formik.errors.firstname
                        }

                        // customClass='fa fa-plus-circle'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} fullWidth={true} direction="row">
                      <TextFieldWithIcon
                        name="lastname"
                        id="lastname"
                        label="Last Name *"
                        placeholder="Enter your lastname"
                        icon="perm_identity"
                        iconColor="#595E6E"
                        iconPosition="left"
                        // required={true}
                        materialProps={{ maxLength: "30" }}
                        value={formik.values.lastname}
                        onChange={onHandleChange}
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
                        // onChange={onSSNhandleChange}
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
                        // onChange={formik.handleChange}
                        onChange={fetchAddress}
                        onBlur={formik.handleBlur}
                        error={
                          (formik.touched.zip && Boolean(formik.errors.zip)) ||
                          !validZip
                        }
                        helperText={
                          validZip
                            ? formik.touched.zip && formik.errors.zip
                            : "Please enter valid zipcode"
                        }
                      />
                    </Grid>
                    <br></br>
                    <br></br>
                    <br></br> <br></br>
                    <Grid
                      item
                      xs={12}
                      direction="row"
                      style={{ display: "inline-flex", paddingBottom:"0px" }}
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
                        placeholder="MM-DD-YYYY"
                        format="MM-dd-yyyy"
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
                    <Grid xs={12} fullWidth={true}>
                      <p id="subtitle" className={classes.dobtitle}>
                        Please ensure your DOB meets the following criteria:
                        Your age must be greater than or equal to 18 years.
                      </p>
                    </Grid>
                    <Grid item xs={12} fullWidth={true} direction="row">
                      <PasswordWithIcon
                        name="password"
                        label="Create new password *"
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
                      <p id="subtitle" className={classes.passwordtitle}>
                        Please ensure your password meets the following
                        criteria: between 8 and 30 characters in length, at
                        least 1 uppercase letter, at least 1 lowercase letter,
                        at least 1 symbol and at least 1 number.
                      </p>
                    </Grid>
                    <Grid item xs={12} fullWidth={true} direction="row">
                      <PasswordWithIcon
                        name="confirmpassword"
                        label="Re-enter your password *"
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
