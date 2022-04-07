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
  PleaseEnsureList: {
    paddingLeft: "10px",
    fontSize: "0.875rem",
  },
  uploadDocumentText: {
    display: "block",
    fontSize: "0.875rem",
    margin: "14px 0px",
  },
  uploadDocumentParagraph: {
    display: "block",
    fontSize: "0.875rem",
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
}));

export { useStylesEmailVerification };
