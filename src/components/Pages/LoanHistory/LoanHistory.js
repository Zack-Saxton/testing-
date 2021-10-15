import React, { useEffect, useState } from "react";
import { useStylesLoanHistory } from "./Style";
import LoanHistoryCard from "./CardContent";
import LoanHistoryTable from "./RecordTable";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {NavLink} from "react-router-dom";
import {ButtonWithIcon} from "../../FormsUI";
import "./Style.css";
import ScrollToTopOnMount from "../ScrollToTop";
import LoanHistoryController from "../../Controllers/LoanHistoryController";
import CheckLoginStatus from "../../App/CheckLoginStatus";

export default function LoanHistory() {
  //Material UI css class
  const classes = useStylesLoanHistory();

  //API Call
  const [loanHistoryStatus, setloanHistoryStatus] = useState(null);
  async function AsyncEffect_loanHistory() {
    setloanHistoryStatus(await LoanHistoryController());
  }
  useEffect(() => {
    AsyncEffect_loanHistory();
  }, []);


  //Load data
  let loanHistoryData = loanHistoryStatus != null ? loanHistoryStatus.data.data.activeLoans : null;

  //View Part
  return (
    <div>
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
        <Grid container direction="row" item xs={12}>
          <Grid item xs={12}>
            <Typography component={"div"}>
              <h3 className={classes.heading}>
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
                Loan History
              </h3>
            </Typography>
          </Grid>
        </Grid>


        <LoanHistoryCard userLoanHistoryCard={loanHistoryData} />
        <LoanHistoryTable userLoanHistoryData={loanHistoryData} />
      </Grid>
    </div>
  );
}
