import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";

/***** Get Disclosure Link details *****/
export default async function DisclosureLinkController(paramValue) {
  try {
    let url = "disclosure_link";
    let param = paramValue;
    let data = {};
    let method = "GET";
    let addAccessToken = false;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger("Error executing DisclosureLinkController API", error);
  }
}
