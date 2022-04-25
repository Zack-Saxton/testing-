import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import RecaptchaController from "../../Controllers/RecaptchaController";

const Recaptcha = () => {
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

  return (
    <div>
      {!isLoading && recaptchaData.status === 200 ? (
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

export default Recaptcha;
