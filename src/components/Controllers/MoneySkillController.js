import APICall from "../lib/AxiosLib";

/***** Get Account overview details *****/
export default async function getMoneySkillLink() {
  let url = "getMoneySkillLink";
  let param = "";
  let data = {};
  let method = "POST";
  let addAccessToken = true;

  //API call
  let moneySkillUrl = await APICall(url, param, data, method, addAccessToken);
  return moneySkillUrl;
}
