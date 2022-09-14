import React, { useState } from 'react';
import { phoneNumberMask, maskPhoneNumberWithAsterisk } from '../components/Controllers/CommonController'

export const usePhoneNumber = () => {
  const [ phoneNumberValue, setPhoneNumberValue ] = useState("");
  const [ phoneNumberCurrentValue, setPhoneNumberCurrentValue ] = useState("");

  const updateActualValue = (_event) => {
    setPhoneNumberCurrentValue(phoneNumberMask(phoneNumberValue));
  }
  const updateMaskValue = (_event) => {	
    setPhoneNumberCurrentValue(maskPhoneNumberWithAsterisk(phoneNumberMask(phoneNumberValue))) ;
  }
  const updateEnterPhoneNo = (event) =>{
	  setPhoneNumberValue(event?.target?.value);
    setPhoneNumberCurrentValue(phoneNumberMask(event?.target?.value));
  }

  return { phoneNumberValue, setPhoneNumberValue, phoneNumberCurrentValue, setPhoneNumberCurrentValue, updateActualValue, updateMaskValue, updateEnterPhoneNo }
}