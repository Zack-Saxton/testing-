import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import tooltip from "chartist-plugin-tooltips-updated";
import React from "react";
import Chartist from "react-chartist";
import { useStylesPaymenthistory } from "./Style";
import "./Style.css";

//Data for bar chart
export const dataBar = [
  {
    Time: "Late",
    LatePayment: "10",
  },
  {
    Time: "On Time",
    Payment: "25",
  },
];

const barChart = {
  labels: [ "On time", "Late" ],
  series: [
    { meta: "On time Payments", className: "onTimePayment", value: [ 25 ] },
    { meta: "Late Payment", className: "latePayment", value: [ 10 ] },
  ],
};

//View Part
export default function PaymentHistoryChart() {

  const classes = useStylesPaymenthistory();
  //Bar chart implementation
  const barOptions = {
    showLabel: true,
    seriesBarDistance: 50,
    reverseData: true,
    horizontalBars: true,
    fullWidth: true,
    plugins: [
      tooltip({
        appendToBody: true,
      }),
    ],
  };

  return (
    <Grid item xs={ 12 } style={ { padding: "5px" } }>
      <Paper className={ classes.paper }>
        <Grid item xs={ 12 }>
          <Typography component={ "div" }>
            <p className={ classes.cardHeading }>On-Time / Late Payments</p>
          </Typography>
        </Grid>

        <Grid container spacing={ 3 }>
          <Grid item xs={ 12 } sm={ 8 }>
            <Chartist
              data={ barChart }
              options={ barOptions }
              type={ "Bar" }
              className="barchart"
            />
          </Grid>
          <Grid item xs={ 12 } sm={ 4 }>
            <Typography component={ "div" }>
              <h4>
                Your on-time payments have saved you $214 by preventing late
                payment fees.
              </h4>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
