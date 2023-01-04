import { makeStyles } from "@mui/styles";

const useStylesApplyForLoan = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,
  },
  loadingOn: {
    opacity: 0.55,
    pointerEvents: "none",
  },
  loadingOnWithoutBlur: {
    pointerEvents: "none",
  },
  loadingOff: {
    opacity: 1,
    pointerEvents: "initial",
  },
  paperVerticalTab: {
    paddingTop: "20px",
    paddingBottom: "20px",
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,
  },
  heading: {
    display:"none",
    color: "#214476",
    fontWeight: "400",
    fontSize: "1.563rem",
    paddingBottom: "10px",
  },
  centerGrid: {
    marginTop: "20px",
    paddingRight: "23px",
    paddingLeft: "23px",
  },
  greenText: {
    color: "green !important",
  },
  tabLabel: {
    background: "white",
    margin: "0px 20px 10px 0px",
    color: "#3f51b5",
    fontFamily: "'Muli', sans-serif !important",
    fontSize: "0.938rem",
    textTransform: "none",
    fontWeight: "700",
  },
  tabVerticalLabel: {
    color: "#3f51b5",
    textTransform: "none",
    fontWeight: "600",
    fontFamily: "'Muli', sans-serif !important",
    fontSize: "1rem",
    textAlign: "start",
  },
  table: {
    minWidth: 650,
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
  indicator: {
    left: "0px",
    background: "unset",
  },
  fullWidth: {
    width: "100%",
  },
  noDecoration: {
    TextDecoder: "none",
  },
  bottomText: {
    textAlign: "justify",
    fontSize: ".8rem",
    color: "#6b6f82",
    lineHeight: "20px",
    paddingBottom: "20px",
  },
  noOffersWrap: {
    padding: "20px",
  },
  monthTerm: {
    float: "left",
    width: "100%",
    fontSize: "0.938rem",
    fontWeight: "700",
  },
  comparisonChartLabel: {
    float: "left",
    width: "100%",
  },
  bottomTextWrap: {
    width: "100%",
    paddingTop: "25px",
    paddingBottom: "70px",
  },
  tabPanelWrap: {
    marginTop: "10px",
  },
  tabsvertical: {
    paddingTop: "5px",
  },
  chartGrid: {
    paddingBottom: "10px",
    width: "100%",
  },
  bottomButtonGrid: {
    padding: "10px 0px",
  },
  infoIcon: {
    fontSize: "small",
    color: "#0F4EB3",
  },
  root: {
    flexGrow: 1,
  },
  applyLoanHeading: {
    color: "#214476",
    fontWeight: "400",
    fontSize: "1.64rem",
  },
  columnColor: {
    lineHeight: 0,
    color: "#0f4eb3",
    fontSize: 25,
    fontWeight: 400,
    textAlign: "center",
    "@media (max-width: 1280px)": {
      fontSize: 20,
    },
  },
  rightBorder: {
    borderRight: "1px solid",
    lineHeight: 1,
    boxSizing:"content-box",
    "@media (max-width: 599px)": {
      borderRight: "none",
    },
  },
  columnHeading: {
    fontSize: "14px",
    color: "#171717",
    textAlign: "center",
  },
  gridStyle: {
    marginBottom: "20px",
    width: "100%"
  },
  typoStyle: {
    color: "#171717",
    fontSize: "18px",
  },
  innerGrid: {
    width: "100%",
    textAlign: "center"
  },
  buttonGridLineHeight: {
    lineHeight: 6
  },
  TabPanelGrid: {
    marginTop: "10px"
  },
  gridMargintop: {
    marginTop: "15px"
  },
  monthlyPaymentGrid: {
    lineHeight: "1"
  },
  applyLoanHeadingText: {
    color: "#214476",
    fontWeight: "400",
    fontSize: "1.64rem",
  },
  gridContainer: {
    width: "100%",
    marginBottom: "20px"
  },
  textDecoration: {
    textDecoration: "none"
  },
  tabPanelStyle: {
    padding: "24px",
    paddingBottom: "30px",
    margin: "10px 0px 40px 0px",
    boxShadow: "rgb(61 61 61 / 10%) 0px 8px 44px 0px",
    backgroundColor: "#fff",
    borderRadius: "10px"
  },
  paraTagStyle: {
    textAlign: "justify",
    fontSize: "0.938rem",
    color: "#6b6f82",
  },
  applicationPapper: {
    width: "100%"
  },
  receiveMoneyGrid: {
    height: "80vh"
  },
  content_grid: {
  	marginTop: "15px",
  },
  InfoOutlinedIcon: {
  	fontSize: "small",
  	color: "#004e9c",
  	cursor: "pointer"
  },
  BankAccountText:{
    textAlign: "justify", 
    fontSize: "0.938rem"
  },
    BankAccountBoldText:{
      fontSize: "1.063rem", 
      paddingBottom: "6px", 
      fontWeight: "500", 
      display: "block"
    },  
}));

export { useStylesApplyForLoan };
