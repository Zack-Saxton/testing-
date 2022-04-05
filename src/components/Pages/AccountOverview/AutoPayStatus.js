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
  if (account.isAutoPay) {
    return (
      <div>
        <p className={ classes.cardContent }>Auto Pay</p>
        <h5 className={ classes.enableColor }>
          ENABLED <img src={ enabled } alt="enabled" />
        </h5>
        <p className={ classes.cardContent }>
          On due date of every month
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <p className={ classes.cardContent }>Auto Pay</p>
        <Typography variant="h5" id="nextPaymentItems" className={ classes.disableColor }>
          <NavLink to={ `/customers/makePayment/?accNo=${ account.accountNumber }` } className={ classes.autoPayEnableLinkOne } key={ Math.random() * 1000 }>
            ENABLE AUTOPAY
          </NavLink>
        </Typography>
        <Typography variant="body1" className={ classes.cardContent }>
          <NavLink to={ `/customers/makePayment/?accNo=${ account.accountNumber }` } className={ classes.autoPayEnableLink }>
            Enable AUTOPAY and be stress free!
          </NavLink>
        </Typography>
      </div>
    );
  }
}