import React from "react";

export default function validateUserEnteredInput(userInput, section){
  if(section === 1){
    return(
      <>
        <li className={(userInput.length >= 10 && (userInput).length < 30) ? "validation-success" : "validation-failed"}>
          Between 10 and 30 characters in length
        </li>
        <li className={/[A-Z]/.test(userInput) ? "validation-success" : "validation-failed"}>
          At least 1 uppercase letter
        </li>
        <li className={/[a-z]/.test(userInput) ? "validation-success" : "validation-failed"}>
          At least 1 lowercase letter
        </li>
      </>);
  }else{
    return(
      <>
        <li className={/\d/.test(userInput) ? "validation-success" : "validation-failed" }>
          At least 1 number
        </li>
        <li className={/[*@!#$%()^~{}]+/.test(userInput) ? "validation-success" : "validation-failed"}>
          At least 1 special character.
        </li>
      </>
    );
  }  
}