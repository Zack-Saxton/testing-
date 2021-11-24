import React, { useEffect, useState } from "react";
import { useStylesMyProfile } from "./Style";
import Grid from "@material-ui/core/Grid";
import "./Style.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PaymentIcon from "@material-ui/icons/Payment";
import ListIcon from "@material-ui/icons/Reorder";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import FormHelperText from "@material-ui/core/FormHelperText";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { InputAdornment } from "@material-ui/core";
import { AddACHPaymentAPI } from "../../Controllers/AddACHDebitMethod";
import {
  ButtonPrimary,
  ButtonSecondary,
  Checkbox,
  Radio,
  TextField,
  DatePicker,
} from "../../FormsUI";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import cheque from "../../../assets/images/cheque.jpg";
import * as yup from "yup";
import { useFormik } from "formik";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

//Yup validations for Add Bank Account
const validationSchemaDebitCard = yup.object({
  accountNickname: yup
    .string("Enter  Account Nickname")
    .max(30, "Account Nickname can be upto 30 characters length")
    .min(2, "Account Nickname should be minimum of 2 letters")
    .required("Your Account Nickname is required"),
  cardNumber: yup
    .string("Enter Debit Card Number")
    .required("Your Debit Card Number is required")
    .min(16, "Debit Card Number should be of 16 digits"),
  cardName: yup
    .string("Enter your card name")
    .required("Your Name on your card is required"),
  cvv: yup
    .string("Enter CVV")
    .required("Your CVV is required")
    .min(3, "CVV number should be 9 digits"),
  expirydate: yup
    .date("Please enter a valid date")
    .nullable()
    .required("Your Card Expiry Date is required")
    .typeError("Please enter a valid date")
    .min(
      new Date(new Date().getFullYear(), new Date().getMonth()),
      "Please check your Expiry Month and Year"
    ),
});

const validationSchemaAddBank = yup.object({
  accountNickname: yup
    .string("Enter  Account Nickname")
    .max(30, "Account Nickname can be upto 30 characters length")
    .min(2, "Account Nickname should be minimum of 2 letters")
    .required("Your Account Nickname is required"),
  accountHolder: yup
    .string("Enter Account Holder Name")
    .max(30, "Account Holder Name can be upto 30 characters length")
    .min(2, "Account Holder Name should be minimum of 2 letters")
    .required("Your Account Holder Name is required"),
  bankRoutingNumber: yup
    .string("Enter Bank Routing Number")
    .required("Your Bank Routing Number is required")
    .min(9, "Bank Routing number should be 9 digits"),
  bankName: yup
    .string("Enter Bank Name")
    .max(50, "Account Holder Name can be upto 50 characters length")
    .min(3, "Bank Name should be minimum of 3 letters")
    .required("Your Bank Name is required"),
  bankAccountNumber: yup
    .string("Enter Bank Account Number")
    .required("Your Bank Account Number is required")
    .min(7, "Account number should be minimum of 7 digits")
    .max(16, "Account number should be minimum of 16 digits"),
});

function createData(type, name, setdefault, paymentmethodid, deletethis) {
  return {
    type,
    name,
    setdefault,
    paymentmethodid,
    deletethis,
  };
}
const branch = (
  <Grid container direction="row" alignItems="center">
    <AccountBalanceIcon />
  </Grid>
);

const online = (
  <Grid container direction="row" alignItems="center">
    <PaymentIcon />
  </Grid>
);

const rows36term = [
  createData(branch, "Test1", "1", "101", ""),
  createData(online, "Test2", "0", "102", ""),
];

export default function PaymentMethod() {
  const classes = useStylesMyProfile();
  const [bankRoutingCheque, setHandleBankRoutingCheque] = useState(false);
  const [addBankAccount, setAddBankAccount] = useState(false);
  const [addDebitCard, setAddDebitCard] = useState(false);
  const [paymentMethodDiv, setPaymentMethodDiv] = useState(true);
  const [accountType, setAccountType] = useState("saving");
  const [addBankModal, setAddBankModal] = useState(false);
  const [debitCardModal, setDebitCardModal] = useState(false);
  const formikAddBankAccount = useFormik({
    initialValues: {
      accountNickname: "",
      accountHolder: "",
      bankRoutingNumber: "",
      bankName: "",
      bankAccountNumber: "",
    },
    validationSchema: validationSchemaAddBank,
    enableReinitialize: true,
    onSubmit:  (values) => {
      setAddBankModal(true);
      AddACHPaymentAPI(
        values.accountNickname,
        values.accountHolder,
        values.bankRoutingNumber,
        values.bankAccountNumber,
        values.accountType,
        values.defaultBank
      );
    },
  });

  const openAddBankModal = () => {
    formikAddBankAccount.handleSubmit();
  };

  const closeAddBankModal = () => {
    setAddBankModal(false);
  };

  const addBankOnChange = (event) => {
    const reg = /^([a-zA-Z]+[.]?[ ]?|[a-z]+['-]?)+$/;
    let acc = event.target.value;
    if (acc === "" || reg.test(acc)) {
      formikAddBankAccount.handleChange(event);
    }
  };

  const addBankOnChangeNumber = (event) => {
    const reg = /^[0-9\b]+$/;
    let acc = event.target.value;

    if (acc === "" || reg.test(acc)) {
      formikAddBankAccount.handleChange(event);
    }
  };

  const formikAddDebitCard = useFormik({
    initialValues: {
      accountNickname: "",
      cardNumber: "",
      cardName: "",
      cvv: "",
      expirydate: null,
    },
    validationSchema: validationSchemaDebitCard,
    onSubmit: async (values) => {
      setDebitCardModal(true);
    },
  });

  const addDebitOnChange = (event) => {
    const reg = /^([a-zA-Z]+[.]?[ ]?|[a-z]+['-]?)+$/;
    let acc = event.target.value;
    if (acc === "" || reg.test(acc)) {
      formikAddDebitCard.handleChange(event);
    }
  };

  const addDebitOnChangeNumber = (event) => {
    const reg = /^[0-9\b]+$/;
    let acc = event.target.value;

    if (acc === "" || reg.test(acc)) {
      formikAddDebitCard.handleChange(event);
    }
  };

  const openDebitCardModal = () => {
    formikAddDebitCard.handleSubmit();
  };

  const closeDebitCardModal = () => {
    setDebitCardModal(false);
  };

  //pop up open & close
  const handleBankRoutingCheque = () => {
    setHandleBankRoutingCheque(true);
  };

  const handleBankRoutingChequeClose = () => {
    setHandleBankRoutingCheque(false);
  };

  useEffect(() => {
    const img = new Image();
    // image is already loaded (cached if server permits) on component mount:
    img.src = cheque;
  }, []);

  const addBankAccountButton = () => {
    setAddBankAccount(true);
    setPaymentMethodDiv(false);
  };
  const closeBankAccountButton = () => {
    setAddBankAccount(false);
    setPaymentMethodDiv(true);
  };

  const addDebitCardButton = () => {
    setAddDebitCard(true);
    setPaymentMethodDiv(false);
  };

  const closeDebitCardButton = () => {
    setAddDebitCard(false);
    setPaymentMethodDiv(true);
  };

  //Preventing space key
  const preventSpace = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };
  //  view part
  return (
    <div>
      <div
        className={paymentMethodDiv === true ? "showContent" : "hideContent"}
      >
        <Grid item xs={12} style={{ paddingBottom: "20px", width: "100%" }}>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                {rows36term.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell
                      align="left"
                      style={{ width: "15px", padding: "1px" }}
                    >
                      {row.type}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ paddingTop: "26px", padding: "0" }}
                    >
                      {row.name} (nickname)
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ marginRight: "0", padding: "0" }}
                    >
                      <Radio
                        name={row.name}
                        label="Set as Default"
                        radiolabel='[{ "value":"select"}]'
                        value={row.paymentmethodid}
                        style={{
                          marginTop: "3px",
                          marginRight: "0px",
                          padding: "0",
                        }}
                      />
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        marginTop: "4px",
                        marginLeft: "-24",
                        padding: "0",
                      }}
                    >
                      Set as Default
                    </TableCell>

                    <TableCell align="left">
                      <ListIcon style={{ color: "blue" }} />
                    </TableCell>
                    <TableCell align="left">
                      <DeleteIcon style={{ color: "blue" }} />
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell
                    component="th"
                    className={classes.tableHeadRow}
                    scope="row"
                    colSpan="4"
                  >
                    <p>
                      Setting an account as your default does not automatically
                      discontinue recurring payments for another account.
                    </p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Grid id="paymentMethodBtnWrap" style={{ paddingTop: "25px" }}>
            <Grid id="addBankAccountbutton-grid">
              <ButtonPrimary
                stylebutton='{"marginLeft": "","fontSize":""}'
                styleicon='{ "color":"" }'
                id="addBankAccount_button"
                onClick={() => addBankAccountButton()}
              >
                Add Bank Account
              </ButtonPrimary>
            </Grid>

            <Grid
              id="addDebitCardbutton-grid"
              style={{ paddingBottom: "30px" }}
            >
              <ButtonPrimary
                stylebutton='{"background": "", "float":"" }'
                styleicon='{ "color":"" }'
                id="addDebitCard_button"
                onClick={() => addDebitCardButton()}
              >
                Add Debit Card
              </ButtonPrimary>
            </Grid>
          </Grid>
          <p className={classes.smallText}>
            You have two payment method options. You can either add your bank
            account information to make payments directly from your bank account
            or you can add debit card information to make payments through your
            debit card. You also have the option to set either of these payment
            methods as your default payment methods.
          </p>
        </Grid>
      </div>
      {/* ******************************************Add Bank account begin*********************************************************** */}

      <div className={addBankAccount === true ? "showContent" : "hideContent"}>
        <form onSubmit={formikAddBankAccount.handleSubmit}>
          <Grid
            id="addAccountGrid"
            spacing={4}
            container
            style={{ paddingBottom: "20px", width: "100%" }}
          >
            <Grid item xs={12}>
              <Breadcrumbs
                separator={
                  <NavigateNextIcon
                    style={{ color: "rgba(255, 255, 255, .7)" }}
                    fontSize="small"
                  />
                }
                style={{
                  lineHeight: "30px",
                  height: "30px",
                  backgroundColor: "#164a9c",
                }}
                aria-label="breadcrumb"
              >
                <Link
                  href="/customers/myProfile"
                  style={{
                    fontSize: "18px",
                    color: "rgba(255, 255, 255, .7)",
                    textDecoration: "none",
                    padding: "10px",
                  }}
                >
                  Profile settings
                </Link>
                <Link
                  style={{
                    fontSize: "18px",
                    color: "rgba(255, 255, 255, .7)",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => closeBankAccountButton()}
                >
                  Payment account
                </Link>
                <Link
                  style={{
                    fontSize: "18px",
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  Add bank account
                </Link>
              </Breadcrumbs>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ width: "100%" }}
              container
              direction="row"
            >
              <TextField
                id="accountNickname"
                name="accountNickname"
                label="Account Nickname"
                placeholder="Enter your Account Nickname "
                materialProps={{ maxLength: "30" }}
                onChange={(e) => addBankOnChange(e)}
                value={formikAddBankAccount.values.accountNickname}
                onBlur={formikAddBankAccount.handleBlur}
                error={
                  formikAddBankAccount.touched.accountNickname &&
                  Boolean(formikAddBankAccount.errors.accountNickname)
                }
                helperText={
                  formikAddBankAccount.touched.accountNickname &&
                  formikAddBankAccount.errors.accountNickname
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ width: "100%" }}
              container
              direction="row"
            >
              <TextField
                id="accountHolder"
                name="accountHolder"
                label="Name of Account Holder"
                placeholder="Enter the Account Holder Name"
                materialProps={{ maxLength: "30" }}
                value={formikAddBankAccount.values.accountHolder}
                onChange={(e) => addBankOnChange(e)}
                onBlur={formikAddBankAccount.handleBlur}
                error={
                  formikAddBankAccount.touched.accountHolder &&
                  Boolean(formikAddBankAccount.errors.accountHolder)
                }
                helperText={
                  formikAddBankAccount.touched.accountHolder &&
                  formikAddBankAccount.errors.accountHolder
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Radio
                name="accountType"
                labelforform="Account Type"
                radiolabel='[{"label":"Savings", "value":"saving"},{"label":"Checking", "value":"checking"}]'
                checked={accountType}
                onClick={(e) => {
                  setAccountType(e);
                }}
                row={true}
                labelplacement={"end"}
                style={{ fontWeight: "normal" }}
              />
              <FormHelperText error={true}>
                {accountType === "" ? "Account type required" : ""}
              </FormHelperText>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              style={{ width: "100%" }}
              container
              direction="row"
            >
              <TextField
                name="bankRoutingNumber"
                id="bankRoutingNumber"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Bank Routing Number" placement="top">
                        <InfoOutlinedIcon
                          onClick={() => handleBankRoutingCheque()}
                          style={{
                            fontSize: "large",
                            cursor: "pointer",
                            color: "blue",
                          }}
                        />
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
                materialProps={{ maxLength: "9" }}
                label="Bank Routing Number"
                placeholder="Enter your Bank Routing Number"
                value={formikAddBankAccount.values.bankRoutingNumber}
                // onBlur={formikAddBankAccount.handleBlur}
                onBlur={async (event) => {
                  if (
                    event.target.value !== "" &&
                    event.target.value.length === 9
                  ) {
                    fetch(
                      "https://www.routingnumbers.info/api/data.json?rn=" +
                        event.target.value
                    )
                      .then((res) => res.json())
                      .then((result) => {
                        formikAddBankAccount.setFieldValue(
                          "bankName",
                          result?.customer_name ?? ""
                        );
                      });
                    formikAddBankAccount.handleBlur(event);
                  }
                }}
                onChange={(e) => addBankOnChangeNumber(e)}
                error={
                  formikAddBankAccount.touched.bankRoutingNumber &&
                  Boolean(formikAddBankAccount.errors.bankRoutingNumber)
                }
                helperText={
                  formikAddBankAccount.touched.bankRoutingNumber &&
                  formikAddBankAccount.errors.bankRoutingNumber
                }
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              style={{ width: "100%" }}
              container
              direction="row"
            >
              <TextField
                name="bankName"
                id="bankName"
                label="Name of your Bank"
                placeholder="Enter your Bank Name"
                materialProps={{ maxLength: "100" }}
                value={formikAddBankAccount.values.bankName}
                onBlur={formikAddBankAccount.handleBlur}
                onChange={(e) => addBankOnChange(e)}
                error={
                  formikAddBankAccount.touched.bankName &&
                  Boolean(formikAddBankAccount.errors.bankName)
                }
                helperText={
                  formikAddBankAccount.touched.bankName &&
                  formikAddBankAccount.errors.bankName
                }
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{ width: "100%" }}
              container
              direction="row"
            >
              <TextField
                id="bankAccountNumber"
                name="bankAccountNumber"
                label="Bank Account Number"
                placeholder="Bank Account Number"
                materialProps={{ maxLength: "16" }}
                onKeyDown={preventSpace}
                value={formikAddBankAccount.values.bankAccountNumber}
                onChange={(e) => addBankOnChangeNumber(e)}
                onBlur={formikAddBankAccount.handleBlur}
                error={
                  formikAddBankAccount.touched.bankAccountNumber &&
                  Boolean(formikAddBankAccount.errors.bankAccountNumber)
                }
                helperText={
                  formikAddBankAccount.touched.bankAccountNumber &&
                  formikAddBankAccount.errors.bankAccountNumber
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Checkbox
                name="setDefault"
                label="Set as Default"
                labelid="setDefault"
                stylelabelform='{ "paddingTop":"0px" }'
                stylecheckbox='{ "color":"#0F4EB3", "marginLeft":"7px","paddingRight":"15px" }'
                stylecheckboxlabel='{ "color":"" }'
                required={true}
              />
            </Grid>

            <Grid id="paymentMethodBtnWrap" item xs={12}>
              <Grid id="addBankAccountbutton-grid">
                <ButtonSecondary
                  stylebutton='{"marginLeft": "","fontSize":""}'
                  styleicon='{ "color":"" }'
                  id="addBankAccount_button"
                  onClick={() => closeBankAccountButton()}
                >
                  Cancel
                </ButtonSecondary>
              </Grid>

              <Grid id="addDebitCardbutton-grid">
                <ButtonPrimary
                  stylebutton='{"background": "", "float":""  }'
                  styleicon='{ "color":"" }'
                  id="addDebitCard_button"
                  onClick={openAddBankModal}
                >
                  Add
                </ButtonPrimary>
              </Grid>
            </Grid>

            {/* **************Add Bank account modal******************* */}

            <Dialog
              id="addBankModal"
              open={addBankModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              classes={{ paper: classes.dialogPaperAddBank }}
            >
              <DialogTitle id="addBankModalHeading">
                <Typography id="deleteTxt" className={classes.dialogHeading}>
                  Are you sure you want to add a new payment method ?
                </Typography>
                <IconButton
                  id="addBankModalClose"
                  aria-label="close"
                  className={classes.closeButton}
                  onClick={closeAddBankModal}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>

              <DialogActions
                style={{ justifyContent: "center", marginBottom: "25px" }}
              >
                <ButtonSecondary
                  stylebutton='{"background": "", "color":"" }'
                  onClick={closeAddBankModal}
                >
                  No
                </ButtonSecondary>
                <ButtonPrimary stylebutton='{"background": "", "color":"" }'>
                  Yes
                </ButtonPrimary>
              </DialogActions>
            </Dialog>
          </Grid>
        </form>
      </div>

      {/* *********************************************DEbit card begins*************************************************************************                    */}
      <div className={addDebitCard === true ? "showContent" : "hideContent"}>
        <form onSubmit={formikAddDebitCard.handleSubmit}>
          <Grid
            spacing={4}
            container
            style={{ paddingBottom: "20px", width: "100%" }}
          >
            <Grid item xs={12}>
              <Breadcrumbs
                separator={
                  <NavigateNextIcon
                    style={{ color: "rgba(255, 255, 255, .7)" }}
                    fontSize="small"
                  />
                }
                style={{
                  lineHeight: "30px",
                  height: "30px",
                  backgroundColor: "#164a9c",
                }}
                aria-label="breadcrumb"
              >
                <Link
                  href="/customers/myProfile"
                  style={{
                    fontSize: "18px",
                    color: "rgba(255, 255, 255, .7)",
                    textDecoration: "none",
                    padding: "10px",
                  }}
                >
                  Profile settings
                </Link>
                <Link
                  style={{
                    fontSize: "18px",
                    color: "rgba(255, 255, 255, .7)",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => closeDebitCardButton()}
                >
                  Payment account
                </Link>
                <Link
                  style={{
                    fontSize: "18px",
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  Add new debit card
                </Link>
              </Breadcrumbs>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ width: "100%" }}
              container
              direction="row"
            >
              <TextField
                id="accountNickname"
                name="accountNickname"
                label="Account Nickname"
                placeholder="Enter your Account Nickname "
                materialProps={{ maxLength: "30" }}
                value={formikAddDebitCard.values.accountNickname}
                onChange={(e) => addDebitOnChange(e)}
                onBlur={formikAddDebitCard.handleBlur}
                error={
                  formikAddDebitCard.touched.accountNickname &&
                  Boolean(formikAddDebitCard.errors.accountNickname)
                }
                helperText={
                  formikAddDebitCard.touched.accountNickname &&
                  formikAddDebitCard.errors.accountNickname
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ width: "100%" }}
              container
              direction="row"
            >
              <TextField
                id="cardNumber"
                name="cardNumber"
                label="Card Number"
                placeholder="Enter the Card Number"
                materialProps={{ maxLength: "16" }}
                onKeyDown={preventSpace}
                value={formikAddDebitCard.values.cardNumber}
                onChange={(e) => addDebitOnChangeNumber(e)}
                onBlur={formikAddDebitCard.handleBlur}
                error={
                  formikAddDebitCard.touched.cardNumber &&
                  Boolean(formikAddDebitCard.errors.cardNumber)
                }
                helperText={
                  formikAddDebitCard.touched.cardNumber &&
                  formikAddDebitCard.errors.cardNumber
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ width: "100%" }}
              container
              direction="row"
            >
              <TextField
                id="cardName"
                name="cardName"
                label="Name on Card "
                placeholder="Enter the Name on Card"
                materialProps={{ maxLength: "30" }}
                value={formikAddDebitCard.values.cardName}
                onChange={(e) => addDebitOnChange(e)}
                onBlur={formikAddDebitCard.handleBlur}
                error={
                  formikAddDebitCard.touched.cardName &&
                  Boolean(formikAddDebitCard.errors.cardName)
                }
                helperText={
                  formikAddDebitCard.touched.cardName &&
                  formikAddDebitCard.errors.cardName
                }
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              style={{ width: "100%" }}
              container
              direction="row"
            >
              <DatePicker
                name="expirydate"
                label="Expiry Date"
                id="expirydate"
                className="expirydate"
                placeholder="MM/YY"
                format="MM/yy"
                onChange={(values) => {
                  formikAddDebitCard.setFieldValue("expirydate", values);
                }}
                onBlur={formikAddDebitCard.handleBlur}
                error={
                  formikAddDebitCard.touched.expirydate &&
                  Boolean(formikAddDebitCard.errors.expirydate)
                }
                helperText={
                  formikAddDebitCard.touched.expirydate &&
                  formikAddDebitCard.errors.expirydate
                }
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              style={{ width: "100%" }}
              container
              direction="row"
            >
              <TextField
                name="cvv"
                id="cvv"
                label="CVV"
                placeholder="Enter your CVV Number"
                materialProps={{ maxLength: "3" }}
                value={formikAddDebitCard.values.cvv}
                onChange={(e) => addDebitOnChangeNumber(e)}
                onBlur={formikAddDebitCard.handleBlur}
                error={
                  formikAddDebitCard.touched.cvv &&
                  Boolean(formikAddDebitCard.errors.cvv)
                }
                helperText={
                  formikAddDebitCard.touched.cvv &&
                  formikAddDebitCard.errors.cvv
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Checkbox
                name="setDefault"
                label="Set as Default"
                labelid="setDefault"
                stylelabelform='{ "paddingTop":"0px" }'
                stylecheckbox='{ "color":"#0F4EB3", "marginLeft":"7px","paddingRight":"15px" }'
                stylecheckboxlabel='{ "color":"" }'
                required={true}
              />
            </Grid>

            <Grid id="paymentMethodBtnWrap" item xs={12}>
              <Grid id="addBankAccountbutton-grid">
                <ButtonSecondary
                  stylebutton='{"marginLeft": "","fontSize":""}'
                  styleicon='{ "color":"" }'
                  id="addBankAccount_button"
                  onClick={() => closeDebitCardButton()}
                >
                  Cancel
                </ButtonSecondary>
              </Grid>

              <Grid id="addDebitCardbutton-grid">
                <ButtonPrimary
                  stylebutton='{"background": "", "float":""  }'
                  id="addDebitCard_button"
                  onClick={() => openDebitCardModal()}
                >
                  Add
                </ButtonPrimary>
              </Grid>
            </Grid>
          </Grid>

          {/* **************Debit Card modal******************* */}

          <Dialog
            id="debitCardModal"
            open={debitCardModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            classes={{ paper: classes.dialogPaperDebitCard }}
          >
            <DialogTitle id="debitCardModalHeading">
              <Typography id="deleteTxt" className={classes.dialogHeading}>
                Are you sure you want to add a New Debit Card Details ?
              </Typography>
              <IconButton
                id="debitCardModalClose"
                aria-label="close"
                className={classes.closeButton}
                onClick={closeDebitCardModal}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogActions
              style={{ justifyContent: "center", marginBottom: "25px" }}
            >
              <ButtonSecondary
                stylebutton='{"background": "", "color":"" }'
                onClick={closeDebitCardModal}
              >
                No
              </ButtonSecondary>
              <ButtonPrimary stylebutton='{"background": "", "color":"" }'>
                Yes
              </ButtonPrimary>
            </DialogActions>
          </Dialog>
        </form>
      </div>
      {/* *******************************end debit card************************************************************************ */}

      {/* Modal for Bank Routing Number cheque */}
      <Dialog
        id="BankroutingnumberDialog"
        open={bankRoutingCheque}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Bank Routing Number</DialogTitle>
        <DialogContent>
          <img
            src={cheque}
            alt="chequeImg"
            id="cheque"
            style={{ width: "100%" }}
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
  );
}
