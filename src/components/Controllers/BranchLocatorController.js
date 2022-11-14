import globalMessages from "../../assets/data/globalMessages.json";
import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";

export default async function BranchLocatorController(zipcode, Branches, stateSearchFlag) {
    try {
        let url = "branch_locator";
        let param = `?zipcode=${ zipcode }&Branches=${ Math.abs(parseInt(Branches, 10)) }&stateSearchFlag=${ stateSearchFlag }`;
        let data = {};
        let method = "GET";
        let addAccessToken = false;

        //API call
        return await APICall(url, param, data, method, addAccessToken);
    } catch (error) {
        ErrorLogger(globalMessages.Error_executing_BranchLocatorController_API, error);
    }
}

export async function loadGMaps(callback) {
    const existingScript = document.getElementById('googleMaps');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${process.env.REACT_APP_SECKey}`;
      script.id = 'googleMaps';
      document.body.appendChild(script);
      script.onload = () => { 
        if (callback) callback();
      };
    }
    if (existingScript && callback) callback();
  };