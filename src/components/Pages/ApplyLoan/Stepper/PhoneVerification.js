import React, {useState} from "react";
import {ButtonWithIcon, PhoneNumber, Radio, TextField,} from "../../../FormsUI";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//View Part
export default function PhoneVerification() {
    const [hasPasscode, setOfferCode] = useState();
    return (
        <div>
            <Grid item fullWidth={true}>
                <p
                    style={{
                        textAlign: "justify",
                        fontSize: "14px",
                        color: "#595959",
                        fontWeight: "normal",
                    }}
                >
                    To verify your phone number we will deliver a passcode to your phone.
                    Please select how you would like to receive this passcode.
                </p>
            </Grid>

            <Grid
                justifyContent="center"
                alignItems="center"
                item
                sm={5}
                className="textBlock"
            >
                <PhoneNumber
                    name="phone"
                    label="Phone number *"
                    id="phone"
                    type="text"
                />
                <div className="MuiTypography-alignLeft">
                    <Typography
                        style={{fontWeight: "normal"}}
                        className="smallTextLeft"
                        variant="p"
                        align="left"
                    >
                        This is the Phone number you provided in your application
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={12} style={{lineHeight: 3}}>
                <Radio
                    name="gender"
                    labelforform="Delivery Method"
                    radiolabel='[{"label":"Text", "value":"text"}, {"label":"Call", "value":"call"}]'
                    value="male"
                    row={true}
                    required={true}
                    labelplacement={"end"}
                    style={{fontWeight: "normal"}}
                />
                <div className="MuiTypography-alignLeft">
                    <Typography
                        style={{fontWeight: "normal"}}
                        className="smallTextLeft"
                        variant="p"
                        align="left"
                    >
                        Standard text message and voice rates apply.
                    </Typography>
                </div>
            </Grid>

            <Grid item xs={12} style={{lineHeight: 3}}>
                <ButtonWithIcon
                    stylebutton='{ "font-weight":"normal" }'
                    styleicon='{ "color":"" }'
                    fullWidth={true}
                    onClick={() => {
                        setOfferCode(!hasPasscode);
                    }}>
                    Send Passcode
                </ButtonWithIcon>
            </Grid>
            <div className={hasPasscode ? "open" : "close"}>
                <Grid sm={5}>
                    <TextField
                        name="firstName"
                        form={true}
                        label="Enter Passcode"
                        materialProps={{
                            "data-test-id": "offer",
                            maxLength: "10",
                        }}
                    />
                </Grid>
            </div>
        </div>
    );
}
