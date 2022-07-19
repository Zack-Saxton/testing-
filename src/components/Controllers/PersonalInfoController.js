import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";
import globalMessages from "../../assets/data/globalMessages.json";


export async function checkCustomeruser(body) {
    try {
      let url = "check_customer_user";
      let param = "";
      let data = {...body};
      let method = "POST";
      let addAccessToken = true;
      return await APICall(url, param, data, method, addAccessToken);
    } catch (error) {
      ErrorLogger(globalMessages.Error_executing_checkcustomer_API, error);
    }
  }



export async function ApplicationStatusByEmail(body) {
    try {
      let url = "get_customer_by_email";
      let param = "";
      let data = {...body};
      let method = "POST";
      let addAccessToken = true;
      return await APICall(url, param, data, method, addAccessToken)
    } catch (error) {
      ErrorLogger(globalMessages.Error_executing_checkapplication_API, error);
    }
  }