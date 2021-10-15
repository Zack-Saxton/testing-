import { useLocation, useHistory } from 'react-router-dom';
import APICall from '../../../App/APIcall';

//custom validate token component
const ValidateToken = async () => {
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const getResponse = async (data) => {
        let res = await APICall("/verification/verify_user_email_cac", data, "POST", true);
        return res;
    }
  
//To check login status from loacl storage
    const required = query.get('required');
    const activationToken = query.get('activation_token');

    const history = useHistory();
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    const userEmail = localStorage.getItem('email');

    //Redirecting based on result 
    if(!userToken?.isLoggedIn ){
        alert("hello");
        history.push({
			pathname: "/login",

            state: { required: required, activationToken: activationToken }
		});
    }

    else {
        let data = {
            "user_email": userEmail,
            "required": required,
            "activation_token": activationToken
        }
         let result = await getResponse(data);
        //  setResponse(res);
         if (result?.data?.data === true){
            history.push({
                pathname: "/customers/finalVerification",
            });
         }

    }
    return(
       null
    );
}
 
export default ValidateToken;

