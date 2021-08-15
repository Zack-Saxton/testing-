import React from "react";
import { ButtonWithIcon } from "../../../FormsUI";
import Grid from "@material-ui/core/Grid";

//View Part
export default function EmailVerification() {
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
          In Progress: Your email address has not been verified. Please check
          your inbox for our email verification message. Alternatively, please
          click on the button to be resent the veriﬁcation email. If you have
          completed email verification. please refresh this page.
        </p>
      </Grid>

      <Grid item xs={12} style={{ lineHeight: 3 }}>
        <ButtonWithIcon
          stylebutton='{ "font-family":"system-ui","font-weight":"normal" }'
          styleicon='{ "color":"" }'
          fullWidth={true}
        >
          Resend the verification link
        </ButtonWithIcon>
      </Grid>
    </div>
  );
}
