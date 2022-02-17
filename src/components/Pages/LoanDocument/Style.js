import { makeStyles } from "@material-ui/core/styles";

const useStylesLoanDocument = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
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
  tableHead: {
    color: "#171717!important",
    fontWeight: "600",
    fontSize: "1rem",
  },
  tableHeadRow: {
    color: "#171717!important",
    fontSize: "15px",
    width: "90px",
    minWidth: "90px",
  },
  uploadbutton: {
    color: "black",
    background: "#ffbc23",
    borderRadius: "50px",
    textTransform: "capitalize",
    height: "36px",
    whiteSpace: "nowrap",
    fontWeight: "normal",
    boxShadow: ` 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12), 0 1px 5px 0 rgba(0, 0, 0, .2)`,
    width: "auto",
    "&:hover": {
      background: "#ffbc23",
      color: "black",
    },
  },
}));

export { useStylesLoanDocument };
