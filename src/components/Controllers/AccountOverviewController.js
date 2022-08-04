import globalMessages from "../../assets/data/globalMessages.json";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";

/***** Get Account overview details *****/
export default async function setAccountDetails() {
  try {
    let url = "account_overview";
    let param = "";
    let data = {};
    let method = "GET";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_AccountDetails_API, error);
  }
}


export async function postFullStorySession(customer, fsSession, fsSessionKey) {
	try {
		//API
		let url = "post_fullstory";
		let param = "";
    customer.fullstory = Object.assign({}, customer.fullstory,{
      [ fsSessionKey ]: {
          url: fsSession,
          date: new Date(),
      }
    });
    let data = { 
        formdata: customer
    }
    let method = "POST";
		let addAccessToken = true;
		//API call
		return await APICall(url, param, data, method, addAccessToken);
	} catch (error) {
    ErrorLogger("Error executing post fullstory API", error);
	}
}	
