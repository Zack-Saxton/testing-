import { useQuery } from "react-query";
import {fetchAvailableOffers} from "../../../Controllers/ApplyForLoanController"
import APICall from "../../../lib/AxiosLib"

export const useBankVerify = (data) => {
  const { isLoading, isError, data: bankInfo } = useQuery('bank-info', async () => {
    let res = await APICall("bank_information_cac", '', data, "POST", true);
    return res;
  });
  return { bankInfo }
}