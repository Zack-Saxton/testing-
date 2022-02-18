import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

export default function OptOutNotice(offerData) {
    const [optOutNotice, setOptOutNotice] = useState("");

    const determineOptOut = (data) => {
        let campaignType = data.offerData.userOffers.CampaignTypeDesc;
        let optOut = "";
        if ( campaignType && ["pres", "trigger", "grids", "auto", "dacc", "rbo", "glo"].includes(campaignType.toLowerCase()) ){
            optOut = "This \"prescreened\" offer of credit is based on information in your credit report indicating that you meet certain criteria. This offer is not guaranteed if you do not meet our criteria, including providing acceptable property as collateral. If you do not want to receive prescreened offers of credit from this and other companies, call the nationwide consumer reporting agencies toll-free: 1-888-5OPT OUT, or write: Equifax, Inc Options, PO Box 740123, Atlanta, GA 30374; or Experian Opt Out, PO Box 919, Allen, TX 75013; or TransUnion Name Removal Option, PO Box 505, Woodlyn, PA 19094, or visit the website at www.optoutprescreen.com."
        }
        setOptOutNotice(optOut);       
    }

    useEffect( () => {
        determineOptOut(offerData)
        return null
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (optOutNotice !== ""){
        return (
            <Grid className="content">
                <Typography align={'center'}><u>PRESCREEN & OPT-OUT NOTICE</u></Typography>
                <p>{optOutNotice}</p>
            </Grid>
            )
    } else {
        return null
    }
}