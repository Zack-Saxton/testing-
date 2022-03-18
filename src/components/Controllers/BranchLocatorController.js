import globalMessages from "../../assets/data/globalMessages.json";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";

export default async function BranchLocatorController(zipcode, Branches) {
    try {
        let url = "branch_locator";
        let param = `?zipcode=${ zipcode }&Branches=${ Math.abs(parseInt(Branches, 10)) }`;
        let data = {};
        let method = "GET";
        let addAccessToken = false;

        //API call
        return await APICall(url, param, data, method, addAccessToken);
    } catch (error) {
        ErrorLogger(globalMessages.Error_executing_BranchLocatorController_API, error);
    }
}