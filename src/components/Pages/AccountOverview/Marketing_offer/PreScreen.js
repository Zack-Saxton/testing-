import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";

export default function PreScreen(offerData) {
    const [ preScreenMessage, setPreScreenMessage ] = useState("");

    const determinePreScreen = (data) => {
        let campaignType = data?.offerData?.userOffers?.CampaignTypeDesc;
        let message = "";
        if (campaignType && [ "pres", "trigger", "grids", "auto", "dacc", "rbo", "glo" ].includes(campaignType.toLowerCase())) {
            message = "You can choose to stop receiving \"prescreened\" offers of credit from this and other companies by calling toll-free 888-567-8688.\n See PRESCREEN & OPT-OUT NOTICE below for more information about prescreened offers.";
        }
        setPreScreenMessage(message);
    };

    useEffect(() => {
        determinePreScreen(offerData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (preScreenMessage) {
        return (
            <Grid data-testid = "preScreen_component" className="content">
                {preScreenMessage}
            </Grid>
        );
    } else {
        return null;
    }
}