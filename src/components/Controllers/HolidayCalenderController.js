import APICall from "../lib/AxiosLib";

/***** Get USA Holiday details *****/
export default async function HolidayCalender() {
  try {
    let url = "mariner_holiday_calender";
    let param = "";
    let data = {};
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    Error("Error executing Holiday Calender API");
  }
}
