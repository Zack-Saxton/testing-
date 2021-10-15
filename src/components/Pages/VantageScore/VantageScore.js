import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {useStyleVantageScore} from "./Style";
import { NavLink } from 'react-router-dom';
import { ButtonWithIcon } from "../../FormsUI";
import Credit from "./Credit";
import HistoricalData from "./HistoricalData";
import KeyFactors from "./KeyFactors";
import {getVantageScore} from "../../Controllers/VantageController";
import ScrollToTopOnMount from "../ScrollToTop";
import CheckLoginStatus from "../../App/CheckLoginStatus";


export default function VantageScore() {
  //Material UI css class
  const classes = useStyleVantageScore();
  const [creditData, setCreditData] = useState(null);
  const [keyFactors, setkeyFactors] = useState(null);

  //API Call for vantageScore
  async function vantageScoreData() {
  let responseData = await (getVantageScore())
  let creditMonitorings = (responseData?.data?.data?.creditmonitorings ? responseData?.data?.data?.creditmonitorings : null)
  setCreditData(creditMonitorings)
  setkeyFactors(creditMonitorings.length ? creditMonitorings[0].parsed:null)
  }

  useEffect(() => {
    vantageScoreData();
  }, []);

  //View
  return (
    <div >
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.heading}>
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
            Credit Monitoring

          </Typography>
        </Grid>
        </Grid>
        <div id = "creditContainer">
           <Grid item xs={12}>
               <Paper className = {classes.paper}>
               {creditData? (
                 creditData[0]?.parsed.vantage_score ?
        (<Credit  creditData={creditData} />):<div>You do not have any credit score</div>
        ) : <CircularProgress />
    
      }    
        </Paper>
           </Grid>
        </div>

        <div id = "HistoricalDataContainer">
           <Grid  item xs={12}>
               <Paper className = {classes.paper}>
               {creditData? (
                 creditData[0]?.parsed.vantage_score ? (
        <HistoricalData creditData = {creditData} />):<div>You do not have any historical data </div>
          ) : <CircularProgress />}  
        </Paper>
           </Grid>
        </div>
       <div id = "dropDown" className={classes.root}>
        
        <Paper>
        {keyFactors? (
            creditData[0]?.parsed.vantage_score ? (
        <KeyFactors keyFactors={keyFactors} />):  <Paper className = {classes.paper}><div>You do not have any Key Factor</div></Paper>
        ) :<Paper className = {classes.paper}> <CircularProgress /></Paper>}  
        </Paper>
    </div>
        </Grid>
  </div>
  );
}
