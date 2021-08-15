import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { ButtonWithIcon } from "../../FormsUI";
import ad_banner from "../../../assets/images/adbanner.jpg";
import mortage_banner from "../../../assets/images/Mortgage-Banner.jpg";
import { NavLink } from "react-router-dom";
import Chartist from "react-chartist";
import fillDonut from "chartist-plugin-fill-donut";
import tooltip from 'chartist-plugin-tooltips-updated';
import "./accountoverview.css"

//Styling
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,
  },
  heading: {
    color: "white",
    fontWeight: "normal",
  },
  subheading: {
    color: "#171717",
    fontWeight: "normal",
  },
  table: {
    minWidth: 650,
  },
  brandColor: {
    margin: "auto",
    color: "#0f4eb3",
    fontSize: 25,
    fontWeight: 400,
  },
  enablecolor: {
    margin: "auto",
    color: "#a5ce3b",
    fontSize: 25,
    fontWeight: 400,
  },
  disablecolor: {
    margin: "auto",
    color: "#171717",
    fontSize: 25,
    fontWeight: 400,
  },
}));


//Table data for Active loan
function createData(
  appliedon,
  producttype,
  requestamount,
  loanpurpose,
  status,
  expiredate
) {
  return {
    appliedon,
    producttype,
    requestamount,
    loanpurpose,
    status,
    expiredate,
  };
}


//Table data for Payment
function createPaymentData(date, description, totalamount, balance) {
  return {
    date,
    description,
    totalamount,
    balance,
  };
}

const rowPayHistory = [
  createPaymentData("02/05/2021", "Regular Payment", "$921.50", "$9,000"),
  createPaymentData("02/05/2021", "Regular Payment", "$921.50", "$9,000"),
  createPaymentData("02/05/2021", "Regular Payment", "$921.50", "$9,000"),
];

const rows = [
  createData(
    "02/05/2021",
    "Personal Loan",
    "$10,000",
    "House Repairs",
    "Select Offer",
    "03/07/2020"
  ),
];


//Data for Chart
const LoanAmount = 10000;
const RepaidAmount = 6000;
var intro =  "Loan Amount $" + LoanAmount + " : Repaid Amount $" + RepaidAmount;

const donutChart = {
  labels: [1, 2],
  series: [
    { className: "stroke-blue", meta: intro, value: 60 },
    { className: "stroke", meta: "", value: 40 },
  ],
  
};


//Begin: Login page
export default function AccountOverview() {
  const classes = useStyles();

  const donutOptions = {
    donut: true,
    donutWidth: 8,
    showLabel: false,
    // appendToBody: false,
    showValue: true,
    plugins: [
      fillDonut({
        items: [
          {
            content: '<h5 class="centerheading">$ 6,000</h5>',
          },
        ], 
      }),
      tooltip(
        { appendToBody: true}
      ),
    ],
  };

  //View Part
  return (
    <div>
      <Grid container justify={"center"} style={{ marginTop: "-150px" }}>
        <Grid item xs={10} fullWidth={true} direction="row">
          <Typography>
            <h3 className={classes.heading} data-testid="title">Account Overview</h3>
          </Typography>
        </Grid> 

        {/******************************Image part********************************* */}

        <Grid
          item
          xs={10}
          sm={6}
          fullWidth={true}
          direction="row"
          style={{ padding: "5px" }}
        >
          <Paper className={classes.paper} style={{ height: "85%" }}>
            <img
              src={ad_banner}
              style={{ paddingTop: "35px" }}
              data-testid="background"
              alt="ad_banner"
            />
          </Paper>
        </Grid>
        <Grid
          item
          xs={10}
          sm={4}
          fullWidth={true}
          direction="row"
          style={{ padding: "5px" }}
        >
          <Paper className={classes.paper}>
          <img src={mortage_banner} data-testid="background" alt="mortage_banner" />

          </Paper>
        </Grid>

                {/******************************Active Application with table********************************* */}


        <Grid item xs={10} fullWidth={true} direction="row">
          <Typography>
            <h3 className={classes.subheading} data-testid="subtitle">Active Application</h3>
          </Typography>
        </Grid>

        <Grid item xs={10} style={{ paddingBottom: "10px" }}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "600" }}>
                    Applied on
                  </TableCell>
                  <TableCell style={{ fontWeight: "600" }} align="center">
                    Product Type
                  </TableCell>
                  <TableCell style={{ fontWeight: "600" }} align="center">
                    Requested Amount
                  </TableCell>
                  <TableCell style={{ fontWeight: "600" }} align="center">
                    Loan Purpose
                  </TableCell>
                  <TableCell style={{ fontWeight: "600" }} align="center">
                    Status
                  </TableCell>
                  <TableCell style={{ fontWeight: "600" }} align="center">
                    Expiration Date
                  </TableCell>
                  <TableCell style={{ fontWeight: "600" }} align="center">
                    Resume
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.appliedon}
                    </TableCell>
                    <TableCell align="center">{row.producttype}</TableCell>
                    <TableCell align="center">{row.requestamount}</TableCell>
                    <TableCell align="center">{row.loanpurpose}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">{row.expiredate}</TableCell>
                    <TableCell align="center">
                      {" "}
                      <ButtonWithIcon
                        icon="arrow_forwardIcon"
                        iconposition="left"
                        stylebutton='{"background": "", "color":"" }'
                        styleicon='{ "color":"" }'
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={10} fullWidth={true} direction="row">
          <Typography>
            <h3 className={classes.subheading} data-testid="subtitle">Active Loan</h3>
          </Typography>
        </Grid>

        <Grid
          item
          xs={10}
          sm={7}
          fullWidth={true}
          direction="row"
          style={{ padding: "5px" }}
        >
          <Paper className={classes.paper}  id="activeloangrid" style={{ height: "80%" }}>
            <Grid container spacing={3}>
              <Grid item xs={10} sm={6}>
                <Typography>
                  <h4 style={{ margin: "auto" }}>Next Payment Details</h4>
                </Typography>
              </Grid>
              <Grid item xs={10} sm={6}>
                <ButtonWithIcon
                  icon="account_balance_walletIcon"
                  iconposition="right"
                  stylebutton='{"float": "right", "color":"" }'
                  styleicon='{ "color":"" }'
                >
                  Make a Payment
                </ButtonWithIcon>
              </Grid>
            </Grid>

            <Grid  container spacing={3}>
              <Grid item xs={10} sm={3} s>
                <p>Auto Pay</p>
                <h5 className={classes.enablecolor}>ENABLED </h5>
                <p class="">On due date of every month</p>
              </Grid>

              <Grid item xs={10} sm={3}>
                <p>Regular Amount</p>
                <h5 className={classes.brandColor}>
                  $<span class="addCommaAmount">921.50</span>
                </h5>
                <p class="">Amount may not include all fees</p>
              </Grid>

              <Grid item xs={10} sm={3}>
                <p>Due Date</p>
                <h5 className={classes.brandColor}>03/05/2020</h5>
                <p class="">Due in 28 days</p>
              </Grid>

              <Grid item xs={10} sm={3}>
                <p>Scheduled Payment</p>
                <h5 className={classes.brandColor}>NONE</h5>
                <p class="">No future payment is scheduled</p>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* ************************************************************** */}

        <Grid
          item
          xs={10}
          sm={3}
          fullWidth={true}
          direction="row"
          style={{ padding: "5px" }}
        >
          <Paper className={classes.paper}  style={{ height: "80%" }}>
            <Grid item xs={10}>
              <Typography>
                <h4>Overview</h4>
              </Typography>
              <p style={{ margin: "auto" }}>Account Number</p>
              <p style={{ margin: "auto" }}>
                <b>1222-052502-22</b>
              </p>

              <p style={{ margin: "auto" }}>Opened On/Term</p>
              <p style={{ margin: "auto" }}>
                <b>12/01/2019 / 24 M</b>
              </p>

              <p style={{ margin: "auto" }}>APR</p>
              <p style={{ margin: "auto" }}>
                <b>18%</b>
              </p>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={10} fullWidth={true} direction="row">
          <Typography>
            <h3 className={classes.subheading} data-testid="subtitle">Active Loan</h3>
          </Typography>
        </Grid>

        <Grid
          item
          xs={10}
          sm={7}
          fullWidth={true}
          direction="row"
          style={{ padding: "5px" }}
        >
          <Paper className={classes.paper} id="activeloangrid" style={{ height: "80%" }}>
            <Grid container spacing={3}>
              <Grid item xs={10} sm={6}>
                <Typography>
                  <h4 style={{ margin: "auto" }}>Next Payment Details</h4>
                </Typography>
              </Grid>
              <Grid item xs={10} sm={6}>
                <ButtonWithIcon
                  icon="account_balance_walletIcon"
                  iconposition="right"
                  stylebutton='{"float": "right", "color":"" }'
                  styleicon='{ "color":"" }'
                >
                  Make a Payment
                </ButtonWithIcon>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={10} sm={3} s>
                <p>Auto Pay</p>
                <h5 className={classes.disablecolor}>DISABLED </h5>
                <p class="">On due date of every month</p>
              </Grid>

              <Grid item xs={10} sm={3}>
                <p>Regular Amount</p>
                <h5 className={classes.brandColor}>
                  $<span class="addCommaAmount">921.50</span>
                </h5>
                <p class="">Amount may not include all fees</p>
              </Grid>

              <Grid item xs={10} sm={3}>
                <p>Due Date</p>
                <h5 className={classes.brandColor}>03/05/2020</h5>
                <p class="">Due in 28 days</p>
              </Grid>

              <Grid item xs={10} sm={3}>
                <p>Scheduled Payment</p>
                <h5 className={classes.brandColor}>NONE</h5>
                <p class="">No future payment is scheduled</p>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* ************************************************************** */}

        <Grid
          item
          xs={10}
          sm={3}
          fullWidth={true}
          direction="row"
          style={{ padding: "5px" }}
        >
          <Paper className={classes.paper} style={{ height: "80%" }}>
            <Grid item xs={10}>
              <Typography>
                <h4>Overview</h4>
              </Typography>
              <p style={{ margin: "auto" }}>Account Number</p>
              <p style={{ margin: "auto" }}>
                <b>1222-052502-22</b>
              </p>

              <p style={{ margin: "auto" }}>Opened On/Term</p>
              <p style={{ margin: "auto" }}>
                <b>12/01/2019 / 24 M</b>
              </p>

              <p style={{ margin: "auto" }}>APR</p>
              <p style={{ margin: "auto" }}>
                <b>18%</b>
              </p>
            </Grid>
          </Paper>
        </Grid>

        <Grid
          item
          xs={10}
          sm={3}
          fullWidth={true}
          direction="row"
          style={{ padding: "5px", paddingTop: "20px", paddingBottom: "25px" }}
        >
          <Paper className={classes.paper} style={{ height: "85%" }}>
            <Grid container spacing={3}>
              <Grid item xs={10} sm={6}>
                <Typography>
                  <h4 style={{ margin: "auto" }}>Available Cash</h4>
                </Typography>
              </Grid>
              <Grid item xs={10} sm={6}>
                <ButtonWithIcon
                  stylebutton='{"float": "right", "color":"" }'
                  styleicon='{ "color":"" }'
                >
                  Refinance
                </ButtonWithIcon>
              </Grid>
            </Grid>

           
          <Grid item xs={12} >
          <Chartist data={donutChart} options={donutOptions} type={"Pie"} className="donutchart" />
        
           <p style={{ textAlign: "center" }}>As of 02/22/2021</p>
          </Grid>
   
          </Paper>
        </Grid>

        {/* ************************************************************** */}

        <Grid
          item
          xs={10}
          sm={7}
          fullWidth={true}
          direction="row"
          style={{ padding: "5px", paddingTop: "20px",paddingBottom: "25px" }}
        >
          <Paper className={classes.paper} style={{ height: "85%" }}>
            <Grid container spacing={3}>
              <Grid item xs={10} sm={6}>
                <Typography>
                  <h4 style={{ margin: "auto" }}>Recent Payments</h4>
                </Typography>
              </Grid>
              <Grid item xs={10} sm={6}>
                <NavLink
                  to="/customer/paymenthistory"
                  style={{ textDecoration: "none" }}
                >
                  <ButtonWithIcon
                    icon="visibilityIcon"
                    iconposition="right"
                    stylebutton='{"float": "right", "color":"" }'
                    styleicon='{ "color":"" }'
                  >
                    Payment History
                  </ButtonWithIcon>
                </NavLink>
              </Grid>
            </Grid>

            <Grid item xs={12} style={{ paddingBottom: "10px" }}>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "600" }} align="center">
                        Date
                      </TableCell>
                      <TableCell style={{ fontWeight: "600" }} align="center">
                        Description
                      </TableCell>
                      <TableCell style={{ fontWeight: "600" }} align="center">
                        Total Amount
                      </TableCell>
                      <TableCell style={{ fontWeight: "600" }} align="center">
                        Balance
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowPayHistory.map((row) => (
                      <TableRow key={row.name}>
                      
                        <TableCell align="center">{row.date}</TableCell>
                        <TableCell align="center">{row.description}</TableCell>
                        <TableCell align="center">{row.totalamount}</TableCell>
                        <TableCell align="center">{row.balance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
