import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import globalMessages from "../../../assets/data/globalMessages.json";
import { useGlobalState } from "../../../contexts/GlobalStateProvider";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import { mailingAddress } from "../../Controllers/MyProfileController";
import ZipCodeLookup from "../../Controllers/ZipCodeLookup";
import {
  ButtonPrimary,
  ButtonSecondary, TextField,
  Zipcode
} from "../../FormsUI";
import ErrorLogger from '../../lib/ErrorLogger';
import "./Style.css";

const validationSchema = yup.object({
  streetAddress: yup
    .string(globalMessages.Street_Address)
    .trim()
    .max(100, globalMessages.Length_max_100)
    .matches(/^(?!\s+$).*/g, globalMessages.No_Backspace_Only)
    .required(globalMessages.Address_Street_Required),
  city: yup
    .string(globalMessages.Enter_City)
    .max(30, globalMessages.Length_max_30)
    .required(globalMessages.Address_Home_City),
  state: yup
    .string(globalMessages.Enter_State)
    .max(30, globalMessages.Length_max_30)
    .required(globalMessages.Address_State_Required),
  zip: yup
    .string(globalMessages.ZipCodeEnter)
    .min(5, globalMessages.ZipCodeMax)
    .required(globalMessages.ZipCodeRequired),
});

export default function MailingAddress(props) {

  const [ loading, setLoading ] = useState(false);
  const [ validZip, setValidZip ] = useState(true);
  const [ errorMsg, setErrorMsg ] = useState("");
  const navigate = useNavigate();
  const [ , setprofileTabNumber ] = useGlobalState();
  const { refetch } = useQuery('loan-data', usrAccountDetails);

  let basicInfo = props?.basicInformationData?.latest_contact;
  let hasActiveLoan = (/true/i).test(Cookies.get("hasActiveLoan"));
  let hasApplicationStatus = Cookies.get("hasApplicationStatus");
  let appStatus = [ "rejected", "referred", "expired" ];
  let checkAppStatus = appStatus.includes(hasApplicationStatus);
  let disableField = (checkAppStatus || hasActiveLoan) ;

  const onClickCancelChange = () => {
    formik.resetForm();
    navigate('/customers/myProfile');
    setprofileTabNumber({ profileTabNumber: 0 });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      streetAddress: basicInfo?.address_street ? basicInfo?.address_street : "",
      zip: basicInfo?.address_postal_code ? basicInfo?.address_postal_code : "",
      city: basicInfo?.address_city ? basicInfo?.address_city : "",
      state: basicInfo?.address_state ? basicInfo?.address_state : "",

    },

    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setLoading(true);
      let body = {
        address1: values.streetAddress,
        city: values.city,
        state: values.state,
        zipCode: values.zip,
      };

      if (formik.initialValues.streetAddress === values.streetAddress && formik.initialValues.zip === values.zip) {
        toast.error("No changes made", {
          onClose: () => { setLoading(false); }
        });
      }
      else {
        let res = await mailingAddress(body);
        if (res?.data?.notes.length !== 0) {
          refetch().then(() => toast.success("Updated successfully", {
            onClose: () => {
              setLoading(false);
              onClickCancelChange();
            }
          }));
        } else {
          toast.error("Please try again", {
            onClose: () => { setLoading(false); }
          });
        }
      }
    },
  });

  const preventSpace = (event) => {
    if (event.keyCode === 32 && !formik.values.streetAddress) {
      event.preventDefault();
    }
  };

  const fetchAddress = async (event) => {
    try {
      let eventValue = event.target.value.trim();
      setErrorMsg(eventValue ? errorMsg : "Please enter a zipcode");
      if (eventValue?.length === 5) {
        let result = await ZipCodeLookup(eventValue);
        if (result) {
          fetchAddressValidate(result);
        } else {
          formik.setFieldValue("city", "");
          formik.setFieldValue("state", "");
          setValidZip(false);
          setErrorMsg("Please enter a valid Zipcode");
        }
        if (event.target.name.trim()) {
          formik.handleChange(event);
        }
      }
      else {
        formik.setFieldValue("city", "");
        formik.setFieldValue("state", "");
        setValidZip(false);
        setErrorMsg("Please enter a valid Zipcode");
      }
    } catch (error) {
      ErrorLogger("Error from fetchAddress", error);
    }
  };

  function fetchAddressValidate(result) {
    try {
      if (result.status === 200) {
        formik.setFieldValue("city", result?.data?.cityName);
        formik.setFieldValue("state", result?.data?.stateCode);
        setValidZip(true);
      } else {
        formik.setFieldValue("city", "");
        formik.setFieldValue("state", "");
        setValidZip(false);
        setErrorMsg("Please enter a valid Zipcode");
      }
    } catch (error) {
      ErrorLogger(" Error from fetchAddressValidate", error);
    }
  }
  const onBlurAddress = (event) => {
    formik.setFieldValue("streetAddress", event.target.value.trim());
  };

  return (
    <div style={ { padding: 20 } }>
      <form onSubmit={ formik.handleSubmit } id="mailing" style={ {
        opacity: loading ? 0.55 : 1,
        pointerEvents: loading ? "none" : "initial"
      } }>
        { !props?.basicInformationData ? (
          <Grid align="center"><CircularProgress /></Grid>
        ) : <>
          <Grid
            item
            xs={ 12 }
            style={ { width: "100%", gap: 15, marginBottom: 20 } }
            container
            direction="row"
          >
            <TextField
              fullWidth
              autoFocus
              id="streetAddress"
              name="streetAddress"
              label="Street Address"
              materialProps={ {
                "data-test-id": "streetAddress",
                maxLength: "100",
              } }
              disabled={ !disableField }
              onKeyDown={ preventSpace }
              value={ formik.values.streetAddress }
              onChange={ formik.handleChange }
              onBlur={ onBlurAddress }
              error={
                formik.touched.streetAddress &&
                Boolean(formik.errors.streetAddress)
              }
              helperText={
                formik.touched.streetAddress && formik.errors.streetAddress
              }
            />
          </Grid>
          <Grid
            item
            xs={ 12 }
            style={ { width: "100%", gap: 15, marginBottom: 20 } }
            container
            direction="row"
          >
            <TextField
              fullWidth
              id="city"
              name="city"
              label="City"
              disabled={ true }
              materialProps={ { "data-test-id": "city" } }
              value={ formik.values.city }
              onChange={ formik.handleChange }
              onBlur={ formik.handleBlur }
              error={ formik.touched.city && Boolean(formik.errors.city) }
              helperText={ formik.touched.city && formik.errors.city }
            />
          </Grid>
          <Grid
            item
            xs={ 12 }
            style={ { width: "100%", gap: 15, marginBottom: 20 } }
            container
            direction="row"
          >
            <TextField
              fullWidth
              id="state"
              name="state"
              label="State"
              disabled={ true }
              materialProps={ { "data-test-id": "state" } }
              value={ formik.values.state }
              onChange={ formik.handleChange }
              onBlur={ formik.handleBlur }
              error={ formik.touched.state && Boolean(formik.errors.state) }
              helperText={ formik.touched.state && formik.errors.state }
            />
          </Grid>
          <Grid
            item
            xs={ 12 }
            style={ { width: "100%", gap: 15, marginBottom: 20 } }
            container
            direction="row"
          >
            <Zipcode
              fullWidth
              id="zip"
              name="zip"
              label="Zip Code"
              materialProps={ { "data-test-id": "zipcode" } }
              disabled={ !disableField }
              value={ formik.values.zip }
              onChange={ fetchAddress }
              onBlur={ formik.handleBlur }
              error={
                (formik.touched.zip && Boolean(formik.errors.zip)) || !validZip
              }
              helperText={
                validZip ? formik.touched.zip && formik.errors.zip : "Please enter a valid ZIP Code"
              }
            />
          </Grid>
          <ButtonSecondary
            stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
            styleicon='{ "color":"" }'
            onClick={ onClickCancelChange }
            disabled={ !disableField }

          >
            Cancel
          </ButtonSecondary>
          <ButtonPrimary
            stylebutton='{"marginLeft": "5px","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
            styleicon='{ "color":"" }'
            type="submit"
            disabled={ loading }
          >
            Save Changes
            <i
              className="fa fa-refresh fa-spin customSpinner"
              style={ {
                marginRight: "10px",
                display: loading ? "block" : "none",
                color: 'blue'
              } }
            />
          </ButtonPrimary>
        </> }
      </form>

    </div>
  );
}
MailingAddress.propTypes = {
  basicInformationData: PropTypes.object,
};