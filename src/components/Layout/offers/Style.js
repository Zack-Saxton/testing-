import { makeStyles } from "@mui/styles";

const useStylesNoOfferAvailable = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainContentBackground: {
    backgroundColor: "#f6f6f6"
  },
  paper: {
    padding: theme.spacing(3),
    borderRadius: "6px !important",
    display: "flex",
    flexDirection: "column",
    backgroundColor: `rgba(255, 255, 255, .8)`,
    color: theme.palette.text.secondary,
    boxShadow: `0 16px 24px 2px rgb(0 0 0 / 14%),
  0 6px 30px 5px rgb(0 0 0 / 12%),
  0 8px 10px -7px rgb(0 0 0 / 20%)`,
  },
  heading: {
    color: "white",
  },
  gridInsideBox: {
    paddingTop: "30px",
    paddingBottom: "40px"
  },
  title: {
    fontSize: "25px",
    textAlign: "center",
    fontWeight: 400,
    color: "black",
  },
  noOfferParagraph: {
    width: "100%",
    textAlign: "justify",
    margin: "15px 0px",
    fontSize: "0.938rem",
    color: "#595959",
  },
  noOfferButtonGrid: {
    textAlign: "center",
    paddingTop: "20px!important",
  },
  noOfferNavLink: {
    textDecoration: "none"
  },
}));

export { useStylesNoOfferAvailable };
