import { CircularProgress } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { NavLink } from 'react-router-dom';
import CheckLoginStatus from "../../App/CheckLoginStatus";
import getVantageScore from "../../Controllers/VantageController";
import { ButtonWithIcon } from "../../FormsUI";
import ScrollToTopOnMount from "../ScrollToTop";
import Credit from "./Credit";
import HistoricalData from "./HistoricalData";
import KeyFactors from "./KeyFactors";
import { useStyleVantageScore } from "./Style";

export default function VantageScore() {
  //Material UI css class
  const classes = useStyleVantageScore();
  const [ creditData, setCreditData ] = useState(null);
  const [ keyFactors, setkeyFactors ] = useState(null);
  const { data: responseData } = useQuery('vantage-score', getVantageScore);

  //API Call for vantageScore
  function vantageScoreData() {
    let creditMonitorings = (responseData?.data?.status === 500 ? [] : responseData?.data?.creditmonitorings ? responseData?.data?.creditmonitorings : null);
    setCreditData(creditMonitorings);
    setkeyFactors(creditMonitorings?.length ? creditMonitorings[ 0 ]?.parsed : []);
  }

  useEffect(() => {
    vantageScoreData();
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ responseData ]);

  //View
  return (
    <div >
      <CheckLoginStatus />
      <ScrollToTopOnMount />
      <Grid
        container
        justifyContent={ "center" }
        className={ classes.centerGrid }
      >
        <Grid className={ classes.vantageScore } container>
          <Grid item xs={ 12 }>
            <Typography variant="h5" className={ classes.heading }>
              <NavLink
                to="/customers/accountOverview"
                className={ classes.textDecoration }
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
              </NavLink>{ " " }
              Credit Monitoring
            </Typography>
          </Grid>
        </Grid>
        <div id="creditContainer">
          <Grid item xs={ 12 }>
            <Paper id="vantageScorePaper" className={ classes.paper }>
              { creditData ? (
                creditData[ 0 ]?.parsed.vantage_score ?
                  (<Credit creditData={ creditData } />) : <div>You do not have any credit score</div>
              ) : <CircularProgress />

              }
            </Paper>
          </Grid>
        </div>

        <div id="HistoricalDataContainer">
          <Grid item xs={ 12 }>
            <Paper style={ { padding: "36px" } } className={ classes.paper }>
              { creditData ? (
                creditData[ 0 ]?.parsed.vantage_score ? (
                  <HistoricalData creditData={ creditData } />) : <div>You do not have any historical data </div>
              ) : <CircularProgress /> }
            </Paper>
          </Grid>
        </div>
        <div id="dropDown" className={ classes.root }>
          <Paper>
            { keyFactors && creditData ? (
              creditData[ 0 ]?.parsed.vantage_score ? (
                <KeyFactors keyFactors={ keyFactors } />) : <Paper className={ classes.paper }><div>You do not have any Key Factor</div></Paper>
            ) : <Paper className={ classes.paper }> <CircularProgress /></Paper> }
          </Paper>
        </div>
      </Grid>
    </div>
  );
}
