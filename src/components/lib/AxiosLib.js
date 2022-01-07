import axios from "axios";
import apiUrl from "./ApiLib.json";
import Cookies from "js-cookie";
/***** API Calling function *****/
const APICall = async (api, param, data, method, addAccessToken) => {
   const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');
  let response = {
    status: "",
    data: "",
  };

  let url = param === null ? apiUrl.url[api] : apiUrl.url[api] + param;
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
          delete headers.common["x-access-token"];
        }
        return data;
      },
    }).then((res) => {
      response.data = res;
    });
  } catch (error) {
    response.data = error.response;
  }
  return response;
};

export default APICall;

