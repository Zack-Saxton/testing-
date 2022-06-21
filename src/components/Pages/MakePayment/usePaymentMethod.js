import { useQuery } from "react-query";
import {usrPaymentMethods} from "../../Controllers/PaymentsController";

export const usePaymentMethod = () => {
  const { isLoading: isLoadingPayment, data: paymentsData } = useQuery("payment-method", usrPaymentMethods);
  return { isLoadingPayment, paymentsData }
}