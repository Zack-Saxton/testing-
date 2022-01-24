import APICall from "../lib/AxiosLib";

/***** Get Account overview details *****/
export default async function HolidayCalender() {
  let url = "mariner_holiday_calender";
  let param = "";
  let data = {};
  let method = "POST";
  let addAccessToken = true;

  //API call
  return APICall(url, param, data, method, addAccessToken);
  
}
