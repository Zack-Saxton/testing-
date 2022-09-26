import {toast} from "react-toastify";
import globalMessages from "../../assets/data/globalMessages.json";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";
import { getTimeZoneDetails } from "../Controllers/CommonController";

/***** My branch details *****/
export default async function MyBranchAPI() {
  try {
    //API
    let url = "myBranch_detail";
    let param = "";
    let data = {};
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_MyBranchAPI_API, error);
  }
}

/***** Schedule call ****/
export async function ScheduleCallApi(callDate, callingTime, callTimeZone, latitude, longitude) {
  try {
    //API
    let zoneDetails = await getTimeZoneDetails(latitude, longitude);
    let url = "myBranch_scheduleMeet";
    let param = "";
    let data = {
      data: {
        date: callDate,
        time: callingTime,
        time_zone_timeZoneName: callTimeZone,
        time_zone_dstOffset: zoneDetails?.dstOffset ?? "",
        time_zone_rawOffset: zoneDetails?.rawOffset ?? "",
      },
      type: "call",
      phone_number: "",
      isAuthenticated: true,
    };  
    let method = "POST";
    let addAccessToken = true;

    //API call
    let myBranch = await APICall(url, param, data, method, addAccessToken);

    //API response
    myBranch.status === 200
      ? toast.success(globalMessages?.Schedule_Call)
      : toast.error(globalMessages?.Schedule_Call_Error);
    return true;
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_MyBranchAPI_API, error);
  }  
}

/***** Schedule appoitment *****/
export async function ScheduleVisitApi(visitDate, visitTime, visitTimeZone, latitude, longitude) {
  try {
    //API
    let zoneDetails = await getTimeZoneDetails(latitude, longitude);
    let url = "myBranch_scheduleMeet";
    let param = "";
    let data = {
      data: {
        date: visitDate,
        time: visitTime,
        time_zone_timeZoneName: visitTimeZone,
        time_zone_dstOffset: zoneDetails?.dstOffset ?? "",
        time_zone_rawOffset: zoneDetails?.rawOffset ?? "",
      },
      type: "visit",
      phone_number: "",
      isAuthenticated: true,
    };
    let method = "POST";
    let addAccessToken = true;
    //API call
    let myBranch = await APICall(url, param, data, method, addAccessToken);

    //API response
    myBranch.status === 200
      ? toast.success(globalMessages?.Schedule_Appointment)
      : toast.error(globalMessages?.Schedule_Appointment_Error);
    return true;
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_MyBranchAPI_API, error);
  }  
}
