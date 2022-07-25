import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import RecaptchaController, { RecaptchaValidationController } from "../../Controllers/RecaptchaController";
import ErrorLogger from "../../lib/ErrorLogger";
import getClientIp from "../../Controllers/CommonController";
import globalMessages from "../../../assets/data/globalMessages.json";

const GenerateRecaptcha = (props) => {
  //API call
  const { isLoading, data: recaptchaData } = useQuery("recaptcha-generate", RecaptchaController);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js`;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [ recaptchaData ]);


  //reCaptcha validation
  window.onReCaptchaSuccess = async function () {
    try {
      let grecaptchaResponse = grecaptcha.getResponse();
      let recaptchaVerifyResponse = await RecaptchaValidationController(grecaptchaResponse, getClientIp);
      if (recaptchaVerifyResponse.status === 200) {
        toast.success(globalMessages.Recaptcha_Verify);
        props.setDisableRecaptcha(false);
      }
      else {
        toast.error(globalMessages.Recaptcha_Error);
        grecaptcha.reset();
        props.setDisableRecaptcha(true);
      }
    } catch (error) {
      ErrorLogger("Error executing reCaptcha", error);
    }
  };

  window.OnExpireCallback = function () {
    grecaptcha.reset();
    props.setDisableRecaptcha(true);
  };

  return (
    <div>
      {!isLoading && recaptchaData?.status === 200 ? (
        <div
          className={recaptchaData?.data?.recaptcha?.class}
          data-expired-callback="OnExpireCallback"
          data-sitekey={recaptchaData.data.recaptcha.dataSitekey}
          id="html_element"
          data-callback={recaptchaData.data.recaptcha.dataCallback}
        ></div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default GenerateRecaptcha;
GenerateRecaptcha.propTypes = {
  setDisableRecaptcha: PropTypes.func,
};