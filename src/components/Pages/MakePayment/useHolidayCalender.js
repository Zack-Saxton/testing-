import { useQuery } from "react-query";
import HolidayCalenderController from "../../Controllers/HolidayCalenderController"

export const useHolidayCalender = () => {
  const { isLoading: isLoadingHoliday, data: holidayCalenderData } = useQuery("holiday-calendar", HolidayCalenderController);
  return { isLoadingHoliday, holidayCalenderData }
}