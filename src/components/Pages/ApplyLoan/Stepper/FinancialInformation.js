import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useState,useEffect } from "react";
import * as yup from "yup";
import { submitFinancialInformation } from "../../../Controllers/ApplyForLoanController";
import {
  ButtonPrimary,
  ButtonSecondary, Select,
  TextField
} from "../../../FormsUI";
import messages from "../../../lib/Lang/applyForLoan.json";
import {phoneNumberMask, maskPhoneNumberWithAsterisk} from "../../../Controllers/CommonController";
import globalMessages from "../../../../assets/data/globalMessages.json";
import { useAccountOverview } from "../../../../hooks/useAccountOverview"
import "./stepper.css"
import { usePhoneNumber } from '../../../../hooks/usePhoneNumber';

//styling part
const useStyles = makeStyles(() => ({
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
  phone: yup
			.string(globalMessages.PhoneEnter)
			.nullable()
			.transform((value) => value.replace(/[^\d]/g, ""))
			.matches(/^$|^[1-9]{1}\d{2}\d{3}\d{4}$/, globalMessages.PhoneValid)
			.matches(/^$|^(\d)(?!\1+$)\d{9}$/, globalMessages.PhoneValid)
      .when("employementStatus", {
        is: "Employed Hourly",
        then: yup.string().required(globalMessages?.PhoneRequired),
      })
      .when("employementStatus", {
        is: "Employed Salaried",
        then: yup.string().required(globalMessages?.PhoneRequired),
      })
      .required(globalMessages.PhoneRequired)      
      .min(10, globalMessages.PhoneMin)
});

//View Part
export default function FinancialInformation(props) {
  //Initiaizing state variable
  const [ error, setError ] = useState('');
  const classes = useStyles();
  const {  data : accountDetails } = useAccountOverview();
  const checkEmployStatus = accountDetails?.data?.applicant?.self_reported?.employment_status;
  const { phoneNumberValue, setPhoneNumberValue, phoneNumberCurrentValue, setPhoneNumberCurrentValue, updateActualValue, updateMaskValue, updateEnterPhoneNo } = usePhoneNumber();
  let formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      employerName: "",
      jobTitle: "",
      yearsAtCurrentAddress: "",
      howDoYouHearAboutUs: "",
      employementStatus: checkEmployStatus ?? "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      props.setLoadingFlag(true);
      let body = {
        "employer_name": values.employerName,
        "current_job_title": values.jobTitle,
        "years_at_current_address": values.yearsAtCurrentAddress,
        "refer": values.howDoYouHearAboutUs,
        "employer_phone": phoneNumberValue,
      };
      //API call to submit financial info
      let res = await submitFinancialInformation(body);
      if (res?.data?.financial_information) {
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
    let employerName = event.target.value.trim();
    if (!employerName || reg.test(employerName)) {
      formik.handleChange(event);
    }
  };

  const trimValueOnBlur = (event) => {
    formik.setFieldValue(event.target.name, event.target.value.trim());
    formik.handleBlur(event);
  };

  // prevent keyboard space
	const preventSpace = (event) => {
		if (event.keyCode === 32) {
			event.preventDefault();
		}
	};
  useEffect(() => {
    setPhoneNumberValue("");
    setPhoneNumberCurrentValue(maskPhoneNumberWithAsterisk(phoneNumberMask( "")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  const shortANDoperation = (pramOne, pramtwo) => {
		return pramOne && pramtwo
	};

  let yearsAtCurrentAddressOption = [];
  for(let start=0; start <= 20; start++){
    let labelString = start === 0 ? "<1 year" : (start === 1 ? "1 year" : (start === 20 ? "20+ years": `${start}`))
    yearsAtCurrentAddressOption.push({value: start === 20 ? 21 : start, label: labelString});
  }

  //View part
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid item sm={5} className={classes.content_grid}>
          <TextField
            id="employerNameInput"
            name="employerName"
            label="Employer Name *"
            value={formik.values.employerName}
            materialProps={{ maxLength: "30" }}
            onChange={(event) => {
              nameChange(event);
            }}
            onBlur={trimValueOnBlur}
            error={formik.touched.employerName && Boolean(formik.errors.employerName)}
            helperText={formik.touched.employerName && formik.errors.employerName}
          />
        </Grid>
        <Grid item sm={5} className={classes.content_grid}>
          <TextField
            id="currentJobTitleInput"
            name="jobTitle"
            label="Current Job Title *"
            value={formik.values.jobTitle}
            materialProps={{ maxLength: "30" }}
            onChange={(event) => {
              nameChange(event);
            }}
            onBlur={trimValueOnBlur}
            error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
            helperText={formik.touched.jobTitle && formik.errors.jobTitle}
          />
        </Grid>

        <Grid item sm={5} id="financialEmpPhoneWrap" 
											data-testid="phone number field"
											className={
												checkEmployStatus === "Employed Hourly" ||
                        checkEmployStatus === "Employed Salaried"
													? "showMsg"
													: "hideMsg"
											}
										>
										
            <TextField
              name="phone"
              className={
                checkEmployStatus === "Employed Hourly" ||
                checkEmployStatus === "Employed Salaried"
                  ? "showMsg"
                  : "hideMsg"
              }
              label="Employer's phone number *"
              placeholder="Enter employer's phone number"
              id="phone"
              type="text"
              data-testid="phone_number_field"
              materialProps={{ maxLength: "14" }}
              onKeyDown={preventSpace}
              onBlur={(event)=>{
                updateMaskValue(event);
                formik.handleBlur(event);
              }}
              value = { phoneNumberCurrentValue }
              onChange={(event)=>{
                updateEnterPhoneNo(event);
                formik.handleChange(event);
              }}
              error={shortANDoperation(formik.touched.phone, Boolean(formik.errors.phone))}
              helperText = {shortANDoperation(formik.touched.phone, formik.errors.phone)}
              onFocus={ updateActualValue }
            />
						</Grid>
        <Grid id="currentAddressSelectWrap" item sm={5} className={classes.content_grid}>
          <Select
            id="currentAddressSelect"
            name="yearsAtCurrentAddress"
            labelform="Years at current address *"
            select={JSON.stringify(yearsAtCurrentAddressOption)}
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
        <Grid id="heardUsSelectWrap" item sm={5} className={classes.content_grid}>
          <Select
            id="heardUsSelect"
            name="howDoYouHearAboutUs"
            labelform="How did you hear about us? *"
            select='[{"value":"Advertising"}, {"value":"Friend / Family"}, {"value":"Business / Retailer"}, {"value":"Other"}]'
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
              stylebutton='{"marginRight": "10px","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
              onClick={(_event) => {
                formik.resetForm();
                setPhoneNumberCurrentValue("")
                setPhoneNumberValue("");
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
              {props.activeStep === props?.steps.length - 1 ? "Finish" : "Next"}
            </ButtonPrimary>
          </div>
        </div>
      </form>
    </div>
  );
}

FinancialInformation.propTypes = {
  setLoadingFlag: PropTypes.func,
  next: PropTypes.func,
  classes: PropTypes.object,
  steps: PropTypes.array,
  activeStep: PropTypes.number
};