import { makeStyles } from "@material-ui/core/styles";

const useStylesMakePayment = makeStyles((theme) => ({
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
  table: {
    paddingBottom: "5px",
    paddingTop: "5px"
  },
  tableHead: {
    color: "#171717!important",
    fontWeight: "700",
    fontSize: "0.938rem",
  },
  tableHeadRow: {
    color: "#171717!important",
    fontSize: "0.938rem",
  },
  autoPayTableheadrow: {
    width:"50% !important",
    color: "#171717!important",
    fontSize: "15px",
  },
  cardHeading: {
    color: "#171717!important",
    fontSize: "1.125rem",
    fontWeight: "400",
    paddingBottom: "10px"
  },
  autoPayLink: {
    fontSize: "15px",
    textDecoration: "none",
    color: "#0F4EB3",
  },
  autoPayContent: {
    fontSize: "15px",
    textAlign: "justify",
    color: "#595959",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#171717!important",
  },
  dialogPaper: {
    maxWidth: "unset",
    margin:"10px"
  },
  dialogHeading: {
    color: "#171717!important",
    fontWeight: "400",
    fontSize: "1.64rem",
    textAlign: "center",
  },
  endMessage: {
    color: "#595959",
    paddingTop: "40px",
  },
  gridStyle: {
    paddingBottom: "10px",
  },
  tableStyle: {
    paddingTop: "10px", 
    paddingBottom: "10px",
  },
  payFromStyle: {
    width: "100%",
    paddingTop: "10px",
    paddingRight: "15px",
  },
  circularProgressStyle: {
    display: "flex", 
    justifyContent: "center",
  },
  paymentMethodStyle: {
    paddingTop: "20px",
  },
  paymentModeStyle: {
    width: "100%", 
    paddingTop: "10px"
  },
  autoPayColor: {
    color: "#575757"
  },
  autoPayStyle: {
    margin: "auto",
  },
  autoPayTitle: {
    color: "#595959",
  },
  autoPayFontStyle: {
    fontSize: "0.938rem",
  },
  submitGridStyle: {
    paddingBottom: "20px"
  },
  datePickerStyle: {
    display: "inline-flex",
    paddingTop: "10px",
  },
  paymentButtonStyle: {
    paddingTop: "25px"
  },
  dialogActionStyle: {
    justifyContent: "center", 
    marginBottom: "25px",
  }
}));

export { useStylesMakePayment };
