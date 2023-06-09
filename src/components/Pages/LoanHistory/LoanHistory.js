import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { NavLink } from "react-router-dom";
import CheckLoginStatus from "../../App/CheckLoginStatus";
import { ButtonWithIcon } from "../../FormsUI";
import ScrollToTop from "../ScrollToTop";
import CardContent from "./CardContent";
import LoanHistoryTable from "./LoanHistoryTable";
import { useStylesLoanHistory } from "./Style";
import "./Style.css";

export default function LoanHistory() {

  //Material UI css class
  const classes = useStylesLoanHistory();

  //View Part
  return (
    <div data-testid="loan_history_component">
      <CheckLoginStatus />
      <ScrollToTop />
      <Grid
        container
        justifyContent={"center"}
        className={classes.centerGrid}
      >
        <Grid id="loanHistoryTxt" container direction="row" item xs={12}>
          <Grid item xs={12}>
            <Typography component={"div"}>
              <h3 className={classes.heading}>
                <NavLink
                  to="/customers/accountOverview"
                  className={classes.loanHistoryNavLink}
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
                Loan History
              </h3>
            </Typography>
          </Grid>
        </Grid>

        <CardContent/>
        <LoanHistoryTable/>
      </Grid>
    </div>
  );
}
