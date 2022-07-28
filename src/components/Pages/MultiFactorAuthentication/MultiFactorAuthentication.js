import React, {useState, useEffect} from "react";
import "./MultiFactorAuthentication.css";
import Cookies from 'js-cookie';
import CheckLoginTimeout from '../../Layout/CheckLoginTimeout';
import { useMultiFactorAuthentication } from "./useMultiFactorAuthentication";
import MFASelection from "./MFASelection";
import CheckLoginStatus from '../../App/CheckLoginStatus';
import CircularProgress from "@mui/material/CircularProgress";
import "./mfa.css"

const MultiFactorAuthentication = () => {
  const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');
  const [mfaData, setMFAData] = useState();
  const { loading_mfaData, mfaInfo } = useMultiFactorAuthentication();
  const [ uniqueNumber, setUniqueNumber] = useState();
  let securityQuestionsSaved = mfaData?.mfaDetails?.securityQuestionsSaved; 
  Cookies.remove("otpSkip");
  Cookies.remove("kbaSkip");

  const mfaValidation = () => {
    if(mfaInfo?.data?.MFAInformation){
      let eligibleNumber = [];
      let structureMFAdata = {
      // mfaDetails: mfaInfo.data.MFAInformation
      mfaDetails : {
        "email":"zdunkerton@marinerfinance.com",
        "firstname":"JEAN",
        "lastname":"LLMTWXY",
        "MFA":true,
        "MFAttributes":{
           "deviceType":"Chrome Mozilla 233 Apple Safari",
           "deviceTimeStamp":"2022-07-27T17:56:06.488Z",
           "deviceFlag":true
        },
        "LockUserByMFA":false,
        "phone_number_primary":"7023456789",
        "phone_type":"Cell",
        "opted_phone_texting":"3374565555",
        "mfa_phone_texting":null,
        "securityQuestionsSaved":true,
        "securityQuestions":[
           {
              "question_id":"1",
              "question":"What was the name of your favorite pet?"
           },
           {
              "question_id":"2",
              "question":"What was the name of your favorite teacher?"
           },
           {
              "question_id":"4",
              "question":"What is your favorite vacation destination?"
           },
           {
              "question_id":"6",
              "question":"What was your favorite restaurant in college?"
           },
           {
              "question_id":"8",
              "question":"What is your favorite car brand?"
           }
        ]
     }
  }
  if(structureMFAdata?.mfaDetails?.phone_type === "Cell" && structureMFAdata?.mfaDetails?.phone_number_primary){
    eligibleNumber.push({number : structureMFAdata.mfaDetails.phone_number_primary.trim(),
                         type : 'phone_number_primary'})
  }
  if(structureMFAdata?.mfaDetails?.opted_phone_texting) {
    eligibleNumber.push({number : structureMFAdata.mfaDetails.opted_phone_texting.trim(),
                         type : 'opted_phone_texting'})
  }
  let mfaPhoneCookie = Cookies.get("mfaPhone")
  let phoneFromCookie = mfaPhoneCookie ? mfaPhoneCookie.trim() : null ;
  if(phoneFromCookie) {
    if(structureMFAdata?.mfaDetails?.mfa_phone_texting) {
      eligibleNumber.push({number : phoneFromCookie,
                           type : 'mfa_phone_texting'})
    } else {
      eligibleNumber.push({number : phoneFromCookie,
                           type : 'mfa_phone_texting'})
    }
  } else {
    if(structureMFAdata?.mfaDetails?.mfa_phone_texting) {
      eligibleNumber.push({number : structureMFAdata.mfaDetails.mfa_phone_texting.trim(),
                           type : 'mfa_phone_texting'})
    }
  }
    setMFAData(structureMFAdata);
    let uniqueEligibleNumbers = eligibleNumber?.filter((eligibleNum, index, eligibleNumArray) => 
    eligibleNumArray.findIndex(phoneNum => phoneNum.number === eligibleNum.number) === index)
    setUniqueNumber(uniqueEligibleNumbers);
  }
  }

  useEffect(() => {
    mfaValidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mfaInfo]);

  return (
    <div data-testid="mfa_renders">
      <CheckLoginTimeout />
      {loginToken.isLoggedIn ? (
        <>
        {loading_mfaData 
          ? 
          (
            <div className="mfa_loadingSpinnerDiv" data-testid="mfa_loadingSpinnerDiv">
              <CircularProgress className="mfa_loadingSpinner"  />
            </div> 
          )
          :
          <MFASelection 
            securityQuestionsSaved={securityQuestionsSaved}
            phoneNumberList={uniqueNumber}
            mfaDetails={mfaData}
          />
        }
        </>
      ) : (
        <CheckLoginStatus />
      )}
    </div>
  );
  }


export default MultiFactorAuthentication;
