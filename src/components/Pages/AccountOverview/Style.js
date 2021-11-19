import { makeStyles } from "@material-ui/core/styles";

//Styling
const useStylesAccountOverview = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,
  },

  paperPropertiesLimitedOffer:
  {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,

  },

  paperPropertiesOfferTwo:
  {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,

  },
  heading: {
    color: "#fff",
    fontWeight: "400",
    fontSize: "1.64rem",
    paddingLeft: "7px",
    paddingBottom: "30px",
  },
  subheading: {
    color: "#171717",
    fontWeight: "400",
    fontSize: "1.64rem",
    paddingLeft: "7px",
    paddingBottom: "20px",
    paddingTop: "20px"
  },
  table: {
    minWidth: 650,
  },
  tableHead: {
    color: "#171717!important",
    fontWeight: "700",
    fontSize: "1rem",
  },
  tableHeadRow: {
    color: "#171717!important",
    fontSize: "15px",
  },
  activeLoanHeading: {
    color: "#171717",
    fontWeight: "400",
    fontSize: "18px",
    margin: "auto",
  },
  activeLoanSubHeading: {
    color: "#171717",
    fontWeight: "400",
    fontSize: "18px",
    margin: "auto",
    lineHeight: "2.7",
  },
  activeLoanSubHeading_content: {
    color: "#171717",
    fontWeight: "400",
    margin: "auto",
  },
  brandColor: {
    margin: "auto",
    color: "#0f4eb3",
    fontSize: 25,
    fontWeight: 400,
  },
  enableColor: {
    margin: "auto",
    color: "#a5ce3b",
    fontSize: 25,
    fontWeight: 400,
  },
  disableColor: {
    margin: "auto",
    color: "#171717",
    fontSize: 25,
    fontWeight: 400,
  },
  cardContent: {
    color: "#171717",
    fontSize: "15px",
  },
}));
export { useStylesAccountOverview };