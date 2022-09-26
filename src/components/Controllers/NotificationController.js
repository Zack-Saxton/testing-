import Cookies from "js-cookie";
import globalMessages from "../../assets/data/globalMessages.json";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";

/***** Get notification details *****/
export async function getNoticationData() {
  try {
    //get the user email id
    const email = Cookies.get("email");

    let url = "get_notification";
    let param = "";
    let data = {
      username: email,
      isAuthtenticated: "false",
    };
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_getNoticationData_API, error);
  }
}

export async function setUnread(notificationId, id, isDelete,) {
  try {
    let url = "set_read";
    let param = "";
    let data = {
      "headersHost": process.env.REACT_APP_HOST_NAME,
      "isAuthtenticated": "false",
      "notification_id": notificationId,
      "id": id,
      "isDelete": isDelete
    };
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_setUnread_API, error);
  }
}
