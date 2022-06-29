import { useQuery } from "react-query";
import  { PopulatePartnerReferred } from "../../../Controllers/PartnerSignupController";

export const usePopulatePartnerReferred = (applicantId) => {
  const { data: PopulatePartnerSignupData , isLoading, isError, } = useQuery([ 'populate-data-referred',  applicantId], () => PopulatePartnerReferred( applicantId ));
  return { PopulatePartnerSignupData, isError, isLoading}
}