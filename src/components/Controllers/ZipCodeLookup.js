import { toast } from "react-toastify";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";

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
        ErrorLogger("Error executing ZipCodeLookup API", error);
    }
}