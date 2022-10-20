import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { validStates } from "../../../../assets/data/constants";
import globalMessages from "../../../../assets/data/globalMessages.json";
import AddressLogo from "../../../../assets/icon/I-Address.png";
import { preLoginStyle } from "../../../../assets/styles/preLoginStyle";
import { CheckMyOffers } from "../../../../contexts/CheckMyOffers";
import ZipCodeLookup from "../../../Controllers/ZipCodeLookup";
import { ButtonPrimary, TextField, Zipcode } from "../../../FormsUI";
import ErrorLogger from "../../../lib/ErrorLogger";
import "../CheckMyOffer.css";
import "../HomeAddress/HomeAdress.css";
import ScrollToTop from "../ScrollToTop";
import { FormValidationRules } from "../../../lib/FormValidationRule";
let formValidation = new FormValidationRules();

//yup validation schema
const validationSchema = yup.object({
  streetAddress: formValidation.streetAddressValidation(),
  city: yup
    .string(globalMessages.Address_City)
    .max(30, globalMessages.Length_max_30)
    .required(globalMessages.Address_Home_City),
  state: yup
    .string(globalMessages.Address_State)
    .max(30, globalMessages.Address_State_Max)
    .required(globalMessages.Address_State_Required),
  zip: yup
    .string(globalMessages.ZipCodeEnter)
    .min(5, globalMessages.ZipCodeMax)
    .required(globalMessages.ZipCodeRequired),
});
// Home address component initialization
function HomeAddress() {
  //Context data
  const { data } = useContext(CheckMyOffers);
  const classes = preLoginStyle();
  //state variables
  const [ stateShort, setStateShort ] = useState(data.state ?? "");
  const [ validZip, setValidZip ] = useState(true);
  const [ open, setOpen ] = useState(false);
  const [ notAvailInCity, setNotAvailInCity ] = useState(false);
  const [ openOhio, setOpenOhio ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (data?.completedPage < data?.page?.citizenship || data?.formStatus?.toLowerCase() === "completed") {
      navigate("/select-amount");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePopupCA = data.state === "CA";
  const handlePopupOhio = data.state === "OH";

  useEffect(() => {
    if (handlePopupCA) {
      setOpen(true);
    }
    else if (handlePopupOhio) {
      setOpenOhio(true);
    }
  }, [ handlePopupCA, handlePopupOhio ]);

  //Handle modal open and close
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenOhio = () => {
    setOpenOhio(true);
  };
  const handleCloseOhio = () => {
    setOpenOhio(false);
  };

  // Formik configutration
  const formik = useFormik({
    initialValues: {
      streetAddress: data.streetAddress ? data.streetAddress : "",
      city: data.city ? data.city : "",
      state: data.stateFullform ? data.stateFullform : "",
      zip: data.zip ? data.zip : "",
    },
    validationSchema: validationSchema,
    // Submit value - store the values to context and proceeds next pages
    onSubmit: (values) => {
      data.streetAddress = values.streetAddress;
      data.city = values.city;
      data.state = stateShort;
      data.zip = values.zip;
      data.stateFullform = values.state;
      data.completedPage = data.page.homeAddress;
      navigate("/personal-info");
    },
  });

  const preventSpace = (event) => {
    if (event.keyCode === 32 && !formik.values.streetAddress) {
      event.preventDefault();
    }
  };

  const helperIf = (result) => { 
    formik.setFieldValue("city", result?.data.cityName);
    formik.setFieldValue("state", result?.data.stateCode);
    setStateShort(result?.data?.stateCode);
    setValidZip(true);
    if (validStates.indexOf(result?.data?.stateCode.toUpperCase()) === -1) {
      setValidZip(false);
      setErrorMsg(globalMessages.WeDoNotServeArea);
      setNotAvailInCity(true);
    } else {
      setNotAvailInCity(false);
    }
    if (result?.data?.stateCode === "CA") {
      handleClickOpen();
    }
    if (result?.data?.stateCode === "OH") {
      handleClickOpenOhio();
    }
};

  const fetchAddress = async (event) => {
    try {
      let eventValue = event.target.value.trim();
      setErrorMsg(eventValue ? errorMsg : "Please enter a zipcode");
      if (eventValue?.length === 5) {
        let result = await ZipCodeLookup(eventValue);
        if (result.status === 200) {
          helperIf(result) 
        } else {
          formik.setFieldValue("city", "");
          formik.setFieldValue("state", "");
          setStateShort("");
          setValidZip(false);
          setErrorMsg(globalMessages.ZipCodeValid);
        }
      } else {
        formik.setFieldValue("city", "");
        formik.setFieldValue("state", "");
        setStateShort("");
        setValidZip(true);
      }
      formik.handleChange(event);
    } catch (error) {
      ErrorLogger('Error from fetchAddress', error);
    }
  };
  const onBlurAddress = (event) => {
    formik.setFieldValue("streetAddress", event.target.value.trim());
  };
  const shortANDoperation = (pramOne, pramtwo) => {
		return pramOne && pramtwo
	};
  return (
    <div data-testid = "homeAddress_Component">
      <ScrollToTop />
      <div className={classes.mainDiv}>
        <Box>
          <Grid
            item xs={12} sm={10} md={6} lg={6}
            justifyContent="center"
            container
            alignItems="center"
            className={classes.homwAdressGridStyle}
          >
            <Grid
              container
              justifyContent="center"
              alignItems="center"
            >
              <Paper
                id="enterZipWrap"
                className={classes.homwAdressPaperStyle}
              >
                <div className="progress mt-0">
                  <div
                    id="determinate"
                    className="det30  determinate slantDiv"
                  />
                  <span className="floatLeft detNum30">30%</span>
                </div>
                <Grid className="floatLeft">
                  <Link className="arrowBack" to="/citizenship-status">
                    <i className="material-icons dp48 yellowText floatingButton">
                      arrow_back
                    </i>
                  </Link>
                </Grid>
                <Grid className="liftImage">
                  <img
                    alt="Address"
                    src={AddressLogo}
                    className="spinAnimation"
                  />
                </Grid>

                <Typography
                  variant="h5"
                  id="homeAddressTxt"
                  className="borrowCSSLP checkMyOfferText"
                >
                  Enter your home address
                </Typography>

								<form onSubmit={formik.handleSubmit}>
									<Grid
										item
										md={12}
										className="blockDiv"
										container
										justifyContent="center"
										alignItems="center"
									>
										<Grid
											container
											justifyContent="center"
											alignItems="center"
											item
											lg={8}
											md={8}
											xs={12}
											className="textBlockShort"
										>
											<TextField
												fullWidth
												autoFocus
												id="streetAddress"
												name="streetAddress"
												label="Street Address *"
												materialProps={{
													"data-testid": "streetAddress",
													maxLength: "100",
												}}
												onKeyDown={preventSpace}
												value={formik.values.streetAddress}
												onChange={formik.handleChange}
												onBlur={onBlurAddress}
                        error={
                          shortANDoperation(formik.touched.streetAddress ,Boolean(formik.errors.streetAddress))
                        }
                        helperText = {
                          shortANDoperation(formik.touched.streetAddress ,formik.errors.streetAddress)
                        }
											/>
										</Grid>
										<Grid
											container
											justifyContent="center"
											alignItems="center"
											item
											lg={8}
											md={8}
											xs={12}
											className="textBlockShort"
										>
											<Zipcode
												fullWidth
												id="zip"
												name="zip"
												label="Zipcode *"
												materialProps={{ "data-testid": "zipcode" }}
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
														: errorMsg
												}
											/>
										</Grid>
										<Grid
											item
											justifyContent="flex-start"
											container
											md={8}
											lg={8}
											xs={12}
											className="textBlockShort"
										>
											<Grid
												item
												lg={6}
												md={6}
												xs={6}
												className=" padding-right-1"
											>
												<TextField
													fullWidth
													id="city"
													name="city"
													label="City"
													disabled={true}
													materialProps={{ "data-testid": "city" }}
													value={formik.values.city}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
                          error ={
                            shortANDoperation(formik.touched.city ,Boolean(formik.errors.city))
                          }
                          helperText = {
                            shortANDoperation(formik.touched.city ,formik.errors.city)
                          }       
												/>
											</Grid>
											<Grid
												container
												justifyContent="center"
												alignItems="center"
												item
												lg={6}
												md={6}
												xs={6}
												className=" padding-left-1"
											>
												<TextField
													fullWidth
													id="state"
													name="state"
													label="State"
													disabled={true}
													materialProps={{ "data-testid": "state" }}
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
										</Grid>

										<Grid
											container
											justifyContent="center"
											item
											lg={8}
											md={8}
											xs={12}
											alignItems="center"
											className="textBlock alignButton"
										>
											<ButtonPrimary
												type="submit"
												stylebutton='{"fontSize":"0.938rem","background": "#FFBC23", "padding": "0px 30px", "color": "black"}'
												disabled={!validZip}
												data-testid="homeAddressCntBtn"
											>
												Continue
											</ButtonPrimary>
										</Grid>
									</Grid>
								</form>
								<Paper className={classes.subPaper} style={{ display: notAvailInCity ? "block" : "none" }}>
									<div >
										<p className={classes.paraInsideSubPaper} >
											If your state is not listed, it means that Mariner Finance does not operate in your state.
										</p>
										<p className={classes.paraInsideSubPaper} >
											Mariner Finance currently operates in Alabama, Arizona, California, Delaware, Florida, Georgia, Indiana, Illinois, Kentucky, Louisiana, Maryland, Mississippi, Missouri, New Jersey, New Mexico, New York, North Carolina, Ohio, Oklahoma, Oregon, Pennsylvania, South Carolina, Tennessee, Texas, Utah, Virginia, Washington, and Wisconsin.
										</p>
									</div>
								</Paper>
							</Paper>
						</Grid>
					</Grid>
				</Box>
			</div>
			<Dialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Notice to CA Residents
				</DialogTitle>
				<DialogContent dividers>
					<Typography align="justify" gutterBottom>
						If you are married, you may apply for a separate account.
					</Typography>
				</DialogContent>
				<DialogActions className="modalAction">
					<ButtonPrimary
						stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
						onClick={handleClose}
						className="modalButton"
					>
						<Typography align="center">OK</Typography>
					</ButtonPrimary>
				</DialogActions>
			</Dialog>

      <Dialog
        onClose={handleCloseOhio}
        aria-labelledby="customized-dialog-title"
        open={openOhio}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseOhio}>
          Notice to OH Residents
        </DialogTitle>
        <DialogContent dividers>
          <Typography align="justify" gutterBottom>
            The Ohio laws against discrimination require that all creditors make
            credit equally available to all credit worthy customers, and that
            credit reporting agencies maintain separate credit histories on each
            individual upon request. The Ohio civil rights commission
            administers compliance with this law.
          </Typography>
        </DialogContent>
        <DialogActions className="modalAction">
          <ButtonPrimary
            stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
            onClick={handleCloseOhio}
            className="modalButton"
          >
            <Typography align="center">Ok</Typography>
          </ButtonPrimary>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default HomeAddress;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																	                                                                                                                                                                                                                                                   
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       