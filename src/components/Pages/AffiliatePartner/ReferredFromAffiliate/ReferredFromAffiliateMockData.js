import { useQuery } from "react-query";
import  { PopulatePartnerReferred } from "../../../Controllers/PartnerSignupController";
import { useNavigate, useLocation } from "react-router-dom";

export const usePopulatePartnerReferred = () => {
  const navigate = useNavigate();
  const useQueryURL = () => new URLSearchParams(useLocation().search);
  const query = useQueryURL();
  const applicantId = query.get("REF");

  if(!applicantId)
    {
      navigate("/error")
    }
  const { data: PopulatePartnerSignupData , isLoading, isError, } = useQuery([ 'populate-data-referred',  applicantId], () => PopulatePartnerReferred( applicantId ));
  return { PopulatePartnerSignupData, isError, isLoading}
}