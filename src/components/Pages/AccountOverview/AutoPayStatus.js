import Typography from "@mui/material/Typography";
import React from "react";
import { NavLink } from "react-router-dom";
import enabled from "../../../assets/images/Enabled.png";
import { useStylesAccountOverview } from "./Style";
import "./Style.css";

export default function AutoPayStatus(account) {
  //Material UI css class
  const classes = useStylesAccountOverview();

  //View
  if (account?.isAutoPay) {
    return (
      <div data-testid={account.data_testid} >
        <p data-testid = "autoPayStatus" className={classes.cardContent}>Auto Pay</p>
        <h5 data-testid = "Enable_image" className={classes.enableColor}>
          ENABLED <img src={enabled} alt="enabled" />
        </h5>
        <p className={classes.cardContent}>
          On due date of every month
        </p>
      </div>
    );
  } else {
    return (
      <div data-testid={account.dataTestid}>
        <p data-testid = "autoPay_component" className={classes.cardContent}>Auto Pay</p>
        <Typography variant="h5" id="nextPaymentItems" className={classes.disableColor}>
          <NavLink data-testid="enableAutoPayLink" to={`/customers/makePayment/?accNo=${ window.btoa(account.accountNumber) }`} className={classes.autoPayEnableLinkOne} key={`auto-pay-link`}>
            ENABLE AUTOPAY
          </NavLink>
        </Typography>
        <Typography variant="body1" className={classes.cardContent}>
          <NavLink data-testid = "autoPay_account" to={`/customers/makePayment/?accNo=${ account.accountNumber }`} className={classes.autoPayEnableLink}>
            Enable AUTOPAY and be stress free!
          </NavLink>
        </Typography>
      </div>
    );
  }
}