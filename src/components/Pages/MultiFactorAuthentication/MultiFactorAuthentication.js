import React, {useState} from "react";
import "./MultiFactorAuthentication.css";
import { useLocation } from "react-router-dom";
import OnePhoneNumber from "./OnePhoneNumber";
import TwoPhoneNumbers from "./TwoPhoneNumbers";
import {SendLoginPassCode} from "../../Controllers/MFAController"
import {useMutation} from "react-query";

const MultiFactorAuthentication = () => {
 const location = useLocation();

//   const location = {
//     "hash":"",
//     "key":"f094a9ts",
//     "pathname":"/MFA",
//     "search":"",
//     "state":{
//        "mfaDetails":{
//           "MFA":true,
//           "opted_phone_texting":"2232223221",
//           "phone_number_primary":"8472085643",
//           "phone_type":"Cell",
//           "securityQuestions": [
//             {
//                 "question_id": "2",
//                 "question": "What was the name of your favorite teacher?"
//             },
//             {
//                 "question_id": "4",
//                 "question": "What is your favorite vacation destination?"
//             },
//             {
//                 "question_id": "12",
//                 "question": "What is your favorite color?"
//             },
//             {
//                 "question_id": "3",
//                 "question": "What city did you meet your current spouse?"
//             },
//             {
//                 "question_id": "5",
//                 "question": "Where did you and your spouse marry?"
//             }
//         ],
//           "securityQuestionsSaved":true,
//           "unread_messages":0
//        }
//     }
//  }

  // const location = {
  //   "state":{
  //   "mfaDetails":{
  //     "login":{
  //        "attempts":0,
  //        "timestamp":1652371777174,
  //        "timestamp_date":"2022-05-12T16:09:38.002Z",
  //        "flagged":false,
  //        "freezeTime":1652371777174,
  //        "freezeTime_date":"2022-05-12T16:09:37.174Z",
  //        "jwt_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI2MTRhMzViY2VjMjI4ZTA0ZWVmY2JlYjIiLCJlbnQiOiJ1c2VyIiwiZXhwIjoxNjUyMzczNTc3MTc0fQ.cR6rtfQhdX1il5WamouneeDYX99eHCbVCnjNU2qITNQ",
  //        "last_timestamp_date":"2022-05-12T16:09:37.696Z",
  //        "last_ip":"14.97.228.214"
  //     },
  //     "unread_messages":0,
  //     "attempts":0,
  //     "MFAttributes":{
  //        "deviceType":null,
  //        "deviceTimeStamp":"2022-04-21T09:46:42.563Z",
  //        "deviceFlag":true
  //     },
  //     "MFA":false,
  //     "MFAByPass":{
  //        "MFAByPassFlag":false
  //     },
  //     "phone_number_primary":"2012012012",
  //     "phone_type":"Cell",
  //     "opted_phone_texting":"2012012012"
  //  },
  // }
  // }

  const [selection, setSelection] = useState();
  const {mutateAsync, isLoading} = useMutation(SendLoginPassCode);
 

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

//Two Phone Numbers with no security questions === In Process
if(situationFive) {
  return (
    <TwoPhoneNumbers
      cellPhoneNumber={location?.state?.mfaDetails?.phone_number_primary}
      optionalPhoneNumber={location?.state?.mfaDetails?.opted_phone_texting}
      setSelection={setSelection}
      selection={selection ? false : true}
      selectionValue={selection}
      sendPassCode={mutateAsync}
      isLoading={isLoading}
      mfaDetails={location?.state}
      securityQuestionsSaved={false}
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
          selectionValue={selection}
          sendPassCode={mutateAsync}
          isLoading={isLoading}
          mfaDetails={location?.state}
          securityQuestionsSaved={true}
          />
  );
};
}

export default MultiFactorAuthentication;
