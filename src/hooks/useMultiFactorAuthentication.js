import { useQuery } from "react-query";
import { fetchQuestionMFA } from "../components/Controllers/MFAController";
import Cookies from 'js-cookie';

export const useMultiFactorAuthentication = () => {
  const getEmail = Cookies.get("email");
  const {isLoading, data} = useQuery(['getMFADetails', getEmail ], ()=>fetchQuestionMFA(getEmail))
  return { isLoading, data }
}