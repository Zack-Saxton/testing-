import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

export default function PreScreen(offerData) {
    const [prescreenMessage, setMessage] = useState("");

    const determinePrescreen = (data) => {
        let campaignType = data.offerData.userOffers.CampaignTypeDesc;
        let message = "";
        if ( campaignType && ["pres", "trigger", "grids", "auto", "dacc", "rbo", "glo"].includes(campaignType.toLowerCase()) ){
            message = "You can choose to stop receiving \"prescreened\" offers of credit from this and other companies by calling toll-free 888-567-8688.\n See PRESCREEN & OPT-OUT NOTICE below for more information about prescreened offers."
        }
        setMessage(message);       
    }

    useEffect( () => {
        determinePrescreen(offerData)
    }, [])

    return (
        <Grid className="content">
           {prescreenMessage}
        </Grid>
        )
}