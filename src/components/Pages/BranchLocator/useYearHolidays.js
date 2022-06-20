import { useQuery } from "react-query";
import holidayCalender from "../../Controllers/HolidayCalenderController";

export const useUSHolidayList = () => {
  const { isLoading, isError, data: result } = useQuery('holidays-list', holidayCalender);
  return { result, isError, isLoading }
}