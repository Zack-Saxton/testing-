import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import logo from "../../../../assets/images/mariner-finance.jpg";
import setAccountDetails from "../../../Controllers/AccountOverviewController";
import { ButtonPrimary } from "../../../FormsUI";

export default function CampaignMessage({ amount, offerCode, handleContinue, expiryDate }) {

    const [ message, setMessage ] = useState("");
    const [ formattedAmount, setAmount ] = useState("");

    useEffect(() => {
        setAccountDetails().then((res) => {
            setMessage(res?.data?.offerData?.campaignTypeMessage);
        });
        amountFormatter(parseInt(amount));
    }, [ amount ]);

    const amountFormatter = (number) => {
        setAmount("$ " + (Math.round(number * 100) / 100).toLocaleString());
    };
    return (
        <Grid data-testid = "CampaignMessage_component" className="checkMyOffers">
            <Grid className="leftcheckMyOffers">
                <img src={logo} width="120px" height="70px"></img>
                <p className="common">{`Don't wait! This offer expires`} {expiryDate}</p>
            </Grid>
            <Grid data-testid = "preQualified_amount" className="rightcheckMyOffers">
                <p className="common">You are prequalified up to</p>
                <p data-testid = "check_preQualified_amount" className="common" style={{ color: "#0F4EB3", fontSize: "bold", textAlign: "center" }}>
                    {formattedAmount}
                </p>
                <p className="common">Use it to get things done.</p>
                <p data-testid = "offerCode_disp" className="common">Offer Code:{offerCode}</p>
                <ButtonPrimary data-testid = "claim_button" id="ClaimButton" stylebutton='{"color":"", "textTransform": "none","marginLeft":"40px"}' onClick={handleContinue}>
                    Continue
                </ButtonPrimary>
            </Grid>
        </Grid>
    );
}

CampaignMessage.propTypes = {
    amount: PropTypes.string,
    offerCode: PropTypes.string,
    handleContinue: PropTypes.func,
    expiryDate: PropTypes.string,
};
