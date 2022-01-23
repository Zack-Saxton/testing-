import APICall from "../lib/AxiosLib";

/***** Get Account overview details *****/
export default async function getMoneySkillLink() {
  let url = "getMoneySkillLink";
  let param = "";
  let data = {};
  let method = "POST";
  let addAccessToken = true;

  //API call
  return APICall(url, param, data, method, addAccessToken);

}
