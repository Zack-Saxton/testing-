import React, { useEffect, useState } from "react";
import {ButtonPrimary, ButtonSecondary} from "../../../FormsUI";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import { getIfrmae } from "../../../Controllers/ApplyForLoanController"
import { errorMessage } from "../../../../helpers/ErrorMessage";
import APICall from '../../../App/APIcall';

//Styling 
const useStyles = makeStyles((theme) => ({
  content_grid: {
    marginTop: "15px",
  },
}));

//View Part
export default function DocumentPhoto(props) {
  const classes = useStyles();
  const [iframeSrc, setIframeSrc] = useState('');
  const [error, setError] = useState(false);

  //Load the IFrame 
  async function  loadIframe() {
    let ifrmae = await getIfrmae();
    setIframeSrc(ifrmae.data.data.iframeSrc);
  }

  //call function load
  useEffect(() => {
    loadIframe();
  }, []);

  //View part - JSX
  return (
    <div>
      <div className={classes.content_grid}>
        <p style={{ textAlign: "justify" }}>
          Please upload an image or your driver‘s license, passport,
          state-issued photo ID card, or military/federal government photo ID.
          <br />
          Please ensure: <br />
          <li style={{ textAlign: "justify" }}>Document is currently valid</li>
          <li style={{ textAlign: "justify" }}>
            The entire document is visible and all information is legible
          </li>
        </p>
      </div>
      <Grid item sm={12}>
      { iframeSrc !== '' ? <iframe src={iframeSrc} title="document upload" height="650px" width="100%"/> : null}

      </Grid>



      <div>
        <p style={{ textAlign: "justify" }}>
          Please upload a picture of yourself in which you are holding your
          state or federal government issued ID next to your face. Please ensure
          that the information on the ID is legible and that your hand is
          clearly visible and holding your ID. This will allow us to check that
          your ID document matches your appearance (similar to an in-person ID
          check)
        </p>
        <br />
        <p  style={{ textAlign: "justify", display: error ? "block" : "none", color: "red" }}>
        {errorMessage.applyForLoan.documentPhoto.verificationNotFound}
        </p>

      </div>

      <div className={props.classes.actionsContainer}>
          <div className={props.classes.button_div} >
            
            <ButtonSecondary
              stylebutton='{"marginRight": "10px", "color":"" }'
              onClick={props.reset}
              id = "button_stepper_reset"
            >
              Reset
            </ButtonSecondary>
            
            <ButtonSecondary
              disabled={props?.activeStep === 0}
              onClick={props?.prev}
              id = "button_stepper_prev"
              stylebutton='{"marginRight": "10px", "color":"" }'
            >
              Prev
            </ButtonSecondary>
            <ButtonPrimary
              variant="contained"
              color="primary"
              id = "button_stepper_next"
              stylebutton='{"marginRight": "10px", "color":"" }'
              onClick={ async ()=>{ 
                let data = {

                };
              let res = await APICall("/verification/verification_steps_cac", data, 'POST', true);
              if(res?.data?.data?.id_photo ===  true && res?.data?.data?.id_document === true){
                props.next() 
              }else {
                setError(true);
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
