import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

export default function MarketingOffer(promoType, offerCode, amount, branchPhone, branchName, dateExpiration){

  const [message, setMessage] = useState({});
  const [code, setCode] = useState('');
  const [offerAmount, setOfferAmount] = useState('');
  const [bPhone, setBranchPhone] = useState('');
  const [bName, setBranchName] = useState('');
  const [Expiration, setDateExpiration] = useState('');

  const findMarketingMessage = () => {
    let usermarketingMessage;
    MarketingMessages.forEach( promo => {
      if ( promo.campaignType === promoType.promoType ) {
        usermarketingMessage = promo;
     }
    })
    setMessage(usermarketingMessage);
  };

  useEffect(() => {
    setCode(offerCode);
    setOfferAmount(amount);
    setBranchPhone(branchPhone);
    setBranchName(branchName);
    setDateExpiration(dateExpiration);
    findMarketingMessage();

    console.log('otto ::: promoType - ', promoType)
    console.log('otto ::: offerCode - ', offerCode)
    console.log('otto ::: amount - ', amount)
    console.log('otto ::: branchPhone - ', branchPhone)
    console.log('otto ::: branchName - ', branchName)
    console.log('otto ::: dateExpiration - ', dateExpiration)


    console.log('otto ::: code - ', code)
    console.log('otto ::: Expiration - ', Expiration)
    console.log('otto ::: offerAmount - ', offerAmount)
  }, [])

  const MarketingMessages = [
      {
          "campaignType" : "PRES",
          "p1": `Looking for an easy way to break up the cost of big expenses, without breaking the bank? Or to get rid of lingering credit card bills? A fixed-rate, fixed-payment personal loan of ${offerAmount } from Mariner Finance can help you get the things you want and get rid of the bills you don't.`,
          "p2": 'What will you do with your money?',
          "p3": `Get rid of bills & credit card debt? Spruce up the house? Take a vacation?`,
          "p4": `Use offer code ${code} before ${Expiration}. Remember, checking your offer online does not affect your credit.*`
      },
      {
          "campaignType" : "CONV",
          "p1" : `Let us help you with holiday shopping, consolidating debt, or tackling unexpected expenses. Whatever you have in mind, your team at Mariner Finance is here to help. That's why we're inviting you to apply for a personal loan up to {amount}* so you can easily manage your expenses. When you do, you may skip this month's payment and spend more time doing what matters most: achieving your goals.`,
          "p2" : 'You can count on: ',
          "p3" : 'Superior customer service',
          "p4" : 'Fast and efficient application process',
          'p5' : 'Upfront and fixed loan terms',
          'p6' : `Use offer code ${code} before ${Expiration}. Remember, checking your offer online does not affect your credit.*`,
      },
      {
        "campaignType": "ITA",
        "p1" : 'You\'re invited to apply for a personal loan up to $4,000 with Mariner Finance so you can get the money you need for debt consolidation, unexpected expenses or bigger projects, like:​​​​​​​ ',
        "p2" : 'Holiday Shopping',
        "p3" : 'Auto Repairs',
        "p4" : 'Household Bills',
      },
      {
        "campaignType" : "BTO",
        "p1" : 'We care as much about your goals as you do. You can count on: ',
        "p2" : 'A quick and easy application process',
        "p3" : 'Upfront and fixed loan terms',
        "p4" : 'Friendly staff in over 475 branches in 24 states',
      },
      {
        "campaignType" : "GRIDS",
        "p1" : 'We can help you take control of your finances.',
        "p2" : 'Accepting your offer only takes minutes, and if you respond by noon you could receive your money the same day!'
      },
      {
        "campaignType": "AUTO",
        "p1" : `Great news, your credit pre-qualifies you to refinance your auto loan with your current Mariner Finance loan and lower the combined amount you pay each month.`,
        "p2" : 'You may be eligible for additional money based on the equity you have in your car. Also, if you respond before this offer expires, you may not have to make these payments this month.* ',
        "p3" : `Let us show you how you can drive down your monthly payment. Call us at ${bPhone} or apply `,
        "p4" : `Remember, you must respond by ${dateExpiration}.`,
      },
      {
        "campaignType": "RBO",
        "p1" : 'We have reviewed your account and you are prequalified to refinance your balance for a fresh start! This is a great opportunity to poosibly lower your monthly payment.',
        "p2": 'This may be done without you having to make a payment this month!',
        "p3" : `To take advantage of this offer, click the button below, call ${bPhone}, or vist your ${bName} Branch by ${Expiration}.`,
        "p4" : 'Call, stop by, or continue online today!',
      },
      {
        "campaignType" : "GLO",
        "p1" : 'We have reviewed your account and you are prequalified to refinance your balance for a fresh start! This is a great opportunity to poosibly lower your monthly payment.',
        "p2" : 'This may be done without you having to make a payment this month!',
        "p3" : `To take advantage of this offer, click the button below, call ${bPhone}, or vist your ${bName} Branch by ${Expiration}.`,
        "p4": 'Call, stop by, or continue online today!',
      },
    ]  

    return(
      <Grid>
        {
          Object.keys(message).map(key => {
            if ( key !== "campaignType"){
              return <p>{message[key]}</p>
            }
          })
        }
      </Grid>
    ) 
}

