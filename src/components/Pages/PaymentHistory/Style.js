import {makeStyles} from "@material-ui/core/styles";

//Styling Part
const useStylesPaymenthistory = makeStyles((theme) => ({
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
    color: "#fff",
    fontWeight: "400",
    fontSize: "1.64rem",
  },
  table: {
    minWidth: 650,
  },
  cardHeading: {
    color: "#171717!important",
    fontSize: "18px",
    fontWeight: "600",
  },
  tableHead: {
    color: "#171717!important",
    fontWeight: "600",
    fontSize: "1rem",
  },
  tableHeadRow: {
    color: "#171717!important",
    fontSize: "15px",
  },
}));

export { useStylesPaymenthistory };