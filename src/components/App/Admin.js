import React, {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

export default function Admin() {
  const navigate = useNavigate();
  const useQueryURL = () => new URLSearchParams(useLocation().search);

  //Capture Params from URL
  const query = useQueryURL();
  const utm_source = query.get("utm_source");
  const utm_medium = query.get("utm_medium");
  const utm_dealer = query.get("utm_dealer");
  const utm_campaign = query.get("utm_campaign");
  const gclid = query.get("gclid")


  let UTMinfo = `utm_source=${ utm_source }&utm_medium=${ utm_medium }&utm_campaign=${ utm_campaign }&utm_dealer=${ utm_dealer }`
  let redirectParams = '?'
  let referer_otherPartner_url = window.location.href

  Cookies.set("utm_source_otherPartner", utm_source)
  Cookies.set("utm_medium_otherPartner", utm_medium)
  Cookies.set("utm_campaign_otherPartner", utm_campaign)
  Cookies.set("referer_otherPartner", referer_otherPartner_url)
  Cookies.set("gclid", gclid)

  function navigateToSelectAmount() {
    if (utm_source) {
      navigate(`/select-amount${ redirectParams }${ UTMinfo }`)
    }
    else {
      navigate("/select-amount")
    }
  }

  useEffect(() => {
    navigateToSelectAmount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}