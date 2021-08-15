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
import "./paymenthistory.css"
import Chartist from "react-chartist";
import tooltip from 'chartist-plugin-tooltips-updated';
  
    

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
    table: {
      minWidth: 650,
    },
    
  }));
  
  function createData(
    date,
    description,
    principal,
    interest,
    other,
    total,
    balance
  ) {
    return {
        date,
        description,
        principal,
        interest,
        other,
        total,
        balance
    };
  }

  const rows = [
    createData(
      "02/05/2021",
      "Regular Payment",
      "$9215.19",
      "$833.34",
      "$88.18",
      "$921.51",
      "$8293.67"
    ),
    createData(
        "02/05/2021",
        "Regular Payment",
        "$9215.19",
        "$833.34",
        "$88.18",
        "$921.51",
        "$8293.67"
      ),
      createData(
        "02/05/2021",
        "Regular Payment",
        "$9215.19",
        "$833.34",
        "$88.18",
        "$921.51",
        "$8293.67"
      ),
  ];

  export const databar = [{
    Time: 'Late',
    LatePayment:'10'
  }, {
    Time: 'On Time',
    Payment:'25'
    
  }, ];

  const barChart = {
    labels: ["Ontime","Late"],
    series: [
      {meta:"Ontime Payments",  className:"ontimepayment",   value: [25] },
      {meta:"Late Payment",  className:"latepayment",   value: [10] },
    ],
  };

   

  export default function PaymentHistory() {
    const classes = useStyles();
    
    const barOptions = {
     
        showLabel: true,
        seriesBarDistance: 50,
        reverseData: true,
        horizontalBars: true,
        fullWidth: true,
        plugins: [
          tooltip({
            appendToBody: true
          })
        ]       
      
       
    };
  
    return (
      <div>
        <Grid container justify={"center"} style={{ marginTop: "-150px" }}>
          <Grid item xs={10} fullWidth={true} direction="row">
            <Typography>
              <h3 className={classes.heading}>Active Loan / Payment History</h3>
            </Typography>
          </Grid>


          <Grid
          item
          xs={10}
         
          fullWidth={true}
          direction="row"
          style={{ padding: "5px" }}
        >
          <Paper className={classes.paper}>

          <Grid item xs={10}>
                <Typography>
                  <h4 style={{ margin: "auto" }}>On-Time / Late Payments</h4>
                </Typography>
              </Grid>

 <Grid container spacing={3}>
              <Grid item xs={10} sm={8}>
          

<Chartist data={barChart} options={barOptions} type={"Bar"} className="barchart" />
    </Grid>
    <Grid item xs={10} sm={4}>
    <Typography>
                  <h4 >Your on-time payments have saved you $214 
                  by preventing late payment fees.</h4>
                </Typography>
              </Grid>
            </Grid>


          </Paper>
        </Grid>


        <Grid item xs={10} style={{ paddingTop: "10px" , paddingBottom: "20px"}}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "600" }}>
                    Date
                  </TableCell>
                  <TableCell style={{ fontWeight: "600" }} align="center">
                    Description
                  </TableCell>
                  <TableCell style={{ fontWeight: "600" }} align="center">
                    Principal
                  </TableCell>
                  <TableCell style={{ fontWeight: "600" }} align="center">
                    Interest
                  </TableCell>
                  <TableCell style={{ fontWeight: "600" }} align="center">
                    Other
                  </TableCell>
                  <TableCell style={{ fontWeight: "600" }} align="center">
                    Total
                  </TableCell>
                  <TableCell style={{ fontWeight: "600" }} align="center">
                    Balance
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.principal}</TableCell>
                    <TableCell align="center">{row.interest}</TableCell>
                    <TableCell align="center">{row.other}</TableCell>
                    <TableCell align="center">{row.total}</TableCell>
                    <TableCell align="center">{row.balance}</TableCell>

                   
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>




          </Grid>
          </div>
    )}