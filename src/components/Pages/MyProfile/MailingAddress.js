import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid";
import { useFormik } from "formik";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useQuery } from 'react-query';
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import { mailingAddress } from "../../Controllers/myProfileController";
import ZipCodeLookup from "../../Controllers/ZipCodeLookup";
import {
  ButtonPrimary,
  ButtonSecondary, TextField,
  Zipcode
} from "../../FormsUI";
import ErrorLogger from '../../lib/ErrorLogger';
import states from '../../../assets/data/States.json';
import { tabAtom } from "./MyProfileTab";
import "./Style.css";

const validationSchema = yup.object({
  streetAddress: yup
    .string("Enter Street Address")
    .trim()
    .max(100, "Should be less than 100 characters")
    .matches(/^(?!\s+$).*/g, "* This field cannot contain only backspaces")
    .required("Your Street Address is required"),
  city: yup
    .string("Enter City")
    .max(30, "Should be less than 30 characters")
    .required(
      "Your home city is required. Please re-enter your zip code to populate your city"
    ),
  state: yup
    .string("Enter State")
    .max(30, "Should be less than 30 characters")
    .required("Your home state is required."),
  zip: yup
    .string("Enter your Zip")
    .min(5, "Zip Code should be a minimum of 5 characters")
    .required("Your home ZIP Code is required"),
});

export default function MailingAddress(props) {
  window.zeHide();
  const [ loading, setLoading ] = useState(false);
  const [ validZip, setValidZip ] = useState(true);
  const [ errorMsg, setErrorMsg ] = useState("");
  const history = useHistory();
  const [ , setTabvalue ] = useAtom(tabAtom);
  const { refetch } = useQuery('loan-data', usrAccountDetails);

  let basicInfo = props?.basicInformationData?.latest_contact != null ? props.basicInformationData.latest_contact : null;
  let hasActiveLoan = Cookies.get("hasActiveLoan") === "true" ? true : false;
  let hasApplicationStatus = Cookies.get("hasApplicationStatus");
  var appStatus = [ "rejected", "referred", "expired" ];
  let checkAppStatus = appStatus.includes(hasApplicationStatus);
  let disableField = (checkAppStatus === true || hasActiveLoan === true) ? true : false;

  const onClickCancelChange = () => {
    formik.resetForm();
    history.push({ pathname: '/customers/myProfile' });
    setTabvalue(0);
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
    if (event.keyCode === 32 && formik.values.streetAddress === "") {
      event.preventDefault();
    }
  };

  const fetchAddress = async (event) => {
    try {
      setErrorMsg(event.target.value === "" ? "Please enter a zipcode" : errorMsg);
      if (event.target.value.toString().length === 5) {
        let result = await ZipCodeLookup(event.target.value);
        if (result) {
          fetchAddressValidate(result);
        } else {
          formik.setFieldValue("city", "");
          formik.setFieldValue("state", "");
          setValidZip(false);
          setErrorMsg("Please enter a valid Zipcode");
        }
        if (event.target.name !== "") {
          formik.handleChange(event);
        }
      }
    } catch (error) {
      ErrorLogger("Error from fetchAddress", error);
    }
  };

  function fetchAddressValidate(result) {
    try {
      if (result.data) {
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
        { props?.basicInformationData === null ? (
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
              value={ basicInfo?.address_postal_code }
              onChange={ fetchAddress }
              onBlur={ formik.handleBlur }
              error={
                (formik.touched.zip && Boolean(formik.errors.zip)) || !validZip
              }
              helperText={
                validZip
                  ? formik.touched.zip && formik.errors.zip
                  : "Please enter a valid ZIP Code"
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
