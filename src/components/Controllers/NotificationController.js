import APICall from "../lib/AxiosLib";

/***** Get notification details *****/
export async function getNoticationData() {
  //get the user email id
  const email = localStorage.getItem("email");
  let url = "get_notification";
  let param = "";
  let data = {
    username: email,
    isAuthtenticated: "false",
  };
  let method = "POST";
  let addAccessToken = true;

  //API call
  let notification = await APICall(url, param, data, method, addAccessToken);
  return notification;
}
