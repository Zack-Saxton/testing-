import Grid from "@mui/material/Grid";
import Moment from "moment";
import React from "react";
import { Line } from "react-chartjs-2";
import { useStyleVantageScore } from "./Style";

export default function HistoricalData(creditData) {

  //Material UI css class
  const classes = useStyleVantageScore();
  //Vantage score
  let chartData = (creditData?.creditData) ? creditData?.creditData.map(dataItem => dataItem.parsed.vantage_score) : [];
  //Vantage score - months
  let chartMonths = (creditData?.creditData) ? creditData?.creditData.map(dataItem => Moment(dataItem.createdat).format('MMM')) : [];

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
    scales: {
      y: {
        suggestedMax: 850,
        suggestedMin: 400,
        ticks: {
          stepSize: 10,
          max: 100
        },
      },
    },
  };

  //View
  return (
    <div>
      <h5 className={classes.HistoricalDataHeading} data-testid="vantagescoreedit">Historical Data</h5>
      <Grid>
        <Line data={data} options={option} />
      </Grid>
    </div>
  );
}