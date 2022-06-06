import { useQuery } from "react-query";
import { validateActivationToken } from "../../../Controllers/EmailVerificationController";

export const BranchPortalHook = () => {
  const verify = queryString.get("verify");
  const { isLoading, isError, data: verificationData } = useQuery([ 'branch-mail-verification-data', verify ], () => validateActivationToken(verify));
  return { verificationData, isError, isLoading }
}