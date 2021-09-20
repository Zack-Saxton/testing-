import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Link, NavLink} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ScrollToTopOnMount from "../scrollToTop";
import "./makepayment.css";


import {
    ButtonPrimary,
    ButtonSecondary,
    ButtonSwitch,
    ButtonWithIcon,
    DatePicker,
    Select,
    TextField,
} from "../../FormsUI";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,
  },
  heading: {
    color: "#fff",
    fontWeight: "400",
    fontSize: "1.64rem",
    paddingLeft:"7px",
    paddingBottom:"25px"
  },
  table: {
    minWidth: 650,
    paddingBottom: "5px",
    paddingTop:"5px"
  },
  tableHead: {
    color: "#171717!important",
    fontWeight: "600",
    fontSize: "1rem",
  },
  tableHeadRow: {
    color: "#171717!important",
    fontSize: "15px",
  },
  cardHeading: {
    color: "#171717!important",
    fontSize: "18px",
    fontWeight: "600",
  },
  autoPayLink: {
    fontSize: "15px",
    textDecoration: "none",
    color: "blue",
  },
  autoPayContent: {
    fontSize: "15px",
    textAlign: "justify",
    color: "#595959",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#171717!important",
  },
  dialogPaper: {
    width: "60%",
    left: 10,
    bottom: 200,
    maxWidth: "unset",
  },
  dialogHeading: {
    color: "#171717!important",
    fontWeight: "400",
    fontSize: "1.64rem",
    textAlign: "center",
  },
  endMessage: {
    color: "#595959",
    paddingTop: "40px",
  },
 
}));

function createData(
  accountNumber,
  regularAmount,
  interest,
  loanFee,
  total,
  dueDate,
  schedulePayment,
  autoPay,name
) {
  return {
    accountNumber,
    regularAmount,
    interest,
    loanFee,
    total,
    dueDate,
    schedulePayment,
    autoPay,name
  };
}

const rows = [
  createData(
    "1222-052502-11",
    "$833.34",
    "$88.18",
    "NA",
    "$921.51",
    "03/07/2020",
    "None",
    "Disabled","ariana grande"
  ),
];

const paymentMaxDate = new Date();
paymentMaxDate.setDate(paymentMaxDate.getDate() + 30);

export default function MakePayment() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openPayment, setPaymentOpen] = React.useState(false);
  const [openAutoPay, setAutoPayOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePaymentClickOpen = () => {
    setPaymentOpen(true);
  };

  const handlePaymentClose = () => {
    setPaymentOpen(false);
  };

  const handleAutoPayClickOpen = () => {
    setAutoPayOpen(true);
  };

  const handleAutoPayClose = () => {
    setAutoPayOpen(false);
  };

  return (
    <div>
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
        <Grid container  direction ="row" item xs={12}>
          <Grid item xs={12} sm={6}  style={{ width:"100%" }}
  container direction ="row">
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

        <Grid item xs={12} style={{ paddingBottom: "10px" }}>
          {/* <Paper className={classes.paper} >
                <p >Page Under Development </p>
             
            </Paper> */}
          <TableContainer component={Paper}>
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
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell
                      component="th"
                      className={classes.tableHeadRow}
                      scope="row"
                    >
                      {row.accountNumber}
                    </TableCell>
                    <TableCell className={classes.tableHeadRow} align="left">
                      {row.regularAmount}
                    </TableCell>
                    <TableCell className={classes.tableHeadRow} align="left">
                      {row.interest}
                    </TableCell>
                    <TableCell className={classes.tableHeadRow} align="left">
                      {row.loanFee}
                    </TableCell>
                    <TableCell className={classes.tableHeadRow} align="left">
                      {row.total}
                    </TableCell>
                    <TableCell className={classes.tableHeadRow} align="left">
                      {row.dueDate}
                    </TableCell>
                    <TableCell className={classes.tableHeadRow} align="left">
                      {row.schedulePayment}
                    </TableCell>
                    <TableCell className={classes.tableHeadRow} align="left">
                      {row.autoPay}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}
          style={{ width:"100%",padding: "5px" }}
        >
          <Paper className={classes.paper}>
            <Typography className={classes.cardHeading}>
              Pay From
            </Typography>

            <Select
              name="select"
              labelform="Accounts"
              select='[{"value":"Saving"}, {"value":"Checking"},  {"value":"Debit"}]'
            />

            <Grid item xs={12} style={{ paddingTop: "20px" }}>
              <ButtonSecondary stylebutton='{"background": "", "color":"" }'>
                Add a payment method
              </ButtonSecondary>
            </Grid>
          </Paper>
        </Grid>
        {/* ************************************************************************/}
        {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
        <Grid
          item
          xs={12}
          sm={8}
          style={{ width:"100%", padding: "5px" }}
        >
          <Paper className={classes.paper}>
            <Grid item xs={12}>
              <Typography className={classes.cardHeading}>
                Payment Mode
              </Typography>

              <p style={{ margin: "auto" }}>
                <small>Choose auto pay</small>
              </p>
              <ButtonSwitch
                value="switch"
                label="Auto pay is"
                labelPlacement="end"
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
                  id="make-payment-submit-button"
                  onClick={handleClickOpen}
                >
                  Submit
                </ButtonPrimary>
              </Grid>
            </Grid>

            <Typography className={classes.cardHeading} >
              Single Payment
            </Typography>
            <TextField
              name="payment"
              label="Payment Amount"
              type="text"
              materialProps={{ defaultValue: "$930" }}
              disabled={true}
            />

            <Grid
              item
              xs={12}
               container direction ="row"
              style={{ display: "inline-flex", paddingTop: "10px" }}
            >
              <DatePicker
                name="date"
                label="Payment Date"
                placeholder="MM/DD/YYYY"
                id="date"
                disablePast
                maxdate={paymentMaxDate}
                minyear={4}
              />
            </Grid>

            <Grid container  direction ="row" style={{ paddingTop: "25px" }}>
              <Grid
                item
                xs={12}
                // sm={4}
                md={4}
                lg={3}
                 container direction ="row"
                id="make-payment-cancel-button-grid"
              >
                <ButtonSecondary
                  stylebutton='{"marginRight": "20px" }'
                  styleicon='{ "color":"" }'
                  id="make-payment-cancel-button"
                >
                  Cancel Payment
                </ButtonSecondary>
              </Grid>

              <Grid
                item
                xs={12}
                // sm={6}
                md={4}
                lg={3}
                 container direction ="row"
              >
                <ButtonPrimary
                  stylebutton='{"marginRight": "" }'
                  id="make-payment-schedule-button"
                  onClick={handlePaymentClickOpen}
                >
                  Schedule Payment
                </ButtonPrimary>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <p className={classes.endMessage}>
            {" "}
            <small>
              If you have questions or would like to obtain a payoff balance on
              your loan, please contact your local branch listed on your my
              Branch Page.
            </small>
            <br/>
            <small>
              Mariner Finance accepts either ACH Bank Account or Debit Card
              Payments.
            </small>
          </p>
        </Grid>
      </Grid>

      {/* **************Auto pay submit modal******************* */}

      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title-autoPay"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="alert-dialog-title">
          <Typography className={classes.dialogHeading}>
            Are you sure you want to enable auto pay ?
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogActions style={{ justifyContent: "center" }}>
          <ButtonSecondary
            stylebutton='{"background": "", "color":"" }'
            onClick={handleClose}
          >
            No
          </ButtonSecondary>
          <ButtonPrimary
            stylebutton='{"background": "", "color":"" }'
            onClick={handleClose}
          >
            yes
          </ButtonPrimary>
        </DialogActions>
      </Dialog>

      {/* **************Auto pay schedule payment modal******************* */}

      <Dialog
        open={openPayment}
        // onClose={handlePaymentClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="alert-dialog-title">
          <Typography className={classes.dialogHeading}>
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

        <DialogActions style={{ justifyContent: "center" }}>
          <ButtonSecondary
            stylebutton='{"background": "", "color":"" }'
            onClick={handlePaymentClose}
          >
            No
          </ButtonSecondary>
          <ButtonPrimary
            stylebutton='{"background": "", "color":"" }'
            onClick={handlePaymentClose}
          >
            Yes
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
