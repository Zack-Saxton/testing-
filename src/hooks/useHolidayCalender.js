import { useQuery } from "react-query";
import HolidayCalenderController from "../components/Controllers/HolidayCalenderController"

export const useHolidayCalender = () => {
  const { isLoading, data } = useQuery("holiday-calendar", HolidayCalenderController);
  return { isLoading, data }
}