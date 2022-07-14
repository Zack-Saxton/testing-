import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { allDisclaimers } from "../../../../assets/data/Disclaimer";

export default function Disclaimer(offerData) {
    
    const [ filteredDisclaimers, setFilteredDisclaimers ] = useState([]);

    const filterDisclaimers = (data) => {
        let campaignType = data?.offerData?.userOffers?.CampaignTypeDesc?.toLowerCase();
        let disclaimers = [];
        let disclaimerIndecies;
        if (campaignType)
            switch (campaignType) {
                case "bci":
                case "ita":
                    disclaimerIndecies = [ 8, 5, 2, 7, 3, 4, 6 ];
                    break;
                case "pres":
                case "trigger":
                    disclaimerIndecies = [ 1, 7, 2, 3, 4, 5, 6 ];
                    break;
                case "conv":
                case "bto":
                    disclaimerIndecies = [ 8, 5, 2, 3, 4, 6 ];
                    break;
                case "auto":
                case "dacc":
                    disclaimerIndecies = [ 9, 10, 11, 12, 13, 14, 3, 4, 6 ];
                    break;
                case "grids":
                    disclaimerIndecies = [ 1, 2, 3, 4, 5, 6 ];
                    break;
                case "rbo":
                    disclaimerIndecies = [ 1, 3, 4, 6 ];
                    break;
                case "glo":
                    disclaimerIndecies = [ 1, 5, 4, 2, 6 ];
                    break;
                default:
                    disclaimerIndecies = [ 8, 5, 2, 7, 3, 4, 6 ];
            }

        disclaimerIndecies?.forEach(index => {
            disclaimers.push(allDisclaimers[ index ]);
        });
        setFilteredDisclaimers(disclaimers);
    };

    useEffect(() => {
        filterDisclaimers(offerData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //View
    return (
        <div data-testid = "discalimerContainer" id="discalimerContainer">
            <Grid>
                <p className="common para">Important Offer Information
                </p>
            </Grid>
            {
                filteredDisclaimers.map((disclaimer) => {
                    return (
                        <Grid key={disclaimer.index.toString()}>
                            <Typography  data-testid = "discalimertitle" className="common para">{disclaimer.title}
                                <span className="small">{disclaimer.content}</span>
                            </Typography>
                        </Grid>
                    );
                })
            }
        </div>
    );
}