import { createStyles, makeStyles } from "@mui/styles";

//Styling Part
const useStylesMFA = makeStyles((theme) =>
  createStyles({
    smallRadioButton: {
      margin: "10px 0px",
      "& svg": {
        width: "20px !important",
        height: "20px !important",
      },
    },
    twoStepWrap: {
      margin: "auto",
      maxWidth: "630px",
      minHeight: "88vh",
      alignItems: "center",
      width: "100%",
    },
    headingTextWrap: {
      position: "relative",
    },
    backArrow: {
      position: "absolute",
      left: "0",
      top: "0",
      padding: "4px 0px",
      width: "32px",
      height: "32px",
    },
    yellowBackArrow: {
      color: "#ffbc23",
    },
    twoStepPaper: {
      padding: "20px 40px",
      margin: "40px 0px",
      boxSizing: "border-box",
      height: "fit-content",
      boxShadow: "rgb(61 61 61 / 10%) 0px 8px 44px 0px",
      "@media (max-width: 699px)": {
        margin: "0px 30px",
      },
      "@media (max-width: 420px)": {
        padding: "20px 10px",
      },
    },
    twoStepHeading: {
      textAlign: "center",
      fontSize: "1.538rem",
      marginTop: "0.82rem",
      color: "#171717",
    },
    twoStepParagraph: {
      width: "100%",
      textAlign: "center",
      margin: "15px 0px",
      fontSize: "0.938rem",
      color: "#595959",
    },
    securityCodeText: {
      fontSize: "0.938rem",
      color: "#595959",
    },
    securityQuestions: {
      fontSize: "0.938rem",
      color: "#595959",
    },
    radioButtonwrap: {
      width: "100%",
      padding: "0px",
      boxSizing: "border-box",
    },
    radioGroupWrap: {
      display: "flex",
      flexDirection: "column",
    },
    nextButtonGrid: {
      justifyContent: "center",
      margin: "15px 0px",
    },
    otpWrap: {
      marginBottom: "25px",
    },
    otpNumber: {
      padding: "0px 5px",
      textAlign: "center",
    },
    securityQuestionsInput: {
      padding: "0px 5px",
      textAlign: "center",
      margin: "15px 0",
    },
    resetText: {
      fontSize: "0.844rem",
      textAlign: "center",
      margin: "30px 0px 0px 0px",
    },
    securityCubText: {
      fontSize: "0.938rem",
      textAlign: "center",
      margin: "15px 0px",
      color: "##595959",
    },
  })
);

export { useStylesMFA };
