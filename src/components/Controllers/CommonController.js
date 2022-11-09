import ErrorLogger from "../lib/ErrorLogger";
import globalMessages from "../../assets/data/globalMessages.json";
import Moment from "moment";
/***** get IP from cloudflare method *****/
export default async function getClientIp(_rountingNumber) {
  try {
    let ipResponse = await fetch("https://www.cloudflare.com/cdn-cgi/trace");
    ipResponse = await ipResponse.text();
    let ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
    return ipResponse.match(ipRegex)[0];
  } catch (err) {
    return null;
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

export const phoneNumberMask = (values) => {
  	if(values){
  		let phoneNumber = values.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    	values = !phoneNumber[ 2 ] ? phoneNumber[ 1 ] : '(' + phoneNumber[ 1 ] + ') ' + phoneNumber[ 2 ] + (phoneNumber[ 3 ] ? '-' + phoneNumber[ 3 ] : '');
    	return (values);
  	}
    return '';
  }

export const maskPhoneNumberWithAsterisk = (phoneNumberToMask) => {
  let firstNumber = phoneNumberToMask.slice(0, 10);
  return firstNumber.replace(/\d/g, '*') + phoneNumberToMask.slice(10);
}

export const handleDateOffset = (utcTime) => {
  const tzoffset = utcTime.getTimezoneOffset() * 60000;
  return  new Date(utcTime.getTime() + tzoffset);
}