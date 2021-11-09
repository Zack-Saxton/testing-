import React from "react";
import Grid from "@material-ui/core/Grid";
import { useStylesAccountOverview } from "./Style";
import enabled from "../../../assets/images/Enabled.png";

export default function AutoPayStatus(isAutoPay) {
  //Material UI css class
  const classes = useStylesAccountOverview();

  //View
  if (isAutoPay.value != null) {
    return (
      <div>
        <p className={classes.cardContent}>Auto Pay</p>
        <h5 className={classes.enableColor}>
          ENABLED <img src={enabled} alt="enabled" />
        </h5>
        <p className={classes.cardContent}>
          On due date of every month
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <p className={classes.cardContent}>Auto Pay</p>
        <h5 id="nextPaymentItems" className={classes.disableColor}>
          DISABLED
        </h5>
        <p className={classes.cardContent}>
          Enable and be stress free
        </p>
      </div>
    );
  }
}
