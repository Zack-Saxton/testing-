import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import { useQuery } from 'react-query';
import { NavLink } from "react-router-dom";
import CheckLoginStatus from "../../App/CheckLoginStatus";
import MyBranchAPI from "../../Controllers/MyBranchController";
import { ButtonWithIcon } from "../../FormsUI";
import ScrollToTop from "../ScrollToTop";
import BranchDetail from "./BranchDetail";
import BranchMap from "./BranchMap";
import { useStylesMyBranch } from "./Style";

export default function MyBranch() {

  //Material UI css class
  const classes = useStylesMyBranch();

  //API call
  const { data: branchAPIStatus } = useQuery('my-branch', MyBranchAPI);

  //Branch details from API
  let myBranchData = branchAPIStatus?.data;

  //View part
  return (
    <div>
      <CheckLoginStatus />
      <ScrollToTop />
      <Grid
        container
        justifyContent={"center"}
        className={classes.centerGrid}
      >
        <Grid container className={classes.gridMyBranch} data-testid="main-content">
          <Grid container className={classes.branchlocatorStyle} item xs={12}>
            <Typography variant="h5" className={classes.heading}>
              <NavLink
              data-testid="my-branch"
                to="/customers/accountOverview">
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
              My Branch
            </Typography>
            <Typography variant="h5" className={classes.heading} data-testid="branch-location">
              Need to find another branch location? <NavLink  to="/branch-locator"className={classes.navLinkMyBranch}>Click here</NavLink>
            </Typography>
          </Grid>
        </Grid>

        <Grid container id="branchMainDiv">
          <Grid id="branchDiv" item xs={12} sm={5}>
            {myBranchData ? (
              <BranchDetail MyBranchDetail={myBranchData} />
            ) : (
              <Paper className={classes.paper}>
                {" "}
                <CircularProgress />{" "}
              </Paper>
            )}
          </Grid>
          <Grid item xs={12} sm={7} data-testid="branch-map">
            <BranchMap MyBranchDetail={myBranchData} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
