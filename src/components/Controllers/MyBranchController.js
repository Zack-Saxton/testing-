import { toast } from "react-toastify";
import APICall from "../lib/AxiosLib";

/***** My branch details *****/
export default async function MyBranchAPI() {
  //API
  let url = "myBranch_detail";
  let param = "";
  let data = {};
  let method = "POST";
  let addAccessToken = true;

  //API call
  return APICall(url, param, data, method, addAccessToken);
 
}

/***** Schedule call ****/
export async function ScheduleCallApi(callDate, callingTime, callTimeZone) {
  //API
  let url = "myBranch_scheduleMeet";
  let param = "";
  let data = {
    data: {
      date: callDate,
      time: callingTime,
      time_zone_timeZoneName: callTimeZone,
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
  myBranch.data.status === 200
    ? toast.success(
        myBranch?.data?.data ? myBranch.data.data : "Your call is scheduled",
        {
          position: "bottom-left",
          autoClose: 5500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
    : toast.error("Error scheduling call", {
        position: "bottom-left",
        autoClose: 5500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  return "true";
}

/***** Schedule appoitment *****/
export async function ScheduleVisitApi(visitDate, visitTime, visitTimeZone) {
  //API
  let url = "myBranch_scheduleMeet";
  let param = "";
  let data = {
    data: {
      date: visitDate,
      time: visitTime,
      time_zone_timeZoneName: visitTimeZone,
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
  myBranch.data.status === 200
    ? toast.success(
        myBranch?.data?.data
          ? myBranch.data.data
          : "Your appointment is scheduled",
        {
          position: "bottom-left",
          autoClose: 5500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
    : toast.error("Error scheduling appointment", {
        position: "bottom-left",
        autoClose: 5500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  return "true";
}
