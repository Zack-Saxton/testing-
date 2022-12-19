import CloseIcon from "@mui/icons-material/Close";
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
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import globalMessages from "../../../assets/data/globalMessages.json";
import { useGlobalState } from "../../../contexts/GlobalStateProvider";
import CheckLoginStatus from "../../App/CheckLoginStatus";
import { formatDate } from "../../Controllers/BranchDayTiming";
import {
  deleteScheduledPayment,
  disableAutoPay,
  enableAutoPay,
  makePayment,
} from "../../Controllers/PaymentsController";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonWithIcon,
  DatePicker,
  Select,
  TextField,
} from "../../FormsUI";
import ScrollToTop from "../ScrollToTop";
import "./MakePayment.css";
import PaymentOverview from "./PaymentOverview";
import { useStylesMakePayment } from "./Style";
import { useAccountOverview } from "../../../hooks/useAccountOverview";
import { usePaymentMethod } from "../../../hooks/usePaymentMethod";
import { useHolidayCalender } from "../../../hooks/useHolidayCalender";
import moment from "moment";

const paymentMaxDate = new Date();
const lastDayOfMonth = new Date(
  paymentMaxDate.getFullYear(),
  paymentMaxDate.getMonth() + 1,
  0
);
paymentMaxDate.setDate(paymentMaxDate.getDate() + 30);

export default function MakePayment() {
  //Material UI css class
  const classes = useStylesMakePayment();
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const accNo = query.get("accNo");
  const [, setProfileTabNumber] = useGlobalState();
  const [paymentMethods, setPaymentMethod] = useState(null);
  const [latestLoanData, setLatestLoanData] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(null);
  const [open, setOpen] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [openDeleteSchedule, setOpenDeleteSchedule] = useState(false);
  const [openAutoPay, setOpenAutoPay] = useState(false);
  const [card, setCard] = useState("");
  const [disabledContent, setDisabledContent] = useState(false);
  const [isDebit, setIsDebit] = useState(false);
  const [accntNo, setAccntNo] = useState(null);
  const [paymentDate, setPaymentDate] = useState(null);
  const [requiredSelect, setRequiredSelect] = useState("");
  const [requiredAutoPay, setRequiredAutoPay] = useState("");
  const [requiredDate, setRequiredDate] = useState("");
  const [requiredAmount, setRequiredAmount] = useState("");
  const [showCircularProgress, setShowCircularProgress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(null);
  const [checkAutoPay, setCheckAutoPay] = useState(true);
  const [autopaySubmitDisabled, setAutopaySubmitDisabled] = useState(true);
  const [autopaySwitchDisabled, setAutopaySwitchDisabled] = useState(false);
  const [autoPayDisableMain, setAutoPayDisableMain] = useState(false);
  const [nextDate, setNextDate] = useState();
  const [scheduleDate, setScheduleDate] = useState(nextDate);
  const [paymentDatepicker, setPaymentDatepicker] = useState(nextDate);
  const [payoff, setPayoff] = useState(false);
  const [calendarDisabled, setCalendarDisabled] = useState(false);
  const [checkPaymentInformation, setCheckPaymentInformation] = useState(false);
  const [activeLoansData, setActiveLoansData] = useState([]);
  const [checkCard, setCheckCard] = useState(false);
  const [defaultPaymentCard, setDefaultPaymentCard] = useState(false);
  const { isFetching, data: User, refetch } = useAccountOverview();
  const { data: payments } = usePaymentMethod();
  const { data: holidayCalenderData } = useHolidayCalender();
  const [paymentTitle, setPaymentTitle] = useState("Single Payment");
  const [stateName, setStatename] = useState("");
  const [payOffAmount, setPayOffAmount] = useState();
  const [, setPaymentList] = useState();
  const [currentPayment, setCurrentPayment] = useState(false);
  const [currentPaymentNote, setCurrentPaymentNote] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [paymentReferenceNumber, setPaymentReferenceNumber] = useState();

  const today = new Date();

  const autoPaySwitch = (main, secondary) => {
    return !main && !secondary ? false : true;
  };

  let nextDueDateCheck = new Date();

  useEffect(() => {
    if (User && accntNo) {
      let findLoan = User?.data?.loanHistory?.length
        ? User.data.loanHistory.find((loan) => loan.accountNumber === accntNo)
        : null;
      setPaymentList(findLoan);
      let presenceOfCurrentPayment = findLoan?.AppAccountHistory?.length
        ? findLoan.AppAccountHistory[0]?.TransactionDate
        : null;
      setCurrentPayment(
        Moment(presenceOfCurrentPayment).format("MM/DD/YYYY") ===
          Moment(paymentDatepicker).format("MM/DD/YYYY")
          ? true
          : false
      );
      setCurrentPaymentNote(
        Moment(presenceOfCurrentPayment).format("MM/DD/YYYY") ===
          Moment().format("MM/DD/YYYY")
          ? true
          : false
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User, accntNo, paymentDatepicker]);

  useEffect(() => {
    if (payments?.data?.paymentOptions) {
      setCheckCard(
        payments.data.paymentOptions.length &&
          payments.data.paymentOptions[0].CardType
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments, User]);
  useEffect(() => {
    setStatename(latestLoanData?.[0]?.loanDetails?.Address?.State);
  }, [latestLoanData]);

  useEffect(() => {
    setPaymentDatepicker(scheduleDate ? scheduleDate : nextDate ?? today);
  }, [checkCard, scheduleDate, defaultPaymentCard, nextDate]);

  //API Request for Payment methods
  async function getPaymentMethods() {
    setPaymentMethod(payments);
    if (payments?.data?.error) {
      if (!toast.isActive("closedApplication")) {
        toast.error(globalMessages.Error_retieving_loan_info, {
          toastId: "closedApplication",
        });
        setLoading(false);
        setShowCircularProgress(false);
      }
    } else {
      //get default card
      let defaultBank = payments?.data?.defaultBank;
      let isACH = await defaultCardCheck(
        payments?.data?.ACHMethods,
        "ACH",
        defaultBank
      );
      if (isACH) {
        setDefaultPaymentCard(false);
        setAutopaySwitchDisabled(false);
      } else {
        //set default card
        const cardFound = await defaultCardCheck(
          payments?.data?.CardMethods,
          "card",
          defaultBank
        );
        if (cardFound) {
          setDefaultPaymentCard(true);
          setAutopaySwitchDisabled(true);
        }
      }
    }
  }
  //set default card CardMethods
  async function defaultCardCheck(cardData, type, defaultBank) {
    let checkNickName = false;
    setCard("");
    cardData?.forEach((data) => {
      if (data.Nickname === defaultBank) {
        if (type.toUpperCase() === "ACH") {
          setCard(data.SequenceNumber);
          setIsDebit(false);
          setCalendarDisabled(false);
        } else {
          setCard(data.ProfileId);
          setIsDebit(true);
        }
        checkNickName = true;
        return checkNickName;
      }
    });
    return checkNickName;
  }
  const noExtraChargesStates = ["VA", "SC", "WI", "MD"];
  let extraCharges = noExtraChargesStates.includes(stateName) ? 0 : "2.50";
  let paymentAmountWithFees =
    parseFloat(paymentAmount) + parseFloat(extraCharges);
  //Enable auto payment
  async function enableAutoPayment(
    enableAutoPayAccountNo,
    enableAutoPayCard,
    enableAutoPayDate,
    enableAutoPayIsDebit,
    removeScheduledPayment
  ) {
    let result = await enableAutoPay(
      enableAutoPayAccountNo,
      enableAutoPayCard,
      enableAutoPayDate,
      enableAutoPayIsDebit,
      removeScheduledPayment
    );
    result.status === 200
      ? result?.data?.paymentResult.HasNoErrors
        ? toast.success(globalMessages.Auto_Payment_Mode_Enabled, {
            autoClose: 5000,
          })
        : toast.error(globalMessages.Failed_Payment_mode, { autoClose: 5000 })
      : toast.error(
          result?.data?.message
            ? result?.data?.message
            : globalMessages.Failed_Payment_mode,
          { autoClose: 5000 }
        );

    hasSchedulePayment && result.status === 900
      ? deleteSchedule(accntNo, routingNumber)
      : refetch();
  }
  //Disable auto payment
  async function disableAutoPayment(disableAutoPayAccountNo) {
    let result = await disableAutoPay(disableAutoPayAccountNo);
    result.status === 200
      ? result?.data?.deletePayment?.HasNoErrors
        ? toast.success(globalMessages.Auto_Payment_Mode_Disabled, {
            autoClose: 5000,
          })
        : toast.error(globalMessages.Failed_Payment_mode, { autoClose: 5000 })
      : toast.error(
          result?.data?.message
            ? result?.data?.message
            : globalMessages.Failed_Payment_mode,
          { autoClose: 5000 }
        );
    if (result?.data?.deletePayment?.HasNoErrors) {
      refetch();
    }
  }

  const handlePaymentSuccess = () => {
    setConfirmPayment(true);
  };

  const handlePaymentConfirmation = () => {
    setConfirmPayment(false);
    refetch().then(() => {
      if (
        Moment(paymentDatepicker).format("YYYY/MM/DD") ===
        Moment().format("YYYY/MM/DD")
      ) {
        navigate("/customers/accountOverview");
      }
    });
  };

  function pageLoader(flag) {
    setLoading(flag);
    setShowCircularProgress(flag);
  }

  //Enable scheduled payment
  async function makeuserPayment(
    scheduledPaymentAccountNo,
    scheduledPaymentCard,
    scheduledPaymentDatePicker,
    scheduledPaymentIsDebit,
    scheduledPaymentAmount,
    RemoveScheduledPayment
  ) {
    setOpenPayment(false);
    let result = await makePayment(
      scheduledPaymentAccountNo,
      scheduledPaymentCard,
      scheduledPaymentDatePicker,
      scheduledPaymentIsDebit,
      scheduledPaymentAmount,
      RemoveScheduledPayment
    );
    setPaymentReferenceNumber(result?.data?.paymentResult?.ReferenceNumber);
    if (result?.data?.successful_payment === "Cash Only") {
      toast.error(globalMessages.Debit_Payments_Only, { autoClose: 5000 });
    } else {
      result.status === 200
        ? result?.data?.paymentResult?.PaymentCompleted !== undefined
          ? handlePaymentSuccess()
          : toast.error(globalMessages.Failed_Payment_mode, {
              autoClose: 5000,
              onOpen: () => {
                pageLoader(false);
              },
            })
        : toast.error(
            result?.data?.message
              ? result?.data?.message
              : globalMessages.Failed_Payment_mode,
            {
              autoClose: 5000,
              onOpen: () => {
                pageLoader(false);
              },
            }
          );
    }
  }
  //Disable scheduled payment
  async function deletePayment(
    disableScheduledPaymentAccountNo,
    disableScheduledPaymentRefNo,
    disableScheduledPaymentIsCard
  ) {
    let result = await deleteScheduledPayment(
      disableScheduledPaymentAccountNo,
      disableScheduledPaymentRefNo,
      disableScheduledPaymentIsCard
    );
    result.status === 200
      ? result?.data?.deletePaymentMethod?.HasNoErrors
        ? toast.success(globalMessages.Schedule_Payment_Cancelled, {
            autoClose: 5000,
          }) && refetch()
        : toast.error(globalMessages.Failed_Payment_mode, { autoClose: 5000 })
      : toast.error(
          result?.data?.message
            ? result?.data?.message
            : globalMessages.Failed_Payment_mode,
          { autoClose: 5000 }
        );
  }

  // Disable auto payment while make payment
  const handleMenuPaymentProfile = () => {
    navigate("/customers/myProfile");
    setProfileTabNumber({ profileTabNumber: 3 });
  };

  // Disable Sheduled payment while make recuiring payment
  async function deleteSchedule(deleteScheduleAccNo, deleteScheduleRefNo) {
    await deleteScheduledPayment(deleteScheduleAccNo, deleteScheduleRefNo);
    refetch();
  }
  //Validating ACCNO
  async function checkaccNo(checkAccNoActiveLoansData, checkAccNo) {
    checkAccNoActiveLoansData?.forEach((data) => {
      if (data?.loanData?.accountNumber === checkAccNo) {
        let loan = [];
        loan.push(data);
        setLatestLoanData(loan);
        let totalAmount =
          data?.loanPaymentInformation?.accountDetails?.RegularPaymentAmount.toFixed(
            2
          );
        setPayOffAmount(
          data?.loanPaymentInformation?.accountDetails?.CurrentPayOffAmount
        );
        setPaymentAmount(paymentAmount ? paymentAmount : totalAmount);
        setTotalPaymentAmount(totalAmount);
        let status = data?.loanDetails?.LoanIsDelinquent;
        setAutoPayDisableMain(status);
        setAccntNo(data.loanData?.accountNumber);
        setDisabledContent(
          data?.loanPaymentInformation?.appRecurringACHPayment ? true : false
        );
        setCheckAutoPay(
          data?.loanPaymentInformation?.appRecurringACHPayment ? true : false
        );
        setPaymentDate(
          Moment(
            data?.loanPaymentInformation?.accountDetails?.NextDueDate
          ).format("YYYY-MM-DD")
        );
        let scheduledDate = data?.loanPaymentInformation?.hasScheduledPayment
          ? Moment(
              data?.loanPaymentInformation?.scheduledPayments[0]?.PaymentDate
            ).format("MM/DD/YYYY")
          : nextDate;
        setPaymentDatepicker(scheduledDate ? scheduledDate : nextDate ?? today);
        setScheduleDate(scheduledDate);
        setLoading(false);
        setAutopaySubmitDisabled(true);
        setShowCircularProgress(isFetching);
        setCheckPaymentInformation(data?.loanPaymentInformation?.errorMessage);
        return true;
      }
    });
    return false;
  }

  //API Request for Account Details
  function getData() {
    setShowCircularProgress(isFetching);
    setActiveLoansData(User?.data?.activeLoans);
    let hasSchedulePaymentActive = activeLoansData?.length
      ? activeLoansData[0]?.loanPaymentInformation?.hasScheduledPayment
      : false;
    setPaymentTitle(
      hasSchedulePaymentActive
        ? globalMessages.Scheduled_Future_Payment
        : globalMessages.Single_Payment
    );
    setPayOffAmount(
      User?.data?.activeLoans[0]?.loanPaymentInformation?.accountDetails
        ?.CurrentPayOffAmount
    );
    if (accNo && activeLoansData) {
      let res = checkaccNo(activeLoansData, window.atob(accNo));
      // if accno is not Valid
      if (!res) {
        toast.error(globalMessages.Invalid_Account_Number, { autoClose: 5000 });
        navigate("/customers/accountoverview");
      }
    } else {
      setLatestLoanData(activeLoansData?.slice(0, 1) ?? []);
      let latestLoan = activeLoansData?.slice(0, 1) ?? [];
      let schedulePaymentAmount =
        activeLoansData?.length &&
        activeLoansData[0]?.loanPaymentInformation?.scheduledPayments?.length
          ? activeLoansData[0].loanPaymentInformation.scheduledPayments[0]
              ?.PaymentAmount
          : 0;
      let totalAmount = latestLoan?.length
        ? latestLoan[0]?.loanPaymentInformation?.accountDetails?.RegularPaymentAmount.toFixed(
            2
          )
        : null;
      setPaymentAmount(
        hasSchedulePaymentActive
          ? schedulePaymentAmount.toFixed(2)
          : totalAmount
      );
      setTotalPaymentAmount(totalAmount);
      let status =
        latestLoan?.length && latestLoan[0]?.loanDetails?.LoanIsDelinquent;
      setAutoPayDisableMain(status);
      setAccntNo(
        latestLoan?.length ? latestLoan[0]?.loanData?.accountNumber : null
      );
      setDisabledContent(
        latestLoan?.length &&
          latestLoan[0]?.loanPaymentInformation?.appRecurringACHPayment
          ? true
          : false
      );
      setCheckAutoPay(
        latestLoan?.length &&
          latestLoan[0]?.loanPaymentInformation?.appRecurringACHPayment
          ? true
          : false
      );
      setPaymentDate(
        latestLoan?.length
          ? Moment(
              latestLoan[0]?.loanPaymentInformation?.accountDetails?.NextDueDate
            ).format("YYYY-MM-DD")
          : "NONE"
      );
      let scheduledDate =
        latestLoan?.length &&
        latestLoan[0]?.loanPaymentInformation?.hasScheduledPayment
          ? Moment(
              latestLoan[0].loanPaymentInformation.scheduledPayments[0]
                ?.PaymentDate
            ).format("MM/DD/YYYY")
          : nextDate;
      setPaymentDatepicker(scheduledDate ? scheduledDate : nextDate ?? today);
      setScheduleDate(scheduledDate);
      setLoading(false);
      setAutopaySubmitDisabled(true);
      setShowCircularProgress(isFetching);
      setCheckPaymentInformation(
        latestLoan?.length &&
          latestLoan[0]?.loanPaymentInformation?.errorMessage
      );
    }
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User, activeLoansData, isFetching]);

  useEffect(() => {
    getPaymentMethods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments, User]);

  //Account select payment options
  let paymentData = paymentMethods?.data;
  let paymentListAch = paymentData?.ACHMethods?.map((pdata) => ({
    value: pdata.SequenceNumber,
    label: `${pdata.AccountType} (${
      pdata.Nickname
    }) (****${pdata.AccountNumber.substr(-4)})`,
  }));
  let paymentListCard = paymentData?.CardMethods?.map((pdata) => ({
    value: pdata.ProfileId,
    label: `${pdata.CardType} (${pdata.OwnerName}) (****${pdata.LastFour})`,
  }));

  const paymentOptions = paymentListAch
    ? JSON.stringify(paymentListAch.concat(paymentListCard))
    : "[]";
  if (latestLoanData?.[0]?.loanData?.dueDate) {
    nextDueDateCheck = Moment(latestLoanData?.[0]?.loanData?.dueDate).format(
      "YYYYMMDD"
    );
  }

  //Storing the routingNumber,refNumber and SchedulePayments details
  let hasSchedulePayment = latestLoanData?.length
    ? latestLoanData[0]?.loanPaymentInformation?.hasScheduledPayment
    : false;
  let routingNumber =
    latestLoanData?.length &&
    latestLoanData[0]?.loanPaymentInformation?.scheduledPayments?.length &&
    latestLoanData[0].loanPaymentInformation.scheduledPayments[0]?.PaymentMethod
      ?.AchInfo
      ? latestLoanData[0].loanPaymentInformation.scheduledPayments[0]
          .PaymentMethod.AchInfo.RoutingNumber
      : 0;
  let refNumber =
    latestLoanData?.length &&
    latestLoanData[0]?.loanPaymentInformation?.scheduledPayments?.length &&
    latestLoanData[0].loanPaymentInformation.scheduledPayments[0]
      ?.ReferenceNumber
      ? latestLoanData[0].loanPaymentInformation.scheduledPayments[0]
          .ReferenceNumber
      : 0;
  let isCard =
    latestLoanData?.length &&
    latestLoanData[0]?.loanPaymentInformation?.scheduledPayments?.length &&
    latestLoanData[0].loanPaymentInformation.scheduledPayments[0]?.PaymentMethod
      ?.IsCard
      ? latestLoanData[0].loanPaymentInformation.scheduledPayments[0]
          .PaymentMethod.IsCard
      : false;

  //Select account
  const handleChangeSelect = (event) => {
    setCard(event.target.value); // this value is a number sand trim() only works on string. If converted to string this will not work
    let selectedPaymentMethod = JSON.parse(paymentOptions).filter(
      (paymentMethod) => {
        return paymentMethod.value === event.target.value;
      }
    );
    let selectedPaymentType = selectedPaymentMethod.length
      ? selectedPaymentMethod[0].label
      : "";
    if (
      selectedPaymentType.includes("Checking") ||
      selectedPaymentType.includes("Savings")
    ) {
      setIsDebit(false);
      setCheckCard(false);
      setPaymentDatepicker(scheduleDate ?? today);
      if (payoff) {
        setCalendarDisabled(true);
      } else {
        setCalendarDisabled(false);
        setPayoff(false);
      }
      setAutopaySwitchDisabled(false);
      setAutopaySubmitDisabled(checkAutoPay === disabledContent ? true : false);
    } else {
      //isDebit
      setIsDebit(true);
      setCheckCard(true);
      setAutopaySubmitDisabled(true);
      setAutopaySwitchDisabled(true);
    }
    //true
    setRequiredSelect("");
  };
  let todaysDate = new Date();
  todaysDate = Moment(todaysDate).format("YYYYMMDD");

  //Autopay enable/disable switch
  const handleSwitchPayment = (event) => {
    setDisabledContent(event.target.checked);
    if (isDebit) {
      setAutopaySubmitDisabled(true);
    } else {
      setAutopaySubmitDisabled(
        checkAutoPay === event.target.checked ? true : false
      );
    }
    if (!autopaySubmitDisabled) {
      setRequiredAutoPay("");
    }
  };

  let accountInfo = {};
  let cardLabel = "";
  if (card && paymentListCard?.length) {
    accountInfo = paymentListCard.find((account) => account.value === card);
    cardLabel = accountInfo?.label;
  }
  if (!cardLabel && paymentListAch?.length) {
    accountInfo = paymentListAch.find((account) => account.value === card);
    cardLabel = accountInfo?.label;
  }

  //Autopay submit
  const handleClickSubmit = () => {
    if (nextDueDateCheck < todaysDate && !autopaySubmitDisabled) {
      setRequiredAutoPay(globalMessages.Sorry_Account_Delinquent);
      setOpen(false);
      return;
    }
    disabledContent
      ? card || card === 0
        ? setOpen(true)
        : setRequiredSelect(globalMessages.Please_Select_Any_Account)
      : setOpen(true);
  };

  //Autopay popup confirm and close
  function handleAutoPayConfirm() {
    setLoading(true);
    setShowCircularProgress(true);
    disabledContent
      ? enableAutoPayment(accntNo, card, paymentDate, isDebit, false)
      : disableAutoPayment(accntNo);
    setDisabledContent(event.target.checked);
    setOpen(false);
  }
  function handleAutoPayConfirmRemove() {
    setLoading(true);
    setShowCircularProgress(true);
    disabledContent
      ? enableAutoPayment(accntNo, card, paymentDate, isDebit, true)
      : disableAutoPayment(accntNo);
    setDisabledContent(event.target.checked);
    setOpen(false);
  }
  const handleCloseAutoPayPopup = () => {
    setOpen(false);
  };

  //Cancel Schedule popup confirm and close
  function handleDeleteSchedule() {
    setLoading(true);
    setShowCircularProgress(true);
    isCard
      ? deletePayment(accntNo, refNumber, true)
      : deletePayment(accntNo, routingNumber, false);
    setRequiredDate("");
    setRequiredAmount("");
    setRequiredSelect("");
    setPaymentDatepicker(nextDate ?? today);
    setOpenDeleteSchedule(false);
    refetch();
  }

  const handleDeleteScheduleClose = () => {
    setOpenDeleteSchedule(false);
  };

  let refSelectPaymentOption = useRef();
  let refPaymentAmount = useRef();
  let refpaymentDatepicker = useRef();

  //Schedule Payment
  const handleSchedulePaymentClick = () => {
    if (!card && card !== 0) {
      refSelectPaymentOption.current.focus();
      setRequiredSelect(globalMessages.Please_Select_Any_Account);
    } else if (!paymentAmount) {
      refPaymentAmount.current.focus();
      setRequiredAmount(globalMessages.Please_Enter_Payment_Amount);
    } else if (paymentAmount < 10) {
      refPaymentAmount.current.focus();
      setRequiredAmount(globalMessages.Please_Enter_Minimum_Amount);
    } else if (!paymentDatepicker) {
      refpaymentDatepicker.current.focus();
      setRequiredDate(globalMessages.Please_Select_Any_Date);
    } else if (
      Moment(User.data.loanData[0].loanOriginationDate).isAfter(Moment())
    ) {
      refPaymentAmount.current.focus();
      setRequiredDate(
        globalMessages.You_Can_Begin_Making_Payments_on +
          Moment(User.data.loanData[0].loanOriginationDate).format("MM/DD/YYYY")
      );
    } else {
      setOpenPayment(true);
    }
  };

  //Cancel Payment
  const handlePaymentcancel = () => {
    setOpenDeleteSchedule(true);
  };

  //Schedule Payment popup confirm and close
  const handleSchedulePaymentSubmit = () => {
    setLoading(true);
    setShowCircularProgress(true);
    let RemoveScheduledPayment = true;
    makeuserPayment(
      accntNo,
      card,
      paymentDatepicker,
      isDebit,
      paymentAmount,
      RemoveScheduledPayment
    );
  };

  // Keep Schedule Payment popup confirm and close
  const handleSchedulePaymentSubmitKeep = () => {
    setLoading(true);
    setShowCircularProgress(true);
    let RemoveScheduledPayment = false;
    makeuserPayment(
      accntNo,
      card,
      paymentDatepicker,
      isDebit,
      paymentAmount,
      RemoveScheduledPayment
    );
  };

  const disableAutoPayAndSchedulePayment = async () => {
    setLoading(true);
    setShowCircularProgress(true);
    setOpenPayment(false);
    await disableAutoPay(accntNo);
    makeuserPayment(
      accntNo,
      card,
      paymentDatepicker,
      isDebit,
      paymentAmount,
      true
    );
  };
  const handlePaymentClose = () => {
    setOpenPayment(false);
  };

  //AUTO PAY AUTHORIZATION pop up open and close
  const handleAutoPayClickOpen = () => {
    setOpenAutoPay(true);
  };

  const handleAutoPayClose = () => {
    setOpenAutoPay(false);
  };
  const numberFormat = (value) => {
    if (value) {
      let preFormat = value ? value.toString().replace(",", "") : value;
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "USD",
      }).format(preFormat);
    }
    return value;
  };
  //US holidays
  function disableHolidays(date) {
    const holidayApiData =
      holidayCalenderData?.data?.MFYearHolidays?.map(({ Date }) =>
        formatDate(Date)
      ) ?? [];
    const holidayApiDataValues = holidayApiData.map((arrVal) => {
      return new Date(arrVal + "T00:00").getTime();
    });
    return date.getDay() === 0 || holidayApiDataValues.includes(date.getTime());
  }

  //Handling payment amount
  const onHandlepaymentAmount = (event) => {
    let price = event.target.value.replace(/[$,]/g, "");
    const reg = /^\d{0,5}(\.\d{0,2})?$/;
    if (!price || reg.test(price)) {
      setPaymentAmount(price);
      setRequiredAmount("");
      if (payOffAmount <= parseFloat(price)) {
        if (!toast.isActive("payoffNotSetFutureDate")) {
          toast.success(globalMessages.PayoffCannotBeInFuture, {
            toastId: "payoffNotSetFutureDate",
          });
        }
        setPaymentDatepicker(nextDate ?? today);
        setPayoff(true);
        setCalendarDisabled(true);
      } else {
        setPayoff(false);
        if (!isDebit) {
          setCalendarDisabled(false);
        }
      }
    }
  };

  //payment onblur
  const onBlurPayment = (event) => {
    let price = event.target.value.replace(/[$,]/g, "");
    price = Number(price).toFixed(2);
    let formatedValue = numberFormat(price);
    setPaymentAmount(formatedValue.replace("$", ""));
    setRequiredAmount("");
  };
  let paymentIsScheduled = hasSchedulePayment ? "yes" : "no";
  let pickedDate = new Date(paymentDatepicker);
  let isFutureDate = "no";
  if (Moment(pickedDate).format("YYYYMMDD") > todaysDate) {
    isFutureDate = "yes";
  }
  useEffect(() => {
    let currentDate = new Date();
    formatDate(currentDate);
    holidayCalenderData?.data?.MFYearHolidays.forEach(({ Date }) => {
      while (formatDate(Date) === formatDate(currentDate) || currentDate.getDay() === 0) {
        setNextDate(moment(currentDate, "YYYY-MM-DD").add(1, "days"));
        currentDate.setDate(currentDate.getDate() + 1);
        
      }
      setPaymentDatepicker(nextDate ?? today);
    });

    // eslint-disable-next-line
  }, [holidayCalenderData]);

  useEffect(() => {
    setPaymentDatepicker(nextDate ?? today);
  }, [nextDate]);
  //View
  return (
    <div data-testid="makePaymentComponent">
      <CheckLoginStatus />
      <ScrollToTop />
      <Grid id="makePaymentWrap" container className={classes.centerGrid}>
        <Grid
          className={classes.gridStyle}
          container
          direction="row"
          item
          xs={12}
        >
          <Grid item xs={12} sm={6} container direction="row">
            <Typography
              className={classes.heading}
              variant="h3"
              data-testid="heading"
            >
              <NavLink to="/customers/accountOverview">
                <ButtonWithIcon
                  icon="arrow_backwardIcon"
                  data-testid="back_Button"
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
        {showCircularProgress ? (
          <Grid
            data-testid="activeLoans"
            item
            xs={12}
            className={classes.tableStyle}
          >
            <TableContainer id="pdfdiv" component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHead}>
                      {globalMessages.Account_Number}
                    </TableCell>
                    <TableCell className={classes.tableHead} align="left">
                      {globalMessages.Todays_Payoff}
                    </TableCell>
                    <TableCell className={classes.tableHead} align="left">
                      {globalMessages.Regular_Amount}
                    </TableCell>
                    <TableCell className={classes.tableHead} align="left">
                      {globalMessages.InterestRate}
                    </TableCell>
                    <TableCell className={classes.tableHead} align="left">
                      {globalMessages.Loan_Fees}
                    </TableCell>
                    <TableCell className={classes.tableHead} align="left">
                      {globalMessages.Next_Due_Date}
                    </TableCell>
                    <TableCell className={classes.tableHead} align="left">
                      {globalMessages.Scheduled_Payment}
                    </TableCell>
                    <TableCell className={classes.tableHead} align="left">
                      {globalMessages.Auto_Pay}
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
          <Grid item xs={12} className={classes.tableStyle}>
            <TableContainer component={Paper}>
              <PaymentOverview overview={latestLoanData} status={isFetching} />
            </TableContainer>
          </Grid>
        )}
        {latestLoanData?.length ? (
          !paymentData?.data?.error ? (
            !checkPaymentInformation ? (
              <>
                <Grid
                  id="payFromWrap"
                  item
                  xs={12}
                  sm={5}
                  className={classes.payFromStyle}
                >
                  <Paper id="payFromPaper" className={classes.paper}>
                    <Typography
                      className={classes.cardHeading}
                      data-testid="payment_Methods"
                    >
                      Pay From
                    </Typography>
                    {paymentOptions ? (
                      <Select
                        id="select"
                        name="select"
                        refId={refSelectPaymentOption}
                        labelform="Accounts"
                        select={paymentOptions}
                        onChange={handleChangeSelect}
                        value={card}
                      />
                    ) : (
                      <div className={classes.circularProgressStyle}>
                        <CircularProgress size={30} />
                      </div>
                    )}
                    <p
                      className={
                        requiredSelect !== ""
                          ? "showError add Pad"
                          : "hideError"
                      }
                      data-testid="subtitle"
                    >
                      {" "}
                      {requiredSelect}.
                    </p>

                    <Grid item xs={12} className={classes.paymentMethodStyle}>
                      <ButtonSecondary
                        data-testid="payment_Method_Button"
                        stylebutton='{"background": "", "color":"" }'
                        onClick={handleMenuPaymentProfile}
                      >
                        Add a payment method
                      </ButtonSecondary>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={12} sm={7} className={classes.paymentModeStyle}>
                  <Paper className={classes.paper}>
                    {paymentOptions && !showCircularProgress ? (
                      <div>
                        <Grid item xs={12}>
                          <Typography
                            className={classes.cardHeading}
                            data-testid="payment_Mode"
                          >
                            Payment Mode
                          </Typography>
                          <p className={classes.autoPayStyle}>
                            <small
                              className={`${classes.autoPayTitle} ${classes.autoPayFontStyle}`}
                            >
                              {" "}
                              {disabledContent
                                ? "Auto Pay - On"
                                : "Auto Pay - Off"}
                            </small>
                          </p>
                          <p
                            data-testid="subtitle"
                            className={
                              requiredAutoPay !== "" //
                                ? "showError add Pad"
                                : "hideError"
                            }
                          >
                            {" "}
                            {requiredAutoPay}
                          </p>

                          <p className={classes.autoPayStyle}>
                            <small className={classes.autoPayColor}>
                              Choose auto pay to make payments of $
                              {totalPaymentAmount} on your next due date
                            </small>
                          </p>
                          <FormControlLabel
                            id="autoPaySpan"
                            control={
                              <Switch
                                checked={disabledContent}
                                onChange={handleSwitchPayment}
                                value={disabledContent}
                                inputProps={{ "data-test-id": "switch" }}
                                color="primary"
                                disabled={autoPaySwitch(
                                  autoPayDisableMain,
                                  autopaySwitchDisabled
                                )}
                              />
                            }
                            labelPlacement="end"
                            label={
                              disabledContent
                                ? "Auto pay is On"
                                : "Auto pay is Off"
                            }
                          />
                          <p className={classes.autoPayFontStyle}>
                            By enabling Auto Pay mode, I acknowledge to have
                            read, understood, and agree to the terms of the
                            &nbsp;
                            <Link
                              to="#"
                              onClick={handleAutoPayClickOpen}
                              className={classes.autoPayLink}
                            >
                              Auto Pay Authorization
                            </Link>
                          </p>
                          <Grid
                            item
                            xs={12}
                            className={classes.submitGridStyle}
                          >
                            <ButtonPrimary
                              stylebutton='{"background": "", "color":"" }'
                              id="submitBtn"
                              onClick={handleClickSubmit}
                              disabled={autopaySubmitDisabled}
                            >
                              Submit
                            </ButtonPrimary>
                          </Grid>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography className={classes.cardHeading}>
                            {paymentTitle}
                          </Typography>
                          <TextField
                            id="payment"
                            name="payment"
                            label="Payment Amount (may include fees)"
                            type="text"
                            materialProps={{ ref: refPaymentAmount }}
                            autoComplete="off"
                            onChange={onHandlepaymentAmount}
                            value={"$" + paymentAmount}
                            onBlur={onBlurPayment}
                            // disabled={ disabledContent }
                          />
                          <p
                            className={
                              requiredAmount !== ""
                                ? "showError add Pad"
                                : "hideError"
                            }
                            data-testid="subtitle"
                          >
                            {" "}
                            {requiredAmount}
                          </p>
                          <Grid
                            item
                            xs={12}
                            container
                            direction="row"
                            className={classes.datePickerStyle}
                          >
                            <DatePicker
                              name="date"
                              label="Payment Date (No Sundays or Holidays)"
                              placeholder="MM/DD/YYYY"
                              id="date"
                              disablePastDate="true"
                              disableFuture={payoff}
                              disabled={calendarDisabled}
                              autoComplete="off"
                              maxdate={
                                nextDueDateCheck < todaysDate
                                  ? lastDayOfMonth
                                  : paymentMaxDate
                              }
                              onKeyDown={(event) => event.preventDefault()}
                              disableDate={disableHolidays}
                              minyear={4}
                              onChange={(paymentDatepickerOnChange) => {
                                setPaymentDatepicker(paymentDatepickerOnChange);
                                setRequiredDate("");
                              }}
                              value={paymentDatepicker}
                            />
                            <p
                              className={
                                requiredDate !== ""
                                  ? "showError add Pad"
                                  : "hideError"
                              }
                              data-testid="subtitle"
                            >
                              {" "}
                              {requiredDate}
                            </p>
                          </Grid>
                          {currentPaymentNote ? (
                            <Typography className={classes.paymentNote}>
                              Note: We have already processed a payment from you
                              today.
                            </Typography>
                          ) : null}
                          <Grid
                            id="paymentBtnWrap"
                            className={classes.paymentButtonStyle}
                          >
                            <Grid id="make-payment-cancel-button-grid">
                              <ButtonSecondary
                                stylebutton="{}"
                                styleicon='{ "color":"" }'
                                id="cancelPaymentBtn"
                                onClick={handlePaymentcancel}
                                disabled={!hasSchedulePayment}
                              >
                                Cancel Future Payment
                              </ButtonSecondary>
                            </Grid>
                            <Grid>
                              <ButtonPrimary
                                stylebutton='{"marginRight": "" }'
                                id="make-payment-schedule-button"
                                onClick={handleSchedulePaymentClick}
                              >
                                Schedule Payment
                              </ButtonPrimary>
                            </Grid>
                          </Grid>
                        </Grid>
                      </div>
                    ) : (
                      <div
                        className={classes.circularProgressStyle}
                        data-testid="spinner_Payment"
                      >
                        <CircularProgress />
                      </div>
                    )}
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
        )}
        <Grid item xs={12}>
          <p data-testid="pleaseContact" className={classes.endMessage}>
            {" "}
            <span>
              *If you have questions or would like to obtain a payoff balance
              for a future date, please contact your local branch listed on your
              My Branch Page.
            </span>
            <br />
          </p>
        </Grid>
      </Grid>

      {/* ************** Auto pay submit modal ******************* */}

      <Dialog
        id="autopayDialogBox"
        open={open}
        aria-labelledby="alert-dialog-title-autoPay"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="autopayText">
          <IconButton
            id="autopayCloseBtn"
            aria-label="close"
            className={classes.closeButton}
            onClick={handleCloseAutoPayPopup}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography id="autoTxt" className={classes.dialogHeading}>
            {!disabledContent
              ? globalMessages.Are_You_Sure_Disable_Autopay
              : globalMessages.Auto_Pay_Confirmation}
          </Typography>
          <>
            {disabledContent ? (
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-label="simple table"
                  border-color="white"
                >
                  <TableBody>
                    <TableRow>
                      <TableCell
                        className={classes.autoPayTableheadrow}
                        align="right"
                      >
                        {!disabledContent ? "" : globalMessages.Auto_Pay_Amount}
                      </TableCell>
                      <TableCell align="left">
                        {!disabledContent
                          ? ""
                          : numberFormat(totalPaymentAmount)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">
                        {!disabledContent ? "" : "Bank/Card: "}
                      </TableCell>
                      <TableCell align="left">
                        {!disabledContent ? "" : cardLabel}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="right">
                        {!disabledContent
                          ? ""
                          : globalMessages.First_Autopay_Date}
                      </TableCell>
                      <TableCell align="left">
                        {!disabledContent
                          ? ""
                          : Moment(paymentDate).format("MM/DD/YYYY")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            ) : null}
            {/* </Typography> */}
          </>
        </DialogContent>

        <DialogActions className={`actionButtons ${classes.dialogActionStyle}`}>
          <ButtonSecondary
            id="cancelButton"
            stylebutton='{"background": "", "color":"" }'
            onClick={handleCloseAutoPayPopup}
            disabled={loading}
          >
            Cancel
          </ButtonSecondary>

          {checkAutoPay ? (
            <ButtonPrimary
              stylebutton='{ "background": "", "color":"" }'
              onClick={handleAutoPayConfirm}
              disabled={loading}
            >
              yes
              <AutorenewIcon
                className="rotatingIcon"
                style={{
                  display: loading ? "block" : "none",
                }}
              />
            </ButtonPrimary>
          ) : null}

          {disabledContent ? (
            <ButtonPrimary
              id="autoPayButton"
              stylebutton='{"background": "", "color":"" }'
              onClick={handleAutoPayConfirm}
              disabled={loading}
            >
              {paymentIsScheduled === "yes"
                ? globalMessages.Keep_Future_Add_Autopay
                : globalMessages.Complete_Autopay_Setup}
              <AutorenewIcon
                className="rotatingIcon"
                style={{
                  display: loading ? "block" : "none",
                }}
              />
            </ButtonPrimary>
          ) : null}

          {disabledContent && paymentIsScheduled === "yes" ? (
            <ButtonSecondary
              stylebutton='{"background": "", "color":"" }'
              onClick={handleAutoPayConfirmRemove}
              disabled={loading}
            >
              Remove the future payment and turn on Autopay
              <AutorenewIcon
                className="rotatingIcon"
                style={{
                  display: loading ? "block" : "none",
                }}
              />
            </ButtonSecondary>
          ) : null}
        </DialogActions>
      </Dialog>

      {/*********** **** Payment Confirmation modal ************* */}
      <Dialog
        open={confirmPayment}
        maxWidth="sm"
        id="scheduleDialogBox"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="scheduleDialogHeading">
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handlePaymentConfirmation}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="scheduleTxtWrap">
          <Typography id="scheduleTxt" className={classes.dialogHeading}>
            Your payment of: {numberFormat(paymentAmount)} has been applied to
            your account.
          </Typography>
          <TableContainer>
            <Table
              className={classes.table}
              aria-label="simple table"
              border-color="white"
            >
              <TableBody>
                <TableRow>
                  <TableCell
                    className={classes.tableheadrow}
                    align="left"
                    width="20%"
                  ></TableCell>
                  <TableCell align="left">Bank/Card:</TableCell>
                  <TableCell align="left">{cardLabel}</TableCell>
                  <TableCell
                    className={classes.tableheadrow}
                    align="left"
                  ></TableCell>
                </TableRow>

                {isDebit && extraCharges ? (
                  <TableRow>
                    <TableCell
                      className={classes.tableheadrow}
                      align="left"
                      width="20%"
                    ></TableCell>
                    <TableCell align="left">
                      Third Party Convenience fee:
                    </TableCell>
                    <TableCell align="left">{"$" + extraCharges}</TableCell>
                    <TableCell
                      className={classes.tableheadrow}
                      align="left"
                    ></TableCell>
                  </TableRow>
                ) : null}
                {isDebit ? (
                  <TableRow>
                    <TableCell
                      className={classes.tableheadrow}
                      align="left"
                      width="20%"
                    ></TableCell>
                    <TableCell align="left">Total Amount:</TableCell>
                    <TableCell align="left">
                      {numberFormat(paymentAmountWithFees)}
                    </TableCell>
                    <TableCell
                      className={classes.tableheadrow}
                      align="left"
                    ></TableCell>
                  </TableRow>
                ) : null}
                <TableRow>
                  <TableCell
                    className={classes.tableheadrow}
                    align="left"
                    width="20%"
                  ></TableCell>
                  <TableCell align="left">Payment Date:</TableCell>
                  <TableCell align="left">
                    {Moment(paymentDatepicker).format("MM/DD/YYYY")}
                  </TableCell>
                  <TableCell
                    className={classes.tableheadrow}
                    align="left"
                  ></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className={classes.tableheadrow}
                    align="left"
                    width="20%"
                  ></TableCell>
                  <TableCell className={classes.tableheadrow} align="left">
                    Account Number:
                  </TableCell>
                  <TableCell align="left">{accntNo}</TableCell>
                  <TableCell
                    className={classes.tableheadrow}
                    align="left"
                  ></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className={classes.tableheadrow}
                    align="left"
                    width="20%"
                  ></TableCell>
                  <TableCell className={classes.tableheadrow} align="left">
                    Confirmation Number:
                  </TableCell>
                  <TableCell align="left">{paymentReferenceNumber}</TableCell>
                  <TableCell
                    className={classes.tableheadrow}
                    align="left"
                  ></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions className={` ${classes.dialogActionStyle}`}>
          <Grid container className="buttonsWrap">
            <Grid container className="schedulePopup">
              <ButtonSecondary
                stylebutton='{"background": "", "color":"","margin": "0px 10px 0px 0px" }'
                onClick={handlePaymentConfirmation}
              >
                OK
              </ButtonSecondary>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>

      {/* ************** Schedule payment modal ******************* */}

      <Dialog
        open={openPayment}
        maxWidth="sm"
        id="scheduleDialogBox"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="scheduleDialogHeading">
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handlePaymentClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="scheduleTxtWrap">
          {currentPayment ? (
            <Typography id="scheduleTxt" className={classes.dialogHeading}>
              You have already submitted a payment for today.
              <br />
              If you proceed, your payment of: {numberFormat(
                paymentAmount
              )}{" "}
              will be applied to your account.
            </Typography>
          ) : (
            <Typography id="scheduleTxt" className={classes.dialogHeading}>
              Your Payment of: {numberFormat(paymentAmount)} will be applied to
              your account.
            </Typography>
          )}
          <TableContainer>
            <Table
              className={classes.table}
              aria-label="simple table"
              border-color="white"
            >
              <TableBody>
                <TableRow>
                  <TableCell
                    className={classes.tableheadrow}
                    align="left"
                    width="20%"
                  ></TableCell>
                  <TableCell align="left">Bank/Card:</TableCell>
                  <TableCell align="left">{cardLabel}</TableCell>
                  <TableCell
                    className={classes.tableheadrow}
                    align="left"
                  ></TableCell>
                </TableRow>

                {isDebit && extraCharges ? (
                  <TableRow>
                    <TableCell
                      className={classes.tableheadrow}
                      align="left"
                      width="20%"
                    ></TableCell>
                    <TableCell align="left">
                      Third Party Convenience fee:
                    </TableCell>
                    <TableCell align="left">{"$" + extraCharges}</TableCell>
                    <TableCell
                      className={classes.tableheadrow}
                      align="left"
                    ></TableCell>
                  </TableRow>
                ) : null}
                {isDebit ? (
                  <TableRow>
                    <TableCell
                      className={classes.tableheadrow}
                      align="left"
                      width="20%"
                    ></TableCell>
                    <TableCell align="left">Total Amount:</TableCell>
                    <TableCell align="left">
                      {numberFormat(paymentAmountWithFees)}
                    </TableCell>
                    <TableCell
                      className={classes.tableheadrow}
                      align="left"
                    ></TableCell>
                  </TableRow>
                ) : null}
                <TableRow>
                  <TableCell
                    className={classes.tableheadrow}
                    align="left"
                    width="20%"
                  ></TableCell>
                  <TableCell align="left">Payment Date:</TableCell>
                  <TableCell align="left">
                    {Moment(paymentDatepicker).format("MM/DD/YYYY")}
                  </TableCell>
                  <TableCell
                    className={classes.tableheadrow}
                    align="left"
                  ></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    className={classes.tableheadrow}
                    align="left"
                    width="20%"
                  ></TableCell>
                  <TableCell className={classes.tableheadrow} align="left">
                    Account Number:
                  </TableCell>
                  <TableCell align="left">{accntNo}</TableCell>
                  <TableCell
                    className={classes.tableheadrow}
                    align="left"
                  ></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography className={classes.dialogHeading}>
            Confirm Your Payment?
          </Typography>
        </DialogContent>

        <DialogActions className={` ${classes.dialogActionStyle}`}>
          <Grid container className="buttonsWrap">
            <Grid container className="schedulePopup">
              <ButtonSecondary
                stylebutton='{"background": "", "color":"","margin": "0px 10px 0px 0px" }'
                onClick={handlePaymentClose}
              >
                Cancel
              </ButtonSecondary>
            </Grid>
            {paymentIsScheduled === "no" ? (
              <Grid container className="autoPayButtons">
                <ButtonPrimary
                  stylebutton='{"background": "", "color":"","margin": "0px 10px 0px 0px" }'
                  onClick={handleSchedulePaymentSubmit}
                  disabled={loading}
                >
                  {checkAutoPay
                    ? globalMessages.Keep_Autopay_On_Schedule
                    : "OK"}
                  <AutorenewIcon
                    className="rotatingIcon"
                    style={{
                      display: loading ? "block" : "none",
                    }}
                  />
                </ButtonPrimary>
                {checkAutoPay ? (
                  <ButtonPrimary
                    stylebutton='{"background": "", "color":"","margin": "0px 10px 0px 0px" }'
                    onClick={disableAutoPayAndSchedulePayment}
                    disabled={loading}
                  >
                    Turn off auto pay and Schedule a payment
                    <AutorenewIcon
                      className="rotatingIcon"
                      style={{
                        display: loading ? "block" : "none",
                      }}
                    />
                  </ButtonPrimary>
                ) : null}
              </Grid>
            ) : null}

            {paymentIsScheduled === "yes" ? (
              <ButtonPrimary
                id="replaceCurrentButton"
                stylebutton='{"background": "", "color":""}'
                onClick={handleSchedulePaymentSubmit}
                disabled={loading}
              >
                Replace current scheduled payment
                <AutorenewIcon
                  className="rotatingIcon"
                  style={{
                    display: loading ? "block" : "none",
                  }}
                />
              </ButtonPrimary>
            ) : null}

            {paymentIsScheduled === "yes" && isFutureDate === "no" ? (
              <ButtonSecondary
                stylebutton='{"background": "", "color":"" }'
                onClick={handleSchedulePaymentSubmitKeep}
                disabled={loading}
              >
                Keep scheduled payment and make this payment
                <AutorenewIcon
                  className="rotatingIcon"
                  style={{
                    display: loading ? "block" : "none",
                  }}
                />
              </ButtonSecondary>
            ) : null}
          </Grid>
        </DialogActions>
      </Dialog>

      {/* **************Auto pay schedule payment modal******************* */}

      <Dialog
        id="deletePayment"
        open={openDeleteSchedule}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="deleteDialogHeading">
          <IconButton
            id="deleteClose"
            aria-label="close"
            className={classes.closeButton}
            onClick={handleDeleteScheduleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography id="deleteTxt" className={classes.dialogHeading}>
            Are you sure you want to delete the scheduled payment ?
          </Typography>
        </DialogContent>

        <DialogActions className={classes.dialogActionStyle}>
          <ButtonSecondary
            stylebutton='{"background": "", "color":"" }'
            onClick={handleDeleteScheduleClose}
          >
            No
          </ButtonSecondary>
          <ButtonPrimary
            stylebutton='{"background": "", "color":"" }'
            onClick={handleDeleteSchedule}
            disabled={loading}
          >
            Yes
            <AutorenewIcon
              className="rotatingIcon"
              style={{
                display: loading ? "block" : "none",
              }}
            />
          </ButtonPrimary>
        </DialogActions>
      </Dialog>

      {/* **************Auto pay terms & condition modal******************* */}

      <Dialog
        open={openAutoPay}
        onClose={handleAutoPayClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          AUTO PAY AUTHORIZATION
        </DialogTitle>
        <DialogContent>
          <p className={classes.autoPayContent}>
            As used in this authorization, the words, “I,” “MY,” and “ME” refer
            to the borrower agreeing to the terms of this authorization, and the
            word “YOU” refers to Mariner Finance, LLC (and its subsidiaries and
            affiliates) (collectively “Lender”).
          </p>
          <p className={classes.autoPayContent}>
            I hereby authorize and direct Lender to initiate periodic debit
            entries for my scheduled loan payments from the bank account
            information provided to Lender. I agree that debit entries will be
            made on my scheduled due date (as specified in my loan documents).
            Changes made to my account or banking information must be received
            by Lender at least three (3) business days prior to the payment due
            date.
          </p>
          <p className={classes.autoPayContent}>
            If the first scheduled payment is an extended due date payment, then
            the first drafted payment amount may differ from the contractually
            agreed upon amount due each month. If any scheduled debit amount is
            greater than the outstanding balance of the loan, the scheduled
            payment will be debited in full and a check in the amount of the
            overpayment will be issued and mailed to me.
          </p>
          <p className={classes.autoPayContent}>
            Lender may cancel my automatic payment enrollment if any automatic
            payment is returned unpaid by my financial institution. Lender may
            also cancel the automatic payment service for any reason and will
            notify me if such an action takes place. The automatic payment
            amount will only be reduced or canceled to avoid creating a credit
            balance on the account.
          </p>
          <p className={classes.autoPayContent}>
            Further, I understand and agree that if my account at the depository
            financial institution provided does not have sufficient funds to
            make my loan payment, Lender will not be responsible or liable for
            any penalties or charges assessed by any other financial institution
            as a result of such insufficiency. I acknowledge that, in the event
            Lender’s additional attempts to collect my payment via EFT‐ACH are
            unsuccessful, I must make my loan payment by other means. I
            understand that a fee may be assessed by Lender in accordance with
            the terms of my loan agreement as a result of my account at the
            depository financial institution listed below having insufficient
            funds.
          </p>
          <p className={classes.autoPayContent}>
            Termination: I have the right to stop payment of preauthorized
            transfers from my account by notifying Lender, verbally or in
            writing at the mailing address or email address noted below; any
            such notification must be received by Lender at any time up to three
            (3) business days before the scheduled date of the transfer. If the
            debit item is resubmitted, Lender must continue to honor the stop
            payment order.
          </p>
          <p className={classes.autoPayContent}>
            I may terminate this authorization at any time (i) through the
            Customer Account Center; (ii) by providing written notice to Lender
            at Mariner Finance, LLC, 8211 Town Center Drive, Nottingham, MD
            21236, Attn: Servicing; or (iii) by providing written notice to the
            following email address:{" "}
            <a href="mailto:recurringpymtoptout@marinerfinance.com">
              recurringpymtoptout@marinerfinance.com
            </a>
            .
          </p>
          <p className={classes.autoPayContent}>
            This authorization will remain in effect until the underlying
            obligation to you is satisfied OR you receive written notification
            from me of termination of this authorization and you have reasonable
            time to act upon it, whichever comes first.
          </p>
        </DialogContent>
        <DialogActions>
          <ButtonPrimary
            stylebutton='{"background": "", "color":"" }'
            onClick={handleAutoPayClose}
          >
            OK
          </ButtonPrimary>
        </DialogActions>
      </Dialog>
    </div>
  );
}
