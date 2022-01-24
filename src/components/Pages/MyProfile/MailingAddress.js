import React, { useState } from "react";
import "./Style.css";
import Grid from "@material-ui/core/Grid";
import {
  TextField,
  Zipcode,
  ButtonPrimary,
  ButtonSecondary,
} from "../../FormsUI";
import { useFormik } from "formik";
import * as yup from "yup";
import { mailingAddress } from "../../Controllers/myProfileController";
import { toast } from "react-toastify";
import CircularProgress from '@material-ui/core/CircularProgress';
import { tabAtom } from "./MyProfileTab";
import { useAtom } from "jotai";
import { useHistory } from "react-router-dom";
import states from "../../lib/States.json"
import statesFullform from "../../lib/StatesFullform.json"
import Cookies from "js-cookie";
import ZipCodeLookup from "../../Controllers/ZipCodeLookup";
import { Error } from "../../toast/toast";
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
    .min(5, "Zipcode should be of minimum 5 characters length")
    .required("Your home ZIP Code is required"),
});

export default function MailingAddress(props) {
  window.zeHide();
  const [loading, setLoading] = useState(false);
  const [validZip, setValidZip] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();
  const [, setTabvalue] = useAtom(tabAtom)



  let basicInfo = props?.basicInformationData?.latest_contact != null ? props.basicInformationData.latest_contact : null;
  let hasActiveLoan = Cookies.get("hasActiveLoan") === "true" ? true : false;
  let hasApplicationStatus = Cookies.get("hasApplicationStatus")
  var appStatus = ["rejected", "reffered", "expired"];
  let checkAppStatus = appStatus.includes(hasApplicationStatus)
  let disableField = (checkAppStatus === true || hasActiveLoan === true) ? true : false;

  const onClickCancelChange = () => {
    formik.resetForm();
    history.push({ pathname: '/customers/myProfile' });
    setTabvalue(0)
  };



  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {

      streetAddress: basicInfo?.address_street ? basicInfo?.address_street : "",
      zip: basicInfo?.address_postal_code ? basicInfo?.address_postal_code : "",
      city: basicInfo?.address_city ? basicInfo?.address_city : "",
      state: basicInfo?.address_state ? states[basicInfo?.address_state] : "",

    },

    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setLoading(true);
      let body = {

        address1: values.streetAddress,
        city: values.city,
        state: statesFullform[values.state],
        zipCode: values.zip,
      };

      if (formik.initialValues.streetAddress === values.streetAddress && formik.initialValues.zip === values.zip) {
        toast.error("No changes made", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => { setLoading(false); }
        });
      }
      else {

        let res = await mailingAddress(body);

        if (res?.data?.notes.length !== 0) {
          toast.success("Updated successfully", {
            position: "bottom-left",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onClose: () => {
              setLoading(false);
              props.getUserAccountDetails()
              onClickCancelChange()
            }
          });
        } else {
          toast.error("Please try again", {
            position: "bottom-left",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
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
    if (event.target.value !== "" && event.target.value.length === 5) {
      let result = await ZipCodeLookup(event.target.value);
     if (result) {
       fetchAddressValidate(result);
     } else {
       formik.setFieldValue("city", "");
       formik.setFieldValue("state", "");
       setValidZip(false);
       setErrorMsg("Please enter a valid Zipcode");
     }
   }
    if (event.target.name !== "") {
      formik.handleChange(event);
    }
  } catch (error) {
    Error("Error from [fetchAddress]");
  }
};


function fetchAddressValidate(result) {
  try {
      if (result.data) {
        formik.setFieldValue("city", result?.data?.data.cityName);
        formik.setFieldValue("state", result?.data?.data.stateCode);
        setValidZip(true);
      } else {
        formik.setFieldValue("city", "");
        formik.setFieldValue("state", "");
        setValidZip(false);
        setErrorMsg("Please enter a valid Zipcode");
      }
  } catch (error) {
    Error(" Error from [fetchAddressValidate]");
  }
}
  const onBlurAddress = (event) => {
    formik.setFieldValue("streetAddress", event.target.value.trim());
  };

  return (
    <div style={{ padding: 20 }}>
      <form onSubmit={formik.handleSubmit} id="mailing" style={{
        opacity: loading ? 0.55 : 1,
        pointerEvents: loading ? "none" : "initial"
      }}>
        {props?.basicInformationData === null ? (
          <Grid align="center"><CircularProgress /></Grid>
        ) : <>

          <Grid
            item
            xs={12}
            style={{ width: "100%", gap: 15, marginBottom: 20 }}
            container
            direction="row"
          >
            <TextField
              fullWidth
              autoFocus
              id="streetAddress"
              name="streetAddress"
              label="Street Address"
              materialProps={{
                "data-test-id": "streetAddress",
                maxLength: "100",
              }}
              disabled={disableField === true ? false : true}
              onKeyDown={preventSpace}
              value={formik.values.streetAddress}
              onChange={formik.handleChange}
              onBlur={onBlurAddress}
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
            xs={12}
            style={{ width: "100%", gap: 15, marginBottom: 20 }}
            container
            direction="row"
          >
            <TextField
              fullWidth
              id="city"
              name="city"
              label="City"
              disabled={true}
              materialProps={{ "data-test-id": "city" }}
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>

          <Grid
            item
            xs={12}
            style={{ width: "100%", gap: 15, marginBottom: 20 }}
            container
            direction="row"
          >
            <TextField
              fullWidth
              id="state"
              name="state"
              label="State"
              disabled={true}
              materialProps={{ "data-test-id": "state" }}
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ width: "100%", gap: 15, marginBottom: 20 }}
            container
            direction="row"
          >
            <Zipcode
              fullWidth
              id="zip"
              name="zip"
              label="Zip Code"
              materialProps={{ "data-test-id": "zipcode" }}
              disabled={disableField === true ? false : true}
              value={basicInfo?.address_postal_code}
              onChange={fetchAddress}
              onBlur={formik.handleBlur}
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
            onClick={onClickCancelChange}
            disabled={disableField === true ? false : true}

          >
            Cancel
          </ButtonSecondary>

          <ButtonPrimary
            stylebutton='{"marginLeft": "5px","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
            styleicon='{ "color":"" }'
            type="submit"
            disabled={loading}
          >
            Save Changes
            <i
              className="fa fa-refresh fa-spin customSpinner"
              style={{
                marginRight: "10px",
                display: loading ? "block" : "none",
                color: 'blue'
              }}
            />
          </ButtonPrimary>
        </>}
      </form>

    </div>
  );
}
