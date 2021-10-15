import axios from "axios";
import handleTokenExpiry from './HandleTokenExpiry';

//Get Loan history
export default async function LoanHistoryController() {

//Login access token
  const loginToken = JSON.parse(localStorage.getItem("token"));

//Get response on API call
  let response = {
    isLoggedIn: "",
    active: "",
    data: "",
  };

  try {
    await axios({
      method: "GET",
      url: "/customer/account_overview",

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
