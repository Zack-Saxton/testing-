import { useQuery } from "react-query";
import { fetchQuestionMFA } from "../../Controllers/MFAController";

export const useMFADetails = async (emailData) => {
  const { isLoading, isError, data } = useQuery('available-offers', fetchQuestionMFA(emailData));
  return { data, isError, isLoading }
}