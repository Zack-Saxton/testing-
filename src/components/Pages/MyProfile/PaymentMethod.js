import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import PaymentIcon from "@mui/icons-material/Payment";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  setDefaultPayment
} from "../../Controllers/MyProfileController";
import ZipCodeLookup from "../../Controllers/ZipCodeLookup";
import {
  ButtonPrimary,
  ButtonSecondary,
  Radio,
} from "../../FormsUI";
import ErrorLogger from "../../lib/ErrorLogger";
import { useStylesMyProfile } from "./Style";
import "./Style.css";
import { useAccountOverview } from "../../../hooks/useAccountOverview";
import { usePaymentMethod } from "../../../hooks/usePaymentMethod"
import { bankAccountValidation, debitCardValidation} from "./PaymentMethod/PaymentMethodValidation"
import BankAccountMethod from "./PaymentMethod/BankAccountMethod"
import CreditCardMethod from "./PaymentMethod/CreditCardMethod"

//Yup validations for Add Bank Account


export default function PaymentMethod() {
  const classes = useStylesMyProfile();
  const navigate = useNavigate();
  const [ addBankAccount, setAddBankAccount ] = useState(false);
  const [ addDebitCard, setAddDebitCard ] = useState(false);
  const [ paymentMethodDiv, setPaymentMethodDiv ] = useState(true);
  const [ accountType, setAccountType ] = useState("");
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
  const { data: accountDetails } = useAccountOverview();
  const { data: allPaymentMethod, refetch } = usePaymentMethod();
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
    validationSchema: bankAccountValidation(),
    enableReinitialize: true,
    onSubmit: (values) => {
      if(accountType){
        setAddBankModal(true);
        setAddBankValues(values);      
      }
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
    validationSchema: debitCardValidation(),
    onSubmit: async (_values) => {
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
      setValidZip(false);
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
    if (res?.data?.Success === globalMessages.Default_Payment_Method_Set + nickname) {
      refetch();
      setLoading(false);
      toast.success(res?.data?.Success);
    } else {
      setLoading(false);
      toast.error(globalMessages.Default_Payment_Update_Failed);
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
              toast.success(globalMessages.Card_Deleted_Successfully);
              refetch();
            }
            closeDeleteConfirmBox();
          } else {
            if (!toast.isActive("closeToast")) {
              toast.error(globalMessages.Error_Deleting_Card);
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
              toast.success(globalMessages.Bank_Account_Deleted_Success);
            }
            refetch();
            closeDeleteConfirmBox();
          } else {
            if (!toast.isActive("closeToast")) {
              toast.error(globalMessages.Error_Deleting_Bank_Account);
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
      ErrorLogger(globalMessages.Error_Deleting_Payment_Method , error);
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
      toast.success(globalMessages.Payment_Method_Added_Success);
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

  const removeSpace = (event, name, type) => {
    type === 1 ? formikAddBankAccount.setFieldValue(name, event.target.value.trim()) : formikAddDebitCard.setFieldValue(name, event.target.value.trim());
  }

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
        toast.success(globalMessages.Payment_Method_Added_Success);
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
          toast.error(globalMessages.Adding_Bank_Failed);
        }
      }
      closeAddBankModal();
      setLoading(false);
    } catch (error) {
      ErrorLogger(globalMessages.Error_Adding_Payment_Method, error);
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
                  {allPaymentMethod?.data?.paymentOptions.map((row, index) => (
                    <TableRow
                      hover
                      key={`payment-methods-${index}`}
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
            <p className={classes.smallText}>
              *You cannot delete payment methods if you have an auto or future dated payment scheduled.
            </p>
            <p className={classes.smallText}>
              Mariner Finance accepts either ACH bank account or debit card payments via the Customer Account Center.
              You may set either of these methods as your default payment method. Please note that in states other than MD, 
              SC, VA, and WI, each one-time debit card payment will incur a $2.50 convenience fee charged by Mariner Finance’s 
              third-party payment processor. One-time and recurring ACH payments are available with no additional chanrge. 
              For other no-charge payment options, please contact your local branch. Recurring payments may only be set up using 
              an ACH bank account payment method.
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
        <BankAccountMethod formikAddBankAccount={formikAddBankAccount} checkedAddBank={checkedAddBank} setCheckedAddBank={setCheckedAddBank} openAddBankModal={openAddBankModal} addBankModal={addBankModal} addNewAccount={addNewAccount} loading={loading} closeAddBankModal={closeAddBankModal} editMode={editMode} handleMenuProfile={handleMenuProfile} closeBankAccountButton={closeBankAccountButton} addBankOnChange={addBankOnChange} validateCardAndAccountNumber={validateCardAndAccountNumber} setAccountType={setAccountType} setRoutingError={setRoutingError} preventSpace={preventSpace} routingError={routingError} accountType={accountType} removeSpace={removeSpace}/>
      </div>

      {/* codex */}

      <div className={addDebitCard ? "showContent" : "hideContent"} data-testid="add-new-debit-card-container">
        <CreditCardMethod formikAddDebitCard={formikAddDebitCard} closeDebitCardModal={closeDebitCardModal} addCreditCardYes={addCreditCardYes} debitCardModal={debitCardModal} mailingStreetAddress={mailingStreetAddress} mailingZipcode={mailingZipcode} detectCardType={detectCardType} editMode={editMode} handleMenuProfile={handleMenuProfile} closeDebitCardButton={closeDebitCardButton} cardType={cardType} removeSpace={removeSpace} setSameAsMailAddress={setSameAsMailAddress} fetchAddress={fetchAddress} getAddressOnChange={getAddressOnChange} setDefaultAccount={setDefaultAccount} addBankOnChange={addBankOnChange} checkedDebitCard={checkedDebitCard} validZip={validZip} openDebitCardModal={openDebitCardModal} validateCardAndAccountNumber={validateCardAndAccountNumber} sameAsMailAddress={sameAsMailAddress} preventSpace={preventSpace}/>
      </div>


      {/* *********************************************DEbit card begins*************************************************************************                    */}

      {/* *******************************end debit card************************************************************************ */}


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
