import Grid from "@material-ui/core/Grid";
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
        return null;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (preScreenMessage !== "") {
        return (
            <Grid className="content">
                { preScreenMessage }
            </Grid>
        );
    } else {
        return null;
    }
}