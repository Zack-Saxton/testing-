import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";


export async function checkCustomeruser(body) {
    try {
      let url = "check_customer_user";
      let param = "";
      let data = {...body};
      let method = "POST";
      let addAccessToken = true;
      return await APICall(url, param, data, method, addAccessToken);
    } catch (error) {
      ErrorLogger(globalMessages.Error_executing_usrPaymentMethods_API, error);
    }
  }



export async function checkApplicationStatus(body) {
    try {
      let url = "get_customer_by_email";
      let param = "";
      let data = {...body};
      let method = "POST";
      let addAccessToken = true;
      return await APICall(url, param, data, method, addAccessToken)
    } catch (error) {
      ErrorLogger(globalMessages.Error_executing_usrPaymentMethods_API, error);
    }
  }