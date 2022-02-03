import axios from "axios";
import Cookies from "js-cookie";
import ErrorLogger from "../lib/ErrorLogger";
import apiUrl from "./ApiLib.json";

/***** API Calling function *****/
const APICall = async (api, param, data, method, addAccessToken) => {
  const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');
  let response = {
    status: "",
    statusText: "",
    data: "",
  };

  let url = param === null ? apiUrl.url[ api ] : apiUrl.url[ api ] + param;
  try {
    await axios({
      method: method,
      url: url,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": addAccessToken === true ? loginToken.apiKey : "",
      },
      transformRequest: (data, headers) => {
        if (addAccessToken !== true) {
          delete headers.common[ "x-access-token" ];
        }
        return data;
      },
    }).then((res) => {
      response.data = res?.data?.data?.data ?? res?.data?.data ?? res?.data;
      response.status = res.status;
      response.statusText = res.statusText;
    });
  } catch (error) {
    if (api !== "error_logger") {
      ErrorLogger(error.message, error.stack);
    }
    response.data = error?.response?.data?.data?.data ?? error?.response?.data?.data ?? error?.response?.data;
    response.status = error.response.status;
    response.statusText = error.response.statusText;
  }
  console.log('API Data :: ', JSON.stringify(response, null, 4));
  return response;
};

export default APICall;