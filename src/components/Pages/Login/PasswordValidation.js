import React from "react";

export default function passwordValidation(password, section){
  if(section === 1){
    return(
      <>
        <li className={(password.length >= 10 && (password).length < 30) ? "validation-success" : "validation-failed"}>
          Between 10 and 30 characters in length
        </li>
        <li className={/[A-Z]/.test(password) ? "validation-success" : "validation-failed"}>
          At least 1 uppercase letter
        </li>
        <li className={/[a-z]/.test(password) ? "validation-success" : "validation-failed"}>
          At least 1 lowercase letter
        </li>
      </>);
  }else{
    return(
      <>
        <li className={/\d/.test(password) ? "validation-success" : "validation-failed" }>
          At least 1 number
        </li>
        <li className={/[*@!#$%()^~{}]+/.test(password) ? "validation-success" : "validation-failed"}>
          At least 1 special character.
        </li>
      </>
    );
  }  
}