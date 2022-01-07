import Cookies from "js-cookie";
import APICall from "../lib/AxiosLib";

/***** Get notification details *****/
export async function getNoticationData() {
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
  return  APICall(url, param, data, method, addAccessToken);
 
}

export async function setUnread(notificationId,id,isDelete,) {
  let url = "set_read";
  let param = "";
  let data = {
    "headersHost": "",
    "isAuthtenticated": "false",
    "notification_id" : notificationId,
    "id": id,
    "isDelete": isDelete
  };
  let method = "POST";
  let addAccessToken = true;

  //API call
  return  APICall(url, param, data, method, addAccessToken);
 
}

