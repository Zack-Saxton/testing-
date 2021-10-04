import { makeStyles } from "@material-ui/core/styles";

const useStylesMakePayment = makeStyles((theme) => ({
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
    paddingLeft: "7px",
    paddingBottom: "25px",
  },
  table: {
    minWidth: 650,
    paddingBottom: "5px",
    paddingTop: "5px",
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
  cardHeading: {
    color: "#171717!important",
    fontSize: "18px",
    fontWeight: "600",
  },
  autoPayLink: {
    fontSize: "15px",
    textDecoration: "none",
    color: "blue",
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
    width: "55%",
    maxWidth: "100%",
    borderRadius: "2px !importent",
  },
  dialogHeading: {
    color: "#171717!important",
    fontWeight: "400",
    fontSize: "1.64rem",
    textAlign: "center",
    lineHeight: "30px",
  },
  endMessage: {
    color: "#595959",
    paddingTop: "40px",
  },
}));

export { useStylesMakePayment };
