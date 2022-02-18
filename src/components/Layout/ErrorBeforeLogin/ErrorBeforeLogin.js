import React from "react";
import error_alert from "../../../assets/images/error_alert.png";
import "./Style.css";
import {preLoginStyle} from "../../../assets/styles/preLoginStyle"

export default function ErrorBeforeLogin() {
  const classes = preLoginStyle();
  //View part
  return (
    <div id="error">
      <div className={classes.mainDiv}>
        <img src={ error_alert } alt="error_alert" />
        <h1 className="notFoundTitle">Oops! The page can’t be found.</h1>
        <p className="notFoundDesc">It looks like nothing was found at this location.</p>
        <p className="notFoundDesc">Please check your Url.</p>
      </div>
    </div>
  );
}