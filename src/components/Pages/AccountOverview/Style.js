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
  titleHeading: {
    color: "#fff",
    fontWeight: "400",
    fontSize: "1.64rem",
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
  tabVerticalLabel: {
    color: "#3f51b5",
    textTransform: "none",
    fontWeight: 700,
    fontFamily: "'Muli', sans-serif !important",
    fontSize: "1rem",
    textAlign: "start",
  },
  viewAppindicator: {
    left: "0px",
    background: "unset !important",
  },
  paperVerticalTabViewDetail: {
    paddingTop: "20px",
    paddingBottom: "20px",
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,
  },
  viewAppHeading:{
    color: "#171717",
    fontWeight: "700",
    fontSize: "17px",
    margin: "auto",
  },
  viewAppInputGrid:{
    display:"flex",
     flexDirection:"row",
      width:"100%",      
      borderBottom:"lightgrey 1px solid",
      lineHeight: 0.5,
  },
  viewAppInputDisplay:{
    color: "#171717",
    width: "50%",
    fontWeight: "300",
    lineHeight: "normal"
  },
  viewAppStatusHeading:{
    color: "#171717",
    fontWeight: "700",
    fontSize: "20px",
    margin: "auto",
  },
  viewAppStatusDisplay: {
    fontSize: "18px",
    textAlign: "justify",
    color: "#171717",
    lineHeight: 1.3,
    fontWeight: "300",
  },
}));
export { useStylesAccountOverview };