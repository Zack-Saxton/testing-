import React from "react";
import {useStyleVantageScore} from "./Style";
import Moment from "moment";
import { Line } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";


export default function HistoricalData(creditData) {
     const classes = useStyleVantageScore();
     let chartData =( creditData?.creditData ) ? creditData?.creditData.map(
      data =>  data.parsed.vantage_score
     ) :  [];

     let chartMonths =( creditData?.creditData ) ? creditData?.creditData.map(
      data =>  Moment(data.createdat).format('MMM')
     ) :  [];
     
     const data = {
      labels: chartMonths.reverse(),
      datasets: [
        {
          label: 'VantageScore ®',
          data: chartData.reverse(),
          fill: false,
          responsive:true,
          backgroundColor: "rgb(255,133,10)",
          borderColor: 'rgb(255,133,10)',
          borderWidth: 3,
<<<<<<< HEAD
          pointRadius: 2
=======
          pointRadius: 2,

>>>>>>> 83d8ecb4a39608eb3df58ad6f726c7a711648941
        },
        
      ],
    };

<<<<<<< HEAD
    const option = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            usePointStyle: true,
            pointStyle:'line'
          },
        },
      },
    };

    
=======
   
      const option = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              usePointStyle: true,
              pointStyle: 'line',
            },
          },
        },
      };
>>>>>>> 83d8ecb4a39608eb3df58ad6f726c7a711648941

    return(
      <div>
         <h5 className = {classes.HistoricalDataHeading}>Historical Data</h5>
         <Grid>
         <Line data={data}  options = {option} />
         </Grid>
      </div>
    );
}