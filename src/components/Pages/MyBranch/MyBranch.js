import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { NavLink } from "react-router-dom";
import { ButtonWithIcon } from "../../FormsUI";
import { useStylesMyBranch } from "./Style";
import BranchDetail from "./BranchDetail";
import BranchMap from "./BranchMap";
import MyBranchAPI from "../../controllers/MyBranchController";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";

export default function MyBranch() {
  const classes = useStylesMyBranch();

  const [branchApiStatus, SetBranchApiStatus] = useState(null);
  async function AsyncEffect_MyBranch() {
    SetBranchApiStatus(await MyBranchAPI());
  }
  useEffect(() => {
    AsyncEffect_MyBranch();
  }, []);

  //Load data
  let myBranchData = branchApiStatus != null ? branchApiStatus.data.data : null;
  return (
    <div>
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
            <Typography variant="h3" className={classes.heading}>
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
              My Branch
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          style={{ paddingTop: "20px", paddingBottom: "20px" }}
        >
          <Grid item xs={12} sm={5}>
            {myBranchData ? (
              <BranchDetail MyBranchDetail={myBranchData} />
            ) : (
              <Paper className={classes.paper}>
                {" "}
                <CircularProgress />{" "}
              </Paper>
            )}
          </Grid>
          <Grid item xs={12} sm={7}>
            <BranchMap MyBranchDetail={myBranchData} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
