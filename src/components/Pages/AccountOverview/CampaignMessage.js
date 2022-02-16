import React,{useState,useEffect} from "react";
import setAccountDetails from "../../Controllers/AccountOverviewController";
import Grid from "@material-ui/core/Grid";
import "./Style.css";
import { ButtonPrimary } from "../../FormsUI";


export const CampaignMessage = ({logo,amount,offerCode,handleContinue,expiryDate}) =>{

const [message,setMessage] = useState("");

useEffect(()=>{
     setAccountDetails().then((res)=>{
         setMessage(res.data.offerData.campaignTypeMessage);
        // console.log(res.data.offerData.campaignTypeMessage);
     })
},[])

const handleChange = () =>{
    handleContinue();
}

return(
<Grid className="checkMyOffers">
    <Grid className="leftcheckMyOffers">
    <img src={ logo } width="120px" height="70px"></img>
        <p className="common">Don't wait! This offer expires { expiryDate }</p>
        </Grid>
    <Grid className="rightcheckMyOffers">
     <p className="common">You are prequalified up to</p>
     <p className="common" style={{color:"#0F4EB3",fontSize:"bold",textAlign:"center"}}>
                      ${ amount }
     </p>
    <p className="common">Use it to get things done.</p>
        <p className="common">Offer Code:{ offerCode }</p>
        <ButtonPrimary id="ClaimButton" stylebutton='{"color":"", "textTransform": "none","marginLeft":"40px"}' onClick={ handleChange }>
                      Continue
            </ButtonPrimary>
    </Grid>
</Grid>
)}