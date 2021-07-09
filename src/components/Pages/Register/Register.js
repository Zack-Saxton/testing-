import React from "react";
import { Formik, Form, useFormik, ErrorMessage  } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import * as yup from "yup";
import Box from "@material-ui/core/Box";
import FormHelperText from '@material-ui/core/FormHelperText';

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
// import "../App/app.css";
// import NormalHeader from "../Layout/NormalHeader/normalheader"
// import NormalFooter from "../Layout/NormalFooter/normalfooter"
// import Footer from "../Layout/Footer/footer"
import Paper from "@material-ui/core/Paper";
import Logo from "../../../assets/images/loginbg.png";
import "./register.css";
import CssBaseline from '@material-ui/core/CssBaseline';
import { FormControl, Icon } from '@material-ui/core';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundImage: "url(" + Logo + ")",
    
  },
  root: {
    flexGrow: 1,
  },
  // paper: {
  //   padding: theme.spacing(3),
  //   color: theme.palette.text.secondary,
  // },
  maingrid: {
    boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%), 
    0 6px 30px 5px rgb(0 0 0 / 12%), 
    0 8px 10px -7px rgb(0 0 0 / 20%)`,
    background: "#f5f2f2",
  },
  title: {
    fontSize: "20px",
    textAlign: "initial",
    fontWeight: 400
  },
  subtitle:{
    fontSize: "12px",
    textAlign: "justify"
},
paper: {
  // marginTop: theme.spacing(8),
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: `rgba(255, 255, 255, .8)`,
  color: theme.palette.text.secondary,
  boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%), 
  0 6px 30px 5px rgb(0 0 0 / 12%), 
  0 8px 10px -7px rgb(0 0 0 / 20%)`,
},

form: {
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing(3),
  
},
submit: {
  margin: theme.spacing(3, 0, 2),
},
}));

const validationSchema = yup.object({
  firstname: yup
    .string("Enter your firstname")
    .required("Firstname is required"),
  lastname: yup.string("Enter your Lastname").required("Lastname is required"),

  email: yup
    .string("Enter your email")
    .email("Email should be as (you@example.com)")
    .required("Email is required"),

  password: yup.string("Enter your password")
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/,
    "Must Contain 8 to 30 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  )
  .required("Password is required"),
  

  confirmpassword: yup
  .string()
  .required("Please confirm your password")
  .when("password", {
    is: password => (password && password.length > 0 ? true : false),
    then: yup.string().oneOf([yup.ref("password")], "Password doesn't match")
  }),

  zip: yup
    .string("Enter your Zip")
    .min(5, "Zipcode should be of minimum 5 characters length")
    .required("Zipcode is required"),

  ssn:yup.string().when('identifyType',
  {
      is: 'ssn',
      then: yup.string()
      .min(9, 'Social Security Number must be up to 9 digits without dashes')
      .required('Social Security Number is Required')
  })
});

export default function Register() {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: '',
      confirmpassword:"",
      zip: "",
      ssn: "",
      identifyType: 'ssn' || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  
  return (
<div>
				<div className={classes.main}>
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
									
  
    <Typography className={classes.title} color="textSecondary">
                Sign In help / Register
               </Typography>
                <p className={classes.subtitle}> Let us help you get signed in another way</p>
									
								<form onSubmit={formik.handleSubmit}>
									<Grid
										
                    className="textBlock"
                    container
										justify="center"
										alignItems="center"
                    spacing={2}
                  
									>
										
                    <Grid item xs={12} sm={6} fullWidth={true} direction="row" >
                    <TextFieldWithIcon
                  name="firstname"
                  id="firstname"
                  label="Enter Firstname"
                  icon="perm_identity"
                  iconColor="#595E6E" 
                  iconPosition="left"
                  // required={true}
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                  helperText={
                    formik.touched.firstname && formik.errors.firstname
                  }

                  // customClass='fa fa-plus-circle'
                />
                </Grid>
									
                <Grid item xs={12} sm={6}  fullWidth={true} direction="row" >
                    <TextFieldWithIcon
                              name="lastname"
                              id="lastname"
                              label="Enter Lastname"
                              icon="perm_identity"
                              iconColor="#595E6E"
                              iconPosition="left"
                             
                              // required={true}
                              value={formik.values.lastname}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={
                                formik.touched.lastname && Boolean(formik.errors.lastname)
                              }
                              helperText={formik.touched.lastname && formik.errors.lastname}

                             
                            />
                </Grid>

                <Grid item xs={12} fullWidth={true} direction="row" >
											
                      <EmailWithIcon
                              
                              id="email"
                              name="email"
                              label=" Enter Your Email"
                                icon="emailIcon"
                                iconColor="#595E6E"
                                iconPosition="left"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={formik.touched.email && Boolean(formik.errors.email)}
                              helperText={formik.touched.email && formik.errors.email}
                            />
                      </Grid>

                      
        <Grid item xs={12} sm={6} direction="row" style={{display:"inline-flex"}}>
         <Grid  style={{paddingTop:"20px", paddingRight:"10px"}}> 
            <Icon >securityIcon</Icon>
          </Grid>
        <SocialSecurityNumber
                    name="ssn"
                    label="Social Security Number"
                    id="ssn"
                    type="ssn"
                    value={formik.values.ssn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.ssn && Boolean(formik.errors.ssn)}
                    helperText={formik.touched.ssn && formik.errors.ssn}
                  />
        </Grid>
        <Grid item xs={12} sm={6} direction="row" style={{display:"inline-flex"}}>
         <Grid   style={{paddingTop:"20px" , paddingRight:"10px"}}> 
            <Icon >mapIcon</Icon>
          </Grid>
        <Zipcode
                    fullWidth
                    id="zip"
                    name="zip"
                    label="Zipcode"
                    value={formik.values.zip}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.zip && Boolean(formik.errors.zip)}
                    helperText={formik.touched.zip && formik.errors.zip}
                  />
              

        </Grid>

        <Grid item xs={12}  direction="row" style={{display:"inline-flex"}}>
         <Grid   style={{paddingTop:"20px" , paddingRight:"10px"}}> 
            <Icon >cakeIcon</Icon>
          </Grid>
        <DatePicker
                name="date"
                label="Date of Birth"
                id="date"
               
              />
        </Grid>

        <Grid item xs={12} fullWidth={true} direction="row" >
				 <PasswordWithIcon
										name="password"
										label="Confirm Password"
										icon="lock"
										iconColor="#595E6E"
										iconPosition="left"
										id="password"
										type="password"
										
										value={formik.values.password}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											  error={formik.touched.password && Boolean(formik.errors.password)}
											 helperText={formik.touched.password && formik.errors.password}
									/>
									</Grid>

              <p id="subtitle" className={classes.subtitle}>
                Please ensure your password meets the following criteria: between 8 and 30 characters in length,
                 at least 1 uppercase letter, at least 1 lowercase letter, and at least 1 number.
                 </p>

      

              

        <Grid item xs={12} fullWidth={true} direction="row" >
				 <PasswordWithIcon
										name="confirmpassword"
										label="Re-enter your Password"
										icon="lock_openIcon"
										iconColor="#595E6E"
										iconPosition="left"
										id="cpass"
										type="password"
										
										value={formik.values.confirmpassword}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											  error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
											 helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
									/>
									</Grid>
       
      <br></br><br></br><br></br><br></br><br></br>

        <Grid item xs={12} >
      <Button
                type="submit"
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
