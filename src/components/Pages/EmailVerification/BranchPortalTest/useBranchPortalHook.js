import { useQuery } from "react-query";
import { validateActivationToken } from "../../../Controllers/EmailVerificationController";
import { useLocation } from "react-router-dom";

export const useBranchPortalHook = () => {
  const useQueryURL = () => new URLSearchParams(useLocation().search);
  const queryString = useQueryURL();
  const verify = queryString.get("verify");
  const { isLoading, isError, data: verificationData } = useQuery([ 'branch-mail-verification-data', verify ], () => validateActivationToken(verify));

 return { verificationData, isError, isLoading }
}