import { makeStyles } from "@mui/styles";

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
    color: "#214476",
    fontWeight: "400",
    fontSize: "1.563rem",
  },
  centerGrid: {
    marginTop: "20px",
    paddingRight: "23px",
    paddingLeft: "23px",
  },
  gridStyle: {
    paddingBottom: "10px",
  },
  spanStyle: {
    fontSize: "70%",
    fontWeight: "100",
  },
  menuColor: {
    color: "#757575",
  },
  linkStyle: {
    textDecoration: "none",
  },
  csvStyle: {
    paddingRight: "7px",
    marginBottom: "-4px",
  },
  pdfStyle: {
    paddingRight: "12px",
  },
  tableStyle: {
    paddingTop: "10px",
    paddingBottom: "1.875rem",
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
