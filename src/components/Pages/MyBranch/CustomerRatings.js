import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
export default function CustomerRatings() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://api.feefo.com/api/javascript/mariner-finance";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Grid data-testid="feefoRatingComponent" className="blueBGColor">
      <h4>Customer Ratings***</h4>
      <div id="feefo-service-review-carousel-widgetId" className="feefo-review-carousel-widget-service" >
      </div>
    </Grid>
  );

}