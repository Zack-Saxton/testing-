import APICall from "../lib/AxiosLib";
import { Error } from "../toast/toast"
/***** ZipCodeLookup method *****/
export default async function ZipCodeLookup(zipCode) {
    try {
        let url = "zip_lookup";
        let param = "";
        let data = {
            zipCode: zipCode,
        };
        let method = "POST";
        let addAccessToken = false;

        //API call
        return await APICall(url, param, data, method, addAccessToken);
    } catch (error) {
        Error("Error executing ZipCodeLookup API")
    }
}