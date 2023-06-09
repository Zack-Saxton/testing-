import React, {useState, useEffect} from "react";
import "./MultiFactorAuthentication.css";
import Cookies from 'js-cookie';
import CheckLoginTimeout from '../../Layout/CheckLoginTimeout';
import { useMultiFactorAuthentication } from '../../../hooks/useMultiFactorAuthentication';
import { useLocation } from "react-router-dom";
import MFASelection from "./MFASelection";
import CheckLoginStatus from '../../App/CheckLoginStatus';
import CircularProgress from "@mui/material/CircularProgress";
import "./mfa.css"

const MultiFactorAuthentication = () => {
  const location = useLocation();
  const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');
  const [mfaData, setMFAData] = useState();
  const { isLoading : loading_mfaData, data: mfaInfo } = useMultiFactorAuthentication();
  const [ uniqueNumber, setUniqueNumber] = useState();
  const [ disableSecurityQuestions, setDisableSecurityQuestions ] = useState(false);
  let securityQuestionsSaved = mfaData?.mfaDetails?.securityQuestionsSaved; 
  Cookies.remove("otpSkip");
  Cookies.remove("kbaSkip");

  const mfaValidation = () => {
    if(mfaInfo?.data?.MFAInformation){
      let eligibleNumber = [];
      let structureMFAdata = {
       mfaDetails: mfaInfo.data.MFAInformation
  }
  if(structureMFAdata?.mfaDetails?.phone_number_primary){
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
    eligibleNumber.push({number : phoneFromCookie,
      type : 'mfa_phone_texting'});    
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
    if(location?.state?.noKbaQuestions) {
      setDisableSecurityQuestions(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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
            disableSecurityQuestions={disableSecurityQuestions}
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
