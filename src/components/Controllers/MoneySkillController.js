import APICall from "../lib/AxiosLib";
import ErrorLogger from "../lib/ErrorLogger"

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
    ErrorLogger("Error executing getMoneySkillLink API", error)
    Error("Error executing getMoneySkillLink API");
  }
}
