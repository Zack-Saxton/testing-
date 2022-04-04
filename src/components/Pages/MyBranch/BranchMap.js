import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import React from "react";
import { useStylesMyBranch } from "./Style";

export default function BranchMap(MyBranchDetail) {

  //Material UI css class
  const classes = useStylesMyBranch();

  //Branch details from API
  let branchDetail = MyBranchDetail ?? null;
  //View part
  return (
    <div id="branchMapWrap">
      { !(branchDetail?.MyBranchDetail) ? (
        <Paper className={ classes.paper }>
          { " " }
          <CircularProgress />{ " " }
        </Paper>
      ) : branchDetail?.MyBranchDetail?.result ? (
        <Paper className={ classes.paper }>
          <p>Location not available</p>{ " " }
        </Paper>
      ) : branchDetail?.MyBranchDetail?.Address ? (
        <iframe
          title="branchLocation"
          className={classes.iframeBranchMap}
          id="gmap_canvas"
          src={
            "https://maps.google.com/maps?q=" +
            branchDetail.MyBranchDetail.Address +
            ", United States&t=&z=11&ie=UTF8&iwloc=&output=embed"
          }
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
        ></iframe>
      ) : (
        <Paper className={ classes.paper }>
          { " " }
          <p>Location not available</p>{ " " }
        </Paper>
      ) }
    </div>
  );
}
