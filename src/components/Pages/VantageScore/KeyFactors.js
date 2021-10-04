import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid} from '@material-ui/core';
import {useStyleVantageScore} from "./Style";
import creditScore from "./creditScore.json"




export default function ControlledAccordions(keyFactors) {
  const classes = useStyleVantageScore();
  const [expanded, setExpanded] = React.useState(false);
  
   let reasoneOne = keyFactors?.keyFactors ? keyFactors.keyFactors.reason1 :null;
   let reasoneTwo = keyFactors?.keyFactors ? keyFactors.keyFactors.reason2 :null;
   let reasoneThree = keyFactors?.keyFactors ? keyFactors.keyFactors.reason3 :null;
   let reasoneFour = keyFactors?.keyFactors ? keyFactors.keyFactors.reason4 :null;

   reasoneOne = creditScore[reasoneOne];
   reasoneTwo = creditScore[reasoneTwo];
   reasoneThree = creditScore[reasoneThree];
   reasoneFour = creditScore[reasoneFour];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <div >
        <h3 className = {classes.KeyFactorsHeading}>
        Key Factors Influencing Your Credit Score
        </h3>
           <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
           <AccordionSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1bh-content"
             id="panel1bh-header"
           >
             <Typography className={classes.MainkeyFactorHeading}>{reasoneOne.label}</Typography>
           </AccordionSummary>
           <AccordionDetails>
             <div className = {classes.VantageScoreSmallText}>
                 <p className = {classes.BoldText}>Explanation</p>
                 {reasoneOne.description}
                 <p className = {classes.BoldText}>What You Can Do</p>
                 {reasoneOne.tip}
             </div>
           </AccordionDetails>
         </Accordion>
         <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
           <AccordionSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel2bh-content"
             id="panel2bh-header"
           >
             <Typography className={classes.MainkeyFactorHeading}>{reasoneTwo.label}</Typography>
           </AccordionSummary>
           <AccordionDetails>
             <div className = {classes.VantageScoreSmallText}>
             <p className = {classes.BoldText}>Explanation</p>
             {reasoneTwo.description}
                 <p className = {classes.BoldText}>What You Can Do</p>
                {reasoneTwo.tip}
             </div>
           </AccordionDetails>
         </Accordion>
         <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
           <AccordionSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel3bh-content"
             id="panel3bh-header"
           >
             <Typography className={classes.MainkeyFactorHeading}>{reasoneThree.label}</Typography>
           </AccordionSummary>
           <AccordionDetails>
             <div className = {classes.VantageScoreSmallText}>
             <p className = {classes.BoldText}>Explanation</p>
             {reasoneThree.description}
                 <p className = {classes.BoldText}>What You Can Do</p>
              {reasoneThree.tip}
             </div>
           </AccordionDetails>
         </Accordion>
         <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
           <AccordionSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel4bh-content"
             id="panel4bh-header"
           >
             <Typography className={classes.MainkeyFactorHeading}> {reasoneFour.label}</Typography>
           </AccordionSummary>
           <AccordionDetails>
             <div className = {classes.VantageScoreSmallText}>
             <p className = {classes.BoldText}>Explanation</p>
             {reasoneFour.description}
                 <p className = {classes.BoldText}>What You Can Do</p>
                 {reasoneFour.tip}
             </div>
           </AccordionDetails>
         </Accordion>
     
      <Grid className = {classes.VantageScoreCredit}>
          <p className = {classes.VantageScoreText}>VantageScore® Credit Score</p>
          <p className = {classes.VantageScoreText}>Mariner Finance, LLC and its affiliates, (collectively “Mariner”) is providing you access to your VantageScore ® credit score, (which is provided by VantageScore Solutions, LLC) only for your educational, personal, and non-commercial use. VantageScore ® is used by some institutions to evaluate creditworthiness and to make information more uniform between the three main credit bureaus so that consumers have a clearer understanding of their credit health. Your VantageScore® credit score is calculated by a model (as may be updated from time to time) that predicts credit risk and is just one of many credit scoring models available. Please note that your VantageScore® credit score is provided for informational purposes only and is not used by Mariner. Mariner has no responsibility for the content provided in connection with your VantageScore® credit score and cannot act on your behalf to dispute the accuracy 
              of any information that appears in your credit report, other than information reported by Mariner.
          </p>
          <p className = {classes.VantageScoreText}>In determining a consumer’s creditworthiness and eligibility for a personal loan, Mariner 
              uses the consumer’s FICO® score, rather than the VantageScore ®, as well as other types of information in making credit decisions.
          </p>
          <p className = {classes.VantageScoreText}>Mariner is not a credit repair organization as defined under federal or state law, including the Credit Repair Organizations Act. Mariner does not provide “credit repair” services or advice or assistance regarding rebuilding or improving your credit history or credit score, or monitoring 
              for specific events that may impact your credit information.
          </p>
          <p className = {classes.VantageScoreText}>Under the Fair Credit Reporting Act, you have the right to receive a free credit report from each of the three national consumer reporting agencies (Experian Information Solutions, Inc., Equifax Inc., and TransUnion) once during any twelve-month period. 
              To do so or for more information, visit AnnualCreditReport.com or call 877-322-8228.
          </p>
          <p>VantageScore® is a registered trademark of VantageScore Solutions, LLC.</p>
      </Grid>
     </div>
  );
}
