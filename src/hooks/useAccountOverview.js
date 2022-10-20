import { useQuery } from "react-query";
import usrAccountDetails from "../components/Controllers/AccountOverviewController"

export const useAccountOverview = () => {
  const { isLoading, isFetching, isError, data, refetch } = useQuery('loan-data', usrAccountDetails);
  return { data, isError, isLoading, isFetching, refetch}
}