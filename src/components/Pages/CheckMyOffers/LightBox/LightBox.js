import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {getCKLightBox} from "../../../Controllers/CheckMyOffersController"
import Cookies from "js-cookie";

export default function LightBox(){
  const navigate = useNavigate();

  const useQueryURL = () => new URLSearchParams(useLocation().search);
  const query = useQueryURL();
  const trkcid = query.get("trkcid");
  const ib = query.get("ib");  
  const apr = query.get("apr");
  const amount = query.get("amnt");
  const term = query.get("term");
  const campaign = query.get("campaign");
  const hp = query.get("hp");
  const own = query.get("own");
  const lp = query.get("lp");

  let queryParm = {
     trkcid : trkcid ,
     ib : ib,  
     apr : apr,
     amount : amount,
     term : term,
     campaign : campaign,
     hp : hp,
     own : own,
     lp : lp
  }; 

  let UTMinfo = `utm_source=CKLightbox&utm_medium=Web&utm_campaign=${trkcid}`
  let redirectParams = '?'  
  Cookies.set("CKLightbox_Source","CKLightbox")
  Cookies.set("CKLightbox_Web","Web")
  Cookies.set("CKLightbox_trkcid",trkcid)
  Cookies.set("CKLightbox_campaign",trkcid)
  Cookies.set("CKLightbox_term",term)
  Cookies.set("CKLightbox_amount",amount)


  const ckLightBoxApiCall = async () => {
    if(trkcid)
    {
      let response = await getCKLightBox(queryParm);
      if (response.status === 200) {
        navigate(`/loan-purpose${redirectParams}${UTMinfo}`) 
      } 
      // else {
      //   navigate(`/loan-purpose`)         
      // }        
    }
  };

  useEffect(()  => {
    ckLightBoxApiCall()    
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


}