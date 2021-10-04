import { makeStyles } from "@material-ui/core/styles";

//Styling Part
const useStylesMyBranch = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  heading: {
    color: "#fff",
    fontWeight: "400",
    fontSize: "1.64rem",
  },
  branchDetailGrid: {
    textAlign: "initial",
  },
  branchDetailHeading: {
    color: "black",
    lineHeight: 0,
  },
  branchDetailInput: {
    lineHeight: 1,
    fontSize: "13px",
  },
  dialogPaper: {
    width: "auto",
    left: 10,
    bottom: 100,
    maxWidth: "unset",
  },
  dialogHeading: {
    color: "#171717!important",
    fontWeight: "400",
    fontSize: "20px",
    textAlign: "center",
  },
  closeButton: {
    color: "#171717!important",
  },
  buttonClose: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    color: "#171717!important",
  },
}));

export { useStylesMyBranch };
