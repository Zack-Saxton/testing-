import { useQuery } from "react-query";
import usrAccountDetails from "../../Controllers/AccountOverviewController";

export const useAccountOverview = () => {
  const { isLoading, isError, data: User, isFetching, refetch } = useQuery('loan-data', usrAccountDetails, { refetchOnMount: false, });
  return { User, isError, isLoading, isFetching, refetch }
}