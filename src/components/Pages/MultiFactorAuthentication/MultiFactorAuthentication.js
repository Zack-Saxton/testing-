import React, {useState} from "react";
import "./MultiFactorAuthentication.css";
import { useLocation } from "react-router-dom";
import OnePhoneNumber from "./OnePhoneNumber";
import TwoPhoneNumbers from "./TwoPhoneNumbers";

const MultiFactorAuthentication = () => {
  //  const location = useLocation();

  const location = {
    "hash":"",
    "key":"f094a9ts",
    "pathname":"/MFA",
    "search":"",
    "state":{
       "mfaDetails":{
          "MFA":true,
          "opted_phone_texting":"2232223221",
          "phone_number_primary":"1231231234",
          "phone_type":"Home",
          "securityQuestionsSaved":true,
          "unread_messages":0
       }
    }
 }
  const [selection, setSelection] = useState();

  console.log(location);

  selection ? console.log(true) : console.log(false);

//Display only Security Questions if there is no data about Phone Numbers
//Users having Optional Texting & Phone Type === Cell, then prompt the user to select one through Radio button & PopUp
//Users having Phone Type === Cell, but no Optional Texting ==> follow the Wireframe
//Users having Phone Type ==/== Cell, but Optional Texting ==> follow the Wireframe
//Users having Phone Type ==/==Cell, no Optional Texting ==> Display only Security Questions





//One Phone Number with no security questions ==> To be completed
let situationOne = location?.state?.mfaDetails?.phone_type === 'Cell' && !location?.state?.mfaDetails?.opted_phone_texting && !location?.state?.mfaDetails?.securityQuestionsSaved
let situationTwo = location?.state?.mfaDetails?.phone_type !== 'Cell' && location?.state?.mfaDetails?.opted_phone_texting && !location?.state?.mfaDetails?.securityQuestionsSaved

//Phone number options with no security questions ==> To be completed
let situationFive = location?.state?.mfaDetails?.phone_type === 'Cell' && location?.state?.mfaDetails?.opted_phone_texting && !location?.state?.mfaDetails?.securityQuestionsSaved




let situationThree = location?.state?.mfaDetails?.phone_type === 'Cell' && !location?.state?.mfaDetails?.opted_phone_texting && location?.state?.mfaDetails?.securityQuestionsSaved
let situationFour = location?.state?.mfaDetails?.phone_type !== 'Cell' && location?.state?.mfaDetails?.opted_phone_texting && location?.state?.mfaDetails?.securityQuestionsSaved
let situationSix = location?.state?.mfaDetails?.phone_type === 'Cell' && location?.state?.mfaDetails?.opted_phone_texting && location?.state?.mfaDetails?.securityQuestionsSaved

//no Phone Number & No Security Questions has to route to KBA ---> I need to set this in Login component


if(situationOne || situationTwo) console.log("No security Qns");
if(situationFive) console.log("options with no qns");


//One Phone number with security questions === Done
if(situationThree || situationFour) {
  return (
  <OnePhoneNumber 
      phoneNumber={location?.state?.mfaDetails?.phone_type === 'Cell' ? location?.state?.mfaDetails?.phone_number_primary : location?.state?.mfaDetails?.opted_phone_texting}
      setSelection={setSelection}
      selection={selection ? false : true}
  />
  )
}

//Phone number options with security questions === Done
if(situationSix) {
  return (
      <TwoPhoneNumbers
          cellPhoneNumber={location?.state?.mfaDetails?.phone_number_primary}
          optionalPhoneNumber={location?.state?.mfaDetails?.opted_phone_texting}
          setSelection={setSelection}
          selection={selection ? false : true}
          />
  );
};
}

export default MultiFactorAuthentication;
