import React from "react";
import enabled from "../../../assets/images/Enabled.png";
import { useStylesAccountOverview } from "./Style";

export default function AutoPayStatus(acct) {
  //Material UI css class
  const classes = useStylesAccountOverview();
  window.zeHide();
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
        <h5 id="nextPaymentItems" className={ classes.disableColor }>
        <a color="#eb1809" className={ classes.disableColor } href= { "./makePayment/?accNo=" + acct.accountNumber}>
          DISABLED</a>
        </h5>
        <p>
        <a className={ classes.cardContent } href= { "./makePayment/?accNo=" + acct.accountNumber}>
          Enable and be stress free
        </a>
        </p>
      </div>
    );
  }
}