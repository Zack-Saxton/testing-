import { useQuery } from "react-query";
import HolidayCalenderController from "../../Controllers/HolidayCalenderController";

export const useUSHolidayList = () => {
  const { isLoading, isError, data: result } = useQuery('holidays-list', HolidayCalenderController);
  return { result, isError, isLoading }
}