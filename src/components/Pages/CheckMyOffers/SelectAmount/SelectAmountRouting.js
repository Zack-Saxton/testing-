import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";


export default function SelectAmountRouting(){
  
const navigate = useNavigate();

  const navigateToSelectAmount = async () => {  
    navigate(`/select-amount`)
}

  useEffect(()  => {
    navigateToSelectAmount()    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


}