import APICall from "../lib/AxiosLib";

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
    Error("Error executing getMoneySkillLink API");
  }
}
