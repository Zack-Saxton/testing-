import React from "react";
import {ButtonPrimary, ButtonSecondary} from "../../../FormsUI";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import DocumentUpload from './DocumentUpload';
import APICall from '../../../App/APIcall';

//styling part
const useStyles = makeStyles(() => ({
  content_grid: {
    marginTop: "15px",
  },
}));

//View Part
//Initializing functional component 
export default function IncomeVerification(props) {
  const classes = useStyles();

  //JSX part
  return (
    <div>
      <div>
        <p style={{ textAlign: "justify" }}>
          To finalize our review, we need to verify the income that you have
          stated.
          <li>
            Please upload your most recent, complete pay statement (dated inside
            of 30 days) or your most recent benefits statement from the current
            calendar year if you are retired or not employed.
          </li>
          if you need to upload multiple documents to verify your stated income,
          you will have the opportunity to upload additional documents from your
          My Account Page &gt; Loan Application after you complete the
          verification steps.
        </p>

        <p style={{ textAlign: "justify" }}>
          Acceptable ﬁle Formats are PDF, JPG, JPEG, GIF, 81 PNG (please note
          that we are unable to accept screenshots or photos of a computer
          screen).
        </p>

        <p style={{ textAlign: "justify" }}>
          Feel Free to chat with us or give us a call at 877-310-2373 if you
          have a question about what is an acceptable form of proof of income!
        </p>
      </div>

      <Grid className={classes.content_grid}>
     
      </Grid>
      <Grid className={classes.content_grid}>
        <DocumentUpload classes={classes} type={"id_document"} />
      </Grid>
      <div className={props.classes.actionsContainer}>
          <div className={props.classes.button_div} >
            
            <ButtonSecondary
              stylebutton='{"margin-right": "10px", "color":"" }'
              onClick={props.reset}
              id = "button_stepper_reset"
            >
              Reset
            </ButtonSecondary>
            
            <ButtonSecondary
              disabled={props?.activeStep === 0}
              onClick={props?.prev}
              id = "button_stepper_prev"
              stylebutton='{"margin-right": "10px", "color":"" }'
            >
              Prev
            </ButtonSecondary>
            <ButtonPrimary
              variant="contained"
              color="primary"
              id = "button_stepper_next"
              stylebutton='{"margin-right": "10px", "color":"" }'
              onClick={async ()=>{ 
                let data = {

                };

                // API call
                    let res = await APICall("/verification/verification_steps_cac", data, 'POST', true);

                    //To check all the steps are completed or not 
                    if(res?.data?.data?.email === true && 
                      res?.data?.data?.phone_verification === true && 
                      res?.data?.data?.financial_information === true && 
                      res?.data?.data?.id_document === true && 
                      res?.data?.data?.id_questions === true && 
                      res?.data?.data?.id_photo === true && 
                      res?.data?.data?.bank_account_information === true && 
                      res?.data?.data?.bank_account_verification === true && 
                      res?.data?.data?.income_verification === true 
                      ){
                        props.next()
                      } 
                      else{
                        alert("please finish all the steps");
                      }
                }}
            >
              {props.activeStep === props?.steps.length - 1 ? "Finish" : "Next"}
            </ButtonPrimary>
          </div>
        </div>
    </div>
  );
}
