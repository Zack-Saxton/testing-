import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { submitFinancialInformation } from "../../../Controllers/ApplyForLoanController";
import {
  ButtonPrimary,
  ButtonSecondary, Select,
  TextField
} from "../../../FormsUI";
import messages from "../../../lib/Lang/applyForLoan.json";

//styling part
const useStyles = makeStyles((theme) => ({
  content_grid: {
    marginTop: "15px",
  },
}));

//YUP validation
const validationSchema = yup.object({
  employerName: yup
    .string(messages.financialInformation.employeeNameRequired)
    .max(30, messages.financialInformation.employeeNameMax)
    .min(2, messages.financialInformation.employeeNameMin)
    .required(messages.financialInformation.employeeNameRequired),
  jobTitle: yup
    .string(messages.financialInformation.jobTitleRequired)
    .max(30, messages.financialInformation.jobTitleMax)
    .min(2, messages.financialInformation.jobTitleMin)
    .required(messages.financialInformation.jobTitleRequired),
  howDoYouHearAboutUs: yup
    .string(messages.financialInformation.hearYouHeared)
    .required(messages.financialInformation.hearYouHeared),
  yearsAtCurrentAddress: yup
    .string(messages.financialInformation.yearAtCurrent)
    .required(messages.financialInformation.yearAtCurrent),
});

//View Part
export default function FinancialInformation(props) {
  //Initiaizing state variable
  const [ error, setError ] = useState('');
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
      props.setLoadingFlag(true);
      let body = {
        "employer_name": values.employerName,
        "current_job_title": values.jobTitle,
        "years_at_current_address": values.yearsAtCurrentAddress,
        "refer": values.howDoYouHearAboutUs
      };
      //API call to submit financial info
      let res = await submitFinancialInformation(body);
      if (res?.data?.financial_information === true) {
        props.setLoadingFlag(false);
        setError('');
        props.next();
      }
      else {
        props.setLoadingFlag(false);
        setError(messages.financialInformation.verificationNotFound);
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
      <form onSubmit={ formik.handleSubmit }>
        <Grid item sm={ 5 } className={ classes.content_grid }>
          <TextField
            id="employerNameInput"
            name="employerName"
            label="Employer Name *"
            value={ formik.values.employerName }
            materialProps={ { maxLength: "30" } }
            onChange={ (event) => {
              nameChange(event);
            } }
            onBlur={ formik.handleBlur }
            error={ formik.touched.employerName && Boolean(formik.errors.employerName) }
            helperText={ formik.touched.employerName && formik.errors.employerName }
          />
        </Grid>
        <Grid item sm={ 5 } className={ classes.content_grid }>
          <TextField
            id="currentJobTitleInput"
            name="jobTitle"
            label="Current Job Title *"
            value={ formik.values.jobTitle }
            materialProps={ { maxLength: "30" } }
            onChange={ (event) => {
              nameChange(event);
            } }
            onBlur={ formik.handleBlur }
            error={ formik.touched.jobTitle && Boolean(formik.errors.jobTitle) }
            helperText={ formik.touched.jobTitle && formik.errors.jobTitle }
          />
        </Grid>
        <Grid id="currentAddressSelectWrap" item sm={ 5 } className={ classes.content_grid }>
          <Select
            id="currentAddressSelect"
            name="yearsAtCurrentAddress"
            labelform="Years at current address *"
            select='[{"value":"0", "label": "<1 year"},
                     {"value":"1", "label": "1 year"},
                     {"value":"2", "label": "2"},
                     {"value":"3", "label": "3"},
                     {"value":"4", "label": "4"},
                     {"value":"5", "label": "5"},
                     {"value":"6", "label": "6"},
                     {"value":"7", "label": "7"},
                     {"value":"8", "label": "8"},
                     {"value":"9", "label": "9"},
                     {"value":"10", "label": "10"},
                     {"value":"11", "label": "11"},
                     {"value":"12", "label": "12"},
                     {"value":"13", "label": "13"},
                     {"value":"14", "label": "14"},
                     {"value":"15", "label": "15"},
                     {"value":"16", "label": "16"},
                     {"value":"17", "label": "17"},
                     {"value":"18", "label": "18"},
                     {"value":"19", "label": "19"},
                     {"value":"21", "label": "20+ years"}]'
            value={ formik.values.yearsAtCurrentAddress }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
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
        <Grid id="heardUsSelectWrap" item sm={ 5 } className={ classes.content_grid }>
          <Select
            id="heardUsSelect"
            name="howDoYouHearAboutUs"
            labelform="How did you hear about us? *"
            select='[{"value":"Advertising"}, {"value":"Friend / Family"}, {"value":"Business / Retailer"}, {"value":"Other"}]'
            value={ formik.values.howDoYouHearAboutUs }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
            error={
              formik.touched.howDoYouHearAboutUs &&
              Boolean(formik.errors.howDoYouHearAboutUs)
            }
            helperText={
              formik.touched.howDoYouHearAboutUs &&
              formik.errors.howDoYouHearAboutUs
            }
          />
          <p style={ { color: "red" } }>{ error }</p>
        </Grid>
        <div className={ props.classes.actionsContainer }>
          <div className={ props.classes.button_div } >

            <ButtonSecondary
              stylebutton='{"marginRight": "10px","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
              onClick={ (event) => {
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
              stylebutton='{"marginRight": "10px","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
            >
              { props.activeStep === props?.steps.length - 1 ? "Finish" : "Next" }
            </ButtonPrimary>
          </div>
        </div>
      </form>
    </div>
  );
}
