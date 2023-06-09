import { makeStyles } from "@mui/styles";

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
  },
  centerGrid: {
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
    fontSize: "1.125rem",
  },
  branchDetailInput: {
    lineHeight: 1,
    fontSize: "0.938rem",
    color: "#595959",
  },
  dialogPaper: {
    width: "100%",
    maxWidth: "500px",
    paddingBottom: "20px",
    borderRadius: "2px !important",
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
  },
  blueBackground: {
    margin: "0px",
    padding: "0px 15px",
  },
  headigText: {
    margin: "0 0 4% 0",
    fontSize: "2.125rem",
    fontWeight: "400",
  },
  loadingOnWithoutBlur: {
    pointerEvents: "none",
  },
  loadingOff: {
    opacity: 1,
    pointerEvents: "initial",
  },
  branchClose: {
    color: "red"
  },
  branchlocatorStyle: {
    alignItem: "flex-end",
    justifyContent: "space-between"
  },
  gridMyBranch: {
    paddingBottom: "10px"
  },
  navLinkMyBranch: {
    textDecoration: "underline",
    fontWeight:"700",
    "&:visited":{
      color:"unset"
    }
  },
  gridSchedule: {
    paddingTop: "10px",
    textAlign: "left"
  },
  iframeBranchMap: {
    height: "530px",
    width: "100%"
  },
  gridDatepicker: {
    paddingBottom: "15px"
  },
  scheduleDialog: {
    padding: "unset"
  },
  scheduleDialogAction: {
    justifyContent: "center"
  }
}));

export { useStylesMyBranch };
