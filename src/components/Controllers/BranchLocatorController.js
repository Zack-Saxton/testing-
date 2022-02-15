import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";

export default async function BranchLocatorController(zipcode) {
    try {
        let url = "branch_locator";
        let param = "?zipcode="+zipcode;
        let data = { };
        let method = "GET";
        let addAccessToken = false;

        //API call
        return await APICall(url, param, data, method, addAccessToken);
    } catch (error) {
        ErrorLogger("Error executing BranchLocatorController API", error);
    }
}