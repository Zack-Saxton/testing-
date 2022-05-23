import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PaymentIcon from "@mui/icons-material/Payment";
import { InputAdornment } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import globalMessages from "../../../assets/data/globalMessages.json";
import cheque from "../../../assets/images/cheque.jpg";
import { AddACHPaymentAPI } from "../../../components/Controllers/ACHDebitController";
import { useGlobalState } from "../../../contexts/GlobalStateProvider";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import BankNameLookup from "../../Controllers/BankNameLookup";
import {
  addCreditCard,
  deleteBankAccount,
  deleteCreditCard,
  getPaymentMethods,
  setDefaultPayment
} from "../../Controllers/MyProfileController";
import ZipCodeLookup from "../../Controllers/ZipCodeLookup";
import {
  ButtonPrimary,
  ButtonSecondary,
  Checkbox,
  DatePicker,
  Radio,
  TextField
} from "../../FormsUI";
import ErrorLogger from "../../lib/ErrorLogger";
import { useStylesMyProfile } from "./Style";
import "./Style.css";
//Yup validations for Add Bank Account
const validationSchemaDebitCard = yup.object({
  cardNumber: yup
    .string(globalMessages.Card_Number_Required)
    .required(globalMessages.Card_Number_Required)
    .min(13, globalMessages.Card_Min_Number)
    .matches(/^5[1-5]\d{14}|^4\d{12}(?:\d{3})?$/g, globalMessages.Valid_Card),
  cardName: yup
    .string(globalMessages.Card_Holder_Name_Required)
    .required(globalMessages.Card_Holder_Name_Required),
  streetAddress: yup
    .string(globalMessages.Street_Address)
    .required(globalMessages.Street_Address_Required),
  city: yup
    .string(globalMessages.Enter_City)
    .required(globalMessages.City_Required),
  state: yup
    .string(globalMessages.Enter_State)
    .required(globalMessages.State_Required),
  zipcode: yup
    .string(globalMessages.Enter_Zipcode)
    .required(globalMessages.Zipcode_Required)
    .min(5, globalMessages.Zipcode_Required),
  cvv: yup
    .string(globalMessages.Enter_CVV)
    .required(globalMessages.CVV_Required)
    .matches(
      /^(?!000)\d{3}$/,
      globalMessages.CVV_Valid
  )
    .min(3, globalMessages.CVV_Required),

  expiryDate: yup
    .date(globalMessages.Card_Valid_Date)
    .nullable()
    .required(globalMessages.Card_Expiry_Date_Required)
    .typeError(globalMessages.Valid_Expiry_Date)
    .min(
      new Date(new Date().getFullYear(), new Date().getMonth()),
      globalMessages.Expired_Card
    ),
});

const validationSchemaAddBank = yup.object({
  accountNickname: yup
    .string(globalMessages.Account_Nick_Name)
    .max(30, globalMessages.Account_Nick_Name_Max)
    .min(2, globalMessages.Account_Nick_Name_Min)
    .required(globalMessages.Nick_Name_Required),
  accountHolder: yup
    .string(globalMessages.Account_Holder_Name)
    .max(30, globalMessages.Account_Holder_Name_Max)
    .min(2, globalMessages.Account_Holder_Name_Min)
    .required(globalMessages.Account_Holder_Name_Required),
  bankRoutingNumber: yup
    .string(globalMessages.Enter_Routing_No)
    .required(globalMessages.Routing_No_Required)
    .min(9, globalMessages.validBankRoutingNumber),
  bankName: yup
    .string(globalMessages.Bank_Name)
    .max(50, globalMessages.Bank_Name_Max)
    .min(3, globalMessages.Bank_Name_Min)
    .required(globalMessages.Bank_Name_Required),
  bankAccountNumber: yup
    .string(globalMessages.Enter_Account_No)
    .required(globalMessages.Accoun_No_Required)
    .min(4, globalMessages.validAccountNumber)
    .max(17, globalMessages.validAccountNumber)
    .matches(/^0*[1-9]\d*$/,globalMessages.BankAccountNumber_Valid),
});

export default function PaymentMethod() {
  const classes = useStylesMyProfile();
  const navigate = useNavigate();
  const [ bankRoutingCheque, setBankRoutingCheque ] = useState(false);
  const [ addBankAccount, setAddBankAccount ] = useState(false);
  const [ addDebitCard, setAddDebitCard ] = useState(false);
  const [ paymentMethodDiv, setPaymentMethodDiv ] = useState(true);
  const [ accountType, setAccountType ] = useState("Savings");
  const [ addBankModal, setAddBankModal ] = useState(false);
  const [ debitCardModal, setDebitCardModal ] = useState(false);
  const [ checkedAddBank, setCheckedAddBank ] = useState(false);
  const [ checkedDebitCard, setCheckedDebitCard ] = useState(false);
  const [ sameAsMailAddress, setSameAsMailAddress ] = useState(true);
  const [ loading, setLoading ] = useState(false);
  const [ cardType, setCardType ] = useState(false);
  const [ deleteType, setDeleteType ] = useState();
  const [ deleteID, setDeleteID ] = useState();
  const [ editMode, setEditMode ] = useState(false);
  const [ confirmDelete, setConfirmDelete ] = useState(false);
  const [ addBankValues, setAddBankValues ] = useState(false);
  const [ routingError, setRoutingError ] = useState("");
  const [ scheduledAccountNo, setScheduledAccountNo ] = useState("0");
  const [ autoPayAccountNo, setAutoPayAccountNo ] = useState("0");
  const [ , setProfileTabNumber ] = useGlobalState();
  const [ validZip, setValidZip ] = useState(true);
  const [ mailingStreetAddress, setMailingStreetAddress ] = useState("");
  const [ mailingZipcode, setMailingZipcode ] = useState("");
  const { data: accountDetails } = useQuery(
    "loan-data",
    usrAccountDetails
  );
  const { data: allPaymentMethod, refetch } = useQuery(
    "payment-method",
    getPaymentMethods,
    {
      refetchOnMount: false,
    }
  );
  useEffect(() => {
    let schedulePayment = accountDetails?.data?.activeLoans?.length
      ? accountDetails.data.activeLoans[ 0 ].loanPaymentInformation?.scheduledPayments
      : null;
    let autoPay = accountDetails?.data?.activeLoans?.length
      ? accountDetails.data.activeLoans[ 0 ].loanPaymentInformation?.appRecurringACHPayment?.LastFourOfPaymentAccount
      : null;
    //User shouldn't be allowed to delete the payment method accounts where there is scheduled future payment
    if (schedulePayment?.length > 0) {
      let scheduleAccountNo = schedulePayment[ 0 ]?.PaymentMethod?.AchInfo
        ?.AccountNumber
        ? schedulePayment[ 0 ].PaymentMethod.AchInfo.AccountNumber
        : "";
      if (scheduleAccountNo === "") {
        scheduleAccountNo = schedulePayment[ 0 ]?.PaymentMethod?.CardInfo
          ?.CardNumber
          ? schedulePayment[ 0 ].PaymentMethod.CardInfo.CardNumber
          : "";
      }
      let scheduleDate = schedulePayment[ 0 ]?.PaymentDate
        ? schedulePayment[ 0 ].PaymentDate
        : "";
      scheduleDate = Moment(scheduleDate);
      let dateNow = Moment().startOf("day");
      if (dateNow < scheduleDate && scheduleAccountNo !== "") {
        setScheduledAccountNo(scheduleAccountNo);
      }
    }
    if (autoPay) {
      setAutoPayAccountNo(autoPay);
    }
  }, [ accountDetails ]);
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
    onSubmit: (values) => {
      setAddBankModal(true);
      setAddBankValues(values);
    },
  });

  const openAddBankModal = () => {
    formikAddBankAccount.handleSubmit();
  };

  const closeAddBankModal = () => {
    setAddBankModal(false);
  };

  const addBankOnChange = (event, type) => {
    const pattern = /^([a-zA-Z]+[.]?[ ]?|[a-z]+['-]?)+$/;
    let enteredName = event.target.value.trim(); //Holder name, account name, bank name
    if (!enteredName || enteredName.match(pattern)) {
      type === 1 ? formikAddBankAccount.handleChange(event) : formikAddDebitCard.handleChange(event);
    }
  };
  const validateCardAndAccountNumber = (event, type) => {
    const pattern = /^[0-9\b]+$/;
    let cardAccountNumber = event.target.value.trim();
    if (!cardAccountNumber || cardAccountNumber.match(pattern)) {
      type === 1 ? formikAddBankAccount.handleChange(event) : formikAddDebitCard.handleChange(event);
    }
  };

  const formikAddDebitCard = useFormik({
    initialValues: {
      cardNumber: "",
      cardName: "",
      cvv: "",
      expiryDate: null,
      streetAddress: "",
      city: "",
      state: "",
      zipcode: "",
      setDefault: false,
    },
    validationSchema: validationSchemaDebitCard,
    onSubmit: async (values) => {
      setDebitCardModal(true);
    },
  });
  const setDefaultAccount = (event) => {
    formikAddDebitCard.setFieldValue("setDefault", event.target.checked);
    setCheckedDebitCard(event.target.checked);
  };

  const getAddressOnChange = (event) => {
    const pattern = /^[0-9\b]+$/;
    let zipCode = event.target.value;
    if (!zipCode || pattern.test(zipCode)) {
      fetchAddress(event);
    }
  };
  const fetchAddress = async (event) => {
    formikAddDebitCard.handleChange(event);
    try {
      let isValidZip = false;
      setValidZip(true);
      if (event.target.value !== "" && event.target.value.length === 5) {
        let result = await ZipCodeLookup(event.target.value);
        if (result?.status === 200 && result?.data?.cityName) {
          setValidZip(true);
          isValidZip = true;
          formikAddDebitCard.setFieldValue("city", result?.data?.cityName);
          formikAddDebitCard.setFieldValue("state", result?.data?.stateCode);
        }
      }
      if (!isValidZip) {
        setValidZip(false);
        formikAddDebitCard.setFieldValue("city", "");
        formikAddDebitCard.setFieldValue("state", "");
      }
    } catch (error) {
      ErrorLogger("Error from fetchAddress", error);
    }
  };

  const onClickEditCard = async (row) => {
    setLoading(true);
    if (row?.AccountType) {
      setEditMode(true);
      addBankAccountButton();
      formikAddBankAccount.setFieldValue("accountNickname", row.Nickname);
      formikAddBankAccount.setFieldValue(
        "bankAccountNumber",
        row.AccountNumber
      );
      formikAddBankAccount.setFieldValue(
        "bankRoutingNumber",
        row.RoutingNumber
      );
      formikAddBankAccount.setFieldValue("accountHolder", row.OwnerName);
      setAccountType(row.AccountType);
      let bankName = await BankNameLookup(row.RoutingNumber);
      formikAddBankAccount.setFieldValue("bankName", bankName);
      setLoading(false);
    } else {
      setEditMode(true);
      addDebitCardButton();
      formikAddDebitCard.setFieldValue("cardName", row.OwnerName);
      formikAddDebitCard.setFieldValue(
        "cardNumber",
        "****-****-****-" + row.LastFour
      );
      formikAddDebitCard.setFieldValue("expiryDate", row.ExpirationDate);
      formikAddDebitCard.setFieldValue("cvv", "***");
      setCardType(row.CardType);
      setLoading(false);
    }
  };

  function detectCardType(event, number) {
    let cardPattern = {
      Visa: /^4\d{12}(?:\d{3})?$/,
      MasterCard: /^5[1-5]\d{14}$/,
    };
    let isValidCard = false;
    for (let key in cardPattern) {
      if (cardPattern[ key ].test(number)) {
        setCardType(key);
        isValidCard = true;
        return key;
      }
    }
    if (!isValidCard) {
      setCardType(false);
    }
    formikAddDebitCard.handleBlur(event);
  }

  const openDebitCardModal = () => {
    formikAddDebitCard.handleSubmit();
    scrollToTop();
  };

  const closeDebitCardModal = () => {
    setDebitCardModal(false);
    scrollToTop();
  };

  //pop up open & close
  const handleBankRoutingCheque = () => {
    setBankRoutingCheque(true);
  };

  const handleBankRoutingChequeClose = () => {
    setBankRoutingCheque(false);
  };

  const handleDeleteConfirmClose = () => {
    setConfirmDelete(false);
  };

  const handleDeleteConfirmOpen = () => {
    setConfirmDelete(true);
  };

  useEffect(() => {
    const img = new Image();
    // image is already loaded (cached if server permits) on component mount:
    img.src = cheque;
  }, []);

  const addBankAccountButton = () => {
    setRoutingError("");
    setAddBankAccount(true);
    setPaymentMethodDiv(false);
    scrollToTop();
  };
  const closeBankAccountButton = () => {
    formikAddBankAccount.handleReset();
    setCheckedAddBank(false);
    setAddBankAccount(false);
    setPaymentMethodDiv(true);
    scrollToTop();
  };

  const addDebitCardButton = async () => {
    setAddDebitCard(true);
    setPaymentMethodDiv(false);
    scrollToTop();
    if (
      accountDetails?.data?.customer?.latest_contact
        ?.mailing_address_postal_code
    ) {
      setMailingZipcode(
        accountDetails?.data?.customer?.latest_contact
          ?.mailing_address_postal_code
      );
      setMailingStreetAddress(
        accountDetails?.data?.customer?.latest_contact
          ?.mailing_address_street
      );

      formikAddDebitCard.setFieldValue(
        "zipcode",
        accountDetails?.data?.customer?.latest_contact
          ?.mailing_address_postal_code
      );
      formikAddDebitCard.setFieldValue(
        "streetAddress",
        accountDetails?.data?.customer?.latest_contact
          ?.mailing_address_street
      );

      let event = {
        target: {
          value:
            accountDetails?.data?.customer?.latest_contact
              ?.mailing_address_postal_code,
          id: "addDebitcard",
          name: "addDebitcard",
        },
      };
      fetchAddress(event);
    }
  };

  const closeDebitCardButton = (event) => {
    formikAddDebitCard.handleReset(event);
    setCheckedDebitCard(false);
    setAddDebitCard(false);
    setPaymentMethodDiv(true);
    scrollToTop();
  };

  const handleMenuProfile = () => {
    navigate("/customers/myProfile");
    setProfileTabNumber({ profileTabNumber: 0 });
  };

  const setDefaultPaymentOnChange = async (nickname) => {
    setLoading(true);
    let passData = {
      nickname: nickname,
      defaultBank: 1,
    };
    let res = await setDefaultPayment(passData);
    if (res?.data?.Success === "Default Payment Method Set to " + nickname) {
      refetch();
      setLoading(false);
      toast.success(res?.data?.Success);
    } else {
      setLoading(false);
      toast.error("Default payment update failed ");
    }
  };
  const closeDeleteConfirmBox = () => {
    setDeleteID("");
    setDeleteType("");
    handleDeleteConfirmClose();
  };
  const onClickDelete = async (type, uniqueData) => {
    setLoading(true);
    try {
      switch (type) {
        case "card": {
          let passData = {
            profileId: uniqueData,
          };
          let res = await deleteCreditCard(passData);
          if (res?.data?.deletePaymentMethod?.HasNoErrors) {
            if (!toast.isActive("closeToast")) {
              toast.success("Card deleted successfully.");
              refetch();
            }
            closeDeleteConfirmBox();
          } else {
            if (!toast.isActive("closeToast")) {
              toast.error("Error deleting your card, please try again");
            }
            closeDeleteConfirmBox();
          }
          setLoading(false);
          break;
        }
        case "bank": {
          let passData = {
            accountNumber: uniqueData,
          };
          let res = await deleteBankAccount(passData);
          if (res?.data?.deletePaymentMethod?.HasNoErrors) {
            if (!toast.isActive("closeToast")) {
              toast.success("Bank account deleted successfully.");
            }
            refetch();
            closeDeleteConfirmBox();
          } else {
            if (!toast.isActive("closeToast")) {
              toast.error("Error deleting your bank account, please try again");
            }
            closeDeleteConfirmBox();
          }
          setLoading(false);
          break;
        }
        default:
        // code block
      }
    } catch (error) {
      ErrorLogger(" Error Deleting Payment Method ::", error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const addCreditCardYes = async () => {
    setLoading(true);
    let creditCardResponse = await addCreditCard(
      formikAddDebitCard.values,
      cardType
    );
    if (creditCardResponse?.status === 400) {
      setLoading(false);
      toast.error(creditCardResponse?.data?.error);
      closeDebitCardModal();

    }
    else if (creditCardResponse?.data?.addPaymentResult?.HasNoErrors) {
      setLoading(false);
      toast.success("Payment method added successfully ");
      refetch();
      setCardType("");
      closeDebitCardModal();
      closeDebitCardButton();
    } else if (!creditCardResponse?.data?.addPaymentResult?.HasNoErrors) {
      setLoading(false);
      toast.error(
        creditCardResponse?.data?.addPaymentResult?.Errors[ 0 ].ErrorMessage
      );
      closeDebitCardModal();
    }
  };

  //Preventing space key
  const preventSpace = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };
  const addNewAccount = async () => {
    try {
      setLoading(true);
      let resBankData = await AddACHPaymentAPI(
        addBankValues.accountNickname,
        addBankValues.accountHolder,
        addBankValues.bankRoutingNumber,
        addBankValues.bankAccountNumber,
        accountType,
        checkedAddBank ? 1 : 0
      );

      if (resBankData?.data?.Success) {
        toast.success("Payment method added successfully");
        refetch();
        closeBankAccountButton();
      } else if (
        resBankData?.data?.result === "error" ||
        resBankData?.data?.status === 400
      ) {
        toast.error(resBankData?.data?.error);
      } else if (resBankData?.data?.type === "error") {
        let errorText = resBankData?.data?.text
          ? resBankData?.data?.text
          : resBankData?.data?.error;
        toast.error(errorText);
      } else {
        if (!toast.isActive("closeToast")) {
          toast.error("Adding bank account failed, please try again.");
        }
      }
      closeAddBankModal();
      setLoading(false);
    } catch (error) {
      ErrorLogger(" Error in adding payment method ::", error);
    }
  };
  //  view part
  return (
    <div className={loading ? classes.loadingOn : classes.loadingOff} data-testid="profile-payment-method">
      <div
        className={paymentMethodDiv ? "showContent" : "hideContent"}
      >
        <Grid item xs={12} className={classes.paymentBody}>
          {allPaymentMethod ? (allPaymentMethod?.data?.paymentOptions?.length > 0 ? (
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell width="40%" align="left" className="rowFont">
                      Account / Card
                    </TableCell>
                    <TableCell
                      width="20%"
                      align="left"
                      className="paddingLeftZero rowFont"
                    >
                      Account Type
                    </TableCell>
                    <TableCell
                      width="20%"
                      align="left"
                      className="paddingLeftZero rowFont"
                    >
                      Set As Default
                    </TableCell>
                    <TableCell width="20%" align="left" className="rowFont">
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allPaymentMethod?.data?.paymentOptions.map((row) => (
                    <TableRow
                      hover
                      key={Math.random() * 1000}
                      className="rowProps"
                      height="80px"
                    >
                      <TableCell
                        align="left"
                        className={classes.nameList}
                      >
                        <span
                          className={`posRelativeWidthAuto ${ classes.nickName }`}
                        >
                          {row.AccountType ? (
                            <AccountBalanceIcon />
                          ) : (
                            <PaymentIcon />
                          )}
                        </span>
                        <span>{row.OwnerName}</span>
                        {row.AccountType ? <br /> : null}
                        <span>
                          {" "}
                          {row.AccountType ? "(" + row.Nickname + ")" : ""}
                        </span>
                      </TableCell>

                      <TableCell
                        align="left"
                        className={classes.accountTypeColumn}
                      >
                        {row.AccountType ? row.AccountType : row.CardType}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.accountDefaultColumn}
                      >
                        <Radio
                          name={row.name}
                          label="Set as Default"
                          onChange={() => {
                            setDefaultPaymentOnChange(row.Nickname);
                          }}
                          checked={allPaymentMethod?.data?.defaultBank}
                          radiolabel={'[{ "value":"' + row.Nickname + '"}]'}
                          value={allPaymentMethod?.data?.defaultBank}
                          className={classes.defaultRadio}
                        />
                      </TableCell>

                      <TableCell align="left">
                        <DeleteIcon
                          className={`${ classes.deleteCard } ${ scheduledAccountNo ===
                            (row.AccountNumber
                              ? row.AccountNumber
                              : ""
                            ).slice(-4) ||
                            scheduledAccountNo ===
                            (row.LastFour
                              ? row.LastFour
                              : ""
                            ).slice(-4) ||
                            autoPayAccountNo ===
                            (row.AccountNumber
                              ? row.AccountNumber
                              : ""
                            ).slice(-4)
                            ? classes.loadingOn
                            : classes.loadingOff
                            } `}
                          onClick={() => {
                            setDeleteID(
                              row?.AccountType
                                ? row.SequenceNumber
                                : row.ProfileId
                            );
                            setDeleteType(row?.AccountType ? "bank" : "card");
                            handleDeleteConfirmOpen();
                          }}
                        />
                        <ArrowForwardIcon
                          className={classes.deleteCardArrow}
                          onClick={() => {
                            setLoading(true);
                            onClickEditCard(row);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : allPaymentMethod?.data?.message ? (
            <Grid
              className={`circleprog ${ classes.paymentMessage }`}
              item
              xs={12}
            >
              <Typography>{allPaymentMethod?.data?.message}</Typography>
            </Grid>
          ) : (
            <Grid
              className={`circleprog ${ classes.paymentMessage }`}
              item
              xs={12}
            >
              <Typography>No Payment methods available</Typography>
            </Grid>
          )
          ) : (
            <Grid
              className={`circleprog ${ classes.loaderWidth }`}
            >
              <CircularProgress />
            </Grid>
          )}

          <Grid>
            <p className={classes.bottomTestStyle}>
              Setting an account as your default does not automatically
              discontinue recurring payments for another account.
            </p>
          </Grid>

          <Grid id="paymentMethodBtnWrap" className={classes.paymentMethodWrap}>
            <Grid id="addBankAccountbutton-grid">
              <ButtonPrimary
                stylebutton='{"marginLeft": "","fontSize":""}'
                styleicon='{ "color":"" }'
                id="addBankAccount_button"
                data-testid="add-new-account-number"
                onClick={() => {
                  setEditMode(false);
                  setRoutingError("");
                  addBankAccountButton();
                }}
              >
                Add Bank Account
              </ButtonPrimary>
            </Grid>

            <Grid
              id="addDebitCardbutton-grid"
              className={classes.debitCardAddButton}
            >
              <ButtonPrimary
                stylebutton='{"background": "", "float":"" }'
                styleicon='{ "color":"" }'
                id="addDebitCard_button"
                data-testid="add-new-debit-card"
                onClick={() => {
                  setSameAsMailAddress(true);
                  setValidZip(true);
                  setEditMode(false);
                  setCardType(false);
                  addDebitCardButton();
                }}
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

      <div className={addBankAccount ? "showContent" : "hideContent"} data-testid="add-new-bank-account-container">
        <form onSubmit={formikAddBankAccount.handleSubmit}>
          <Grid
            id="addAccountGrid"
            spacing={4}
            container
            className={classes.paymentBody}
          >
            <Grid
              item
              xs={12}
              className={editMode ? classes.hideSection : classes.showSection}
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
                  onClick={handleMenuProfile}
                  className={classes.profileLink}
                >
                  Profile settings
                </Link>
                <Link
                  className={classes.paymentLink}
                  onClick={() => closeBankAccountButton()}
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
                disabled={editMode}
                placeholder="Enter your Account Nickname "
                materialProps={{ maxLength: "30" }}
                onChange={(event) => addBankOnChange(event, 1)}
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
              className={classes.fullWidth}
              container
              direction="row"
            >
              <TextField
                id="accountHolder"
                name="accountHolder"
                disabled={editMode}
                label="Name of Account Holder"
                placeholder="Enter the Account Holder Name"
                materialProps={{ maxLength: "30" }}
                value={formikAddBankAccount.values.accountHolder}
                onChange={(event) => addBankOnChange(event, 1)}
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
                radiolabel='[{"label":"Savings", "value":"Savings"},{"label":"Checking", "value":"Checking"}]'
                checked={accountType}
                onClick={(event) => {
                  setAccountType(event);
                }}
                row={true}
                disabled={editMode}
                labelplacement={"end"}
                style={{ fontWeight: "normal" }}
              />
              <FormHelperText error={true}>
                {!accountType ? "Account type required" : ""}
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
                disabled={editMode}
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
                value={formikAddBankAccount.values.bankRoutingNumber}
                onBlur={async (event) => {
                  if (
                    event.target.value !== "" &&
                    event.target.value.length === 9
                  ) {
                    let bankName = await BankNameLookup(event.target.value);
                    formikAddBankAccount.setFieldValue("bankName", bankName);
                    setRoutingError(bankName ? "" : globalMessages.Enter_Valid_Routing_No);
                    formikAddBankAccount.handleBlur(event);
                  }
                }}
                onChange={(event) => validateCardAndAccountNumber(event, 1)}
                error={
                  (formikAddBankAccount.touched.bankRoutingNumber &&
                    Boolean(formikAddBankAccount.errors.bankRoutingNumber)) ||
                  (!routingError ? false : true)
                }
                helperText={
                  routingError
                    ? routingError
                    : formikAddBankAccount.touched.bankRoutingNumber &&
                    formikAddBankAccount.errors.bankRoutingNumber
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
                value={formikAddBankAccount.values.bankName}
                onBlur={formikAddBankAccount.handleBlur}
                onChange={(event) => addBankOnChange(event, 1)}
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
              className={classes.fullWidth}
              container
              direction="row"
            >
              <TextField
                id="bankAccountNumber"
                name="bankAccountNumber"
                label="Bank Account Number"
                placeholder="Bank Account Number"
                disabled={editMode}
                materialProps={{ maxLength: "16" }}
                onKeyDown={preventSpace}
                value={formikAddBankAccount.values.bankAccountNumber}
                onChange={(event) => validateCardAndAccountNumber(event, 1)}
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
            <Grid
              item
              xs={12}
              className={editMode ? classes.hideSection : classes.showSection}
            >
              <Checkbox
                name="addBankSetDefault"
                label="Set as Default"
                labelid="setDefault"
                stylelabelform='{ "paddingTop":"0px" }'
                stylecheckbox='{ "color":"#0F4EB3", "marginLeft":"7px","paddingRight":"15px" }'
                stylecheckboxlabel='{ "color":"" }'
                required={true}
                value={checkedAddBank}
                checked={checkedAddBank}
                disabled={editMode}
                materialProps={{ "data-testid": "add-bank-default-checkbox" }}
                onChange={(event) => {
                  setCheckedAddBank(event.target.checked);
                }}
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
                  {editMode ? "Back" : "Cancel"}
                </ButtonSecondary>
              </Grid>

              <Grid
                id="addDebitCardbutton-grid"
                className={editMode ? classes.hideSection : classes.showSection}
              >
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

                <IconButton
                  id="addBankModalClose"
                  aria-label="close"
                  className={classes.closeButton}
                  onClick={closeAddBankModal}
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
                  disabled={loading}
                  stylebutton='{"background": "", "color":"" }'
                  onClick={closeAddBankModal}
                >
                  No
                </ButtonSecondary>
                <ButtonPrimary
                  disabled={loading}
                  stylebutton='{"background": "", "color":"" }'
                  onClick={addNewAccount}
                >
                  Yes
                </ButtonPrimary>
              </DialogActions>
            </Dialog>
          </Grid>
        </form>
      </div>

      {/* *********************************************DEbit card begins*************************************************************************                    */}
      <div className={addDebitCard ? "showContent" : "hideContent"} data-testid="add-new-debit-card-container">
        <form onSubmit={formikAddDebitCard.handleSubmit}>
          <Grid
            spacing={4}
            container
            className={`${ loading ? classes.loadingOn : classes.loadingOff } ${ classes.paymentBody
              }`}
          >
            <Grid
              item
              xs={12}
              className={editMode ? classes.hideSection : classes.showSection}
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
                  onClick={handleMenuProfile}
                  className={classes.profileLink}
                >
                  Profile settings
                </Link>
                <Link
                  className={classes.paymentLink}
                  onClick={() => closeDebitCardButton()}
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
                disabled={editMode}
                onKeyDown={preventSpace}
                value={formikAddDebitCard.values.cardNumber}
                onChange={(event) => validateCardAndAccountNumber(event, 2)}
                // onBlur={formikAddDebitCard.handleBlur}
                onBlur={(event) => {
                  detectCardType(event, event.target.value.trim());
                }}
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
                  (cardType ? cardType : "unknown") +
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
                disabled={editMode}
                value={formikAddDebitCard.values.cardName}
                onChange={(event) => addBankOnChange(event, 2)}
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
                disabled={editMode}
                value={formikAddDebitCard.values.expiryDate}
                onChange={(values) => {
                  formikAddDebitCard.values.expiryDate = values
                  formikAddDebitCard.setFieldValue("expiryDate", values);
                }}
                onBlur={formikAddDebitCard.handleBlur}
                error={
                  formikAddDebitCard.touched.expiryDate &&
                  Boolean(formikAddDebitCard.errors.expiryDate)
                }
                helperText={
                  formikAddDebitCard.touched.expiryDate &&
                  formikAddDebitCard.errors.expiryDate
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
                placeholder="Enter your CVV Number"
                disabled={editMode}
                materialProps={{ maxLength: "3" }}
                value={formikAddDebitCard.values.cvv}
                onChange={(event) => validateCardAndAccountNumber(event, 2)}
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
            <Grid
              className={`${ classes.sameMailAddress } ${ editMode ? classes.hideSection : classes.showSection }`}
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
                value={sameAsMailAddress}
                checked={sameAsMailAddress}
                onChange={(event) => {
                  if (event.target.checked) {
                    formikAddDebitCard.setFieldValue("zipcode", mailingZipcode);
                    formikAddDebitCard.setFieldValue(
                      "streetAddress",
                      mailingStreetAddress
                    );
                    let sendEvent = {
                      target: {
                        value: mailingZipcode,
                      },
                    };
                    fetchAddress(sendEvent);
                  }
                  setSameAsMailAddress(event.target.checked);
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              container
              className={`${ editMode ? classes.hideSection : classes.showSection
                } ${ classes.fullWidth }`}
              direction="row"
            >
              <TextField
                id="streetAddress"
                name="streetAddress"
                label="Street Address"
                placeholder="Enter the street address"
                materialProps={{ maxLength: "30" }}
                value={formikAddDebitCard.values.streetAddress}
                onChange={formikAddDebitCard.handleChange}
                onBlur={formikAddDebitCard.handleBlur}
                disabled={sameAsMailAddress}
                error={
                  formikAddDebitCard.touched.streetAddress &&
                  Boolean(formikAddDebitCard.errors.streetAddress)
                }
                helperText={
                  formikAddDebitCard.touched.streetAddress &&
                  formikAddDebitCard.errors.streetAddress
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              container
              direction="row"
              className={`${ editMode ? classes.hideSection : classes.showSection
                } ${ classes.fullWidth }`}
            >
              <TextField
                id="zipcode"
                name="zipcode"
                label="Zipcode"
                placeholder="Enter the zipcode"
                materialProps={{ maxLength: "5" }}
                disabled={sameAsMailAddress}
                value={formikAddDebitCard.values.zipcode}
                onChange={(event) => getAddressOnChange(event)}
                onBlur={formikAddDebitCard.handleBlur}
                error={
                  (formikAddDebitCard.touched.zipcode &&
                    Boolean(formikAddDebitCard.errors.zipcode)) ||
                  !validZip
                }
                helperText={
                  validZip
                    ? formikAddDebitCard.touched.zipcode &&
                    formikAddDebitCard.errors.zipcode
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
              className={`${ editMode ? classes.hideSection : classes.showSection
                } ${ classes.fullWidth }`}
            >
              <TextField
                id="city"
                name="city"
                label="City"
                placeholder="Enter the city"
                disabled
                materialProps={{ maxLength: "30" }}
                value={formikAddDebitCard.values.city}
                onChange={(event) => addBankOnChange(event, 2)}
                onBlur={formikAddDebitCard.handleBlur}
                error={
                  formikAddDebitCard.touched.city &&
                  Boolean(formikAddDebitCard.errors.city)
                }
                helperText={
                  formikAddDebitCard.touched.city &&
                  formikAddDebitCard.errors.city
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              container
              direction="row"
              className={`${ editMode ? classes.hideSection : classes.showSection
                } ${ classes.fullWidth }`}
            >
              <TextField
                id="state"
                name="state"
                label="State"
                placeholder="Enter the state"
                materialProps={{ maxLength: "30" }}
                value={formikAddDebitCard.values.state}
                disabled
                onChange={(event) => addBankOnChange(event, 2)}
                onBlur={formikAddDebitCard.handleBlur}
                error={
                  formikAddDebitCard.touched.state &&
                  Boolean(formikAddDebitCard.errors.state)
                }
                helperText={
                  formikAddDebitCard.touched.state &&
                  formikAddDebitCard.errors.state
                }
              />
            </Grid>
            <Grid
              item
              sm={4}
              xs={6}
              className={editMode ? classes.hideSection : classes.showSection}
            >
              <Checkbox
                name="setDefault"
                label="Set as Default"
                labelid="setDefault"
                stylelabelform='{ "paddingTop":"0px" }'
                stylecheckbox='{ "color":"#0F4EB3", "marginLeft":"7px","paddingRight":"15px" }'
                stylecheckboxlabel='{ "color":"" }'
                required={true}
                value={checkedDebitCard}
                checked={checkedDebitCard}
                onChange={(event) => {
                  setDefaultAccount(event);
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
                  onClick={() => closeDebitCardButton()}
                >
                  {editMode ? "Back" : "Cancel"}
                </ButtonSecondary>
              </Grid>

              <Grid
                id="addDebitCardbutton-grid"
                className={editMode ? classes.hideSection : classes.showSection}
              >
                <ButtonPrimary
                  stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
                  id="addDebitCard_button"
                  disabled={!validZip}
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

              <IconButton
                id="debitCardModalClose"
                aria-label="close"
                className={classes.closeButton}
                onClick={closeDebitCardModal}
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
                onClick={closeDebitCardModal}
              >
                No
              </ButtonSecondary>
              <ButtonPrimary
                stylebutton='{"background": "", "color":"" }'
                onClick={addCreditCardYes}
                disabled={loading}
              >
                Yes
                <i
                  className="fa fa-refresh fa-spin customSpinner"
                  style={{
                    marginRight: "10px",
                    display: loading ? "block" : "none",
                  }}
                />
              </ButtonPrimary>
            </DialogActions>
          </Dialog>
        </form>
      </div>
      {/* *******************************end debit card************************************************************************ */}

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

      {/* Modal for Bank Routing Number cheque */}
      <Dialog
        id="addBankModal"
        open={confirmDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.deletePayment }}
      >
        <DialogTitle id="debitCardModalHeading">

          <IconButton
            id="debitCardModalClose"
            aria-label="close"
            className={classes.closeButton}
            onClick={handleDeleteConfirmClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent >
          <Typography id="deleteTxt" className={classes.dialogHeading}>
            Are you sure you want to delete this payment method?
          </Typography>
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
          <ButtonSecondary
            stylebutton='{"background": "", "color":"" }'
            onClick={handleDeleteConfirmClose}
          >
            No
          </ButtonSecondary>
          <ButtonPrimary
            stylebutton='{"background": "", "color":"" }'
            disabled={loading}
            onClick={() => {
              onClickDelete(deleteType, deleteID);
            }}
          >
            Yes
            <i
              className="fa fa-refresh fa-spin customSpinner"
              style={{
                marginRight: "10px",
                display: loading ? "block" : "none",
              }}
            />
          </ButtonPrimary>
        </DialogActions>
      </Dialog>
    </div>
  );
}
