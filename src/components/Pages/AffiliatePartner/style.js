import { makeStyles } from "@mui/styles";

//Styling
const useStylesPartner = makeStyles((theme) => ({
  mainContentBackground: {
    backgroundColor: "#f6f6f6"
  },
  root: {
    flexGrow: 1,
  },
  mainGrid: {
    boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%),
    0 6px 30px 5px rgb(0 0 0 / 12%),
    0 8px 10px -7px rgb(0 0 0 / 20%)`,
    background: "#f5f2f2",
  },
  title: {
    fontSize: "20px",
    textAlign: "center",
    fontWeight: 400,
    color: "black",
  },
  subtitle: {
    textAlign: "center",
  },
  passwordTitle: {
    fontSize: "14px",
    textAlign: "justify",
  },
  dobTitle: {
    fontSize: "12px",
    textAlign: "justify",
  },
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,
    boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%),
  0 6px 30px 5px rgb(0 0 0 / 12%),
  0 8px 10px -7px rgb(0 0 0 / 20%)`,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signInButtonGrid: {
    textAlign: "center",
    paddingTop: "20px!important",
  },
  introText: {
    textAlign: "center"
  },
  partnerSignUpGrid: {
    paddingTop: "30px",
    paddingBottom: "40px",
    margin: "auto",
    width: "100%"
  },
  fullWidth: {
    width: "100%"
  },
  paddingBottom: {
    paddingBottom:"18px"
  },
  confirmationGrid: {
    paddingTop: "30px",
    paddingBottom: "40px",
    margin: "auto",
    width: "100%"
  },
  redText: {
    color: "#ff0000"
  },
  redTextPartner:{
    color: "#d32f2f"
  },

  paddingBottom_Right: {
    paddingBottom:"18px",
    paddingRight : "18px",
    "@media (max-width: 599px)": {

      paddingRight: "0px",

    },
  },

  


}));

export { useStylesPartner };
