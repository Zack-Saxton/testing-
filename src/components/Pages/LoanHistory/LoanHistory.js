import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { useQuery } from 'react-query';
import { NavLink } from "react-router-dom";
import CheckLoginStatus from "../../App/CheckLoginStatus";
import LoanHistoryController from "../../Controllers/LoanHistoryController";
import { ButtonWithIcon } from "../../FormsUI";
import ScrollToTopOnMount from "../ScrollToTop";
import LoanHistoryCard from "./CardContent";
import LoanHistoryTable from "./RecordTable";
import { useStylesLoanHistory } from "./Style";
import "./Style.css";

export default function LoanHistory() {

  //Material UI css class
  const classes = useStylesLoanHistory();

  //API Call
  const { data: loanHistoryStatus } = useQuery('loan-history', LoanHistoryController);

  //Load data
  let loanHistoryData = loanHistoryStatus?.data?.activeLoans?.length ? loanHistoryStatus?.data?.activeLoans : [];

  //View Part
  return (
    <div>
      <CheckLoginStatus />
      <ScrollToTopOnMount />
      <Grid
        container
        justifyContent={ "center" }
        className={ classes.centerGrid }
      >
        <Grid id="loanHistoryTxt" container direction="row" item xs={ 12 }>
          <Grid item xs={ 12 }>
            <Typography component={ "div" }>
              <h3 className={ classes.heading }>
                <NavLink
                  to="/customers/accountOverview"
                  style={ { textDecoration: "none" } }
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
                Loan History
              </h3>
            </Typography>
          </Grid>
        </Grid>

        <LoanHistoryCard userLoanHistoryCard={ loanHistoryData } />
        <LoanHistoryTable userLoanHistoryData={ loanHistoryData } />
      </Grid>
    </div>
  );
}
