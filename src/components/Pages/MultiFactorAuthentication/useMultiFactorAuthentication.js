import { useQuery } from "react-query";
import { fetchQuestionMFA } from "../../Controllers/MFAController";
import Cookies from 'js-cookie';

export const useMultiFactorAuthentication = () => {
  const getEmail = Cookies.get("email");
  const {isLoading : loading_mfaData, data : mfaInfo} = useQuery(['getMFADetails', getEmail ], ()=>fetchQuestionMFA(getEmail))
  return { loading_mfaData, mfaInfo }
}