import { useQuery } from "react-query";
import {usrPaymentMethods} from "../components/Controllers/PaymentsController";

export const usePaymentMethod = () => {
  const { isLoading, data, refetch } = useQuery("payment-method", usrPaymentMethods,{ refetchOnMount: false, });
  return { isLoading, data, refetch }
}