import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { ButtonPrimary, ButtonSecondary, Checkbox, DatePicker, TextField } from "../../../FormsUI";
import PropTypes from "prop-types";
import { useStylesMyProfile } from "../Style";
import BankNameLookup from "../../../Controllers/BankNameLookup";


export default function CreditCardMethod (props) {
  const classes = useStylesMyProfile();

  return(
    <div >
        <form onSubmit={props?.formikAddDebitCard.handleSubmit}>
          <Grid
            spacing={4}
            container
            className={`${ props?.loading ? classes.loadingOn : classes.loadingOff } ${ classes.paymentBody
              }`}
          >
            <Grid
              item
              xs={12}
              className={props?.editMode ? classes.hideSection : classes.showSection}
            >
              <Breadcrumbs
                separator={
                  <NavigateNextIcon
                    className={classes.navigationLink}
                    fontSize="small"
                  />
                }
                className={classes.paymentBreadcrumbs}
                aria-label="breadcrumb"
              >
                <Link
                  onClick={props?.handleMenuProfile}
                  className={classes.profileLink}
                >
                  Profile settings
                </Link>
                <Link
                  className={classes.paymentLink}
                  onClick={() => props?.closeDebitCardButton()}
                >
                  Payment account
                </Link>
                <Link className={classes.paymentAccountLink}>
                  Add new debit card
                </Link>
              </Breadcrumbs>
            </Grid>
            <Grid
              item
              xs={10}
              className={classes.fullWidth}
              container
              direction="row"
            >
              <TextField
                id="cardNumber"
                name="cardNumber"
                label="Card Number"
                placeholder="Enter the Card Number"
                materialProps={{ maxLength: "16" }}
                disabled={props?.editMode}
                onKeyDown={props?.preventSpace}
                value={props?.formikAddDebitCard.values.cardNumber}
                onChange={(event) => props?.validateCardAndAccountNumber(event, 2)}
                // onBlur={props?.formikAddDebitCard.handleBlur}
                onBlur={(event) => {
                  props?.detectCardType(event, event.target.value.trim());
                }}
                error={
                  props?.formikAddDebitCard.touched.cardNumber &&
                  Boolean(props?.formikAddDebitCard.errors.cardNumber)
                }
                helperText={
                  props?.formikAddDebitCard.touched.cardNumber &&
                  props?.formikAddDebitCard.errors.cardNumber
                }
              />
            </Grid>
            <Grid
              item
              xs={2}
              className={classes.cardType}
              container
              direction="row"
            >
              {/* <MasterCard /> */}
              <img
                data-testid= "selected-card-type-image"
                src={
                  window.location.origin +
                  "/Card/" +
                  (props?.cardType ? props?.cardType : "unknown") +
                  ".png"
                }
                alt="Logo"
                width="60px"
                height="60px"
              />
            </Grid>
            <Grid
              item
              xs={12}
              className={classes.fullWidth}
              container
              direction="row"
            >
              <TextField
                id="cardName"
                name="cardName"
                label="Name on Card "
                placeholder="Enter the Name on Card"
                materialProps={{ maxLength: "30" }}
                disabled={props?.editMode}
                value={props?.formikAddDebitCard.values.cardName}
                onChange={(event) => props?.addBankOnChange(event, 2)}
                onBlur={(event) => {props?.formikAddDebitCard.handleBlur(event);
                  props?.removeSpace(event, "cardName", 2)}}
                error={
                  props?.formikAddDebitCard.touched.cardName &&
                  Boolean(props?.formikAddDebitCard.errors.cardName)
                }
                helperText={
                  props?.formikAddDebitCard.touched.cardName &&
                  props?.formikAddDebitCard.errors.cardName
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              className={classes.fullWidth}
              container
              direction="row"
            >
              <DatePicker
                name="expiryDate"
                label="Expiration Date"
                id="expiryDate"
                className="expiryDate"
                placeholder="MM/YY"
                format="MM/yy"
                mask="__/__"
                disabled={props?.editMode}
                value={props?.formikAddDebitCard.values.expiryDate}
                onChange={(values) => {
                  props.formikAddDebitCard.values.expiryDate = values
                  props?.formikAddDebitCard.setFieldValue("expiryDate", values);
                }}
                onBlur={props?.formikAddDebitCard.handleBlur}
                error={
                  props?.formikAddDebitCard.touched.expiryDate &&
                  Boolean(props?.formikAddDebitCard.errors.expiryDate)
                }
                helperText={
                  props?.formikAddDebitCard.touched.expiryDate &&
                  props?.formikAddDebitCard.errors.expiryDate
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              className={classes.fullWidth}
              container
              direction="row"
            >
              <TextField
                name="cvv"
                id="cvv"
                label="CVV"
                type="number"
                placeholder="Enter your CVV Number"
                disabled={props?.editMode}
                materialProps={{ maxLength: "3" }}
                value={props?.formikAddDebitCard.values.cvv}
                onChange={(event) => props?.validateCardAndAccountNumber(event, 2)}
                onBlur={props?.formikAddDebitCard.handleBlur}
                error={
                  props?.formikAddDebitCard.touched.cvv &&
                  Boolean(props?.formikAddDebitCard.errors.cvv)
                }
                helperText={
                  props?.formikAddDebitCard.touched.cvv &&
                  props?.formikAddDebitCard.errors.cvv
                }
              />
            </Grid>
            <Grid
              className={`${ classes.sameMailAddress } ${ props?.editMode ? classes.hideSection : classes.showSection }`}
              item
              sm={4}
              xs={12}
              container
              direction="row"
            >
              <Checkbox
                name="sameAsMailAddress"
                label="Same as Mailing Address"
                labelid="setDefault"
                stylelabelform='{ "paddingTop":"0px" }'
                stylecheckbox='{ "color":"#0F4EB3" }'
                stylecheckboxlabel='{ "color":"" }'
                required={true}
                value={props?.sameAsMailAddress}
                checked={props?.sameAsMailAddress}
                onChange={(event) => {
                  if (event.target.checked) {
                    props?.formikAddDebitCard.setFieldValue("zipcode", props?.mailingZipcode);
                    props?.formikAddDebitCard.setFieldValue(
                      "streetAddress",
                      props?.mailingStreetAddress
                    );
                    let sendEvent = {
                      target: {
                        value: props?.mailingZipcode,
                      },
                    };
                    props?.fetchAddress(sendEvent);
                  }
                  props?.setSameAsMailAddress(event.target.checked);
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              container
              className={`${ props?.editMode ? classes.hideSection : classes.showSection
                } ${ classes.fullWidth }`}
              direction="row"
            >
              <TextField
                id="streetAddress"
                name="streetAddress"
                label="Street Address"
                placeholder="Enter the street address"
                materialProps={{ maxLength: "30" }}
                value={props?.formikAddDebitCard.values.streetAddress}
                onChange={props?.formikAddDebitCard.handleChange}
                onBlur={props?.formikAddDebitCard.handleBlur}
                disabled={props?.sameAsMailAddress}
                error={
                  props?.formikAddDebitCard.touched.streetAddress &&
                  Boolean(props?.formikAddDebitCard.errors.streetAddress)
                }
                helperText={
                  props?.formikAddDebitCard.touched.streetAddress &&
                  props?.formikAddDebitCard.errors.streetAddress
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              container
              direction="row"
              className={`${ props?.editMode ? classes.hideSection : classes.showSection
                } ${ classes.fullWidth }`}
            >
              <TextField
                id="zipcode"
                name="zipcode"
                label="Zipcode"
                placeholder="Enter the zipcode"
                materialProps={{ maxLength: "5" }}
                disabled={props?.sameAsMailAddress}
                value={props?.formikAddDebitCard.values.zipcode}
                onChange={(event) => props?.getAddressOnChange(event)}
                onBlur={props?.formikAddDebitCard.handleBlur}
                error={
                  (props?.formikAddDebitCard.touched.zipcode &&
                    Boolean(props?.formikAddDebitCard.errors.zipcode)) ||
                  !props?.validZip
                }
                helperText={
                  props?.validZip
                    ? props?.formikAddDebitCard.touched.zipcode &&
                    props?.formikAddDebitCard.errors.zipcode
                    : "Please enter a valid zipcode"
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              container
              direction="row"
              className={`${ props?.editMode ? classes.hideSection : classes.showSection
                } ${ classes.fullWidth }`}
            >
              <TextField
                id="city"
                name="city"
                label="City"
                placeholder="Enter the city"
                disabled
                materialProps={{ maxLength: "30" }}
                value={props?.formikAddDebitCard.values.city}
                onChange={(event) => props?.addBankOnChange(event, 2)}
                onBlur={props?.formikAddDebitCard.handleBlur}
                error={
                  props?.formikAddDebitCard.touched.city &&
                  Boolean(props?.formikAddDebitCard.errors.city)
                }
                helperText={
                  props?.formikAddDebitCard.touched.city &&
                  props?.formikAddDebitCard.errors.city
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              container
              direction="row"
              className={`${ props?.editMode ? classes.hideSection : classes.showSection
                } ${ classes.fullWidth }`}
            >
              <TextField
                id="state"
                name="state"
                label="State"
                placeholder="Enter the state"
                materialProps={{ maxLength: "30" }}
                value={props?.formikAddDebitCard.values.state}
                disabled
                onChange={(event) => props?.addBankOnChange(event, 2)}
                onBlur={props?.formikAddDebitCard.handleBlur}
                error={
                  props?.formikAddDebitCard.touched.state &&
                  Boolean(props?.formikAddDebitCard.errors.state)
                }
                helperText={
                  props?.formikAddDebitCard.touched.state &&
                  props?.formikAddDebitCard.errors.state
                }
              />
            </Grid>
            <Grid
              item
              sm={4}
              xs={6}
              className={props?.editMode ? classes.hideSection : classes.showSection}
            >
              <Checkbox
                name="setDefault"
                label="Set as Default"
                labelid="setDefault"
                stylelabelform='{ "paddingTop":"0px" }'
                stylecheckbox='{ "color":"#0F4EB3", "marginLeft":"7px","paddingRight":"15px" }'
                stylecheckboxlabel='{ "color":"" }'
                required={true}
                value={props?.checkedDebitCard}
                checked={props?.checkedDebitCard}
                onChange={(event) => {
                  props?.setDefaultAccount(event);
                }}
              />
            </Grid>
            <br></br> <br></br>
            <Grid id="paymentMethodBtnWrap" item xs={12}>
              <Grid id="addBankAccountbutton-grid">
                <ButtonSecondary
                  stylebutton='{"marginLeft": "","fontSize":""}'
                  styleicon='{ "color":"" }'
                  id="addBankAccount_button"
                  onClick={() => props?.closeDebitCardButton()}
                >
                  {props?.editMode ? "Back" : "Cancel"}
                </ButtonSecondary>
              </Grid>

              <Grid
                id="addDebitCardbutton-grid"
                className={props?.editMode ? classes.hideSection : classes.showSection}
              >
                <ButtonPrimary
                  stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
                  id="addDebitCard_button"
                  disabled={!props?.validZip}
                  onClick={() => props?.openDebitCardModal()}
                >
                  Add
                </ButtonPrimary>
              </Grid>
            </Grid>
          </Grid>

          {/* **************Debit Card modal******************* */}

          <Dialog
            id="debitCardModal"
            open={props?.debitCardModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            classes={{ paper: classes.dialogPaperDebitCard }}
          >
            <DialogTitle id="debitCardModalHeading">

              <IconButton
                id="debitCardModalClose"
                aria-label="close"
                className={classes.closeButton}
                onClick={props?.closeDebitCardModal}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent >
              <Typography id="deleteTxt" className={classes.dialogHeading}>
                Are you sure you want to add a new Debit Card?
              </Typography>
            </DialogContent>

            <DialogActions className={classes.dialogAction}>
              <ButtonSecondary
                stylebutton='{"background": "", "color":"" }'
                onClick={props?.closeDebitCardModal}
              >
                No
              </ButtonSecondary>
              <ButtonPrimary
                stylebutton='{"background": "", "color":"" }'
                onClick={props?.addCreditCardYes}
                disabled={props?.loading}
              >
                Yes
                <i
                  className="fa fa-refresh fa-spin customSpinner"
                  style={{
                    marginRight: "10px",
                    display: props?.loading ? "block" : "none",
                  }}
                />
              </ButtonPrimary>
            </DialogActions>
          </Dialog>
        </form>
      </div>

  )
}

CreditCardMethod.propTypes = {
  formikAddDebitCard: PropTypes.object,
  handleMenuProfile: PropTypes.func,
  sameAsMailAddress: PropTypes.bool,
  closeDebitCardButton: PropTypes.func,
  addCreditCardYes: PropTypes.func,
  validateCardAndAccountNumber: PropTypes.func,
  removeSpace: PropTypes.func,
  closeDebitCardModal: PropTypes.func,
  addNewAccount: PropTypes.func,
  openDebitCardModal: PropTypes.func,
  checkedAddBank: PropTypes.bool,
  routingError: PropTypes.string,
  setCheckedAddBank: PropTypes.func,
  setRoutingError: PropTypes.func,
  preventSpace: PropTypes.func,
  setAccountType: PropTypes.func,
  addBankOnChange: PropTypes.func,
  setDefaultAccount: PropTypes.func,
  setSameAsMailAddress: PropTypes.func,
  fetchAddress: PropTypes.func,
  getAddressOnChange: PropTypes.func,
  detectCardType: PropTypes.func,
  debitCardModal: PropTypes.bool,
  editMode: PropTypes.bool,
  loading: PropTypes.bool,
  validZip: PropTypes.bool,
  checkedDebitCard: PropTypes.bool,
  accountType: PropTypes.string,
  mailingZipcode: PropTypes.string,
  mailingStreetAddress: PropTypes.string,
  cardType: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
};