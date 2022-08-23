import ErrorLogger from "../lib/ErrorLogger";
import globalMessages from "../../assets/data/globalMessages.json";
import Moment from "moment";
/***** get IP from cloudflare method *****/
export default async function getClientIp(rountingNumber) {
  try {
    let ipResponse = await fetch("https://www.cloudflare.com/cdn-cgi/trace");
    ipResponse = await ipResponse.text();
    let ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
    return ipResponse.match(ipRegex)[0] ?? '127.0.0.1';
  } catch (err) {
    return '127.0.0.1';
  }
}
export async function getTimeZoneDetails(latitude, longitude) {
  try {
    let tempTime = (Moment().valueOf()) / 1000;
    let response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${ latitude },${ longitude }&timestamp=${ tempTime }&key=${ process.env.REACT_APP_SECKey }`);
    response = await response.text();
    return JSON.parse(response);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_Google_Time_Zone_API, error);
  }
}

export function trimSpecialCharacters(value){
  return value.replace(/-/g, "")
  .replace(/\)/g, "")
  .replace(/\(/g, "")
  .replace(/ /g, "") || "";
}