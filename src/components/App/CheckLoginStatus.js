import { useHistory } from "react-router-dom";

const CheckLoginStatus = () => {
    const history = useHistory();
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    var min = 28; // Reset when storage is more than 24hours
    var now = new Date().getTime();
    var actualSetupTime = userToken?.setupTime ?? '';
        
    if(!userToken?.isLoggedIn ){
        history.push({
			pathname: "/login",
		});
    } 
    else if(now-actualSetupTime > min*60*1000){
        alert("Your session has been ended, Please login again to continue");
        history.push({
			pathname: "/login",
		});
    }
    return null;
}
 
export default CheckLoginStatus;
