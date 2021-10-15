import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { toast } from 'react-toastify';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link, NavLink } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ScrollToTopOnMount from "../ScrollToTop";
import { useStylesMakePayment } from "./Style";
import { CircularProgress, FormControlLabel } from '@material-ui/core';
import "./MakePayment.css";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonWithIcon,
  DatePicker,
  Select,
  TextField,
} from "../../FormsUI";
import usrAccountDetails from "../../Controllers/AccountOverviewController";
import { usrPaymentMethods, enableAutoPay, disableAutoPay, makePayment, deleteScheduledPayment } from "../../Controllers/PaymentsController";
import CheckLoginStatus from "../../App/CheckLoginStatus";
import PaymentOverview from "./PaymentOverview";
import Switch from "@material-ui/core/Switch";
import Moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const paymentMaxDate = new Date();
paymentMaxDate.setDate(paymentMaxDate.getDate() + 30);

export default function MakePayment() {
  //Material UI css class
  const classes = useStylesMakePayment();

  const [paymentMethods, setpaymentMethod] = useState(null);
  const [latestLoanData, setlatestLoanData] = useState(null);
  const [paymentAmount, setpaymentAmount] = useState(null);
  const [open, setOpen] = useState(false);
  const [openPayment, setPaymentOpen] = useState(false);
  const [openDeleteSchedule, setopenDeleteSchedule] = useState(false);
  const [openAutoPay, setAutoPayOpen] = useState(false);
  const [card, setcard] = useState('');
  const [disabledContent, setdisabledContent] = useState(false);
  const [isDebit, setisDebit] = useState(false);
  const [accntNo, setaccntNo] = useState(null);
  const [paymentDate, setpaymentDate] = useState(null);
  const [paymentDatepicker, setpaymentDatepicker] = useState(null);
  const [requiredSelect, setrequiredSelect] = useState("");
  const [requiredDate, setrequiredDate] = useState("");
  const [showCircularProgress, setshowCircularProgress] = useState(false);
  const [loading, setLoading] = useState(false);

  //API Request for Payment methods
  async function getPaymentMethods(usrAccNo) {
    setpaymentMethod(await usrPaymentMethods(usrAccNo));
  }

  //Enable auto payment
  async function enableAutoPayment(accntNo, card, paymentDate, isDebit) {
    let data = await enableAutoPay(accntNo, card, paymentDate, isDebit)
    data.data.status === 200 ?
      data.data.data.paymentResult.HasNoErrors === true ? toast.success('Auto Payment mode Enabled', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
      ) : toast.error('Failed Payment mode', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      }) : toast.error(data?.data?.response?.data?.data?.message ? data.data.response.data.data.message : 'Failed Payment mode', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })

    hasSchedulePayment ? (data.data.status === 200 ? deleteSchedule(accntNo, routingNumber) : getData()) : getData()
  }
  //Disable auto payment
  async function disableAutoPayment(accntNo, card, paymentDate, isDebit) {
    let data = await disableAutoPay(accntNo, card, paymentDate, isDebit);
    data.data.status === 200 ?
      data.data.data.deletePayment.HasNoErrors === true ? toast.success('Auto Payment mode Disabled', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
      ) : toast.error('Failed Payment mode', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      }) : toast.error(data?.data?.response?.data?.data?.message ? data.data.response.data.data.message : 'Failed Payment mode', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    getData()
  }

  //Enable scheduled payment
  async function makeuserPayment(accntNo, card, paymentDatepicker, isDebit, paymentAmount) {
    setPaymentOpen(false)
    let data = await makePayment(accntNo, card, paymentDatepicker, isDebit, paymentAmount);
    data.data.status === 200 ?
      data?.data?.data?.paymentResult?.PaymentCompleted !== undefined ? toast.success('Payment has been scheduled', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
      ) : toast.error('Failed Payment mode', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      }) : toast.error(data?.data?.response?.data?.data?.message ? data.data.response.data.data.message : 'Failed Payment mode', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    data.data.status === 200 ? disableAutoPaymentScheduled(accntNo, card, paymentDate, isDebit) : getData()

  }

  //Disable scheduled payment
  async function deletePayment(accntNo, refNo) {

    let data = await deleteScheduledPayment(accntNo, refNo, isCard);
    data.data.status === 200 ?
      data.data.data.deletePaymentMethod.HasNoErrors === true ? toast.success('Scheduled Payment cancelled', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
      ) : toast.error('Failed Payment mode', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      }) : toast.error(data?.data?.response?.data?.data?.message ? data.data.response.data.data.message : 'Failed Payment mode', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
  }


  // Disable auto payment while make payment
  async function disableAutoPaymentScheduled(accntNo, card, paymentDate, isDebit) {
    await disableAutoPay(accntNo, card, paymentDate, isDebit);
    getData()
  }

  // Disable Sheduled payment while make recuiring payment
  async function deleteSchedule(accntNo, refNo) {
    await deleteScheduledPayment(accntNo, refNo);
    getData()
  }

  //API Request for Account Details
  async function getData (){
   setshowCircularProgress(true)
   let User= await usrAccountDetails();
   let activeLoansData = (User != null) ? User.data.data.activeLoans : null;
   setlatestLoanData(activeLoansData != null ? activeLoansData.slice(0, 1) : null)
   let latestLoan = (activeLoansData != null) ? activeLoansData.slice(0, 1) : null;
   setpaymentAmount(activeLoansData.length ? latestLoan != null ? (Math.abs(latestLoan[0].loanPaymentInformation.accountDetails.RegularPaymentAmount) + Math.abs(latestLoan[0].loanPaymentInformation.accountDetails.InterestRate) + Math.abs(latestLoan[0].loanPaymentInformation.accountDetails.LoanFeesAndCharges)).toFixed(2) : null: null)
   let accoutNo = activeLoansData.length?(latestLoan != null) ? latestLoan[0].loanData.accountNumber : null :[]
   setaccntNo(activeLoansData.length ?( latestLoan != null) ? latestLoan[0].loanData.accountNumber : null: null)
   getPaymentMethods(accoutNo)
   setdisabledContent(activeLoansData.length ?latestLoan != null ? ((latestLoan[0].loanPaymentInformation.appRecurringACHPayment)? true : false) : false : false)
   setpaymentDate(activeLoansData.length ? latestLoan != null ? (Moment(latestLoan[0].loanPaymentInformation.accountDetails.NextDueDate).format("YYYY-MM-DD") ) : "NONE" : "NONE")
   let scheduledDate = (latestLoan.length) ? ( latestLoan[0].loanPaymentInformation.hasScheduledPayment) ? Moment(latestLoan[0].loanPaymentInformation.scheduledPayments[0].PaymentDate).format("MM/DD/YYYY") : null :null
   setpaymentDatepicker(scheduledDate)
   setLoading(false);
   setshowCircularProgress(false)
  }

  useEffect(() => {
    getData()
  }, []);

  //Account select payment options
  let paymentData  = paymentMethods != null ? paymentMethods.data.data: null;

  let paymentListAch =(paymentData && paymentData.achAccounts!=null) ? paymentData.achAccounts.map(
      pdata => ({value: pdata.SequenceNumber, label: pdata.AccountType+ " (****" + pdata.AccountNumber.substr(-4) +")"}),
  ) :  null;
 
  let paymentListCard =(paymentData && paymentData.achAccounts!=null) ? paymentData.cardAccounts.map(
    pdata => ({value: pdata.ProfileId, label: pdata.CardType+ " (****" + pdata.LastFour +")"}),
  ) :  null;
 
 const paymentOptions =  (paymentListAch != null) ? JSON.stringify(paymentListAch.concat(paymentListCard)): null;

 //Storing the routingNumber,refNumber and SchedulePayments details
 let hasSchedulePayment =  (latestLoanData != null) ? (latestLoanData.length ? latestLoanData[0].loanPaymentInformation.hasScheduledPayment: false) : false;
 let routingNumber = (latestLoanData != null) ? latestLoanData[0]?.loanPaymentInformation?.scheduledPayments[0]?.PaymentMethod?.AchInfo !=null ? latestLoanData[0].loanPaymentInformation.scheduledPayments[0].PaymentMethod.AchInfo.RoutingNumber: 0:0;
 let refNumber = (latestLoanData != null) ? latestLoanData[0]?.loanPaymentInformation?.scheduledPayments[0]?.ReferenceNumber !=null ? latestLoanData[0].loanPaymentInformation.scheduledPayments[0].ReferenceNumber: 0:0;
 let isCard = (latestLoanData != null) ? latestLoanData[0]?.loanPaymentInformation?.scheduledPayments[0]?.PaymentMethod?.IsCard === true ? latestLoanData[0].loanPaymentInformation.scheduledPayments[0].PaymentMethod.IsCard: false:false;
 
  //Select account
  const handleChangeSelect = (event) => {
    setcard(event.target.value);
    event.nativeEvent.target.innerText.includes('Checking') || event.nativeEvent.target.innerText.includes('Savings') ? setisDebit(false) : setisDebit(true) //true
    setrequiredSelect('')
  };

  //Autopay enable/disable switch
  const handleSwitchPayment = (event) => {
    setdisabledContent(event.target.checked)
  };

  //Autopay submit
  const handleClickSubmit = () => {
    disabledContent === true ? card || card === 0 ? setOpen(true) : setrequiredSelect('Please select any accounts') : setOpen(true)
  };

  //Autopay popup confirm and close
  async function handleAutoPayConfirm() {
    setLoading(true);
    setshowCircularProgress(true)
    disabledContent === true ? enableAutoPayment(accntNo, card, paymentDate, isDebit) : disableAutoPayment(accntNo, card, paymentDate, isDebit)
    setOpen(false)
  }

  const handleCloseAutoPayPopup = () => {
    setOpen(false)
  };

  //Cancel Schedule popup confirm and close
  async function handleDeleteSchedule() {
    setLoading(true);
    setshowCircularProgress(true)
    isCard === true ? deletePayment(accntNo, refNumber) : deletePayment(accntNo, routingNumber)
    setrequiredDate('')
    setrequiredSelect('')
    setpaymentDatepicker(null)
    setopenDeleteSchedule(false)
    getData()
  }

  const handleDeleteScheduleClose = () => {
    setopenDeleteSchedule(false)
  };

  //Schedule Payment
  const handleSchedulePaymentClick = () => {
    card || card === 0 ? (paymentDatepicker != null) ? setPaymentOpen(true) : setrequiredDate('Please select any date') : setrequiredSelect('Please select any account')
    card || card === 0 ? (paymentDatepicker != null) ? setPaymentOpen(true) : document.getElementById("date").focus() : document.getElementById("select").focus()
  };

  //Cancel Payment
  const handlePaymentcancel = () => {
    setopenDeleteSchedule(true)
  };

  //Schedule Payment popup confirm and close
  const handleSchedulePaymentSubmit = () => {
    setLoading(true);
    setshowCircularProgress(true)
    makeuserPayment(accntNo, card, paymentDatepicker, isDebit, paymentAmount)
  };

  const handlePaymentClose = () => {
    setPaymentOpen(false)
  };


  //AUTO PAY AUTHORIZATION pop up open and close
  const handleAutoPayClickOpen = () => {
    setAutoPayOpen(true)
  };

  const handleAutoPayClose = () => {
    setAutoPayOpen(false)
  };

  //US Holidays
  function disableWeekends(date) {
    const dateInterditesRaw = [
      new Date(date.getFullYear(), 0, 1),
      new Date(date.getFullYear(), 0, 18),
      new Date(date.getFullYear(), 4, 31),
      new Date(date.getFullYear(), 6, 5),
      new Date(date.getFullYear(), 8, 6),
      new Date(date.getFullYear(), 10, 11),
      new Date(date.getFullYear(), 10, 25),
      new Date(date.getFullYear(), 11, 24),
      new Date(date.getFullYear(), 11, 31),
    ];
    const dateInterdites = dateInterditesRaw.map((arrVal) => {
      return arrVal.getTime()
    });
    return date.getDay() === 0 || dateInterdites.includes(date.getTime());

  }

  //View
  return (
    <div>
      <CheckLoginStatus/>
      <ScrollToTopOnMount />
      <Grid
        container
        justifyContent={"center"}
        style={{
          marginTop: "-150px",
          paddingRight: "30px",
          paddingLeft: "30px",
        }}
      >
        <Grid container direction="row" item xs={12}>
          <Grid item xs={12} sm={6} style={{ width: "100%" }}
            container direction="row">
            <Typography className={classes.heading} variant="h3">
              <NavLink
                to="/customers/accountOverview"
                style={{ textDecoration: "none" }}
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
              </NavLink>{" "}
              Make a Payment
            </Typography>
          </Grid>
        </Grid>
        {showCircularProgress === true ? (
          <Grid item xs={12} style={{ paddingTop: "30px", paddingBottom: "30px" }}>
            <TableContainer id="pdfdiv" component={Paper}>

              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHead}>
                      Account Number
                    </TableCell>
                    <TableCell className={classes.tableHead} align="left">
                      Regular Amount
                    </TableCell>
                    <TableCell className={classes.tableHead} align="left">
                      Interest
                    </TableCell>
                    <TableCell className={classes.tableHead} align="left">
                      Loan Fees
                    </TableCell>
                    <TableCell className={classes.tableHead} align="left">
                      Total
                    </TableCell>
                    <TableCell className={classes.tableHead} align="left">
                      Next Due Date
                    </TableCell>
                    <TableCell className={classes.tableHead} align="left">
                      Scheduled Payment
                    </TableCell>
                    <TableCell className={classes.tableHead} align="left">
                      Auto Pay
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
          </Grid>)
          :
          <Grid item xs={12} style={{ paddingBottom: "10px" }}>
            <TableContainer component={Paper}>
              <PaymentOverview overview={latestLoanData} />
            </TableContainer>
          </Grid>}
        {latestLoanData != null ? latestLoanData.length ?
          <>

            <Grid
              item
              xs={12}
              sm={4}
              style={{ width: "100%", padding: "5px" }}
            >
              <Paper className={classes.paper}>
                <Typography className={classes.cardHeading}>
                  Pay From
                </Typography>
                {paymentOptions != null ?
                  <Select
                    id="select"
                    name="select"
                    labelform="Accounts"
                    select={paymentOptions}
                    onChange={handleChangeSelect}
                    value={card}
                  /> :
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress size={30} />
                  </div>
                }
                <p className={requiredSelect !== "" ? "showError add Pad" : "hideError"} data-testid="subtitle" >
                  {" "}  Please select any accounts.
                </p>

                <Grid item xs={12} style={{ paddingTop: "20px" }}>
                  <ButtonSecondary stylebutton='{"background": "", "color":"" }'>
                    Add a payment method
                  </ButtonSecondary>
                </Grid>
              </Paper>
            </Grid>

            <Grid
              item
              xs={12}
              sm={8}
              style={{ width: "100%", padding: "5px" }}
            >

              <Paper className={classes.paper}>
                {paymentOptions !== null && showCircularProgress !== true ?
                  <div>
                    <Grid item xs={12}>
                      <Typography className={classes.cardHeading}>
                        Payment Mode
                      </Typography>
                      <p style={{ margin: "auto" }}>
                        <small> {disabledContent ? " Auto pay is ON" : "Auto pay is Off"}</small>
                      </p>

                      <p style={{ margin: "auto" }}>
                        <small>Choose auto pay</small>
                      </p>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={disabledContent}
                            onChange={handleSwitchPayment}
                            value={disabledContent}
                            inputProps={{ "data-test-id": "switch" }}
                            color="primary"
                          />
                        }
                        labelPlacement='end'
                        label={disabledContent ? " Auto pay is ON" : "Auto pay is Off"}
                      />
                      <p>
                        By enabling Auto Pay mode, I acknowledge to have read,
                        understood, and agree to the terms of the &nbsp;
                        <Link to="#"
                          onClick={handleAutoPayClickOpen}
                          className={classes.autoPayLink}
                        >
                          Auto Pay Authorization
                        </Link>
                      </p>

                      <Grid item xs={12} style={{ paddingBottom: "20px" }}>
                        <ButtonPrimary
                          stylebutton='{"background": "", "color":"" }'
                          id="submitBtn"
                          onClick={handleClickSubmit}
                        >
                          Submit
                        </ButtonPrimary>

                      </Grid>
                    </Grid>
                    <Grid item xs={12}
                      style={{
                        opacity: disabledContent ? 0.25 : 1,
                        pointerEvents: disabledContent ? "none" : "initial"
                      }}>
                      <Typography className={classes.cardHeading}>
                        Single Payment
                      </Typography>
                      <TextField
                        name="payment"
                        label="Payment Amount"
                        type="text"
                        materialProps={{ defaultValue: '$' + paymentAmount }}
                        disabled={true}
                      />

                      <Grid
                        item
                        xs={12}
                        container 
                        direction="row"
                        style={{ display: "inline-flex", paddingTop: "10px" }}
                      >
                        <DatePicker
                          name="date"
                          label="Payment Date"
                          placeholder="MM/DD/YYYY"
                          id="date"
                          disablePast
                          autoComplete="off"
                          maxdate={paymentMaxDate}
                          onKeyDown={(e)=> e.preventDefault()}
                          shouldDisableDate={disableWeekends}
                          minyear={4}
                          onChange={(paymentDatepicker) => {
                            setpaymentDatepicker(Moment(paymentDatepicker).format("YYYY-MM-DD"));
                            setrequiredDate('')
                          }}
                          value={paymentDatepicker}
                        />
                        <p className={requiredDate !== "" ? "showError add Pad" : "hideError"} data-testid="subtitle" >
                          {" "}  Please select date
                        </p>
                      </Grid>

                      <Grid  id="paymentBtnWrap"  style={{ paddingTop: "25px" }}>
                        <Grid id="make-payment-cancel-button-grid">
                          <ButtonSecondary
                            stylebutton='{}'
                            styleicon='{ "color":"" }'
                            id="cancelPaymentBtn"
                            onClick={handlePaymentcancel}
                            disabled={!hasSchedulePayment}
                          >
                            Cancel Payment
                          </ButtonSecondary>
                        </Grid>

                        <Grid
                         
                        >
                          <ButtonPrimary
                            stylebutton='{"marginRight": "" }'
                            id="make-payment-schedule-button"
                            onClick={handleSchedulePaymentClick}
                            disabled={hasSchedulePayment}
                          >
                            Schedule Payment
                          </ButtonPrimary>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div> :
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                  </div>}
              </Paper>

            </Grid>
          </>
          : '' : ''}
        <Grid item xs={12}>
          <p className={classes.endMessage}>
            {" "}
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

      {/* **************Auto pay submit modal******************* */}

      <Dialog
        id="autopayDialogBox"
        // onClose={handleCloseAutoPayPopup}
        open={open}
        aria-labelledby="alert-dialog-title-autoPay"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle  id="autopayText">
          <Typography id="autoTxt"  className={classes.dialogHeading}>
            {disabledContent === false ? "Are you sure you want to disable auto pay ?" : "Are you sure you want to enable auto pay ?"}
          </Typography>
          <IconButton
           id="autopayCloseBtn"
            aria-label="close"
            className={classes.closeButton}
            onClick={handleCloseAutoPayPopup}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogActions style={{ justifyContent: "center", marginBottom:"25px" }}>
          <ButtonSecondary
            stylebutton='{"background": "", "color":"" }'
            onClick={handleCloseAutoPayPopup}
          >
            No
          </ButtonSecondary>
          <ButtonPrimary
            stylebutton='{"background": "", "color":"" }'
            onClick={handleAutoPayConfirm}
            disabled={loading}
          >
            Yes
            <i
              className="fa fa-refresh fa-spin customSpinner"
              style={{
                marginRight: "10px",
                color: "blue",
                display: loading ? "block" : "none",
              }}
            />
          </ButtonPrimary>
        </DialogActions>
      </Dialog>

      {/* **************Auto pay schedule payment modal******************* */}

      <Dialog
        open={openPayment}
        id="scheduleDialogBox"
        // onClose={handlePaymentClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="scheduleDialogHeading">
          <Typography id="scheduleTxt" className={classes.dialogHeading}>
            Are you sure you want to schedule a payment ?
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handlePaymentClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogActions style={{ justifyContent: "center",marginBottom:"25px" }}>
          <ButtonSecondary
            stylebutton='{"background": "", "color":"" }'
            onClick={handlePaymentClose}
          >
            No
          </ButtonSecondary>
          <ButtonPrimary
            stylebutton='{"background": "", "color":"" }'
            onClick={handleSchedulePaymentSubmit}
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



      {/* **************Auto pay schedule payment modal******************* */}

      <Dialog
        id="deletePayment"
        open={openDeleteSchedule}
        // onClose={handlePaymentClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="deleteDialogHeading" >
          <Typography  id="deleteTxt" className={classes.dialogHeading}>
            Are you sure you want to delete the scheduled payment ?
          </Typography>
          <IconButton
            id="deleteClose"
            aria-label="close"
            className={classes.closeButton}
            onClick={handleDeleteScheduleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogActions style={{ justifyContent: "center", marginBottom:"25px" }}>
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
          <DialogContentText
            id="alert-dialog-description"
            style={{ fontSize: "12px" }}
          >
            <p className={classes.autoPayContent}>
              As used in this authorization, the words, “I,” “MY,” and “ME”
              refer to the borrower agreeing to the terms of this authorization,
              and the word “YOU” refers to Mariner Finance, LLC (and its
              subsidiaries and affiliates) (collectively “Lender”).
            </p>
            <p className={classes.autoPayContent}>
              I hereby authorize and direct Lender to initiate periodic debit
              entries for my scheduled loan payments from the bank account
              information provided to Lender. I agree that debit entries will be
              made on my scheduled due date (as specified in my loan documents).
              Changes made to my account or banking information must be received
              by Lender at least three (3) business days prior to the payment
              due date.
            </p>
            <p className={classes.autoPayContent}>
              If the first scheduled payment is an extended due date payment,
              then the first drafted payment amount may differ from the
              contractually agreed upon amount due each month. If any scheduled
              debit amount is greater than the outstanding balance of the loan,
              the scheduled payment will be debited in full and a check in the
              amount of the overpayment will be issued and mailed to me.
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
            <p className={classes.autoPayContent}>
              Termination: I have the right to stop payment of preauthorized
              transfers from my account by notifying Lender, verbally or in
              writing at the mailing address or email address noted below; any
              such notification must be received by Lender at any time up to
              three (3) business days before the scheduled date of the transfer.
              If the debit item is resubmitted, Lender must continue to honor
              the stop payment order.
            </p>
            <p className={classes.autoPayContent}>
              I may terminate this authorization at any time (i) through the
              Customer Account Center; (ii) by providing written notice to
              Lender at Mariner Finance, LLC, 8211 Town Center Drive,
              Nottingham, MD 21236, Attn: Servicing; or (iii) by providing
              written notice to the following email address:{" "}
              <a href="mailto:recurringpymtoptout@marinerfinance.com">
                recurringpymtoptout@marinerfinance.com
              </a>
              .
            </p>
            <p className={classes.autoPayContent}>
              This authorization will remain in effect until the underlying
              obligation to you is satisfied OR you receive written notification
              from me of termination of this authorization and you have
              reasonable time to act upon it, whichever comes first.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonPrimary
            stylebutton='{"background": "", "color":"" }'
            onClick={handleAutoPayClose}
          >
            Ok
          </ButtonPrimary>
        </DialogActions>
      </Dialog>
    </div>
  );
}