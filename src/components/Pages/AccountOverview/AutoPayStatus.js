import React from "react";
import enabled from "../../../assets/images/Enabled.png";
import { useStylesAccountOverview } from "./Style";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";
import "./Style.css";

export default function AutoPayStatus(acct) {
  //Material UI css class
  const classes = useStylesAccountOverview();

  //View
  if (acct.isAutoPay) {
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
            <NavLink to={ `/customers/makePayment/?accNo=${ acct.accountNumber }` } style={{textDecoration : 'none', color : 'inherit'}} key={ Math.random() * 1000 }>
              ENABLE AUTOPAY
            </NavLink>
        </Typography>
        <Typography variant="body1"  className={ classes.cardContent }>
            <NavLink to={ `/customers/makePayment/?accNo=${ acct.accountNumber }`} style={{textDecoration : 'none', color : 'inherit'}} >
              Enable AUTOPAY and be stress free!
            </NavLink>
        </Typography>    
      </div>
    );
  }
}