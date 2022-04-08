import { makeStyles } from "@material-ui/core/styles";

const useStylesLogin = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  termsText: {
    fontSize: "0.938rem",
  },
  linkDesign: {
    color: "#0F4EB3",
    cursor: "pointer",
    fontSize: "0.938rem"  
  },
  paper: {
    padding: "30px",
    margin: "70px 0px",
    borderRadius: "6px !important",
    display: "flex",
    flexDirection: "column",
    backgroundColor: `rgba(255, 255, 255, .8)`,
    color: theme.palette.text.secondary,
    boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%),
		0 6px 30px 5px rgb(0 0 0 / 12%),
		0 8px 10px -7px rgb(0 0 0 / 20%)`,
  },
  heading: {
    color: "white",
    justify: "center",
  },
  checkbox: {
    marginTop: "3%",
    textAlign: "initial",
    fontFamily: "'Muli', sans-serif !important",
  },
  title: {
    fontSize: "25px",
    textAlign: "center",
    color: "#171717",
    fontWeight: "400",
  },
  register: {
    fontSize: "0.844rem",
    textDecoration: "none",
    color: "#0F4EB3",
    fontFamily: "'Muli', sans-serif !important",
    marginBottom: "0px",
  },
  mainGrid: {
    boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%),
		0 6px 30px 5px rgb(0 0 0 / 12%),
		0 8px 10px -7px rgb(0 0 0 / 20%)`,
    background: "#f5f2f2",
  },
  mainContentGrid: {
    margin: "auto",
    display: "flex",
    alignItems: "center",
    minHeight: "93vh",
  },
  loginButton: {
    textAlign: "center",
    margin: "5% 0 0 0",
  },
  emailGrid: {
    lineHeight: "2",
    margin: "0px 0px 30px 0px",
  },
  passwordGrid: {
    margin: "0px 0px 30px 0px",
  },
  registerGrid: {
    textAlign: "center",
    width: "100%",
    margin: "5% 0px 0px 0px",
  },
  loginHelpDialogHeading: {
    fontSize: "25px",
    textAlign: "center",
    color: "#171717",
    fontWeight: "400",
  },
  createPasswordPaper: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    backgroundColor: `rgba(255, 255, 255, .8)`,
    color: theme.palette.text.secondary,
    boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%),
0 6px 30px 5px rgb(0 0 0 / 12%),
0 8px 10px -7px rgb(0 0 0 / 20%)`,
},
resetButton: {
    textAlign: "center",
},
emailInputGrid: {
    lineHeight: "2",
    padding: "8px"
},
logInGrid: {
  paddingTop: "30px"
},
passwordWrap: {
  width: "100%", 
  gap: 15, 
  marginBottom: 10 
},
loginRecaptcha: {
  display: "flex",
  justifyContent : "center",
  paddingTop: "10px"
}

}));

export { useStylesLogin };
