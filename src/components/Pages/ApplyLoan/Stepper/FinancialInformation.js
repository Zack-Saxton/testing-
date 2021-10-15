import React, {useState} from "react";
import {Select, TextField, ButtonPrimary, ButtonSecondary} from "../../../FormsUI";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
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
		.string("Enter your Martial Status")
		.required("Select Martial Status"),
  jobTitle: yup
		.string("Enter your Martial Status")
		.required("Select Martial Status"),
  howDoYouHearAboutUs: yup
		.string("Enter your Martial Status")
		.required("Select Martial Status"),
  yearsAtCurrentAddress: yup
		.string("Enter your Martial Status")
		.required("Select Martial Status"),
});

//View Part
export default function FinancialInformation(props) {

  //Initiaizing state variable
  const [error, setError] = useState('');
  const classes = useStyles();
	const formik = useFormik({
		initialValues: {
			employerName:  "",
			jobTitle: "",
      yearsAtCurrentAddress: "",
      howDoYouHearAboutUs: ""
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			
let body = { 
  "employer_name" : values.employerName,
  "current_job_title" : values.jobTitle,
  "years_at_current_address" : "12",
  "refer" : "nil"
}

//API call to submit financial info
let res = await submitFinancialInformation(body);
if(res.data.data.phone_verification === true){
  setError('');
  
  props.next() ;
}
else{
  alert("has error");
  setError(errorMessage.applyForLoan.financialInformation.verificationNotFound);
}

		}
	});

  //View part
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
      <Grid item sm={5} className={classes.content_grid}>
        <TextField 
        name="employerName" 
        label="Employer Name" 
        value={formik.values.employerName}
        onChange={formik.handleChange}
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
        onChange={formik.handleChange}
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
        <p style={{color: "red"}}>{error}</p>
      </Grid>

      <div className={props.classes.actionsContainer}>
          <div className={props.classes.button_div} >
            
            <ButtonSecondary
              stylebutton='{"marginRight": "10px", "color":"" }'
              onClick={props.reset}
              id = "button_stepper_reset"
            >
              Reset
            </ButtonSecondary>
            
            <ButtonSecondary
              disabled={props?.activeStep === 0}
              onClick={props?.prev}
              id = "button_stepper_prev"
              stylebutton='{"marginRight": "10px", "color":"" }'
            >
              Prev
            </ButtonSecondary>
            <ButtonPrimary
              variant="contained"
              color="primary"
              type="submit"
              id = "button_stepper_next"
              stylebutton='{"marginRight": "10px", "color":"" }'
              // onClick={()=>{ props.next() }}
            >
              {props.activeStep === props?.steps.length - 1 ? "Finish" : "Next"}
            </ButtonPrimary>
          </div>
        </div>
      </form>
    </div>
  );
}
