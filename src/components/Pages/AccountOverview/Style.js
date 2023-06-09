import { makeStyles } from "@mui/styles";

//Styling
const useStylesAccountOverview = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  secondBannerImage: {
    alignItems: "center"
  },
  recentPaymentMainGrid: {
    width: "100%",
    padding: "0px 0px 0px 0px"
  },
  mainGrid: {
    width: "100%",
    paddingBottom: "10px",
    paddingTop: "20px"
  },
  tableGrid: {
    width: "100%",
    paddingBottom: "10px"
  },
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    borderRadius: "10px",
    flexDirection: "column",
    color: theme.palette.text.primary,
  },
  paperRP: {
    padding: theme.spacing(3),
    display: "flex",
    borderRadius: "2px",
    marginTop: "15px",
    marginBottom: "15px",
    flexDirection: "column",
    color: theme.palette.text.secondary,
    height: "85%"
  },
  decorNone: {
    textDecoration: "none"
  },
  paperPropertiesLimitedOffer: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,
  },
  paperPropertiesOfferTwo: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,
  },
  titleHeading: {
    color: "#214476",
    fontWeight: "400",
    fontSize: "1.64rem",
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
  accountOverviewWrap: {
    width: "100%",
    paddingBottom: "10px"
  },
  activeLoanWrap: {
    width: "100%",
    paddingTop: "10px"
  },
  subheading: {
    color: "#171717",
    fontWeight: "400",
    fontSize: "1.563rem",
    paddingBottom: "5px",
    paddingTop: "20px",
  },
  activeLoanTable: {
    paddingTop: "10px"
  },
  activeLoancardwrap: {
    paddingTop: "10px",
    paddingBottom: "10px"
  },
  activeLoanHeadingWrap: {
    marginBottom: "20px"
  },
  loanDetailsLink: {
    textDecoration: "none",
    color: "#0F4EB3",
    cursor: "pointer"
  },
  table: {
    minWidth: 650,
  },
  tableHead: {
    color: "#171717!important",
    fontWeight: "700",
    fontSize: "0.938rem"
  },
  tableHeadRow: {
    color: "#171717!important",
    fontSize: "15px",
  },
  activeLoanHeading: {
    color: "#171717",
    fontWeight: "400",
    fontSize: "1.125rem !important",
    margin: "auto",
  },
  activeLoanSubHeading: {
    color: "#171717",
    fontWeight: "400",
    fontSize: "18px",
  },
  overviewGrid:{
    flexDirection:"column",
    justifyContent:"space-between",
    alignItems:"flex-start"
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
    color: "#a5ce3b",
    fontSize: 22,
    fontWeight: 400,
    textDecoration: "none",
    paddingBottom: "15px"
  },
  autoPayEnableLinkOne: {
    textDecoration: 'none',
    color: 'inherit',
    fontSize: "1.563rem"
  },
  autoPayEnableLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  cardContent: {
    color: "#171717",
    fontSize: "15px",
    textDecoration: "none",
  },
  tabVerticalLabel: {
    color: "#3f51b5",
    textTransform: "none",
    fontWeight: 700,
    fontFamily: "'Muli', sans-serif !important",
    fontSize: "1rem",
    alignItems: "start",
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
  viewAppHeading: {
    color: "#171717",
    fontWeight: "700",
    fontSize: "17px",
    margin: "auto",
  },
  viewAppInputGrid: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderBottom: "lightgrey 1px solid",
    lineHeight: 0.5,
  },
  viewAppInputDisplay: {
    color: "#171717",
    width: "50%",
    fontWeight: "300",
    lineHeight: "normal",
  },
  viewAppStatusHeading: {
    color: "#171717",
    fontWeight: "900",
    fontSize: "22px",
    margin: "auto",
  },
  viewAppStatusDisplay: {
    fontSize: "18px",
    textAlign: "justify",
    color: "#171717",
    lineHeight: 1.3,
    fontWeight: "400",
  },
  normalButton: {
    color: "black",
    background: "#ffbc23",
    fontFamily: "'Muli', sans-serif !important",
    borderRadius: "50px",
    textTransform: "capitalize",
    height: "36px",
    whiteSpace: "nowrap",
    fontWeight: "normal",
    boxShadow: ` 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12), 0 1px 5px 0 rgba(0, 0, 0, .2)`,
    width: "auto",
    '&:hover': {
      background: "#ffbc23",
      color: 'black',
    },
  },
  buttonColorPastDate: {
    color: "black",
    background: "#f15d48",
    fontFamily: "'Muli', sans-serif !important",
    borderRadius: "50px",
    textTransform: "capitalize",
    height: "36px",
    whiteSpace: "nowrap",
    fontWeight: "normal",
    boxShadow: ` 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12), 0 1px 5px 0 rgba(0, 0, 0, .2)`,
    width: "auto",
    '&:hover': {
      background: "#f15d48",
      color: 'black',
    },
  },
}));

export { useStylesAccountOverview };
