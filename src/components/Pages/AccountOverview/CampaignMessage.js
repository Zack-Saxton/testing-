import React,{useState,useEffect} from "react";
import setAccountDetails from "../../Controllers/AccountOverviewController";


const CampaignMessage = () =>{

const [message,setMessage] = useState("");

useEffect(()=>{
     setAccountDetails().then((res)=>{
         setMessage(res.data.offerData.campaignTypeMessage);
     })
},[])

return(
    <>
    
    </>
)

}