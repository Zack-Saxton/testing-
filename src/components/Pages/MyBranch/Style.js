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
    color: "#214476",
    fontWeight: "400",
    fontSize: "1.563rem",
  },
  centerGrid:{
    marginTop: "20px",
    paddingRight: "23px",
    paddingLeft: "23px",
  },
  branchDetailGrid: {
    textAlign: "initial",
  },
  branchDetailHeading: {
    color: "#171717",
    lineHeight: 0,
    fontSize: "1.125rem"
  },
  branchDetailInput: {
    lineHeight: 1,
    fontSize: "0.938rem",
    color: "#595959"
  },
  dialogPaper: {
    width: "100%",
    maxWidth: "500px",
    paddingBottom: "20px",
    borderRadius: "2px !important"
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
  blueBackground: {
    backgroundColor: "#214476",
    margin: "0px",
    padding: "4%"
  },
  headigText: {
    margin: "0 0 2% 0",
    fontSize: "2.125rem",
    color: "#fff",
    fontWeight: "400"
  },
  loadingOnWithoutBlur: {
    pointerEvents: "none",
  },
  loadingOff: {
    opacity: 1,
    pointerEvents: "initial",
  },
}));

export { useStylesMyBranch };
