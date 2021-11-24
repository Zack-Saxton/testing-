import React, { useState } from "react";
import { Select, TextField, ButtonPrimary, ButtonSecondary } from "../../../FormsUI";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import { submitFinancialInformation } from '../../../Controllers/ApplyForLoanController'
import { errorMessage } from "../../../../helpers/ErrorMessage";

//styling part
const useStyles = makeStyles((theme) => ({
  content_grid: {
    marginTop: "15px",
  },
}));

//YUP validation 
const validationSchema = yup.object({
  employerName: yup
    .string("Your employer name is required.")
		.max(30, "Employer name can be upto 30 characters length")
		.min(2, "Employer name should be minimum of 2 letters")
		.required("Your employer name is required."),
  jobTitle: yup
    .string("Your current job title is required.")
    .max(30, "Job title can be upto 30 characters length")
		.min(2, "Job title should be minimum of 2 letters")
    .required("Your current job title is required."),
  howDoYouHearAboutUs: yup
    .string("Please let us know how you heard about us.")
    .required("Please let us know how you heard about us."),
  yearsAtCurrentAddress: yup
    .string("Years at current address is required")
    .required("Years at current address is required"),
});

//View Part
export default function FinancialInformation(props) {

  //Initiaizing state variable
  const [error, setError] = useState('');
  const classes = useStyles();
  var formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      employerName: "",
      jobTitle: "",
      yearsAtCurrentAddress: "",
      howDoYouHearAboutUs: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let body = {
        "employer_name": values.employerName,
        "current_job_title": values.jobTitle,
        "years_at_current_address": "12",
        "refer": "nil"
      }
      //API call to submit financial info
      let res = await submitFinancialInformation(body);
      if (res.data.data.financial_information === true) {
        setError('');
        props.next();
      }
      else {
        setError(errorMessage.applyForLoan.financialInformation.verificationNotFound);
      }
    }
  });
  const nameChange = (event) => { 
    const reg = /^([a-zA-Z]+[.]?[ ]?|[a-z]+['-]?)+$/;
    let acc = event.target.value;
    if (acc === "" || reg.test(acc)) {
      formik.handleChange(event);
    }
  };

  //View part
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid item sm={5} className={classes.content_grid}>
          <TextField
            name="employerName"
            label="Employer Name"
            value={formik.values.employerName}
            materialProps={{ maxLength: "30" }}
            onChange={(event) => {
              nameChange(event);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.employerName && Boolean(formik.errors.employerName)}
            helperText={formik.touched.employerName && formik.errors.employerName}
          />
        </Grid>
        <Grid item sm={5} className={classes.content_grid}>
          <TextField
            name="jobTitle"
            label="Current Job Title"
            value={formik.values.jobTitle}
            materialProps={{ maxLength: "30" }}
            onChange={(event) => {
              nameChange(event);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
            helperText={formik.touched.jobTitle && formik.errors.jobTitle}
          />
        </Grid>
        <Grid item sm={5} className={classes.content_grid}>
          <Select
            name="yearsAtCurrentAddress"
            labelform="Years at current address"
            select='[{"value":"0-3"}, {"value":"3-5"},  {"value":"5-10"}]'
            value={formik.values.yearsAtCurrentAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.yearsAtCurrentAddress &&
              Boolean(formik.errors.yearsAtCurrentAddress)
            }
            helperText={
              formik.touched.yearsAtCurrentAddress &&
              formik.errors.yearsAtCurrentAddress
            }
          />
        </Grid>
        <Grid item sm={5} className={classes.content_grid}>
          <Select
            name="howDoYouHearAboutUs"
            labelform="How did you hear about us?"
            select='[{"value":"Internet"}, {"value":"Friends"}]'
            value={formik.values.howDoYouHearAboutUs}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.howDoYouHearAboutUs &&
              Boolean(formik.errors.howDoYouHearAboutUs)
            }
            helperText={
              formik.touched.howDoYouHearAboutUs &&
              formik.errors.howDoYouHearAboutUs
            }
          />
          <p style={{ color: "red" }}>{error}</p>
        </Grid>
        <div className={props.classes.actionsContainer}>
          <div className={props.classes.button_div} >

            <ButtonSecondary
              stylebutton='{"marginRight": "10px", "color":"" }'
              onClick={(e) => {
                formik.resetForm();
              }
              }
              id="button_stepper_reset"
            >
              Reset
            </ButtonSecondary>
            <ButtonPrimary
              variant="contained"
              color="primary"
              type="submit"
              id="button_stepper_next"
              stylebutton='{"marginRight": "10px", "color":"" }'
            >
              {props.activeStep === props?.steps.length - 1 ? "Finish" : "Next"}
            </ButtonPrimary>
          </div>
        </div>
      </form>
    </div>
  );
}
