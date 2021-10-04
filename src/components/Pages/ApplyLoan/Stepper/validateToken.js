import { useLocation, useHistory } from 'react-router-dom';
import APICall from '../../../App/APIcall'
const ValidateToken = async (error) => {
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();

    const required = query.get('required');
    const activationToken = query.get('activation_token');
    const history = useHistory();
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    const userEmail = localStorage.getItem('email');

    if(!userToken?.isLoggedIn ){
        history.push({
			pathname: "/login",
            from: "verify",
            required: required,
            activationToken: activationToken
		});
    }
    else {
        let data = {
            "user_email": userEmail,
            "required": required,
            "activation_token": activationToken
        }
         let res = await APICall("/verification/verify_user_email_cac", data, "POST", true);
         if (res.data.data === true){
            history.push({
                pathname: "/customers/finalVerification",

            });
         }

    }

    return(
        <div>
            <p>Hello World</p>
        </div>
    );
}
 
export default ValidateToken;

