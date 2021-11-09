import React, { useState } from "react";
import { useStylesMyProfile } from "./Style";
import "./Style.css";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { 
  TextField, 
  Zipcode, 
  ButtonPrimary, 
  ButtonSecondary,
} from "../../FormsUI";
import { useFormik } from "formik";
import * as yup from "yup";
import { mailingAddress } from "../../Controllers/myProfileController"
import { toast } from "react-toastify";

//yup validation schema
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

export default function MailingAddress(userAccountDetailCard) {
  const classes = useStylesMyProfile();

  let userAccountDetail = userAccountDetailCard != null ? userAccountDetailCard : null;
  let mydata = {};
  const [error] = useState(false);
  const [loading] = useState(false);
  const [stateShort, setStateShort] = useState(mydata.state ?? "");
  const [validZip, setValidZip] = useState(true);
  const [setOpen] = useState(false);
  const [setOpenOhio] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  //Handle modal open and close
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenOhio = () => {
    setOpenOhio(true);
  };

  // Formik configutration
  const formik = useFormik({
    initialValues: {
      streetAddress: userAccountDetail.userAccountDetailCard?.customer.latest_contact?.address_street ? userAccountDetail.userAccountDetailCard?.customer?.latest_contact?.address_street : "",
      city: userAccountDetail.userAccountDetailCard?.customer.latest_contact?.address_city ? userAccountDetail.userAccountDetailCard?.customer?.latest_contact?.address_city : "",
      state: userAccountDetail.userAccountDetailCard?.customer.latest_contact?.address_state ? userAccountDetail.userAccountDetailCard?.customer?.latest_contact?.address_state : "",
      zip: userAccountDetail.userAccountDetailCard?.customer.latest_contact?.address_postal_code ? userAccountDetail.userAccountDetailCard?.customer?.latest_contact?.address_postal_code : "",
    },
    validationSchema: validationSchema,
    // Submit value - store the values to context and proceeds next pages

    onSubmit: async (values) => {

      let body = {
        "address1": values.streetAddress,
        "city": values.city,
        "state": stateShort,
        "zipCode": values.zip,
      };

      let res = await mailingAddress(body);
      
      if (res.data.data.emailUpdate === true) {
        toast.success("Updates successfull", {
          position: "bottom-left",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("No changes made", {
          position: "bottom-left",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
  });

  const preventSpace = (event) => {
    if (event.keyCode === 32 && formik.values.streetAddress === "") {
      event.preventDefault();
    }
  };

  const fetchAddress = (e) => {
    setErrorMsg(e.target.value === "" ? "Please enter a zipcode" : errorMsg);
    if (e.target.value !== "" && e.target.value.length === 5) {
      fetch("https://api.zippopotam.us/us/" + e.target.value)
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.places) {
              formik.setFieldValue("city", result.places[0]["place name"]);
              formik.setFieldValue("state", result.places[0]["state"]);
              setStateShort(result.places[0]["state abbreviation"]);
              setValidZip(true);
              if (result.places[0]["state"] === "California") {
                handleClickOpen();
              }
              if (result.places[0]["state"] === "Ohio") {
                handleClickOpenOhio();
              }
            } else {
              formik.setFieldValue("city", "");
              formik.setFieldValue("state", "");
              setStateShort("");
              setValidZip(false);
              setErrorMsg("Please enter a valid Zipcode");
            }
          },
          () => {
            formik.setFieldValue("city", "");
            formik.setFieldValue("state", "");
            setStateShort("");
            setValidZip(false);
            setErrorMsg("Please enter a valid Zipcode");
          }
        );
    } else {
      formik.setFieldValue("city", "");
      formik.setFieldValue("state", "");
      setStateShort("");
      setValidZip(true);
    }
    formik.handleChange(e);
  };

  const onBlurAddress = (e) => {
    formik.setFieldValue("streetAddress", e.target.value.trim());
  };

  //  view part

  return (
    <div style={{ padding: 20 }}>
     <form onSubmit={formik.handleSubmit}>
      <Grid
              item
              xs={12}
              style={{ width: "100%", gap: 15, marginBottom:20 }}
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
                onKeyDown={preventSpace}
                value={formik.values.streetAddress}
                onChange={formik.handleChange}
                onBlur={onBlurAddress}
                error={
                  formik.touched.streetAddress &&
                  Boolean(formik.errors.streetAddress)
                }
                helperText={
                  formik.touched.streetAddress &&
                  formik.errors.streetAddress
                }
              />
       </Grid>
       <Grid
              item
              xs={12}
              style={{ width: "100%", gap: 15, marginBottom:20 }}
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
                error={
                  formik.touched.city && Boolean(formik.errors.city)
                }
                helperText={formik.touched.city && formik.errors.city}
              />

       </Grid>
 
       <Grid
              item
              xs={12}
              style={{ width: "100%", gap: 15, marginBottom:20 }}
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
                error={
                  formik.touched.state && Boolean(formik.errors.state)
                }
                helperText={
                  formik.touched.state && formik.errors.state
                }
              />
       </Grid>
       <Grid
              item
              xs={12}
              style={{ width: "100%", gap: 15, marginBottom:20 }}
              container
              direction="row"
            >
              <Zipcode
                fullWidth
                id="zip"
                name="zip"
                label="Zip Code"
                materialProps={{ "data-test-id": "zipcode" }}
                value={formik.values.zip}
                onChange={fetchAddress}
                onBlur={formik.handleBlur}
                error={
                  (formik.touched.zip && Boolean(formik.errors.zip)) ||
                  !validZip
                }
                helperText={
                  validZip
                    ? formik.touched.zip && formik.errors.zip
                    : "Please enter a valid ZIP Code"
                }
              />
 
       </Grid>
 <br></br>
          <ButtonSecondary
            stylebutton='{"marginRight": "" }'
            styleicon='{ "color":"" }'
            id="apply-loan-reset-button"
            //onClick={onClickCancelChangePassword}
          >
            Cancel
          </ButtonSecondary>


          <ButtonPrimary
            type="submit"
            stylebutton='{"background": "#FFBC23", "height": "inherit", "color": "black","fontSize":"1rem"}'
            disabled={error || loading}
          >
            <Typography align="center" className="textCSS ">
              Save changes
            </Typography>
            <i
              className="fa fa-refresh fa-spin customSpinner"
              style={{
                marginRight: "10px",
                display: loading ? "block" : "none",
              }}
            />
          </ButtonPrimary>

      </form>
</div>

  );
}
