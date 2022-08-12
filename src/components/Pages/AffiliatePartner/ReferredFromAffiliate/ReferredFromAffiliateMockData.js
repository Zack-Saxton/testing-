import React, { useEffect } from "react";
import { useQuery } from "react-query";
import  { PopulatePartnerReferred } from "../../../Controllers/PartnerSignupController";
import { useNavigate, useLocation } from "react-router-dom";

export const usePopulatePartnerReferred = (firstName_partner) => {
  const navigate = useNavigate();
  const useQueryURL = () => new URLSearchParams(useLocation().search);
  const query = useQueryURL();
  const applicantId = query.get("REF");
 
  useEffect(() => {
    if(!firstName_partner)
    {if(!applicantId )
      {
        navigate("/error")
      }}
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const { data: PopulatePartnerSignupData , isLoading, isError, } = useQuery([ 'populate-data-referred',  applicantId], () => PopulatePartnerReferred( applicantId ));
  return { PopulatePartnerSignupData, isError, isLoading}
}