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
import { ButtonWithIcon,ButtonPrimary } from "../../FormsUI";
import ad_banner from "../../../assets/images/adbanner.jpg";
import mortage_banner from "../../../assets/images/Mortgage-Banner.jpg";
import enabled from "../../../assets/images/Enabled.png";
import { NavLink } from "react-router-dom";
import Chartist from "react-chartist";
import fillDonut from "chartist-plugin-fill-donut";
import tooltip from 'chartist-plugin-tooltips-updated';
import "./accountoverview.css"
import CheckLoginStatus from '../../App/checkLoginStatus';

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
    color: "#fff",
    fontWeight: "400",
    fontSize:"1.64rem"
  },
  subheading: {
    color: "#171717",
    fontWeight: "400",
    fontSize:"1.64rem"
  },
  table: {
    minWidth: 650,
  },
  tablehead:{
    color: "#171717!important",
    fontWeight: "600",
    fontSize:"1rem"
  },
  tableheadrow:{
    color: "#171717!important",
    fontSize:"15px"
  },
  activeloanheading:{
    color: "#171717",
    fontWeight: "400",
    fontSize:"18px",
    margin: "auto"
  },
  activeloan_sub_heading:{
    color: "#171717",
    fontWeight: "400",
    fontSize:"18px",
    margin: "auto",
    lineHeight:"2.7"
  },
  activeloan_sub_heading_content:{
    color: "#171717",
    fontWeight: "400",    
    margin: "auto",
    
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
  cardcontent:{
    color: "#171717",
    fontSize: "15px"
  }
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
      <Grid container justify={"center"} style={{ marginTop: "-150px", paddingRight:"30px", paddingLeft:"30px" }}>
        <Grid item xs={12} fullWidth={true} direction="row">
          <Typography>
            <h3 className={classes.heading} data-testid="title">Account Overview</h3>
          </Typography>
        </Grid> 

        {/******************************Image part********************************* */}

        <Grid
          item
          xs={12}
          sm={8}
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
          xs={12}
          sm={4}
          fullWidth={true}
          direction="row"
          style={{ padding: "5px" }}
        >
          <Paper className={classes.paper} style={{ height: "85%" }}>
          <img src={mortage_banner} data-testid="background" alt="mortage_banner" />

          </Paper>
        </Grid>

                {/******************************Active Application with table********************************* */}


        <Grid item xs={12} fullWidth={true} direction="row">
          <Typography>
            <h3 className={classes.subheading} data-testid="subtitle">Active Application</h3>
          </Typography>
        </Grid>

        <Grid item xs={12} style={{ paddingBottom: "10px" }}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead >
                <TableRow>
                  <TableCell className={classes.tablehead}>
                    Applied on
                  </TableCell>
                  <TableCell className={classes.tablehead} align="center">
                    Product Type
                  </TableCell>
                  <TableCell className={classes.tablehead} align="center">
                    Requested Amount
                  </TableCell>
                  <TableCell className={classes.tablehead} align="center">
                    Loan Purpose
                  </TableCell>
                  <TableCell className={classes.tablehead} align="center">
                    Status
                  </TableCell>
                  <TableCell className={classes.tablehead} align="center">
                    Expiration Date
                  </TableCell>
                  <TableCell className={classes.tablehead} align="center">
                    Resume
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" className={classes.tableheadrow} scope="row">
                      {row.appliedon}
                    </TableCell>
                    <TableCell className={classes.tableheadrow} align="center">{row.producttype}</TableCell>
                    <TableCell className={classes.tableheadrow} align="center">{row.requestamount}</TableCell>
                    <TableCell  className={classes.tableheadrow} align="center">{row.loanpurpose}</TableCell>
                    <TableCell  className={classes.tableheadrow} align="center">{row.status}</TableCell>
                    <TableCell className={classes.tableheadrow} align="center">{row.expiredate}</TableCell>
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

        <Grid item xs={12} fullWidth={true} direction="row">
          <Typography>
            <h3 className={classes.subheading} data-testid="subtitle">Active Loan</h3>
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={9}
          fullWidth={true}
          direction="row"
          style={{ padding: "5px" }}
        >
          <Paper className={classes.paper}  id="activeloangrid" style={{ height: "80%" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <h4 className={classes.activeloanheading} >Next Payment Details</h4>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ButtonPrimary
                 stylebutton='{"float": "right", "color":"" }'
                 >
                  Make a Payment
                </ButtonPrimary>
              </Grid>
            </Grid>

            <Grid  container spacing={3} style={{ paddingTop: "20px" }}>
              <Grid item xs={12} sm={3} >
                <p className={classes.cardcontent}>Auto Pay</p>
                <h5 className={classes.enablecolor}>ENABLED  <img
              src={enabled}
              alt="enabled"
            /></h5>
                <p className={classes.cardcontent}>On due date of every month</p>
              </Grid>

              <Grid item xs={12} sm={3}>
                <p className={classes.cardcontent}> Regular Amount</p>
                <h5 className={classes.brandColor}>
                  $<span class="addCommaAmount">921.50</span>
                </h5>
                <p className={classes.cardcontent}>Amount may not include all fees</p>
              </Grid>

              <Grid item xs={12} sm={3}>
                <p className={classes.cardcontent}>Due Date</p>
                <h5 className={classes.brandColor}>03/05/2020</h5>
                <p className={classes.cardcontent}>Due in 28 days</p>
              </Grid>

              <Grid item xs={12} sm={3}>
                <p className={classes.cardcontent}>Scheduled Payment</p>
                <h5 className={classes.brandColor}>NONE</h5>
                <p className={classes.cardcontent}>No future payment is scheduled</p>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* ************************************************************** */}

        <Grid
          item
          xs={12}
          sm={3}
          fullWidth={true}
          direction="row"
          style={{ padding: "5px" }}
        >
          <Paper className={classes.paper}  style={{ height: "80%" }}>
            <Grid item xs={12}>
              <Typography>
                <h4 className={classes.activeloan_sub_heading}>Overview</h4>
              </Typography>
              <div style={{ paddingTop: "20px" }}>
              <p  className={classes.activeloan_sub_heading_content}>Account Number</p>
              <p style={{ margin: "auto" }}>
                <b>1222-052502-22</b>
              </p>

              <p className={classes.activeloan_sub_heading_content}>Opened On/Term</p>
              <p style={{ margin: "auto" }}>
                <b>12/01/2019 / 24 M</b>
              </p>

              <p className={classes.activeloan_sub_heading_content}>APR</p>
              <p style={{ margin: "auto" }}>
                <b>18%</b>
              </p>
              </div>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} fullWidth={true} direction="row">
          <Typography>
            <h3 className={classes.subheading} data-testid="subtitle">Active Loan</h3>
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={9}
          fullWidth={true}
          direction="row"
          style={{ padding: "5px" }}
        >
          <Paper className={classes.paper} id="activeloangrid" style={{ height: "80%" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <h4 className={classes.activeloanheading}>Next Payment Details</h4>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ButtonPrimary 
                 stylebutton='{"float": "right", "color":"" }'
                 >
                  Make a Payment
                </ButtonPrimary>
              </Grid>
            </Grid>

            <Grid container spacing={3} style={{ paddingTop: "20px" }}>
              <Grid item xs={12} sm={3} s>
                <p className={classes.cardcontent}>Auto Pay</p>
                <h5 className={classes.disablecolor}>DISABLED </h5>
                <p className={classes.cardcontent}>On due date of every month</p>
              </Grid>

              <Grid item xs={12} sm={3}>
                <p className={classes.cardcontent}>Regular Amount</p>
                <h5 className={classes.brandColor}>
                  $<span class="addCommaAmount">921.50</span>
                </h5>
                <p className={classes.cardcontent}>Amount may not include all fees</p>
              </Grid>

              <Grid item xs={12} sm={3}>
                <p className={classes.cardcontent}>Due Date</p>
                <h5 className={classes.brandColor}>03/05/2020</h5>
                <p className={classes.cardcontent}>Due in 28 days</p>
              </Grid>

              <Grid item xs={12} sm={3}>
                <p className={classes.cardcontent}>Scheduled Payment</p>
                <h5 className={classes.brandColor}>NONE</h5>
                <p className={classes.cardcontent}>No future payment is scheduled</p>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* ************************************************************** */}

        <Grid
          item
          xs={12}
          sm={3}
          fullWidth={true}
          direction="row"
          style={{ padding: "5px" }}
        >
          <Paper className={classes.paper} style={{ height: "80%" }}>
            <Grid item xs={12}>
              <Typography>
                <h4 className={classes.activeloan_sub_heading}>Overview</h4>
              </Typography>
              <div style={{ paddingTop: "20px" }}>
              <p className={classes.activeloan_sub_heading_content}>Account Number</p>
              <p style={{ margin: "auto" }}>
                <b>1222-052502-22</b>
              </p>

              <p className={classes.activeloan_sub_heading_content}>Opened On/Term</p>
              <p style={{ margin: "auto" }}>
                <b>12/01/2019 / 24 M</b>
              </p>

              <p className={classes.activeloan_sub_heading_content}>APR</p>
              <p style={{ margin: "auto" }}>
                <b>18%</b>
              </p>
              </div>
            </Grid>
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}
          fullWidth={true}
          direction="row"
          style={{ padding: "5px", paddingTop: "20px", paddingBottom: "25px" }}
        >
          <Paper className={classes.paper} style={{ height: "85%" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} >
                <Typography>
                  <h4  className={classes.activeloanheading}>Available Cash</h4>
                </Typography>
              </Grid>
             
            </Grid>

           
          <Grid item xs={12} style={{ paddingTop: "20px",textAlign: "center" }} >
          <Chartist data={donutChart} options={donutOptions} type={"Pie"} className="donutchart" />
        
           <p style={{ textAlign: "center" }}>As of 02/22/2021</p>
          </Grid>
   
          </Paper>
        </Grid>

        {/* ************************************************************** */}

        <Grid
          item
          xs={12}
          sm={8}
          fullWidth={true}
          direction="row"
          style={{ padding: "5px", paddingTop: "20px",paddingBottom: "25px" }}
        >
          <Paper className={classes.paper} style={{ height: "85%" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <h4  className={classes.activeloanheading}>Recent Payments</h4>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <NavLink
                  to="/customers/paymenthistory"
                  style={{ textDecoration: "none" }}
                >
                  <ButtonPrimary
                   stylebutton='{"float": "right", "color":"" }'
                   >
                    Payment History
                  </ButtonPrimary>
                </NavLink>
              </Grid>
            </Grid>

            <Grid item xs={12} style={{ paddingBottom: "10px" }}>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tablehead}  align="center">
                        Date
                      </TableCell>
                      <TableCell className={classes.tablehead}  align="center">
                        Description
                      </TableCell>
                      <TableCell className={classes.tablehead}  align="center">
                        Total Amount
                      </TableCell>
                      <TableCell className={classes.tablehead}  align="center">
                        Balance
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowPayHistory.map((row) => (
                      <TableRow key={row.name}>
                      
                        <TableCell className={classes.tableheadrow} align="center">{row.date}</TableCell>
                        <TableCell className={classes.tableheadrow} align="center">{row.description}</TableCell>
                        <TableCell className={classes.tableheadrow} align="center">{row.totalamount}</TableCell>
                        <TableCell className={classes.tableheadrow} align="center">{row.balance}</TableCell>
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
