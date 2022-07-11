import React, {useState, useEffect} from "react";
import "./MultiFactorAuthentication.css";
import Cookies from 'js-cookie';
import { useQuery,useMutation } from 'react-query';
import OnePhoneNumber from "./OnePhoneNumber";
import TwoPhoneNumbers from "./TwoPhoneNumbers";
import {SendLoginPassCode, fetchQuestionMFA} from "../../Controllers/MFAController"
import CheckLoginTimeout from '../../Layout/CheckLoginTimeout';
import CheckLoginStatus from '../../App/CheckLoginStatus';
import CircularProgress from "@mui/material/CircularProgress";
import "./mfa.css"

const MultiFactorAuthentication = () => {
  const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');

  const [mfaData, setMFAData] = useState();
  const getEmail = Cookies.get("email");
  const {isLoading : loading_mfaData, data : mfaInfo} = useQuery(['getMFADetails', getEmail ], ()=>fetchQuestionMFA(getEmail))

  useEffect(() => {
    if(mfaInfo?.data?.MFAInformation){
        let structureMFAdata = {
        mfaDetails: mfaInfo.data.MFAInformation
    }
        setMFAData(structureMFAdata);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mfaInfo]);

  const [selection, setSelection] = useState();
  const {mutateAsync, isLoading} = useMutation(SendLoginPassCode);


  if(loading_mfaData){
    return(
    <div className="mfa_loadingSpinnerDiv"><CircularProgress className="mfa_loadingSpinner"  /></div>)
    } 
   if (mfaData && mfaData?.mfaDetails && !loading_mfaData) {
  let phoneFromCookie = Cookies.get("mfaPhone");
  let phoneType = mfaData?.mfaDetails?.phone_type ? mfaData?.mfaDetails?.phone_type.toLowerCase() : "cell";  
  let securityQuestionsSaved = mfaData?.mfaDetails?.securityQuestionsSaved;  
  let primaryPhoneNumber = mfaData?.mfaDetails?.phone_number_primary;
  let optedPhoneNo = mfaData?.mfaDetails?.opted_phone_texting;
  let mfaPhoneNumber = phoneFromCookie ?? mfaData?.mfaDetails?.mfa_phone_texting;
  let situationOne = phoneType === 'cell' && !optedPhoneNo && !securityQuestionsSaved && !mfaPhoneNumber;
  let situationTwo = phoneType !== 'cell' && optedPhoneNo && !securityQuestionsSaved && !mfaPhoneNumber;
  let situationThree = phoneType === 'cell' && !optedPhoneNo && securityQuestionsSaved;
  let situationFour = phoneType !== 'cell' && optedPhoneNo && securityQuestionsSaved;
  let situationFive = phoneType === 'cell' && optedPhoneNo && !securityQuestionsSaved;
  let situationSix = phoneType === 'cell' && optedPhoneNo && securityQuestionsSaved;
  let situationSeven = phoneType !== 'cell' && !optedPhoneNo && !securityQuestionsSaved;
  let situationEight = phoneType !== 'cell' && !optedPhoneNo && securityQuestionsSaved;
  let situationNine = phoneType === 'cell' && !optedPhoneNo && primaryPhoneNumber && mfaPhoneNumber && securityQuestionsSaved;
  let situationTen = phoneType === 'cell' && !optedPhoneNo && primaryPhoneNumber && mfaPhoneNumber && !securityQuestionsSaved;
  let situationEleven = phoneType === 'cell' && !optedPhoneNo && !primaryPhoneNumber && mfaPhoneNumber && securityQuestionsSaved;
  let situationTwelve = phoneType === 'cell' && !optedPhoneNo && !primaryPhoneNumber && mfaPhoneNumber && !securityQuestionsSaved;
  let phoneNumerList = [];
  if(phoneType === 'cell' && (primaryPhoneNumber)){
    phoneNumerList.push(primaryPhoneNumber);
  }
  if(optedPhoneNo){
    phoneNumerList.push(optedPhoneNo);
  }
  if(mfaPhoneNumber){
    phoneNumerList.push(mfaPhoneNumber);
  }
  
/** One Phone number with No security questions **/
 if((situationOne || situationTwo || situationThree || situationFour) && phoneNumerList.length <= 1) {
  return (
    <div>
      <CheckLoginTimeout />
      {loginToken.isLoggedIn ? (
        <>
          <OnePhoneNumber
            phoneNumber={
              phoneType === "cell" ? primaryPhoneNumber : optedPhoneNo
            }
            setSelection={setSelection}
            selection={selection ? false : true}
            selectionValue={selection}
            sendPassCode={mutateAsync}
            isLoading={isLoading}
            mfaDetails={mfaData}
            securityQuestionsSaved={securityQuestionsSaved}
            phoneNumberSaved={true}
          />
        </>
      ) : (
        <CheckLoginStatus />
      )}
    </div>
  );
}

/*** Two Phone Numbers with no security questions ***/

 if(situationFive || situationSix) {
  return (
    <div>
      <CheckLoginTimeout />
      {loginToken.isLoggedIn ? (
        <>
         
          <TwoPhoneNumbers
            cellPhoneNumber={primaryPhoneNumber}
            optionalPhoneNumber={optedPhoneNo}
            mfaPhoneNumber={mfaPhoneNumber}
            setSelection={setSelection}
            selection={selection ? false : true}
            selectionValue={selection}
            sendPassCode={mutateAsync}
            isLoading={isLoading}
            mfaDetails={mfaData}
            securityQuestionsSaved={securityQuestionsSaved}
          />
      
        </>
      ) : (
        <CheckLoginStatus />
      )}
    </div>
  );
}

/*** No Phone Number without Security Questions ***/
 if(situationSeven || situationEight) {
  return (
    <div>
      <CheckLoginTimeout />
      {loginToken.isLoggedIn ? (
        <>
          <OnePhoneNumber
            setSelection={setSelection}
            selection={selection ? false : true}
            selectionValue={selection}
            sendPassCode={mutateAsync}
            isLoading={isLoading}
            mfaDetails={mfaData}
            securityQuestionsSaved={securityQuestionsSaved}
            phoneNumberSaved={false}
          />
        </>
      ) : (
        <CheckLoginStatus />
      )}
    </div>
  );
}

 if(situationNine || situationTen){
  return (
    <div>
      <CheckLoginTimeout />
      {loginToken.isLoggedIn ? (
        <>
          <TwoPhoneNumbers
            cellPhoneNumber={primaryPhoneNumber}
            optionalPhoneNumber={optedPhoneNo}
            mfaPhoneNumber={mfaPhoneNumber}
            setSelection={setSelection}
            selection={selection ? false : true}
            selectionValue={selection}
            sendPassCode={mutateAsync}
            isLoading={isLoading}
            mfaDetails={mfaData}
            securityQuestionsSaved={securityQuestionsSaved}
          />
        </>
      ) : (
        <CheckLoginStatus />
      )}
    </div>
  );
}

if(situationEleven || situationTwelve) {
  return (
    <div>
      <CheckLoginTimeout />
      {loginToken.isLoggedIn ? (
        <>
          <OnePhoneNumber
            phoneNumber={phoneType === "cell" ? mfaPhoneNumber : ""}
            setSelection={setSelection}
            selection={selection ? false : true}
            selectionValue={selection}
            sendPassCode={mutateAsync}
            isLoading={isLoading}
            mfaDetails={mfaData}
            securityQuestionsSaved={securityQuestionsSaved}
            phoneNumberSaved={true}
          />
        </>
      ) : (
        <CheckLoginStatus />
      )}
    </div>
  );
}
  }
}

export default MultiFactorAuthentication;
