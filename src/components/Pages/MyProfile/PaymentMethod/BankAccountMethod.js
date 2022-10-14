import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import FormHelperText from "@mui/material/FormHelperText";
import { InputAdornment } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { ButtonPrimary, ButtonSecondary, Checkbox, Radio, TextField } from "../../../FormsUI";
import PropTypes from "prop-types";
import { useStylesMyProfile } from "../Style";
import BankNameLookup from "../../../Controllers/BankNameLookup";
import cheque from "../../../../assets/images/cheque.jpg";
import globalMessages from "../../../../assets/data/globalMessages.json"



export default function BankAccountMethod(props) {
  const classes = useStylesMyProfile();
  const [bankRoutingCheque, setBankRoutingCheque] = useState(false);
  const [isAccountTypeTouched, setIsAccountTypeTouched] = useState(false);

  //pop up open & close
  const handleBankRoutingCheque = () => {
    setBankRoutingCheque(true);
  };

  const handleBankRoutingChequeClose = () => {
    setBankRoutingCheque(false);
  };

  return (
    <div >
      <form onSubmit={props?.formikAddBankAccount.handleSubmit}>
        <Grid
          id="addAccountGrid"
          spacing={4}
          container
          className={classes.paymentBody}
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
                onClick={() => props?.closeBankAccountButton()}
              >
                Payment account
              </Link>
              <Link className={classes.paymentAccountLink}>
                Add bank account
              </Link>
            </Breadcrumbs>
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.fullWidth}
            container
            direction="row"
          >
            <TextField
              id="accountNickname"
              name="accountNickname"
              label="Account Nickname"
              disabled={props?.editMode}
              placeholder="Enter your Account Nickname "
              materialProps={{ maxLength: "30" }}
              onChange={(event) => props?.addBankOnChange(event, 1)}
              value={props?.formikAddBankAccount.values.accountNickname}
              onBlur={(event) => {
                props?.formikAddBankAccount.handleBlur(event);
                props.removeSpace(event, "accountNickname", 1)
              }}
              error={
                props?.formikAddBankAccount.touched.accountNickname &&
                Boolean(props?.formikAddBankAccount.errors.accountNickname)
              }
              helperText={
                props?.formikAddBankAccount.touched.accountNickname &&
                props?.formikAddBankAccount.errors.accountNickname
              }
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
              id="accountHolder"
              name="accountHolder"
              disabled={props?.editMode}
              label="Name of Account Holder"
              placeholder="Enter the Account Holder Name"
              materialProps={{ maxLength: "30" }}
              value={props?.formikAddBankAccount.values.accountHolder}
              onChange={(event) => props?.addBankOnChange(event, 1)}
              onBlur={(event) => {
                props?.formikAddBankAccount.handleBlur(event);
                props?.removeSpace(event, "accountHolder", 1)
              }}
              error={
                props?.formikAddBankAccount.touched.accountHolder &&
                Boolean(props?.formikAddBankAccount.errors.accountHolder)
              }
              helperText={
                props?.formikAddBankAccount.touched.accountHolder &&
                props?.formikAddBankAccount.errors.accountHolder
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Radio
              name="accountType"
              labelforform="Account Type"
              radiolabel='[{"label":"Savings", "value":"Savings"},{"label":"Checking", "value":"Checking"}]'
              checked={props?.accountType}
              onClick={(event) => {
                setIsAccountTypeTouched(true);
                props?.setAccountType(event);
              }}
              row={true}
              disabled={props?.editMode}
              labelplacement={"end"}
              style={{ fontWeight: "normal" }}
            />
            <FormHelperText error={true}>
              { isAccountTypeTouched && !props?.accountType ? globalMessages?.Please_Select_A_Saving_0r_Checking : ""}
            </FormHelperText>
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
              name="bankRoutingNumber"
              id="bankRoutingNumber"
              disabled={props?.editMode}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Bank Routing Number" placement="top">
                      <InfoOutlinedIcon
                        onClick={() => handleBankRoutingCheque()}
                        className={classes.routingToolTip}
                      />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              materialProps={{ maxLength: "9" }}
              label="Bank Routing Number"
              placeholder="Enter your Bank Routing Number"
              value={props?.formikAddBankAccount.values.bankRoutingNumber}
              onBlur={async (event) => {
                props?.formikAddBankAccount.handleBlur(event);
                if (
                  event.target.value !== "" &&
                  event.target.value.length === 9
                ) {
                  let bankName = await BankNameLookup(event.target.value);
                  props?.formikAddBankAccount.setFieldValue("bankName", bankName);
                  props?.setRoutingError(bankName ? "" : globalMessages.Enter_Valid_Routing_No);
                }
              }}
              onKeyDown={props?.preventSpace}
              onChange={(event) => props?.validateCardAndAccountNumber(event, 1)}
              error={
                (props?.formikAddBankAccount.touched.bankRoutingNumber &&
                  Boolean(props?.formikAddBankAccount.errors.bankRoutingNumber)) ||
                (!props?.routingError ? false : true)
              }
              helperText={
                props?.routingError
                  ? props?.routingError
                  : props?.formikAddBankAccount.touched.bankRoutingNumber &&
                  props?.formikAddBankAccount.errors.bankRoutingNumber
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
              name="bankName"
              id="bankName"
              disabled
              label="Name of your Bank"
              placeholder="Enter your Bank Name"
              materialProps={{ maxLength: "100" }}
              value={props?.formikAddBankAccount.values.bankName}
              onBlur={props?.formikAddBankAccount.handleBlur}
              onChange={(event) => props?.addBankOnChange(event, 1)}
              error={
                props?.formikAddBankAccount.touched.bankName &&
                Boolean(props?.formikAddBankAccount.errors.bankName)
              }
              helperText={
                props?.formikAddBankAccount.touched.bankName &&
                props?.formikAddBankAccount.errors.bankName
              }
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
              id="bankAccountNumber"
              name="bankAccountNumber"
              label="Bank Account Number"
              placeholder="Bank Account Number"
              disabled={props?.editMode}
              materialProps={{ maxLength: "16" }}
              onKeyDown={props?.preventSpace}
              value={props?.editMode ? `******${props?.formikAddBankAccount.values.bankAccountNumber.slice(-4)}` : props?.formikAddBankAccount.values.bankAccountNumber}
              onChange={(event) => props?.validateCardAndAccountNumber(event, 1)}
              onBlur={props?.formikAddBankAccount.handleBlur}
              error={
                props?.formikAddBankAccount.touched.bankAccountNumber &&
                Boolean(props?.formikAddBankAccount.errors.bankAccountNumber)
              }
              helperText={
                props?.formikAddBankAccount.touched.bankAccountNumber &&
                props?.formikAddBankAccount.errors.bankAccountNumber
              }
            />
          </Grid>
          <Grid
            item
            xs={12}
            className={props?.editMode ? classes.hideSection : classes.showSection}
          >
            <Checkbox
              name="addBankSetDefault"
              label="Set as Default"
              labelid="setDefault"
              stylelabelform='{ "paddingTop":"0px" }'
              stylecheckbox='{ "color":"#0F4EB3", "marginLeft":"7px","paddingRight":"15px" }'
              stylecheckboxlabel='{ "color":"" }'
              required={true}
              value={props?.checkedAddBank}
              checked={props?.checkedAddBank}
              disabled={props?.editMode}
              materialProps={{ "data-testid": "add-bank-default-checkbox" }}
              onChange={(event) => {
                props?.setCheckedAddBank(event.target.checked);
              }}
            />
          </Grid>

          <Grid id="paymentMethodBtnWrap" item xs={12}>
            <Grid id="addBankAccountbutton-grid">
              <ButtonSecondary
                stylebutton='{"marginLeft": "","fontSize":""}'
                styleicon='{ "color":"" }'
                id="addBankAccount_button"
                onClick={() => {
                  props?.setAccountType('');
                  setIsAccountTypeTouched(false);
                  props.closeBankAccountButton();
                }}
              >
                {props?.editMode ? "Back" : "Cancel"}
              </ButtonSecondary>
            </Grid>

            <Grid
              id="addDebitCardbutton-grid"
              className={props?.editMode ? classes.hideSection : classes.showSection}
            >
              <ButtonPrimary
                stylebutton='{"background": "", "float":""  }'
                styleicon='{ "color":"" }'
                id="addDebitCard_button"
                onClick={() => {
                  setIsAccountTypeTouched(true);
                  props?.openAddBankModal();
                }}
              >
                Add
              </ButtonPrimary>
            </Grid>
          </Grid>

          {/* **************Add Bank account modal******************* */}

          <Dialog
            id="addBankModal"
            open={props?.addBankModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            classes={{ paper: classes.dialogPaperAddBank }}
          >
            <DialogTitle id="addBankModalHeading">

              <IconButton
                id="addBankModalClose"
                aria-label="close"
                className={classes.closeButton}
                onClick={props?.closeAddBankModal}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent >
              <Typography id="deleteTxt" className={classes.dialogHeading}>
                Are you sure you want to add a new payment method ?
              </Typography>
            </DialogContent>

            <DialogActions className={classes.dialogAction}>
              <ButtonSecondary
                disabled={props?.loading}
                stylebutton='{"background": "", "color":"" }'
                onClick={props?.closeAddBankModal}
              >
                No
              </ButtonSecondary>
              <ButtonPrimary
                disabled={props?.loading}
                stylebutton='{"background": "", "color":"" }'
                onClick={props?.addNewAccount}
              >
                Yes
              </ButtonPrimary>
            </DialogActions>
          </Dialog>
        </Grid>
      </form>

      {/* Modal for Bank Routing Number cheque */}
      <Dialog
        id="deleteConfirmDialog"
        open={bankRoutingCheque}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Bank Routing Number </DialogTitle>
        <DialogContent>
          <img
            src={cheque}
            alt="chequeImg"
            id="cheque"
            className={classes.fullWidth}
          />
        </DialogContent>
        <DialogActions>
          <ButtonPrimary
            stylebutton='{"background": "", "color":"" }'
            onClick={handleBankRoutingChequeClose}
          >
            Close
          </ButtonPrimary>
        </DialogActions>
      </Dialog>
    </div>

  )
}

BankAccountMethod.propTypes = {
  formikAddBankAccount: PropTypes.object,
  handleMenuProfile: PropTypes.func,
  closeBankAccountButton: PropTypes.func,
  addBankOnChange: PropTypes.func,
  validateCardAndAccountNumber: PropTypes.func,
  removeSpace: PropTypes.func,
  closeAddBankModal: PropTypes.func,
  addNewAccount: PropTypes.func,
  addBankModal: PropTypes.bool,
  openAddBankModal: PropTypes.func,
  checkedAddBank: PropTypes.bool,
  routingError: PropTypes.string,
  setCheckedAddBank: PropTypes.func,
  setRoutingError: PropTypes.func,
  preventSpace: PropTypes.func,
  setAccountType: PropTypes.func,
  editMode: PropTypes.bool,
  loading: PropTypes.bool,
  accountType: PropTypes.string,

};