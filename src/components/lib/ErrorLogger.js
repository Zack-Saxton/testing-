import APICall from "./AxiosLib";

/***** My branch details *****/
export default async function ErrorLogger(message, error) {
  try {
    //API
    let url = "error_logger";
    let param = "";
    let data = {
      "message": message,
      "error": error,
      "headersHost": "cac-app1-qa"
    };
    let method = "POST";
    let addAccessToken = false;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (resError) {
    Error("Error executing ErrorLogger API");
  }
}