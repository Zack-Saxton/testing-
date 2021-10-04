import React, { useEffect, useState } from "react";
import {ButtonPrimary, ButtonSecondary} from "../../../FormsUI";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import { getIfrmae } from "../../../controllers/applyForLoanController"

const useStyles = makeStyles((theme) => ({
  content_grid: {
    marginTop: "15px",
  },
}));

//View Part
export default function DocumentPhoto(props) {
  const classes = useStyles();
  const [iframeSrc, setIframeSrc] = useState('');

  async function  loadIframe() {
    let ifrmae = await getIfrmae();
    setIframeSrc(ifrmae.data.data.iframeSrc);
  }

  useEffect(() => {
    loadIframe();
  }, []);

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

      {/* <Grid sm={5} className={classes.content_grid}>
        <Select
          name="select"
          labelform="Select ID Type"
          select='[{"value":"Driver License"}, {"value":"Passport"}, 
              {"value":"State-issued Photo ID Card"}, {"value":"Military Federal Government Photo Id"}]'
        />
      </Grid> */}
{/* 
      <Grid className={classes.content_grid}>
        <ButtonPrimary stylebutton='{"background": "", "color":"" }'>
          Upload a Document
        </ButtonPrimary>
      </Grid> */}

      <div>
        <p style={{ textAlign: "justify" }}>
          Please upload a picture of yourself in which you are holding your
          state or federal government issued ID next to your face. Please ensure
          that the information on the ID is legible and that your hand is
          clearly visible and holding your ID. This will allow us to check that
          your ID document matches your appearance (similar to an in-person ID
          check)
        </p>
        {/* <p style={{ textAlign: "justify" }}>
          To see an example, please look at the image below
        </p>
        <br />
        <div>
          <img
            src={SelfieLicense}
            style={{ width: "200px" }}
            data-test-id="background"
            alt="selfielicense"
          />{" "}
          <br />
          Sample Photograph
        </div> */}
      </div>
{/* 
      <Grid className={classes.content_grid}>
        <ButtonPrimary stylebutton='{"background": "", "color":"" }'>
          Upload Your Picture
        </ButtonPrimary>
      </Grid> */}
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
              onClick={()=>{ props.next() }}
            >
              {props.activeStep === props?.steps.length - 1 ? "Finish" : "Next"}
            </ButtonPrimary>
          </div>
        </div>
    </div>
  );
}
