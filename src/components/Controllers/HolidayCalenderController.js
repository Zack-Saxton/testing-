import globalMessages from "../../assets/data/globalMessages.json";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";

/***** Get USA Holiday details *****/
export default async function HolidayCalenderController() {
  try {
    let url = "mariner_holiday_calender";
    let param = "";
    let data = {};
    let method = "GET";
    let addAccessToken = false;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_HolidayCalender_API, error);
  }
}
