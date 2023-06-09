import { makeStyles } from "@mui/styles";

//Styling
const useStylesEmailVerification = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  ensureText: {
    lineHeight: "1.5",
    color: "#595959",
    fontSize: "0.906rem",
    paddingTop: "10px",
    paddingLeft: "0px",
    display: "block",
  },
  ensureTitle: {
    lineHeight: "1.5",
    color: "#595959",
    fontSize: "0.938rem",
    paddingLeft: "0px",
    display: "block"
  },
  PleaseEnsureList: {
    paddingLeft: "0px",
    fontSize: "0.938rem",
    color: "#595959",
    lineHeight: "1.5",
    margin: "0px",
    listStylePosition: "inside",
    textAlign: "justify"
  },
  uploadDocumentText: {
    display: "block",
    fontSize: "0.875rem",
    margin: "14px 0px",
  },
  uploadDocumentParagraph: {
    display: "block",
    color: "#595959",
    fontSize: "0.938rem",
    lineHeight: "1.5",
    textAlign: "justify"
  },
  nextButton: {
    marginTop: "20px",
  },
  selectDocumentType: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  selectInput: {
    marginBottom: "15px",
  },
  secureLoanButton: {
    padding: "20px 0px",
    marginTop: "15px",
    borderTop: "1px solid #000",
  },
  secureLoanText: {
    marginBottom: "1.5%",
  },
  dropdownMenu: {
    color: "#0F4EB3",
  },
  showCheckbox: {
    display: "block",
  },
  hideCheckbox: {
    display: "none"
  },
  showNextButton: {
    display: "block",
    color: ""
  },
  hideNextButton: {
    display: "none",
    color: ""
  },
  exampleText: {
    color: "#595959",
    fontSize: "0.938rem",
    lineHeight: "1.5",
    textAlign: "justify",
    "@media (max-width: 425px)": {
      fontSize: "0.875rem",
    },
  },
  ulText: {
    color: "#595959",
    fontSize: "0.938rem",
    lineHeight: "1.5",
    paddingLeft: "0px !important",
    margin: "0px 0px 10px 0px",
    listStylePosition: "inside"
  },
  chipButton: {
    borderRadius: 3,
    border: "none",
    background: "transparent !important"
  },
  selfieImage: {
    margin: "0px 10px",
    "@media (max-width: 700px)": {
      width: "100%",
      height: "auto",
      margin: "0"
    }
  },
  selfieCamera: {
    "@media (max-width: 700px)": {
      width: "100%",
      height: "auto",
      margin: "0"
    }
  },
  stepLabelButton:{
    backgroundColor: '#1976d2',
    borderRadius: '50%',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }


}));

export { useStylesEmailVerification };
