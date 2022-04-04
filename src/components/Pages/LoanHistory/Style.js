import { makeStyles } from "@mui/styles";

const useStylesLoanHistory = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary
  },
  paperPointer: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,
    cursor: "pointer",
    height: "70%"
  },
  papertotal: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,
    background: "linear-gradient(85deg, #0F4EB3, #264266) !important"
  },
  heading: {
    color: "#214476",
    fontWeight: "400",
    fontSize: "1.64rem",
    margin: "0px",
    lineHeight: "0"
  },
  centerGrid: {
    marginTop: "20px",
    paddingRight: "23px",
    paddingLeft: "23px",
  },
  cardLoanHistory: {
    padding: "10px",
  },
  cardContentLoanHistory: {
    color: "#fff",
    fontWeight: "600",
    fontSize: "18px",
  },
  loanDocumentsTableCell: {
    padding: "16px 16px 16px 0px" 
  },
  textDecoration: {
    textDecoration: "none"
  },
  findInPageIcon: {
    color: "#0F4EB3",
    cursor: "pointer"
  },
  cardAmountLoanHistory: {
    fontSize: "1.563rem",
    marginTop: "10px",
  },
  cardApplyLoan: {
    fontSize: "1.125rem",
    fontWeight: 400,
    color: "#171717",
    margin: 0,
  },
  tableHead: {
    color: "#171717!important",
    fontWeight: "600",
    fontSize: "1rem",
    minWidth: "140px"
   },
  tableHeadLast:{
    color: "#171717!important",
    fontWeight: "600",
    fontSize: "1rem",
    minWidth: "140px",
    padding: "16px 60px 16px 0px"
  },
  tableHeadLast2:{
    color: "#171717!important",
    fontWeight: "600",
    fontSize: "1rem",
    minWidth: "140px",
    padding: "16px 16px 16px 0px"
  },
  tableHeadRow: {
    color: "#171717!important",
    fontSize: "15px",
  },
  tableHeadRowLast:{
    minWidth: "140px", 
    width: "150px", 
    padding: "16px 60px 16px 0px",
    color: "#171717!important",
    fontSize: "15px"
  },
  loanHistoryNavLink : {
    textDecoration: "none"
  },
  gridRecordTable : {
    paddingBottom: "30%" 
  },
  gridCardContent : {
    paddingBottom: "20px",
    paddingTop: "10px" 
  },
  gridCenter : {
    textAlign: "center"
  }
}));

export { useStylesLoanHistory };
