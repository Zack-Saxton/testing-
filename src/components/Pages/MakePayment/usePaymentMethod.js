import { useQuery } from "react-query";
import {usrPaymentMethods} from "../../Controllers/PaymentsController";

export const usePaymentMethod = () => {
  const { isLoading: isLoadingPayment, data: payments, refetch } = useQuery("payment-method", usrPaymentMethods,{ refetchOnMount: false, });
  return { isLoadingPayment, payments, refetch }
}