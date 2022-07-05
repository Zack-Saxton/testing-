import React, {useState, useEffect} from "react";
import "./MultiFactorAuthentication.css";
import Cookies from 'js-cookie';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from "react-router-dom";
import OnePhoneNumber from "./OnePhoneNumber";
import TwoPhoneNumbers from "./TwoPhoneNumbers";
import {SendLoginPassCode, fetchQuestionMFA, fetchMFADetials} from "../../Controllers/MFAController"
import {useMutation} from "react-query";
import CheckLoginTimeout from '../../Layout/CheckLoginTimeout';
import CheckLoginStatus from '../../App/CheckLoginStatus';

const MultiFactorAuthentication = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');

  const [mfaData, setMFAData] = useState();

  const getDet = async() => {
    const emailNew = Cookies.get("email");
    let val = await fetchQuestionMFA(emailNew);
    let structureMFAdata = {
      mfaDetails: val?.data?.MFAInformation
    }
    setMFAData(structureMFAdata);
  }
  useEffect(() => {
    getDet();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


  const [selection, setSelection] = useState();
  const {mutateAsync, isLoading} = useMutation(SendLoginPassCode);
  if (mfaData && mfaData?.mfaDetails) {
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
      {loginToken.isLoggedIn && mfaData ? (
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
      {loginToken.isLoggedIn && mfaData ? (
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
      {loginToken.isLoggedIn && mfaData ? (
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
      {loginToken.isLoggedIn && mfaData ? (
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
      {loginToken.isLoggedIn && mfaData ? (
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
