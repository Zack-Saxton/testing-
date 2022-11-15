import CircularProgress from '@mui/material/CircularProgress';
import Grid from "@mui/material/Grid";
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
import { useAccountOverview } from '../../../hooks/useAccountOverview';
import { mailingAddress } from "../../Controllers/MyProfileController";
import ZipCodeLookup from "../../Controllers/ZipCodeLookup";
import {
  ButtonPrimary,
  ButtonSecondary, TextField,
  Zipcode
} from "../../FormsUI";
import ErrorLogger from '../../lib/ErrorLogger';
import { useStylesMyProfile } from "./Style";
import "./Style.css";
import { FormValidationRules } from "../../lib/FormValidationRule";
let formValidation = new FormValidationRules();

const validationSchema = yup.object({
  streetAddress: formValidation.streetAddressValidation(),
  city: formValidation.cityValidation(),
  state: formValidation.stateValidation(),
  zip: formValidation.zipCode(),
});

export default function MailingAddress(props) {
  const classes = useStylesMyProfile();
  const [ loading, setLoading ] = useState(false);
  const [ validZip, setValidZip ] = useState(true);
  const [ errorMsg, setErrorMsg ] = useState("");
  const navigate = useNavigate();
  const [ , setProfileTabNumber ] = useGlobalState();
  const { refetch } = useAccountOverview()

  let basicInfo = props?.basicInformationData?.latest_contact;
  let hasActiveLoan = (/true/i).test(Cookies.get("hasActiveLoan"));
  let hasApplicationStatus = Cookies.get("hasApplicationStatus");
  let appStatus = [ "rejected", "referred", "expired" ];
  let checkAppStatus = appStatus.includes(hasApplicationStatus);
  let disableField = (checkAppStatus || hasActiveLoan);

  const onClickCancelChange = () => {
    formik.resetForm();
    navigate('/customers/myProfile');
    setProfileTabNumber({ profileTabNumber: 0 });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      streetAddress: basicInfo?.address_street ?? "",
      zip: basicInfo?.address_postal_code ?? "",
      city: basicInfo?.address_city ?? "",
      state: basicInfo?.address_state ?? "",
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
        if (res?.data?.notes?.length) {
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
  const resetFormField = () => {
    formik.setFieldValue("city", "");
    formik.setFieldValue("state", "");
    setValidZip(false);
    setErrorMsg(globalMessages.ZipCodeValid);
  }
  const fetchAddress = async (event) => {
    try {
      let eventValue = event.target.value.trim();
      setErrorMsg(eventValue ? errorMsg : globalMessages.ZipCodeEnter);
      if (eventValue?.length === 5) {
        let result = await ZipCodeLookup(eventValue);
        if (result) {
          fetchAddressValidate(result);
        } else {
          resetFormField();
        }
        if (event.target.name.trim()) {
          formik.handleChange(event);
        }
      }
      else {
        resetFormField();
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
        resetFormField();
      }
    } catch (error) {
      ErrorLogger(" Error from fetchAddressValidate", error);
    }
  }
  const onBlurAddress = (event) => {
    formik.setFieldValue("streetAddress", event.target.value.trim());
  };
  const shortANDoperation = (pramOne, pramtwo) => {
		return pramOne && pramtwo
	};

  return (
    <div style={{ padding: 20 }} data-testid="basic-information-mailing-address">
      <form onSubmit={formik.handleSubmit} id="mailing" style={{
        opacity: loading ? 0.55 : 1,
        pointerEvents: loading ? "none" : "initial"
      }}>
        {!props?.basicInformationData ? (
          <Grid align="center"><CircularProgress /></Grid>
        ) : <>
          <Grid
            item
            xs={12}
            className={classes.addressInfoGrid}
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
              disabled={!disableField}
              onKeyDown={preventSpace}
              value={formik.values.streetAddress}
              onChange={formik.handleChange}
              onBlur={onBlurAddress}
              error={shortANDoperation(formik.touched.streetAddress, Boolean(formik.errors.streetAddress))}
              helperText = {shortANDoperation(formik.touched.streetAddress, formik.errors.streetAddress)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.addressInfoGrid}
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
              error={shortANDoperation(formik.touched.city, Boolean(formik.errors.city))}
              helperText = {shortANDoperation(formik.touched.city, formik.errors.city)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.addressInfoGrid}
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
              error={shortANDoperation(formik.touched.state, Boolean(formik.errors.state))}
              helperText = {shortANDoperation(formik.touched.state, formik.errors.state)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.addressInfoGrid}
            container
            direction="row"
          >
            <Zipcode
              fullWidth
              id="zip"
              name="zip"
              label="Zip Code"
              materialProps={{ "data-test-id": "zipcode" }}
              disabled={!disableField}
              value={formik.values.zip}
              onChange={fetchAddress}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.zip && Boolean(formik.errors.zip)) || !validZip
              }
              helperText={
                validZip ? formik.touched.zip && formik.errors.zip : "Please enter a valid ZIP Code"
              }
            />
          </Grid>
          <Grid className="mailingButtons">
            <ButtonSecondary
              stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
              styleicon='{ "color":"" }'
              onClick={onClickCancelChange}
              disabled={!disableField}

            >
              Cancel
            </ButtonSecondary>
            <ButtonPrimary
              stylebutton='{"marginLeft": "5px","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
              styleicon='{ "color":"" }'
              type="submit"
              disabled={loading}
              id="mailingSaveButton"
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
          </Grid>
        </>}
      </form>

    </div>
  );
}
MailingAddress.propTypes = {
  basicInformationData: PropTypes.object,
};