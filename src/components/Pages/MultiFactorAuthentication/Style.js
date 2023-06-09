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
    divHide: {
      display: "none"
    },
    divShow: {
      display: "show"
    },
    twoStepWrap: {
      margin: "auto",
      // maxWidth: "630px",
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
    alignCenterDiv: {
      textAlign: "center"
    },
    yellowBackArrow: {
      color: "#ffbc23",
    },
    otpPaper:{
      idth: "100%",
      padding: "20px 40px",
      margin: "40px 20px",
      boxSizing: "border-box",
      height: "fit-content",
      boxShadow: "rgb(61 61 61 / 10%) 0px 8px 44px 0px",
    },
    twoStepPaper: {
      width: "100%",
      padding: "20px 40px",
      margin: "40px 20px",
      boxSizing: "border-box",
      height: "fit-content",
      boxShadow: "rgb(61 61 61 / 10%) 0px 8px 44px 0px",
      "@media (max-width: 520px)": {
        padding: "30px  20px",
      },
    },
    twoStepHeading: {
      textAlign: "center",
      fontSize: "2rem",
      margin: "0.82rem 11% 0px 11%",
      color: "#171717",
    },
    twoStepParagraph: {
      width: "100%",
      textAlign: "justify",
      margin: "15px 0px",
      fontSize: "1.4rem",
      color: "#595959",
    },
    securityCodeText: {
      fontSize: "1.1rem",
      color: "#595959",
    },
    securityQuestions: {
      fontSize: "1.1rem",
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
      textAlign: "left",
      margin: "15px 0",
    },
    selectSecurityQuestionsInput: {
      padding: "0px 5px",
      textAlign: "left",
      margin: "5px 0",
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
    loadingOn: {
      opacity: 0.55,
      pointerEvents: "none",
    },
    loadingOnWithoutBlur: {
      pointerEvents: "none",
    },
    loadingOff: {
      opacity: 1,
      pointerEvents: "initial",
    },
    button_div: {
      marginTop: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
    button_space: {
      color: "black",
      width: "auto",
      height: "36px",
      padding: "0px 30px",
      background: "#FFBC23 !important",
      whiteSpace: 'nowrap',
      borderRadius: '50px',
      margin: '5px',
      textTransform: 'none'
    },
    skip_button:{
      fontFamily:"Muli, sans-serif ",
      color: '#1B488A',
      border: '1px solid  #1B488A',
      width: "auto",
      height: "36px",
      padding: "0px 30px",
      background: "transparent",
      whiteSpace: 'nowrap',
      borderRadius: '50px',
      margin: '5px',
      textTransform: 'none'
    },
  })
);

export { useStylesMFA };
