import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";

export default function Disclaimer(offerData){
    const [filteredDisclaimers, setFilteredDisclaimers] = useState([]);

    const filterDisclaimers = (data) => {
        let campaignType = data.offerData.userOffers.CampaignTypeDesc;
        let disclaimers = [];
        let disclaimerIndecies;
        if (campaignType && campaignType.toLowerCase() === "bci" ||  campaignType.toLowerCase() === "ita") {
            disclaimerIndecies = [8, 5, 2, 7, 3, 4, 6 ]
        } else if (campaignType && campaignType.toLowerCase() === "pres" || campaignType.toLowerCase() === "trigger") {
            disclaimerIndecies = [1, 7, 2, 3, 4, 5, 6 ]
        } else if (campaignType && campaignType.toLowerCase() === "conv" || campaignType.toLowerCase() === "bto") {
            disclaimerIndecies = [8, 5, 2, 3, 4, 6 ]
        } else if (campaignType && campaignType.toLowerCase() === "grids") {
            disclaimerIndecies = [1, 2, 3, 4, 5, 6 ]
        }  else if (campaignType && campaignType.toLowerCase() === "auto" || campaignType.toLowerCase() === "dacc") {
            disclaimerIndecies = [9, 10, 11, 12, 13, 14, 3, 4, 6 ]
        } else if (campaignType && campaignType.toLowerCase() === "rbo") {
            disclaimerIndecies = [1, 3, 4, 6 ]
        } else if (campaignType && campaignType.toLowerCase() === "glo") {
            disclaimerIndecies = [1, 5, 4, 2, 6]
        } else {
            disclaimerIndecies = [8, 5, 2, 7, 3, 4, 6 ]
        }

        disclaimerIndecies.forEach(index => {
            disclaimers.push(allDisclaimers[index])
        })
        setFilteredDisclaimers(disclaimers)
    }

    useEffect(() => {
        filterDisclaimers(offerData)
    }, [])

    const allDisclaimers = [{
        "title" : "PRESCREEN & OPT-OUT NOTICE", //0
        "index" : 0,
        "content" : 'This “prescreened” offer of credit is based on information in your credit report indicating that you meet certain criteria. This offer is not guaranteed if you do not meet our criteria, including providing acceptable property as collateral. If you do not want to receive prescreened offers of credit from this and other companies, call the nationwide consumer reporting agencies toll-free: 1-888-5OPT OUT, or write: Equifax, Inc Options, PO Box 740123, Atlanta, GA 30374; or Experian Opt Out, PO Box 919, Allen, TX 75013; or TransUnion Name Removal Option, PO Box 505, Woodlyn, PA 19094, or visit the website at www.optoutprescreen.com.'
    }, 
    { 
        "title" : "", //default disclaimer //1
        "index" : 1,
        "content" : 'You received this loan offer because you met specific predetermined criteria for creditworthiness. This offer can only be accepted by the person(s) named in the offer. You must not have opened a loan account with Mariner Finance, LLC, Personal Finance Company LLC, each entity\'s respective parents companies, subsidiaries, and affiliated companies (the "Company") in the last 60 days. You must be at least 21 years of age or older to accept this offer. Qualification for this offer requires verification of your identity. Acceptance of this offer creates a new loan, which requires paying off of the balance of any existing loan with the Company and the submission of updated application information. The new loan may result in different terms from your current loan. Additional fees may apply in connection with the extension of a new loan pursuant to state law as will be detailed in your new loan documents. If you are interested in more money than the guaranteed amount, additional amounts are subject to normal lending requirements.'
    },
    {
        "title" : "CA Residents", //2
        "index" : 2,
        "content" : 'Loans made or arranged pursuant to a California Financing Law License.'   
    },
    {
        "title" : "Existing Loans", //3
        "index" : 3,
        "content" : 'If you have a loan with us now, acceptance of any offer creates a new loan, which requires paying off the balance of any existing loan and the submission of updated application information. Any pre-existing collateral in connection with the prior, refinanced loan may be retained, and the new loan may result in terms that are different than those of your current loan. Additional fees may apply in connection with the extension of a new loan pursuant to state law as will be detailed in your new loan documents.'   
    },
    {
        "title" : "Prohibited Use of Proceeds", //4
        "index" : 4,
        "content" : 'Loan proceeds may not be used for business or commercial purposes, to finance direct postsecondary education expenses, for purchase of securities, for gambling or any illegal purpose.'   
    },
    {
        "title" : "USA Patriot Act",    //5
        "index" : 5,
        "content" :  'To help the government fight the funding of terrorism and money laundering activities, Federal Law requires financial insitiutions to obtain, verify, and record information that identifies each person who opens an account. As a result, under our customer identification program, we must ask you for your name, street address, mailing address, date of birth, and other information that will allow us to identify you.'  
    },
    {
        "title" : "15 Day Satisfaction Guarantee", //6
        "index" : 6,
        "content" : 'If, for any reason, you are dissatisfied with your loan and repay it in full within 15 days we will waive all finance charges with no penalties. Your repayment amount must be in the form of cash or certified funds.'   
    },
    {
        "title" : "Check Your Offers Without Affecting Your Credit", //7
        "index" : 7,
        "content" : 'The online application process uses a "soft" credit inquiry, which does not impact your credit score, to determine whether a loan offer is available. If you continue with the application process and accept a loan offer, we will pull your credit report and credit score again using a "hard" credit inquiry. This "hard" credit inquiry may impact your credit score. Applying at your local branch will result in a “hard” credit inquiry that may impact your credit score.'
    },
    {
        "title" : "Credit Application", //8
        "index" : 8,
        "content" : 'Loans subject to normal lending requirements.'
    },
    {
        "title" : "", //9
        "index" : 9,
        "content" : 'You received this loan offer because you met specific predetermined criteria for creditworthiness. Credit may not be extended if, upon review of your completed application, credit report, and information provided to us by you or others, we find that you no longer meet the predetermined criteria for creditworthiness. This criteria includes, but is not limited to, whether you are able to furnish acceptable property as collateral (including whether you are able to furnish a valid first lien on an eligible vehicle securing the loan), whether you can meet ability to repay requirements, whether you meet certain residency and income requirements, and/or whether you can complete all verification requirements.',
    },
    {
        "title" : "", //10 
        "index" : 10,
        "content" : "You are prequalified for a new secured loan, refinancing your existing loan(s), at the Annual Percentage Rate (“APR”) specified on the front page of this offer. Recording fees and other loan fees as well as the cost of any optional products you may elect to purchase and finance, where permitted, may be added to the amount financed, and your new loan may have a different interest rate and term. Current auto loan information (e.g., balance, term, rate, payment), annual reduction in loan payments, and available equity in your vehicle are estimated based on information in your credit file."
    },
    {
        "title" : "", //11
        "index" : 11,
        "content" : "If you qualify for additional money, loan terms may vary and will be based upon the loan amount, credit qualifications, state of residence, and the value of the vehicle you\'re refinancing. Vehicle value is based on the National Automobile Dealers Association Used Car Guide for your state. Commercial vehicles are not eligible for this offer. The minimum loan amount is $5,000, and you must owe at least that amount on the vehicle you are refinancing. Not all applicants will qualify for additional money."
    },
    {
        "title" : "", //12,
        "index" : 12,
        "content" : "When refinancing your auto loan, you may not have to make a payment on your current loan with us and other identified auto loan this month. However, the duration of time for which you will not have a payment due will vary based on the terms of your current loans and the date your new loan is funded."
    },
    {
        "title" : "", //13
        "index" : 13,
        "content" : "The offer is valid through the expiration date printed on the front page of this letter. If you respond after the offer expiration date or do not meet the predetermined criteria, normal lending requirements apply."
    },
    {
        "title" : "", //14
        "index" : 14,
        "content" : "You must be the person(s) named in the offer and be at least 21 years of age or older. Also, you must not have opened a loan account with Mariner Finance, LLC, it\'s respective parents companies, subsidiaries, and affiliated companies, in the last 60 days."
    }];

//View
return (
    <div id="discalimerContainer">
        <Grid>
              <p className="common para">Important Offer Information
              </p>
        </Grid>
        {
            filteredDisclaimers.map( (disclaimer) => {
                return (
                    <Grid key={disclaimer.index.toString()}>
                         <Typography className="common para">{disclaimer.title}
                            <p className="small">{disclaimer.content}</p>
                         </Typography>
                    </Grid>
                )
            })
        }
    </div>
)
    }