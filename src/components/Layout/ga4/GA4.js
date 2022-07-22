import { useEffect } from "react";
import ReactGA from "react-ga4";

ReactGA.initialize(process.env.REACT_APP_GA4_TRACKING_ID);
export default function GA4(){
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
  });
}