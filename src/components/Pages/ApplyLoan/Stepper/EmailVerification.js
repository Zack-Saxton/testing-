import React from "react";
import Grid from "@material-ui/core/Grid";
import { resendVerificationEmail } from '../../../controllers/applyForLoanController';
import { ButtonPrimary, ButtonSecondary } from "../../../FormsUI";
import Iframe from '../../../FormsUI/iframe'


//View Part
export default function EmailVerification(props) {

const sendVerificationEmail = async () => {
  let res = await resendVerificationEmail();
  console.log("API call response", res)
}


  return (
    <div>
      <Grid item style={{ width:"100%" }}>
        <p
          style={{
            textAlign: "justify",
            fontSize: "14px",
            color: "#595959",

            fontWeight: "normal",
          }}
        >
          In Progress: Your email address has not been verified. Please check
          your inbox for our email verification message. Alternatively, please
          click on the button to be resent the verification email. If you have
          completed email verification. please refresh this page.
        </p>
      </Grid>
     
{/* <iframe title="iframeTest" height="500px" width="100%" frameborder="0" allowtransparency="true"  src="https://testondemand.eoriginal.com/ssweb/eo_security_check?authCode=7fF5YzFzywBj2zZGLHWgD3AmtFUJMweseF3PPlWj6u3qTEYbHlQgO1dMsE7T0y0ONQtbY4z6qLpfLq1P86RZYBKd0ADXaJDGKJhVH2iT8iiB0x1OGbVHmABERv0AiM5W"/> */}
<Iframe />
      <Grid item xs={12} style={{ lineHeight: 3 }}>
        <ButtonSecondary
          stylebutton='{"fontWeight":"normal" }'
          styleicon='{ "color":"" }'
          fullWidth={true}
          onClick={() => { sendVerificationEmail() }}
        >
          Resend the verification link
        </ButtonSecondary>
      </Grid>
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
                    disabled={props.activeStep === 0}
                    onClick={props.prev}
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
                    onClick={()=>{ props.next() }}
                  >
                    {props.activeStep === props?.steps.length - 1 ? "Finish" : "Next"}
                  </ButtonPrimary>
                </div>
              </div>
    </div>
  );
}
