import Grid from "@mui/material/Grid";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { MarketingMessages } from '../../../../assets/MarketingOffer.js'

export default function MarketingOffer(data) {

  const [ message, setMessage ] = useState({});
  const [ amount, setAmount ] = useState("$ " + (Math.round(data.amount * 100) / 100).toLocaleString());

  const findMarketingMessage = () => {
    let usermarketingMessage;
    MarketingMessages.map(promo => {
      if (promo.campaignType === data.promoType) usermarketingMessage = promo;
    });
    setMessage(usermarketingMessage);
  };

  useEffect(() => {
    findMarketingMessage();
    amountFormatter(parseInt(data.amount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ data ]);

  const amountFormatter = (number) => setAmount("$ " + (Math.round(number * 100) / 100).toLocaleString());
  
  //marketing offer app 
  

  return (
    <Grid data-testid = "MarketingOffer_component">
      {
        Object?.keys(message).map(key => {
          if (key !== "campaignType") {
            return <p key={key}>{message[ key ]}</p>;
          }
        })
      }
      why mariner Finance?
      <ul data-testid = "whyMariner">
        <li>Fast - Get money as soon as the same day.</li>
        <li>Easy - Apply online, by phone, or in a branch.*</li>
        <li>Affordable - with a fixed monthly payment, a fixed rate, and a set payoff date.</li>
      </ul>
    </Grid>
  );
}
