import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger";
import globalMessages from "../../assets/data/globalMessages.json"

/***** Get Account overview details *****/
export default async function getMoneySkillLink() {
  try {
    let url = "getMoneySkillLink";
    let param = "";
    let data = {};
    let method = "POST";
    let addAccessToken = true;

    //API call
    return await APICall(url, param, data, method, addAccessToken);
  } catch (error) {
    ErrorLogger(globalMessages.Error_executing_getMoneySkillLink_API, error);
  }
}
