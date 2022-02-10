import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

export default function Disclaimer(offerCodeData){
    const [offerCode, setOfferCode] = useState(" ");
}

useEffect(() => {
    setOfferCode ( )
})

const allDisclaimers = [
    {
    "title" : "PRESCREEN & OPT-OUT NOTICE",
    "content" : 'This “prescreened” offer of credit is based on information in your credit report indicating that you meet certain criteria. This offer is not guaranteed if you do not meet our criteria, including providing acceptable property as collateral. If you do not want to receive prescreened offers of credit from this and other companies, call the nationwide consumer reporting agencies toll-free: 1-888-5OPT OUT, or write: Equifax, Inc Options, PO Box 740123, Atlanta, GA 30374; or Experian Opt Out, PO Box 919, Allen, TX 75013; or TransUnion Name Removal Option, PO Box 505, Woodlyn, PA 19094, or visit the website at www.optoutprescreen.com.'
}, 
{ 
    "title" : "Important Offer Information",
    "content" : 'You received this loan offer because you met specific predetermined criteria for creditworthiness. This offer can only be accepted by the person(s) named in the offer. You must not have opened a loan account with Mariner Finance, LLC, Personal Finance Company LLC, each entity\'s respective parents companies, subsidiaries, and affiliated companies (the "Company") in the last 60 days. You must be at least 21 years of age or older to accept this offer. Qualification for this offer requires verification of your identity. Acceptance of this offer creates a new loan, which requires paying off of the balance of any existing loan with the Company and the submission of updated application information. The new loan may result in different terms from your current loan. Additional fees may apply in connection with the extension of a new loan pursuant to state law as will be detailed in your new loan documents. If you are interested in more money than the guaranteed amount, additional amounts are subject to normal lending requirements.'
},
{
    "title" : "CA Residents",
    "content" : 'Loans made or arranged pursuant to a California Financing Law License.'   
},
{
    "title" : "Existing Loans",
    "content" : 'If you have a loan with us now, acceptance of any offer creates a new loan, which requires paying off the balance of any existing loan and the submission of updated application information. Any pre-existing collateral in connection with the prior, refinanced loan may be retained, and the new loan may result in terms that are different than those of your current loan. Additional fees may apply in connection with the extension of a new loan pursuant to state law as will be detailed in your new loan documents.'   
},
{
    "title" : "Prohibited Use of Proceeds",
    "content" : 'Loan proceeds may not be used for business or commercial purposes, to finance direct postsecondary education expenses, for purchase of securities, for gambling or any illegal purpose.'   
},
{
    "title" : "USA Patriot Act",
    "content" :  'To help the government fight the funding of terrorism and money laundering activities, Federal Law requires financial insitiutions to obtain, verify, and record information that identifies each person who opens an account. As a result, under our customer identification program, we must ask you for your name, street address, mailing address, date of birth, and other information that will allow us to identify you.'  
},
{
    "title" : "15 Day Satisfaction Guarantee",
    "content" : 'If, for any reason, you are dissatisfied with your loan and repay it in full within 15 days we will waive all finance charges with no penalties. Your repayment amount must be in the form of cash or certified funds.'   
},
{
    "title" : "Check Your Offers Without Affecting Your Credit",
    "content" : 'The online application process uses a "soft" credit inquiry, which does not impact your credit score, to determine whether a loan offer is available. If you continue with the application process and accept a loan offer, we will pull your credit report and credit score again using a "hard" credit inquiry. This "hard" credit inquiry may impact your credit score. Applying at your local branch will result in a “hard” credit inquiry that may impact your credit score.'
},
{
    "title" : "Credit Application",
    "content" : 'Loans subject to normal lending requirements.'
},
{
    "title" : "",
    "content" : ''
},
{
    "title" : "",
    "content" : ''
},
{
    "title" : "",
    "content" : ''
}];

const filteredDisclaimers = [allDisclaimers[0]];

//View
return (
    < div id="discalimerContainer">
        {
            filteredDisclaimers.map( (disclaimer) => {
                return (
                    <Grid>
                         <p className="common para">{disclaimer.title}<br /><br />
                            <span className="small">{disclaimer.content}</span>
                         </p>
                    </Grid>
                )
            })
        }
    </div>
)