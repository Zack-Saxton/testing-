import Grid from "@material-ui/core/Grid";
import moment from "moment";
import React, { useEffect, useState } from "react";

export default function MarketingOffer(data) {

  const [ message, setMessage ] = useState({});

  const findMarketingMessage = () => {
    let usermarketingMessage;
    MarketingMessages.map(promo => {
      if (promo.campaignType === data.promoType) {
        usermarketingMessage = promo;
      }
    });
    setMessage(usermarketingMessage);
  };

  useEffect(() => {
    findMarketingMessage();
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const MarketingMessages = [
    {
      "campaignType": "PRES",
      "p1": 'Are you looking to plan a vacation? Perhaps make a major purchase? Do you need to consolidate your debt? Life and expenses aren\'t always on the same schedule.',
      "p2": `That's why we want you to know you are prequalified for a loan from $1000 to $${ data.amount }* to help simplify your bills into one manegable payment!`,
      "p3": `Sounds good, right?`,
    },
    {
      "campaignType": "CONV",
      "p1": 'Are you looking to plan a vacation? Perhaps make a major purchase? Do you need to consolidate your debt? Life and expenses aren\'t always on the same schedule.',
      "p2": `That's why we want you to know you may qualify for a loan up to $${ data.amount }* to help simplify your bills into one manegable payment!`,
      "p3": `Sounds good, right?`,
    },
    {
      "campaignType": "ITA",
      "p1": 'Are you looking to plan a vacation? Perhaps make a major purchase? Do you need to consolidate your debt? Life and expenses aren\'t always on the same schedule.',
      "p2": 'That\'s why we want you to know you may qualify for a loan up to $10,000* to help simplify your bills into one manageable payment!',
      "p3": 'Sounds good, right?',
    },
    {
      "campaignType": "BTO",
      "p1": 'Are you looking to plan a vacation? Perhaps make a major purchase? Do you need to consolidate your debt? Life and expenses aren\'t always on the same schedule.',
      "p2": `That's why we want you to know you may qualify for a loan up to $${ data.amount }* to help simplify your bills into one manegable payment!`,
      "p3": `Sounds good, right?`,
    },
    {
      "campaignType": "GRIDS",
      "p1": 'Are you looking to plan a vacation? Perhaps make a major purchase? Do you need to consolidate your debt? Life and expenses aren\'t always on the same schedule.',
      "p2": `That's why we want you to know you are prequalified for a loan up to $${ data.amount }* to help simplify your bills into one manegable payment!`,
      "p3": 'Sounds good, right?'
    },
    {
      "campaignType": "AUTO",
      "p1": `Great news, your credit pre-qualifies you to refinance your auto loan with your current Mariner Finance loan and lower the combined amount you pay each month.`,
      "p2": 'You may be eligible for additional money based on the equity you have in your car. Also, if you respond before this offer expires, you may not have to make these payments this month.* ',
      "p3": `Let us show you how you can drive down your monthly payment. Call us at ${ data.branchPhone } or apply `,
      "p4": `Remember, you must respond by ${ moment(data.dateExpiration).format('MM/DD/YYYY') }.`,
    },
    {
      "campaignType": "RBO",
      "p1": 'We have reviewed your account and you are prequalified to refinance your balance for a fresh start! This is a great opportunity to poosibly lower your monthly payment.',
      "p2": 'This may be done without you having to make a payment this month!',
      "p3": `To take advantage of this offer, click the button below, call ${ data.branchPhone }, or vist your ${ data.branchName } Branch by ${ moment(data.dateExpiration).format('MM/DD/YYYY') }.`,
      "p4": 'Call, stop by, or continue online today!',
    },
    {
      "campaignType": "GLO",
      "p1": 'We have reviewed your account and you are prequalified to refinance your balance for a fresh start! This is a great opportunity to poosibly lower your monthly payment.',
      "p2": 'This may be done without you having to make a payment this month!',
      "p3": `To take advantage of this offer, click the button below, call ${ data.branchPhone }, or vist your ${ data.branchName } Branch by ${ moment(data.dateExpiration).format('MM/DD/YYYY') }.`,
      "p4": 'Call, stop by, or continue online today!',
    },
  ];

  return (
    <Grid>
      {
        Object.keys(message).map(key => {
          if (key !== "campaignType") {
            return <p key={ key }>{ message[ key ] }</p>;
          }
        })
      }
    </Grid>
  );
}
