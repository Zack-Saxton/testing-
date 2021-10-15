import axios from "axios";
import { toast } from "react-toastify";
import handleTokenExpiry from './HandleTokenExpiry';


//My branch details
export default async function MyBranchAPI() {

//Login access token
  const loginToken = JSON.parse(localStorage.getItem("token"));

//Get response from API call
  let response = {
    isLoggedIn: "",
    active: "",
    data: "",
  };

  try {
    await axios({
      method: "POST",
      url: "/customer/find_closest_branch_cac",

      headers: {
        "Content-Type": "application/json",
        "x-access-token": loginToken.apiKey,
      },
      transformRequest: (data, headers) => {
        delete headers.common["Content-Type"];
        return data;
      },
    }).then((res) => (response.data = res));
  } catch (error) {
    handleTokenExpiry(error);
    response.data = error.response;
  }
  return response;
}


//Schedule call
export async function ScheduleCallApi(callDate, callingTime, callTimeZone) {

//Login access token
  const loginToken = JSON.parse(localStorage.getItem("token"));

//Get response from API call
  let result = [];

  let body = {
    data: {
      date: callDate,
      time: callingTime,
      time_zone_timeZoneName: callTimeZone,
    },
    type: "call",
    phone_number: "",
    isAuthenticated: true,
  };

  try {
    await axios({
      method: "POST",
      url: "/application/schedule_branch_appointment_cac",
      data: JSON.stringify(body),

      headers: {
        "Content-Type": "application/json",
        "x-access-token": loginToken.apiKey,
      },
      transformRequest: (data, headers) => {
        delete headers.common["Content-Type"];
        return data;
      },
    })
      .then((res) => {
       
        toast.success(res.data, {
          position: "bottom-left",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return result.push("true");
      })
      .catch((err) => {
        toast.error("your call is not scheduled", {
          position: "bottom-left",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return result.push("true");
      });
  } catch (error) {
    handleTokenExpiry(error);
    result.push(error.result);
  }

  return result;
}

//Schedule appoitment
export async function ScheduleVisitApi(visitDate, visitTime, visitTimeZone) {
//Login access token
  const loginToken = JSON.parse(localStorage.getItem("token"));

//Get response from API call
  let result = [];

  let body = {
    data: {
      date: visitDate,
      time: visitTime,
      time_zone_timeZoneName: visitTimeZone,
    },
    type: "visit",
    phone_number: "",
    isAuthenticated: true,
  };

  try {
    await axios({
      method: "POST",
      url: "/application/schedule_branch_appointment_cac",
      data: JSON.stringify(body),

      headers: {
        "Content-Type": "application/json",
        "x-access-token": loginToken.apiKey,
      },
      transformRequest: (data, headers) => {
        delete headers.common["Content-Type"];
        return data;
      },
    })
      .then((res) => {
        toast.success(res.data, {
          position: "bottom-left",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return result.push("true");
      })
      .catch((err) => {
        toast.error("your appointment is not scheduled", {
          position: "bottom-left",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return result.push("true");
      });
  } catch (error) {
    handleTokenExpiry(error);
    result.push(error.result);
  }

  return result;
}