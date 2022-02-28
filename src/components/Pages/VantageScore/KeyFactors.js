import { Grid } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import creditScore from "./CreditScore.json";
import { useStyleVantageScore } from "./Style";

export default function ControlledAccordions(keyFactors) {
  //Material UI css class
  const classes = useStyleVantageScore();
  const [ expanded, setExpanded ] = React.useState(false);

  //Key factors for the Credit score
  let reasoneOne = keyFactors?.keyFactors ? keyFactors.keyFactors.reason1 : null;
  let reasoneTwo = keyFactors?.keyFactors ? keyFactors.keyFactors.reason2 : null;
  let reasoneThree = keyFactors?.keyFactors ? keyFactors.keyFactors.reason3 : null;
  let reasoneFour = keyFactors?.keyFactors ? keyFactors.keyFactors.reason4 : null;

  let keyFactorList = [];
  keyFactorList.push(creditScore[ reasoneOne ]);
  keyFactorList.push(creditScore[ reasoneTwo ]);
  keyFactorList.push(creditScore[ reasoneThree ]);
  keyFactorList.push(creditScore[ reasoneFour ]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //View
  return (
    <div >
      <h3 className={ classes.KeyFactorsHeading }>
        Key Factors Influencing Your Credit Score
      </h3>
      {
        keyFactorList.map((factor, index) => (
          <Accordion expanded={ expanded === `panel${ index }` } onChange={ handleChange(`panel${ index }`) } key={ Math.random() * 1000 }>
            <AccordionSummary
              expandIcon={ <ExpandMoreIcon /> }
              aria-controls={ `panel${ index }bh-content` }
              id={ `panel${ index }bh-header` }
            >
              <Typography className={ classes.MainkeyFactorHeading }>{ factor.label }</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={ classes.VantageScoreSmallText }>
                <p className={ classes.BoldText }>Explanation</p>
                { (factor.description).replace(/\\/g, '') }
                <p className={ classes.BoldText }>What You Can Do</p>
                { (factor.tip).replace(/\\/g, '') }
              </div>
            </AccordionDetails>
          </Accordion>
        ))
      }

      <Grid className={ classes.VantageScoreCredit }>
        <p className={ classes.VantageScoreText }>VantageScore® Credit Score</p>
        <p className={ classes.VantageScoreText }>Mariner Finance, LLC and its affiliates, (collectively “Mariner”) is providing you access to your VantageScore ® credit score, (which is provided by VantageScore Solutions, LLC) only for your educational, personal, and non-commercial use. VantageScore ® is used by some institutions to evaluate creditworthiness and to make information more uniform between the three main credit bureaus so that consumers have a clearer understanding of their credit health. Your VantageScore® credit score is calculated by a model (as may be updated from time to time) that predicts credit risk and is just one of many credit scoring models available. Please note that your VantageScore® credit score is provided for informational purposes only and is not used by Mariner. Mariner has no responsibility for the content provided in connection with your VantageScore® credit score and cannot act on your behalf to dispute the accuracy
          of any information that appears in your credit report, other than information reported by Mariner.
        </p>
        <p className={ classes.VantageScoreText }>In determining a consumer’s creditworthiness and eligibility for a personal loan, Mariner
          uses the consumer’s FICO® score, rather than the VantageScore ®, as well as other types of information in making credit decisions.
        </p>
        <p className={ classes.VantageScoreText }>Mariner is not a credit repair organization as defined under federal or state law, including the Credit Repair Organizations Act. Mariner does not provide “credit repair” services or advice or assistance regarding rebuilding or improving your credit history or credit score, or monitoring
          for specific events that may impact your credit information.
        </p>
        <p className={ classes.VantageScoreText }>Under the Fair Credit Reporting Act, you have the right to receive a free credit report from each of the three national consumer reporting agencies (Experian Information Solutions, Inc., Equifax Inc., and TransUnion) once during any twelve-month period.
          To do so or for more information, visit AnnualCreditReport.com or call 877-322-8228.
        </p>
        <p>VantageScore® is a registered trademark of VantageScore Solutions, LLC.</p>
      </Grid>
    </div>
  );
}
