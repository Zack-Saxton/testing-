import { CircularProgress } from '@mui/material';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { NavLink } from 'react-router-dom';
import CheckLoginStatus from "../../App/CheckLoginStatus";
import VantageController from "../../Controllers/VantageController";
import { ButtonWithIcon } from "../../FormsUI";
import ScrollToTop from "../ScrollToTop";
import Credit from "./Credit";
import HistoricalData from "./HistoricalData";
import KeyFacts from "./KeyFacts";
import { useStyleVantageScore } from "./Style";

export default function VantageScore() {
  //Material UI css class
  const classes = useStyleVantageScore();
  const [ creditData, setCreditData ] = useState(null);
  const [ keyFactors, setkeyFactors ] = useState(null);
  const { data: responseData } = useQuery('vantage-score', VantageController);

  //API Call for vantageScore
  function vantageScoreData() {
    let creditMonitorings = (responseData?.data?.status === 500 ? [] : responseData?.data?.creditmonitorings ? responseData?.data?.creditmonitorings : null);
    setCreditData(creditMonitorings);
    setkeyFactors(creditMonitorings?.length ? creditMonitorings[ 0 ]?.parsed : []);
  }

  useEffect(() => {
    vantageScoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ responseData ]);

  //View
  return (
    <div data-testid="vantageScoreComponent">
      <CheckLoginStatus />
      <ScrollToTop />
      <Grid
        container
        justifyContent={"center"}
        className={classes.centerGrid}
      >
        <Grid className={classes.vantageScore} container>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.heading}>
              <NavLink
                data-testid="creditMonitoringButton"
                to="/customers/accountOverview"
                className={classes.textDecoration}
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
        <div id="creditContainer">
          <Grid item xs={12}>
            <Paper id="vantageScorePaper" data-testid="creditFiles" className={classes.paper}>
              {creditData ? (
                creditData[ 0 ]?.parsed.vantage_score ?
                  (<Credit creditData={creditData} />) : <div>You do not have any credit score</div>
              ) : <CircularProgress />

              }
            </Paper>
          </Grid>
        </div>

        <div id="HistoricalDataContainer">
          <Grid item xs={12}>
            <Paper data-testid="HistoricalData" style={{ padding: "36px" }} className={classes.paper}>
              {creditData ? (
                creditData[ 0 ]?.parsed.vantage_score ? (
                  <HistoricalData creditData={creditData} />) : <div>You do not have any historical data </div>
              ) : <CircularProgress />}
            </Paper>
          </Grid>
        </div>
        <div id="dropDown" className={classes.root} data-testid="keyfactors">
          <Paper data-testid="keyfactors-loading">
            {keyFactors && creditData ? (
              creditData[ 0 ]?.parsed.vantage_score ? (
                <KeyFacts keyFactors={keyFactors} />) : <Paper className={classes.paper}><div>You do not have any Key Factor</div></Paper>
            ) : <Paper className={classes.paper}> <CircularProgress /></Paper>}
          </Paper>
        </div>
      </Grid>
    </div>
  );
}
