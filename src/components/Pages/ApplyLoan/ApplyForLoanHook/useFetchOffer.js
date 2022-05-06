import { useQuery } from "react-query";
import { fetchAvailableOffers } from "../../../Controllers/ApplyForLoanController";

export const useFetchOffer = () => {
  const { isLoading, isError, data: offers } = useQuery('available-offers', fetchAvailableOffers);
  return { offers, isError, isLoading }
}