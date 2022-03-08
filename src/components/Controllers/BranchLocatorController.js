import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";
import globalMessages from "../../assets/data/globalMessages.json"


export default async function BranchLocatorController(zipcode) {
    try {
        let url = "branch_locator";
        let param = `?zipcode=${ zipcode }`;
        let data = {};
        let method = "GET";
        let addAccessToken = false;

        //API call
        return await APICall(url, param, data, method, addAccessToken);
    } catch (error) {
        ErrorLogger(globalMessages.Error_executing_BranchLocatorController_API, error);
    }
}