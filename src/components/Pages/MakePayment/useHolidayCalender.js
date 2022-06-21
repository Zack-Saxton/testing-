import { useQuery } from "react-query";
import HolidayCalender from "../../Controllers/HolidayCalenderController"

export const useHolidayCalender = () => {
  const { isLoading: isLoadingHoliday, data: holidayCalenderData } = useQuery("holiday-calendar", HolidayCalender);
  return { isLoadingHoliday, holidayCalenderData }
}