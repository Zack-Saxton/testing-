import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

export default function CaptureUTMInfo(){
  const useQueryURL = () => new URLSearchParams(useLocation().search);
  const query = useQueryURL();
  let utmInfo = {};
  for (const [key, value] of query) {
    utmInfo[key] = value;
  }
  const utm_source = query.get("utm_source");
  const utm_medium = query.get("utm_medium");  
  const utm_campaign = query.get("utm_campaign");  
  if(utm_source){
    Cookies.set("utm_source_otherPartner",utm_source);
    Cookies.set("utm_medium_otherPartner",utm_medium);
    Cookies.set("utm_campaign_otherPartner",utm_campaign);
  }
  
}