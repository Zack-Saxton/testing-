import React, { useState } from "react";
import {
  ButtonWithIcon,
  PhoneNumber,
  TextField,
  Radio,
} from "../../../FormsUI";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//View Part
export default function EmailVerification() {
  const [hasPasscode, setOffercode] = useState();
  return (
    <div>
      <Grid item fullWidth={true}>
        <p
          style={{
            textAlign: "justify",
            fontSize: "14px",
            color: "#595959",
            fontFamily: "system-ui",
            fontWeight: "normal",
          }}
        >
          To verily your phone number we will deliver a passcode to your phone.
          Please select how you would like to receive this passcode.
        </p>
      </Grid>

      <Grid
        justify="center"
        alignItems="center"
        item
        lg={8}
        md={8}
        xs={12}
        className="textBlock"
      >
        <PhoneNumber
          name="phone"
          label="Phone number *"
          id="phone"
          type="text"
          />
        <div className="MuiTypography-alignLeft">
          <Typography style={{fontFamily: "system-ui",fontWeight: "normal",}}
           className="smallTextLeft" variant="p" align="left">
            This is the Phone number you provided in your application
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12} style={{ lineHeight: 3 }}>
        <Radio
          name="gender"
          labelforform="Delivery Method"
          radiolabel='[{"label":"Text", "value":"text"}, {"label":"Call", "value":"call"}]'
          value="male"
          row={true}
          required={true}
          labelplacement={"end"}
          style={{fontFamily: "system-ui",fontWeight: "normal"}}
        />
        <div className="MuiTypography-alignLeft">
          <Typography  style={{fontFamily: "system-ui",fontWeight: "normal",}} className="smallTextLeft" variant="p" align="left">
            Standard text message and voice rates apply.
          </Typography>
        </div>

      </Grid>

      <Grid item xs={12} style={{ lineHeight: 3 }}>
        <ButtonWithIcon
          stylebutton='{ "font-family":"system-ui","font-weight":"normal" }'
          styleicon='{ "color":"" }'
          fullWidth={true}
          onClick={(e) => {
            setOffercode(hasPasscode ? false : true);
          }}
        >
          Send Passcode
        </ButtonWithIcon>
      </Grid>
      <div className={hasPasscode ? "open" : "close"}>
          <Grid  lg={8} md={8} xs={12}>
        <TextField
          name="firstName"
          form={true}
          label="Enter Passode"
          materialProps={{
            "data-testid": "offer",
            maxLength: "10",
          }}
        />
        </Grid>
      </div>
    </div>
  );
}
