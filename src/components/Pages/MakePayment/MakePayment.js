import { CircularProgress, FormControlLabel } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import globalMessages from "../../../assets/data/globalMessages.json";
import { useGlobalState } from "../../../contexts/GlobalStateProvider";
import CheckLoginStatus from "../../App/CheckLoginStatus";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import HolidayCalender from "../../Controllers/HolidayCalenderController";
import {
  deleteScheduledPayment, disableAutoPay, enableAutoPay, makePayment, usrPaymentMethods
} from "../../Controllers/PaymentsController";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonWithIcon,
  DatePicker,
  Select,
  TextField
} from "../../FormsUI";
import ScrollToTopOnMount from "../ScrollToTop";
import "./MakePayment.css";
import PaymentOverview from "./PaymentOverview";
import { useStylesMakePayment } from "./Style";

const paymentMaxDate = new Date();
paymentMaxDate.setDate(paymentMaxDate.getDate() + 30);

export default function MakePayment(props) {
  //Material UI css class
  const classes = useStylesMakePayment();
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const accNo = query.get("accNo");
  const [ , setprofileTabNumber ] = useGlobalState();
  const [ paymentMethods, setpaymentMethod ] = useState(null);
  const [ latestLoanData, setlatestLoanData ] = useState(null);
  const [ paymentAmount, setpaymentAmount ] = useState(null);
  const [ open, setOpen ] = useState(false);
  const [ openPayment, setPaymentOpen ] = useState(false);
  const [ openDeleteSchedule, setopenDeleteSchedule ] = useState(false);
  const [ openAutoPay, setAutoPayOpen ] = useState(false);
  const [ card, setcard ] = useState("");
  const [ disabledContent, setdisabledContent ] = useState(false);
  const [ isDebit, setisDebit ] = useState(false);
  const [ accntNo, setaccntNo ] = useState(null);
  const [ paymentDate, setpaymentDate ] = useState(null);
  const [ paymentDatepicker, setpaymentDatepicker ] = useState(null);
  const [ requiredSelect, setrequiredSelect ] = useState("");
  const [ requiredDate, setrequiredDate ] = useState("");
  const [ requiredAmount, setRequiredAmount ] = useState("");
  const [ showCircularProgress, setshowCircularProgress ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ accountDetails ] = useState(null);
  const [ totalPaymentAmount, setTotalPaymentAmount ] = useState(null);
  const [ checkAutoPay, setcheckAutoPay ] = useState(false);
  const [ autopaySubmit, setAutopaySubmit ] = useState(true);
  const [ scheduleDate, setscheduleDate ] = useState(null);
  const [ checkPaymentInformation, setCheckPaymentInformation ] = useState(false);
  const [ activeLoansData, setActiveLoansData ] = useState([]);
  const { isFetching, data: User, refetch } = useQuery('loan-data', usrAccountDetails, {
    refetchOnMount: false
  });
  const { data: payments } = useQuery('payment-method', usrPaymentMethods, {
    refetchOnMount: false
  });
  const { data: holidayCalenderData } = useQuery('holiday-calendar', HolidayCalender, {
    refetchOnMount: false
  });

  //API Request for Payment methods
  async function getPaymentMethods() {
    setpaymentMethod(payments);
    if (payments?.data?.error) {
      if (!toast.isActive("closedApplication")) {
        toast.error("Error retrieving loan information -- Account is Closed");
      }
    } else {
      //get default card
      let defaultBank = payments?.data?.defaultBank;
      let cardFound = await defaultCardCheck(payments?.data?.ACHMethods, "ACH", defaultBank);
      if (!cardFound) {
        //set default card ACHMethods
        defaultCardCheck(payments?.data?.CardMethods, "card", defaultBank);
      }
    }
  }

  //set default card CardMethods
  async function defaultCardCheck(cardData, type, defaultBank) {
    let checkNickName = false;
    cardData
      ? cardData?.length
        ? cardData?.forEach((data) => {
          if (data.Nickname === defaultBank) {
            type === "ACH"
              ? setcard(data.SequenceNumber)
              : setcard(data.ProfileId);
            checkNickName = true;
            return checkNickName;
          }
        })
        : setcard("")
      : setcard("");
    return checkNickName;
  }

  //Enable auto payment
  async function enableAutoPayment(enableAutoPayAccountNo, enableAutoPayCard, enableAutoPayDate, enableAutoPayIsDebit) {
    let result = await enableAutoPay(enableAutoPayAccountNo, enableAutoPayCard, enableAutoPayDate, enableAutoPayIsDebit);
    result.status === 200
      ? result?.data?.paymentResult.HasNoErrors === true
        ? toast.success(globalMessages.Auto_Payment_Mode_Enabled, {
          autoClose: 5000,
        })
        : toast.error(globalMessages.Failed_Payment_mode, {
          autoClose: 5000,

        })
      : toast.error(
        result?.data?.message
          ? result?.data?.message
          : globalMessages.Failed_Payment_mode,
        {
          autoClose: 5000,
        }
      );

    hasSchedulePayment
      ? result.status === 900
        ? deleteSchedule(accntNo, routingNumber)
        : refetch()
      : refetch();
  }
  //Disable auto payment
  async function disableAutoPayment(disableAutoPayAccountNo) {
    let result = await disableAutoPay(disableAutoPayAccountNo);
    result.status === 200
      ? result?.data?.deletePayment.HasNoErrors === true
        ? toast.success(globalMessages.Auto_Payment_Mode_Disabled, {
          autoClose: 5000,
        })
        : toast.error(globalMessages.Failed_Payment_mode, {
          autoClose: 5000,
        })
      : toast.error(
        result?.data?.message
          ? result?.data?.message
          : "Failed Payment mode",
        {
          autoClose: 5000,
        }
      );
    result?.data?.deletePayment.HasNoErrors && refetch();
  }

  //Enable scheduled payment
  async function makeuserPayment(scheduledPaymentAccountNo, scheduledPaymentCard, scheduledPaymentDatePicker, scheduledPaymentIsDebit, scheduledPaymentAmount, RemoveScheduledPayment) {
    setPaymentOpen(false);
    let result = await makePayment(scheduledPaymentAccountNo, scheduledPaymentCard, scheduledPaymentDatePicker, scheduledPaymentIsDebit, scheduledPaymentAmount, RemoveScheduledPayment);
    let message =
      paymentDatepicker === Moment().format("YYYY/MM/DD") ? globalMessages.We_Received_Your_Payment_Successfully : globalMessages.Payment_has_Scheduled + " Confirmation: " + result?.data?.paymentResult?.ReferenceNumber;
    result.status === 200
      ? result?.data?.paymentResult?.PaymentCompleted !== undefined ? toast.success(message, { autoClose: 5000, }) && refetch() : toast.error(globalMessages.Failed_Payment_mode, { autoClose: 5000, })
      : toast.error(result?.data?.message ? result?.data?.message : "Failed Payment mode",
        {
          autoClose: 5000,
        }
      );

    result.status === 900
      ? disableAutoPaymentScheduled(accntNo, card, paymentDate, isDebit)
      : refetch();
  }

  //Disable scheduled payment
  async function deletePayment(disableScheduledPaymentAccountNo, disableScheduledPaymentRefNo, disableScheduledPaymentIsCard) {
    let result = await deleteScheduledPayment(disableScheduledPaymentAccountNo, disableScheduledPaymentRefNo, disableScheduledPaymentIsCard);
    result.status === 200
      ? result?.data?.deletePaymentMethod.HasNoErrors === true
        ? toast.success("Scheduled Payment cancelled", {
          autoClose: 5000,
        }) && refetch()
        : toast.error(globalMessages.Failed_Payment_mode, {
          autoClose: 5000,
        })
      : toast.error(
        result?.data?.message
          ? result?.data?.message
          : "Failed Payment mode",
        {
          autoClose: 5000,
        }
      );
  }

  // Disable auto payment while make payment
  const handleMenuPaymentProfile = () => {
    navigate("/customers/myProfile");
    setprofileTabNumber({ profileTabNumber: 3 });
  };

  // Disable Sheduled payment while make recuiring payment
  async function deleteSchedule(deleteScheduleAccNo, deleteScheduleRefNo) {
    await deleteScheduledPayment(deleteScheduleAccNo, deleteScheduleRefNo);
    refetch();
  }

  //Validating ACCNO
  async function checkaccNo(checkAccNoActiveLoansData, checkAccNo) {
    let check = false;
    checkAccNoActiveLoansData?.forEach((data) => {
      if (data?.loanData?.accountNumber === checkAccNo) {
        let loan = [];
        loan.push(data);
        setlatestLoanData(loan);
        setpaymentAmount(
          checkAccNoActiveLoansData?.length
            ? data != null
              ? (
                Math.abs(
                  data?.loanPaymentInformation?.accountDetails
                    ?.RegularPaymentAmount
                ) +
                Math.abs(
                  data?.loanPaymentInformation?.accountDetails?.InterestRate
                ) +
                Math.abs(
                  data?.loanPaymentInformation?.accountDetails
                    ?.LoanFeesAndCharges
                )
              ).toFixed(2)
              : null
            : null
        );
        setTotalPaymentAmount(
          checkAccNoActiveLoansData?.length
            ? data != null
              ? (
                Math.abs(
                  data?.loanPaymentInformation?.accountDetails
                    ?.RegularPaymentAmount
                ) +
                Math.abs(
                  data?.loanPaymentInformation?.accountDetails?.InterestRate
                ) +
                Math.abs(
                  data?.loanPaymentInformation?.accountDetails
                    ?.LoanFeesAndCharges
                )
              ).toFixed(2)
              : null
            : null
        );
        setaccntNo(
          checkAccNoActiveLoansData?.length
            ? data != null
              ? data.loanData?.accountNumber
              : null
            : null
        );
        getPaymentMethods();
        setdisabledContent(
          checkAccNoActiveLoansData?.length
            ? data != null
              ? data?.loanPaymentInformation?.appRecurringACHPayment
                ? true
                : false
              : false
            : false
        );
        setcheckAutoPay(
          checkAccNoActiveLoansData?.length
            ? data != null
              ? data?.loanPaymentInformation?.appRecurringACHPayment
                ? true
                : false
              : false
            : false
        );
        setpaymentDate(
          checkAccNoActiveLoansData?.length
            ? data != null
              ? Moment(
                data?.loanPaymentInformation?.accountDetails?.NextDueDate
              ).format("YYYY-MM-DD")
              : "NONE"
            : "NONE"
        );
        let scheduledDate = checkAccNoActiveLoansData?.length
          ? data?.loanPaymentInformation?.hasScheduledPayment
            ? Moment(
              data?.loanPaymentInformation?.scheduledPayments[ 0 ]?.PaymentDate
            ).format("MM/DD/YYYY")
            : null
          : null;
        setpaymentDatepicker(scheduledDate ? scheduledDate : new Date());
        setscheduleDate(scheduledDate);
        setLoading(false);
        setAutopaySubmit(true);
        setshowCircularProgress(isFetching);
        setCheckPaymentInformation(
          data?.loanPaymentInformation?.errorMessage ? true : false
        );
        check = true;
        return check;
      }
    });
    return check;
  }

  //API Request for Account Details
  function getData() {
    setshowCircularProgress(isFetching);
    setActiveLoansData(User?.data?.activeLoans);
    let hasSchedulePaymentActive = activeLoansData != null ? activeLoansData.length ? activeLoansData[ 0 ]?.loanPaymentInformation?.hasScheduledPayment : false : false;
    if (accNo && activeLoansData) {
      let res = checkaccNo(activeLoansData, accNo);
      // if accno is not Valid
      if (res === false) {
        toast.error(globalMessages.Invalid_Account_Number, { autoClose: 5000, });
        navigate("/customers/accountoverview");
      }
    } else {
      let schedulePaymentAmount = activeLoansData != null ? activeLoansData.length ? activeLoansData[ 0 ]?.loanPaymentInformation?.scheduledPayments[ 0 ]?.PaymentAmount : false : false;
      setlatestLoanData(activeLoansData?.slice(0, 1) ?? null);
      let latestLoan = activeLoansData?.slice(0, 1) ?? null;

      setpaymentAmount(
        activeLoansData?.length
          ? hasSchedulePaymentActive != false
            ? schedulePaymentAmount.toFixed(2)
            : (
              Math.abs(
                latestLoan[ 0 ]?.loanPaymentInformation?.accountDetails
                  ?.RegularPaymentAmount
              ) +
              Math.abs(
                latestLoan[ 0 ]?.loanPaymentInformation?.accountDetails
                  ?.InterestRate
              ) +
              Math.abs(
                latestLoan[ 0 ]?.loanPaymentInformation?.accountDetails
                  ?.LoanFeesAndCharges
              )
            ).toFixed(2)
          : null
      );
      setTotalPaymentAmount(
        activeLoansData?.length
          ? latestLoan != null
            ? (
              Math.abs(
                latestLoan[ 0 ]?.loanPaymentInformation?.accountDetails
                  ?.RegularPaymentAmount
              ) +
              Math.abs(
                latestLoan[ 0 ]?.loanPaymentInformation?.accountDetails
                  ?.InterestRate
              ) +
              Math.abs(
                latestLoan[ 0 ]?.loanPaymentInformation?.accountDetails
                  ?.LoanFeesAndCharges
              )
            ).toFixed(2)
            : null
          : null
      );
      setaccntNo(
        activeLoansData?.length
          ? latestLoan != null
            ? latestLoan[ 0 ].loanData.accountNumber
            : null
          : null
      );
      getPaymentMethods();
      setdisabledContent(
        activeLoansData?.length
          ? latestLoan != null
            ? latestLoan[ 0 ]?.loanPaymentInformation?.appRecurringACHPayment
              ? true
              : false
            : false
          : false
      );
      setcheckAutoPay(
        activeLoansData?.length
          ? latestLoan != null
            ? latestLoan[ 0 ]?.loanPaymentInformation?.appRecurringACHPayment
              ? true
              : false
            : false
          : false
      );
      setpaymentDate(
        activeLoansData?.length
          ? latestLoan != null
            ? Moment(
              latestLoan[ 0 ]?.loanPaymentInformation?.accountDetails
                ?.NextDueDate
            ).format("YYYY-MM-DD")
            : "NONE"
          : "NONE"
      );
      let scheduledDate = latestLoan?.length
        ? latestLoan[ 0 ]?.loanPaymentInformation?.hasScheduledPayment
          ? Moment(
            latestLoan[ 0 ]?.loanPaymentInformation?.scheduledPayments[ 0 ]
              ?.PaymentDate
          ).format("MM/DD/YYYY")
          : null
        : null;
      setpaymentDatepicker(scheduledDate ? scheduledDate : new Date());
      setscheduleDate(scheduledDate);
      setLoading(false);
      setAutopaySubmit(true);
      setshowCircularProgress(isFetching);
      setCheckPaymentInformation(
        activeLoansData?.length
          ? latestLoan != null
            ? latestLoan[ 0 ]?.loanPaymentInformation?.errorMessage ? true : false
            : null
          : null
      );
    }
  }

  useEffect(() => {
    getData();
    getPaymentMethods();
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ User, activeLoansData, isFetching, payments ]);

  //Holiday Calender from API
  // let holidayCalenderData = holidayCalenderApi?.data;

  //Account select payment options
  let paymentData = paymentMethods?.data;
  let paymentListAch =
    paymentData && paymentData.ACHMethods != null
      ? paymentData.ACHMethods.map((pdata) => ({
        value: pdata.SequenceNumber,
        label:
          pdata.AccountType + " (" + pdata.Nickname + ") (****" + pdata.AccountNumber.substr(-4) + ")",
      }))
      : null;
  let paymentListCard =
    paymentData && paymentData.ACHMethods != null
      ? paymentData.CardMethods.map((pdata) => ({
        value: pdata.ProfileId,
        label: pdata.CardType + " (" + pdata.OwnerName + ") (****" + pdata.LastFour + ")",
      }))
      : null;

  const paymentOptions =
    paymentListAch != null
      ? JSON.stringify(paymentListAch.concat(paymentListCard))
      : null;

  //Storing the routingNumber,refNumber and SchedulePayments details
  let hasSchedulePayment =
    latestLoanData != null
      ? latestLoanData.length
        ? latestLoanData[ 0 ]?.loanPaymentInformation?.hasScheduledPayment
        : false
      : false;
  let routingNumber =
    latestLoanData != null
      ? latestLoanData[ 0 ]?.loanPaymentInformation?.scheduledPayments
        ? latestLoanData[ 0 ]?.loanPaymentInformation?.scheduledPayments[ 0 ]
          ?.PaymentMethod?.AchInfo != null
          ? latestLoanData[ 0 ].loanPaymentInformation.scheduledPayments[ 0 ]
            .PaymentMethod.AchInfo.RoutingNumber
          : 0
        : 0
      : 0;
  let refNumber =
    latestLoanData != null
      ? latestLoanData[ 0 ]?.loanPaymentInformation?.scheduledPayments
        ? latestLoanData[ 0 ]?.loanPaymentInformation?.scheduledPayments[ 0 ]
          ?.ReferenceNumber != null
          ? latestLoanData[ 0 ].loanPaymentInformation.scheduledPayments[ 0 ]
            .ReferenceNumber
          : 0
        : 0
      : 0;
  let isCard =
    latestLoanData != null
      ? latestLoanData[ 0 ]?.loanPaymentInformation?.scheduledPayments
        ? latestLoanData[ 0 ]?.loanPaymentInformation?.scheduledPayments[ 0 ]
          ?.PaymentMethod?.IsCard === true
          ? latestLoanData[ 0 ].loanPaymentInformation.scheduledPayments[ 0 ]
            .PaymentMethod.IsCard
          : false
        : false
      : false;
  let status = accountDetails != null ? accountDetails.data.status : null;

  //Select account
  const handleChangeSelect = (event) => {
    setcard(event.target.value);
    event.nativeEvent.target.innerText.includes("Checking") ||
      event.nativeEvent.target.innerText.includes("Savings")
      ? setisDebit(false)
      : setisDebit(true); //true
    setrequiredSelect("");
  };

  //Autopay enable/disable switch
  const handleSwitchPayment = (event) => {
    setAutopaySubmit(checkAutoPay === event.target.checked ? true : false);
    setdisabledContent(event.target.checked);
    setpaymentAmount(event.target.checked ? totalPaymentAmount : paymentAmount);
    setpaymentDatepicker(event.target.checked ? scheduleDate : new Date());
  };

  let accountInfo = {};
  let cardLabel = "";
  if ((card) && (paymentListCard?.length)) {
    accountInfo = paymentListCard.find(account => account.value === card);
    cardLabel = accountInfo?.label;
  }
  if ((!cardLabel) && (paymentListAch?.length)) {
    accountInfo = paymentListAch.find(account => account.value === card);
    cardLabel = accountInfo?.label;
  }

  //Autopay submit
  const handleClickSubmit = () => {
    disabledContent === true
      ? card || card === 0
        ? setOpen(true)
        : setrequiredSelect("Please select any accounts")
      : setOpen(true);
  };

  //Autopay popup confirm and close
  function handleAutoPayConfirm() {
    setLoading(true);
    setshowCircularProgress(true);
    disabledContent === true
      ? enableAutoPayment(accntNo, card, paymentDate, isDebit)
      : disableAutoPayment(accntNo);
    setOpen(false);
  }

  const handleCloseAutoPayPopup = () => {
    setOpen(false);
  };

  //Cancel Schedule popup confirm and close
  function handleDeleteSchedule() {
    setLoading(true);
    setshowCircularProgress(true);
    isCard === true
      ? deletePayment(accntNo, refNumber)
      : deletePayment(accntNo, routingNumber);
    setrequiredDate("");
    setRequiredAmount("");
    setrequiredSelect("");
    setpaymentDatepicker(null);
    setopenDeleteSchedule(false);
    refetch();
  }

  const handleDeleteScheduleClose = () => {
    setopenDeleteSchedule(false);
  };

  //Schedule Payment
  const handleSchedulePaymentClick = () => {
    if (card === "") {
      document.getElementById("select").focus();
      setrequiredSelect("Please select any account");
    } else if (paymentAmount === "") {
      document.getElementById("payment").focus();
      setRequiredAmount("Please enter payment amount");
    } else if (paymentAmount < 10) {
      document.getElementById("payment").focus();
      setRequiredAmount("Please enter minimum amount of $10");
    } else if (paymentDatepicker === null) {
      document.getElementById("date").focus();
      setrequiredDate("Please select any date");
    } else {
      setPaymentOpen(true);
    }
  };

  //Cancel Payment
  const handlePaymentcancel = () => {
    setopenDeleteSchedule(true);
  };
  let RemoveScheduledPayment = "yes";
  //Schedule Payment popup confirm and close
  const handleSchedulePaymentSubmit = () => {
    setLoading(true);
    setshowCircularProgress(true);
    makeuserPayment(accntNo, card, paymentDatepicker, isDebit, paymentAmount, RemoveScheduledPayment);
  };

  // Keep Schedule Payment popup confirm and close
  const handleSchedulePaymentSubmitKeep = () => {
    setLoading(true);
    setshowCircularProgress(true);
    RemoveScheduledPayment = "no";
    makeuserPayment(accntNo, card, paymentDatepicker, isDebit, paymentAmount, RemoveScheduledPayment);
  };

  const handlePaymentClose = () => {
    setPaymentOpen(false);
  };

  //AUTO PAY AUTHORIZATION pop up open and close
  const handleAutoPayClickOpen = () => {
    setAutoPayOpen(true);
  };

  const handleAutoPayClose = () => {
    setAutoPayOpen(false);
  };
  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'USD'
    }).format(value);

  //US holidays
  function disableHolidays(date) {
    const holidayApiData = holidayCalenderData?.data?.holidays;
    const holidayApiDataValues = holidayApiData.map((arrVal) => {
      return new Date(arrVal + "T00:00").getTime();
    });
    return (
      date.getDay() === 0 ||
      holidayApiDataValues.includes(date.getTime())
    );
  }

  //Handling payment amount
  const onHandlepaymentAmount = (event) => {
    let price = event.target.value.replace("$", "");
    const reg = /^\d{0,5}(\.\d{0,2})?$/;
    if (price === "" || reg.test(price)) {
      price =
        price.indexOf(".") >= 0
          ? price.substr(0, price.indexOf(".")) +
          price.substr(price.indexOf("."), 3)
          : price;
      setpaymentAmount(price);
      setRequiredAmount("");
    }
  };

  //payment onblur
  const onBlurPayment = (event) => {
    let price = event.target.value.replace("$", "");
    let s = price.split(".");
    let afterDecimal = s[ 1 ];
    if (!afterDecimal) {
      price = event.target.value.replace(".", "");
      price = price.replace("$", "");
      price = Math.abs(price).toFixed(2);
      setpaymentAmount(price);
      setRequiredAmount("");
    }
  };
  let paymentIsScheduled = hasSchedulePayment ? "yes" : "no";
  let chosenDate = new Date(paymentDatepicker);
  let todaysDate = new Date();
  let todaysDay = todaysDate.getDate();
  let todaysMonth = todaysDate.getMonth();
  let todaysYear = todaysDate.getFullYear();
  let chosenDay = chosenDate.getDate();
  let chosenMonth = chosenDate.getMonth();
  let chosenYear = chosenDate.getFullYear();
  let thisDay = new Date(todaysYear, todaysMonth, todaysDay);
  let pickedDate = new Date(chosenYear, chosenMonth, chosenDay);
  let isFutureDate = "no";
  if (pickedDate > thisDay) {
    isFutureDate = "yes";
  }

  //View
  return (
    <div>
      <CheckLoginStatus />
      <ScrollToTopOnMount />
      <Grid
        id="makePaymentWrap"
        container
        justifyContent={ "center" }
        className={ classes.centerGrid }
      >
        <Grid
          style={ { paddingBottom: "10px" } }
          container
          direction="row"
          item
          xs={ 12 }
        >
          <Grid
            item
            xs={ 12 }
            sm={ 6 }
            style={ { width: "100%" } }
            container
            direction="row"
          >
            <Typography className={ classes.heading } variant="h3">
              <NavLink
                to="/customers/accountOverview"
                style={ { textDecoration: "none" } }
              >
                <ButtonWithIcon
                  icon="arrow_backwardIcon"
                  iconposition="left"
                  stylebutton='{"background": "#fff", "color":"#214476",
                        "minWidth": "0px",
                        "width": "36px",
                        "padding": "0px",
                        "marginRight": "5px", "marginTop":"unset" }'
                  styleicon='{ "color":"" }'
                />
              </NavLink>
              Make a Payment
            </Typography>
          </Grid>
        </Grid>
        { showCircularProgress === true ? (
          <Grid
            item
            xs={ 12 }
            style={ { paddingTop: "10px", paddingBottom: "10px" } }
          >
            <TableContainer id="pdfdiv" component={ Paper }>
              <Table className={ classes.table } aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={ classes.tableHead }>
                      { globalMessages.Account_Number }
                    </TableCell>
                    <TableCell className={ classes.tableHead } align="left">
                      { globalMessages.Todays_Payoff }
                    </TableCell>
                    <TableCell className={ classes.tableHead } align="left">
                      { globalMessages.Regular_Amount }
                    </TableCell>
                    <TableCell className={ classes.tableHead } align="left">
                      { globalMessages.Loan_Fees }
                    </TableCell>
                    <TableCell className={ classes.tableHead } align="left">
                      { globalMessages.Total }
                    </TableCell>
                    <TableCell className={ classes.tableHead } align="left">
                      { globalMessages.Next_Due_Date }
                    </TableCell>
                    <TableCell className={ classes.tableHead } align="left">
                      { globalMessages.Scheduled_Payment }
                    </TableCell>
                    <TableCell className={ classes.tableHead } align="left">
                      { globalMessages.Auto_Pay }
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan="8" align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ) : (
          <Grid
            item
            xs={ 12 }
            style={ { paddingBottom: "10px", paddingTop: "10px" } }
          >
            <TableContainer component={ Paper }>
              <PaymentOverview overview={ latestLoanData } status={ status } />
            </TableContainer>
          </Grid>
        ) }
        { latestLoanData != null ? (
          latestLoanData.length ? (
            !paymentData?.data?.error ? (
              !checkPaymentInformation ? (
                <>
                  <Grid
                    id="payFromWrap"
                    item
                    xs={ 12 }
                    sm={ 5 }
                    style={ {
                      width: "100%",
                      paddingTop: "10px",
                      paddingRight: "15px",
                    } }
                  >
                    <Paper
                      style={ { borderRadius: "2px" } }
                      className={ classes.paper }
                    >
                      <Typography className={ classes.cardHeading }>
                        Pay From
                      </Typography>
                      { paymentOptions != null ? (
                        <Select
                          id="select"
                          name="select"
                          labelform="Accounts"
                          select={ paymentOptions }
                          onChange={ handleChangeSelect }
                          value={ card }
                        />
                      ) : (
                        <div
                          style={ { display: "flex", justifyContent: "center" } }
                        >
                          <CircularProgress size={ 30 } />
                        </div>
                      ) }
                      <p
                        className={
                          requiredSelect !== ""
                            ? "showError add Pad"
                            : "hideError"
                        }
                        data-testid="subtitle"
                      >
                        { " " }
                        { requiredSelect }.
                      </p>

                      <Grid item xs={ 12 } style={ { paddingTop: "20px" } }>
                        <ButtonSecondary
                          stylebutton='{"background": "", "color":"" }'
                          onClick={ handleMenuPaymentProfile }
                        >
                          Add a payment method
                        </ButtonSecondary>
                      </Grid>
                    </Paper>
                  </Grid>

                  <Grid
                    item
                    xs={ 12 }
                    sm={ 7 }
                    style={ { width: "100%", paddingTop: "10px" } }
                  >
                    <Paper className={ classes.paper }>
                      { paymentOptions !== null &&
                        showCircularProgress !== true ? (
                        <div>
                          <Grid item xs={ 12 }>
                            <Typography
                              style={ { paddingBottom: "10px" } }
                              className={ classes.cardHeading }
                            >
                              Payment Mode
                            </Typography>
                            <p style={ { margin: "auto" } }>
                              <small
                                style={ {
                                  fontSize: "0.938rem",
                                  color: "#595959",
                                } }
                              >
                                { " " }
                                { disabledContent
                                  ? "Auto Pay - On"
                                  : "Auto Pay - Off" }
                              </small>
                            </p>
                            <p style={ { margin: "auto" } }>
                              <small style={ { color: "#575757" } }>
                                Choose auto pay
                              </small>
                            </p>
                            <FormControlLabel
                              id="autoPaySpan"
                              control={
                                <Switch
                                  checked={ disabledContent }
                                  onChange={ handleSwitchPayment }
                                  value={ disabledContent }
                                  inputProps={ { "data-test-id": "switch" } }
                                  color="primary"
                                />
                              }
                              labelPlacement="end"
                              label={
                                disabledContent
                                  ? "Auto pay is On"
                                  : "Auto pay is Off"
                              }
                            />
                            <p style={ { fontSize: "0.938rem" } }>
                              By enabling Auto Pay mode, I acknowledge to have
                              read, understood, and agree to the terms of the
                              &nbsp;
                              <Link
                                to="#"
                                onClick={ handleAutoPayClickOpen }
                                className={ classes.autoPayLink }
                              >
                                Auto Pay Authorization
                              </Link>
                            </p>
                            <Grid
                              item
                              xs={ 12 }
                              style={ { paddingBottom: "20px" } }
                            >
                              <ButtonPrimary
                                stylebutton='{"background": "", "color":"" }'
                                id="submitBtn"
                                onClick={ handleClickSubmit }
                                disabled={ autopaySubmit }
                              >
                                Submit
                              </ButtonPrimary>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={ 12 }
                          >
                            <Typography
                              style={ { paddingBottom: "10px" } }
                              className={ classes.cardHeading }
                            >
                              Single Payment
                            </Typography>
                            <TextField
                              id="payment"
                              name="payment"
                              label="Payment Amount"
                              type="text"
                              autoComplete="off"
                              onChange={ onHandlepaymentAmount }
                              value={ "$" + paymentAmount }
                              onBlur={ onBlurPayment }
                            />
                            <p
                              className={
                                requiredAmount !== ""
                                  ? "showError add Pad"
                                  : "hideError"
                              }
                              data-testid="subtitle"
                            >
                              { " " }
                              { requiredAmount }
                            </p>
                            <Grid
                              item
                              xs={ 12 }
                              container
                              direction="row"
                              style={ {
                                display: "inline-flex",
                                paddingTop: "10px",
                              } }
                            >
                              <DatePicker
                                name="date"
                                label="Payment Date"
                                placeholder="MM/DD/YYYY"
                                id="date"
                                disablePast
                                autoComplete="off"
                                maxdate={ paymentMaxDate }
                                shouldDisableDate={ disableHolidays }
                                minyear={ 4 }
                                onChange={ (paymentDatepickerOnChange) => {
                                  setpaymentDatepicker(
                                    Moment(paymentDatepickerOnChange).format(
                                      "YYYY/MM/DD"
                                    )
                                  );
                                  setrequiredDate("");
                                } }
                                value={ paymentDatepicker }
                              />
                              <p
                                className={
                                  requiredDate !== ""
                                    ? "showError add Pad"
                                    : "hideError"
                                }
                                data-testid="subtitle"
                              >
                                { " " }
                                { requiredDate }
                              </p>
                            </Grid>
                            <Grid
                              id="paymentBtnWrap"
                              style={ { paddingTop: "25px" } }
                            >
                              <Grid id="make-payment-cancel-button-grid">
                                <ButtonSecondary
                                  stylebutton="{}"
                                  styleicon='{ "color":"" }'
                                  id="cancelPaymentBtn"
                                  onClick={ handlePaymentcancel }
                                  disabled={ !hasSchedulePayment }
                                >
                                  Cancel Payment
                                </ButtonSecondary>
                              </Grid>
                              <Grid>
                                <ButtonPrimary
                                  stylebutton='{"marginRight": "" }'
                                  id="make-payment-schedule-button"
                                  onClick={ handleSchedulePaymentClick }
                                >
                                  Schedule Payment
                                </ButtonPrimary>
                              </Grid>
                            </Grid>
                          </Grid>
                        </div>
                      ) : (
                        <div
                          style={ { display: "flex", justifyContent: "center" } }
                        >
                          <CircularProgress />
                        </div>
                      ) }
                    </Paper>
                  </Grid>
                </>
              ) : (
                ""
              )
            ) : (
              ""
            )
          ) : (
            ""
          )
        ) : (
          ""
        ) }
        <Grid item xs={ 12 }>
          <p className={ classes.endMessage }>
            { " " }
            <small>
              If you have questions or would like to obtain a payoff balance on
              your loan, please contact your local branch listed on your my
              Branch Page.
            </small>
            <br />
            <small>
              Mariner Finance accepts either ACH Bank Account or Debit Card
              Payments.
            </small>
          </p>
        </Grid>
      </Grid>

      {/* **************Auto pay submit modal******************* */ }

      <Dialog
        id="autopayDialogBox"
        open={ open }
        aria-labelledby="alert-dialog-title-autoPay"
        aria-describedby="alert-dialog-description"
        classes={ { paper: classes.dialogPaper } }
      >
        <DialogTitle id="autopayText">
          <Typography id="autoTxt" className={ classes.dialogHeading }>
            { disabledContent === false
              ? "Are you sure you want to disable auto pay?"
              :
              "Auto Pay Confirmation"
            }
          </Typography>
          {/* <Typography id="autoTxt" className={ classes.autoPayContent }> */ }
          <>
            { disabledContent === true ?
              <TableContainer>
                <Table className={ classes.table } aria-label="simple table" border-color="white">
                  <TableBody>
                    <TableRow>
                      <TableCell className={ classes.tableheadrow } align="left" width="20%">
                      </TableCell>
                      <TableCell className={ classes.tableheadrow } align="left">
                        { disabledContent === false ? "" : "Auto pay Amount: " }
                      </TableCell>
                      <TableCell align="left">
                        { disabledContent === false ? "" : numberFormat(paymentAmount) }
                      </TableCell>
                      <TableCell className={ classes.tableheadrow } align="left">
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={ classes.tableheadrow } align="left" width="20%">
                      </TableCell>
                      <TableCell align="left">
                        { disabledContent === false ? "" : "Bank/Card: " }
                      </TableCell>
                      <TableCell align="left">
                        { disabledContent === false ? "" : cardLabel }
                      </TableCell>
                      <TableCell className={ classes.tableheadrow } align="left">
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={ classes.tableheadrow } align="left" width="20%">
                      </TableCell>
                      <TableCell align="left">
                        { disabledContent === false ? "" : "First Auto Pay Date:  " }
                      </TableCell>
                      <TableCell align="left">
                        { disabledContent === false ? "" : Moment(paymentDate).format("MM/DD/YYYY") }
                      </TableCell>
                      <TableCell className={ classes.tableheadrow } align="left">
                      </TableCell>
                    </TableRow>

                  </TableBody>
                </Table>
              </TableContainer>
              : "" }
            {/* </Typography> */ }
          </>
          <IconButton
            id="autopayCloseBtn"
            aria-label="close"
            className={ classes.closeButton }
            onClick={ handleCloseAutoPayPopup }
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogActions
          style={ { justifyContent: "center", marginBottom: "25px" } }
        >
          <ButtonSecondary
            stylebutton='{"background": "", "color":"" }'
            onClick={ handleCloseAutoPayPopup }
            disabled={ loading }
          >
            Cancel
          </ButtonSecondary>
          <ButtonPrimary
            stylebutton='{"background": "", "color":"" }'
            onClick={ handleAutoPayConfirm }
            disabled={ loading }
          >
            { disabledContent === false ? "Disable Auto Pay" : "Complete Auto Pay Setup" }

            <i
              className="fa fa-refresh fa-spin customSpinner"
              style={ {
                marginRight: "10px",
                color: "blue",
                display: loading ? "block" : "none",
              } }
            />
          </ButtonPrimary>
        </DialogActions>
      </Dialog>

      {/* **************Auto pay schedule payment modal******************* */ }

      <Dialog
        open={ openPayment }
        id="scheduleDialogBox"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={ { paper: classes.dialogPaper } }
      >
        <DialogTitle id="scheduleDialogHeading">
          <Typography id="scheduleTxt" className={ classes.dialogHeading }>
            Your Payment of: { numberFormat(paymentAmount) } will be applied to your account.
          </Typography>
          <TableContainer>
            <Table className={ classes.table } aria-label="simple table" border-color="white">
              <TableBody>
                <TableRow>
                  <TableCell className={ classes.tableheadrow } align="left" width="20%">
                  </TableCell>
                  <TableCell align="left">
                    Bank/Card:
                  </TableCell>
                  <TableCell align="left">
                    { cardLabel }
                  </TableCell>
                  <TableCell className={ classes.tableheadrow } align="left">
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={ classes.tableheadrow } align="left" width="20%">
                  </TableCell>
                  <TableCell align="left">
                    Payment Date:
                  </TableCell>
                  <TableCell align="left">
                    { Moment(paymentDatepicker).format("MM/DD/YYYY") }
                  </TableCell>
                  <TableCell className={ classes.tableheadrow } align="left">
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={ classes.tableheadrow } align="left" width="20%">
                  </TableCell>
                  <TableCell className={ classes.tableheadrow } align="left">
                    Account Number:
                  </TableCell>
                  <TableCell align="left">
                    { accntNo }
                  </TableCell>
                  <TableCell className={ classes.tableheadrow } align="left">
                  </TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </TableContainer>
          <Typography className={ classes.dialogHeading }>
            Are you sure?
          </Typography>
          <IconButton
            aria-label="close"
            className={ classes.closeButton }
            onClick={ handlePaymentClose }
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogActions
          style={ { justifyContent: "center", marginBottom: "25px" } }
        >
          <ButtonSecondary
            stylebutton='{"background": "", "color":"" }'
            onClick={ handlePaymentClose }
          >
            Cancel
          </ButtonSecondary>
          { paymentIsScheduled === "no" ?
            <ButtonPrimary
              stylebutton='{"background": "", "color":"" }'
              onClick={ handleSchedulePaymentSubmit }
              disabled={ loading }
            >
              Ok
              <i
                className="fa fa-refresh fa-spin customSpinner"
                style={ {
                  marginRight: "10px",
                  display: loading ? "block" : "none",
                } }
              />
            </ButtonPrimary>
            :
            "" }

          { paymentIsScheduled === "yes" ?
            <ButtonPrimary
              stylebutton='{"background": "", "color":"" }'
              onClick={ handleSchedulePaymentSubmit }
              disabled={ loading }
            >
              Replace current scheduled payment
              <i
                className="fa fa-refresh fa-spin customSpinner"
                style={ {
                  marginRight: "10px",
                  display: loading ? "block" : "none",
                } }
              />
            </ButtonPrimary> :
            "" }

          { paymentIsScheduled === "yes" && isFutureDate === "no" ?
            <ButtonSecondary
              stylebutton='{"background": "", "color":"" }'
              onClick={ handleSchedulePaymentSubmitKeep }
              disabled={ loading }
            >
              Keep scheduled payment and make this payment
              <i
                className="fa fa-refresh fa-spin customSpinner"
                style={ {
                  marginRight: "10px",
                  display: loading ? "block" : "none",
                } }
              />
            </ButtonSecondary>
            :
            "" }
        </DialogActions>
      </Dialog>

      {/* **************Auto pay schedule payment modal******************* */ }

      <Dialog
        id="deletePayment"
        open={ openDeleteSchedule }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={ { paper: classes.dialogPaper } }
      >
        <DialogTitle id="deleteDialogHeading">
          <Typography id="deleteTxt" className={ classes.dialogHeading }>
            Are you sure you want to delete the scheduled payment ?
          </Typography>
          <IconButton
            id="deleteClose"
            aria-label="close"
            className={ classes.closeButton }
            onClick={ handleDeleteScheduleClose }
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogActions
          style={ { justifyContent: "center", marginBottom: "25px" } }
        >
          <ButtonSecondary
            stylebutton='{"background": "", "color":"" }'
            onClick={ handleDeleteScheduleClose }
          >
            No
          </ButtonSecondary>
          <ButtonPrimary
            stylebutton='{"background": "", "color":"" }'
            onClick={ handleDeleteSchedule }
            disabled={ loading }
          >
            Yes
            <i
              className="fa fa-refresh fa-spin customSpinner"
              style={ {
                marginRight: "10px",
                display: loading ? "block" : "none",
              } }
            />
          </ButtonPrimary>
        </DialogActions>
      </Dialog>

      {/* **************Auto pay terms & condition modal******************* */ }

      <Dialog
        open={ openAutoPay }
        onClose={ handleAutoPayClose }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          AUTO PAY AUTHORIZATION
        </DialogTitle>
        <DialogContent>

          <p className={ classes.autoPayContent }>
            As used in this authorization, the words, “I,” “MY,” and “ME”
            refer to the borrower agreeing to the terms of this authorization,
            and the word “YOU” refers to Mariner Finance, LLC (and its
            subsidiaries and affiliates) (collectively “Lender”).
          </p>
          <p className={ classes.autoPayContent }>
            I hereby authorize and direct Lender to initiate periodic debit
            entries for my scheduled loan payments from the bank account
            information provided to Lender. I agree that debit entries will be
            made on my scheduled due date (as specified in my loan documents).
            Changes made to my account or banking information must be received
            by Lender at least three (3) business days prior to the payment
            due date.
          </p>
          <p className={ classes.autoPayContent }>
            If the first scheduled payment is an extended due date payment,
            then the first drafted payment amount may differ from the
            contractually agreed upon amount due each month. If any scheduled
            debit amount is greater than the outstanding balance of the loan,
            the scheduled payment will be debited in full and a check in the
            amount of the overpayment will be issued and mailed to me.
          </p>
          <p className={ classes.autoPayContent }>
            Lender may cancel my automatic payment enrollment if any automatic
            payment is returned unpaid by my financial institution. Lender may
            also cancel the automatic payment service for any reason and will
            notify me if such an action takes place. The automatic payment
            amount will only be reduced or canceled to avoid creating a credit
            balance on the account.
          </p>
          <p className={ classes.autoPayContent }>
            Further, I understand and agree that if my account at the
            depository financial institution provided does not have sufficient
            funds to make my loan payment, Lender will not be responsible or
            liable for any penalties or charges assessed by any other
            financial institution as a result of such insufficiency. I
            acknowledge that, in the event Lender’s additional attempts to
            collect my payment via EFT‐ACH are unsuccessful, I must make my
            loan payment by other means. I understand that a fee may be
            assessed by Lender in accordance with the terms of my loan
            agreement as a result of my account at the depository financial
            institution listed below having insufficient funds.
          </p>
          <p className={ classes.autoPayContent }>
            Termination: I have the right to stop payment of preauthorized
            transfers from my account by notifying Lender, verbally or in
            writing at the mailing address or email address noted below; any
            such notification must be received by Lender at any time up to
            three (3) business days before the scheduled date of the transfer.
            If the debit item is resubmitted, Lender must continue to honor
            the stop payment order.
          </p>
          <p className={ classes.autoPayContent }>
            I may terminate this authorization at any time (i) through the
            Customer Account Center; (ii) by providing written notice to
            Lender at Mariner Finance, LLC, 8211 Town Center Drive,
            Nottingham, MD 21236, Attn: Servicing; or (iii) by providing
            written notice to the following email address:{ " " }
            <a href="mailto:recurringpymtoptout@marinerfinance.com">
              recurringpymtoptout@marinerfinance.com
            </a>
            .
          </p>
          <p className={ classes.autoPayContent }>
            This authorization will remain in effect until the underlying
            obligation to you is satisfied OR you receive written notification
            from me of termination of this authorization and you have
            reasonable time to act upon it, whichever comes first.
          </p>
        </DialogContent>
        <DialogActions>
          <ButtonPrimary
            stylebutton='{"background": "", "color":"" }'
            onClick={ handleAutoPayClose }
          >
            Ok
          </ButtonPrimary>
        </DialogActions>
      </Dialog>
    </div>
  );
}
