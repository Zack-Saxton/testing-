import Grid from "@mui/material/Grid";
import React from "react";
import error_alert from "../../../assets/images/error_alert.png";

export default function ErrorAfterLogin() {
  //View part
  return (
    <Grid container justifyContent="center" style={ { marginTop: "-150px", paddingRight: "30px", paddingLeft: "30px", } }>
      <div id="error">
        <img src={ error_alert } alt="error_alert" />
        <h1 className="notFoundTitle">Oops! The page can’t be found.</h1>
        <p className="notFoundDesc">It looks like nothing was found at this location.</p>
        <p className="notFoundDesc">Please check your Url.</p>
      </div>
    </Grid>
  );
}