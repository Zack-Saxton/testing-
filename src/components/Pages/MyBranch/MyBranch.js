import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useQuery } from 'react-query';
import { NavLink } from "react-router-dom";
import CheckLoginStatus from "../../App/CheckLoginStatus";
import MyBranchAPI from "../../Controllers/MyBranchController";
import { ButtonWithIcon } from "../../FormsUI";
import BranchDetail from "./BranchDetail";
import BranchMap from "./BranchMap";
import { useStylesMyBranch } from "./Style";

export default function MyBranch() {
  window.zeHide();
  //Material UI css class
  const classes = useStylesMyBranch();

  //API call
  const { data: branchApiStatus } = useQuery('my-branch', MyBranchAPI);

  //Branch details from API
  let myBranchData = branchApiStatus?.data;

  //View part
  return (
    <div>
      <CheckLoginStatus />
      <Grid
        container
        justifyContent={ "center" }
        className={ classes.centerGrid }
      >
        <Grid container style={ { paddingBottom: "10px" } }>
          <Grid item xs={ 12 }>
            <Typography variant="h3" className={ classes.heading }>
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
              My Branch
            </Typography>
          </Grid>
        </Grid>

        <Grid container id="branchMainDiv">
          <Grid id="branchDiv" item xs={ 12 } sm={ 5 }>
            { myBranchData ? (
              <BranchDetail MyBranchDetail={ myBranchData } />
            ) : (
              <Paper className={ classes.paper }>
                { " " }
                <CircularProgress />{ " " }
              </Paper>
            ) }
          </Grid>
          <Grid item xs={ 12 } sm={ 7 }>
            <BranchMap MyBranchDetail={ myBranchData } />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
