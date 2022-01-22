import React from "react";
import { useStyleVantageScore } from "./Style";
import Moment from "moment";
import { Line } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";

export default function HistoricalData(creditData) {
  //Material UI css class
  const classes = useStyleVantageScore();
  //Vantage score
  let chartData = (creditData?.creditData) ? creditData?.creditData.map(
    data => data.parsed.vantage_score
  ) : [];

  //Vantage score - months
  let chartMonths = (creditData?.creditData) ? creditData?.creditData.map(
    data => Moment(data.createdat).format('MMM')
  ) : [];

  const data = {
    labels: chartMonths.reverse(),
    datasets: [
      {
        label: 'VantageScore ®',
        data: chartData.reverse(),
        fill: false,
        responsive: true,
        backgroundColor: 'rgb(255,133,10)',
        borderColor: 'rgb(255,133,10)',
        borderWidth: 3,
        pointRadius: 2
      },
    ],
  };

  const option = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: 'line'
        },
      },
    },
  };

  //View
  return (
    <div>
      <h5 className={classes.HistoricalDataHeading}>Historical Data</h5>
      <Grid>
        <Line data={data} options={option} />
      </Grid>
    </div>
  );
}