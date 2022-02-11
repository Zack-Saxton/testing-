import React from "react";



const MarketingPressOffer = ({promoType,offerAmount,amount,branch_phone,dateExpiration}) =>{

const [message,setMessage] = useState([]);

const Marketingmessages = [
    {
        "promoType" : "PRES",
        "p1": `Looking for an easy way to break up the cost of big expenses, without breaking the bank? Or get rid of lingering credit 
        card bills? A fixed-rate, fixed-payment personal loan of ${amount } from Mariner Finance can help you get the 
        things you want-and get rid of the bills you don't.`,
        "p2": 'What will you do with your money?',
        "p3": `Get rid of bills & credit card debt? Spruce up the house? Take a vacation?`,
        "p4": 'className="common">Use offer code {offerCode} before {expiryDate}. Remember, checking your offer online does not affect your credit.*</p>
    },
    {
            "promoType" : "CONV",
        "p1" : `Let us help you with holiday shopping, consolidating debt, or tackling unexpected expenses. Whatever you have in mind, your team at ${company} is here to help. 
        That's why we're inviting you to apply for a personal loan up to ${offerAmount}* so you can easily manage your expenses. 
        When you do, you may skip this month's payment and spend more time doing what matters most: achieving your goals.`,
        "p2" : 'You can count on: ',
        "p3" : 'Superior customer service',
        "p4" : 'Fast and efficient application process',
        'p5' : 'Upfront and fixed loan terms',
        'p6' : "Use offer code {offerCode} before {expiryDate}. Remember, checking your offer online does not affect your credit.*",
    },
      {

      "promoType": "ITA",
       "p1" : 'You\'re ',
       "p2" : `invited to apply for a personal loan up to $4,000 with Mariner Finance`,
       "p3" : ' so you can get the money you need for debt consolidation, unexpected expenses or bigger projects, like:​​​​​​​ ',
       "p4" : 'Holiday Shopping',
       "p5" : 'Auto Repairs',
       "p6" : 'Household Bills',
    },
    {

       "promoType" : "BTO",
       "p1" : 'We care as much about your goals as you do. You can count on: ',
       "p2" : 'A quick and easy application process',
       "p3" : 'Upfront and fixed loan terms',
       "p4" : 'Friendly staff in over 475 branches in 24 states',

    },
    {

    
       "promoType" : "GRIDS",
       "p1" : 'We can help you take control of your finances.',
       "p2" : 'Accepting your offer only takes minutes, and if you respond by noon you could receive your money the same day!'
    },
    {

      "promoType": "AUTO",
      "p1" : `Great news, your credit pre-qualifies you to refinance your auto loan with your current Mariner Finance loan and lower the combined amount you pay each month.`,
      "p2" : 'You may be eligible for additional money based on the equity you have in your car. Also, if you respond before this offer expires, you may not have to make these payments this month.* ',
      "p3" : `Let us show you how you can drive down your monthly payment. Call us at ${branch_phone} or apply `,
      "p4" : ` Remember, you must respond by ${dateExpiration}.`,
    },
    {

      "promoType": "RBO",
      "p1" : 'We have reviewed your account and you are prequalified to refinance your balance for a fresh start! This is a great opportunity to poosible lower your monthly payment. ',
      "p2": 'This may be done without you having to make a payment this month!',
      "p3" : `To take advantage of this offer, click the button below, call ${branch_phone}, or vist your ${BranchName} Branch by ${dateExpiration}.`,
      "p4" : 'Call, stop by, or continue online today!',
    },
    {
      "promoType" : "GLO",
      "p1" : 'We have reviewed your account and you are prequalified to refinance your balance for a fresh start! This is a great opportunity to poosible lower your monthly payment. ',
      "p2" : 'This may be done without you having to make a payment this month!',
      "p3" : `To take advantage of this offer, click the button below, call ${branch_phone}, or vist your ${BranchName} Branch by ${dateExpiration}.`,
      "p4": 'Call, stop by, or continue online today!',
    },
  ]  
  
  const usermarketingMessage = Marketingmessages.filter(v.promoType == promoType);
  setMessage(usermarketingMessage);

  return(
    <>
    
    </>
  )
  
}

