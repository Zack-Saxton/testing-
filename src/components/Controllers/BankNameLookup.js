import globalMessages from "../../assets/data/globalMessages.json";
import axios from "axios";
import ErrorLogger from "../lib/ErrorLogger";

/***** BankNameLookup method *****/
export default async function BankNameLookup(rountingNumber) {
    try {
      let result = await axios.get(`https://www.routingnumbers.info/api/data.json?rn=${rountingNumber}`);
      if (result?.status === 200) {  
        return result?.data?.customer_name ?? "";
      }
      return "";
    } catch (error) {
        ErrorLogger(globalMessages.Error_executing_BankNameLookup_API, error);
    }
}