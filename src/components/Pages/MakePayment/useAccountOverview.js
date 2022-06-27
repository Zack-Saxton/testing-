import { useQuery } from "react-query";
import usrAccountDetails from "../../Controllers/AccountOverviewController";

export const useAccountOverview = () => {
  const { isLoading, isError, data: accountDetails, isFetching, refetch } = useQuery('loan-data', usrAccountDetails);
  return { accountDetails, isError, isLoading, isFetching, refetch }
}