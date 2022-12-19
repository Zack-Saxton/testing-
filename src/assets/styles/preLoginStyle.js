import { makeStyles } from "@mui/styles";

//Styling
const preLoginStyle = makeStyles((Theme) => ({
  mainDiv: {
    backgroundColor: "#f6f6f6",
    minHeight: "500px !important",
  },
  smallText: {
    color: "#4a4e57",
    fontSize: ".8rem",
  },
  blueBackground: {
    backgroundColor: "#013474",
  },
  blueBox: {
    backgroundImage: "linear-gradient(90deg, rgb(8 29 64) 0%, #1c488a 100% )",
    margin: "auto",
    borderRadius: "10px",
  },
  goldIcon: {
    width: "97px",
    height: "97px",
  },
  paddingGrid: {
    padding: "4% 0px",
  },
  paperStyle: {
    width: "inherit",
    textAlign: "center",
  },
  marginTop: {
    marginTop: "-3%",
  },
  boxGrid: {
    padding: "4% 0px 4% 0px",
  },
  checkMyOffersPaperStyle: {
    justify: "center",
    alignItems: "center",
    textAlign: "center",
  },
  typoStyle: {
    align: "center",
    justify: "center",
    alignItems: "center",
    fontSize: "1.538rem",
    margin: "10px 0px !important",
    color: "#171717",
    fontWeight: "400 !important",
    lineHeight: "110% !important",
  },
  linkDesign: {
    textDecoration: "underline !important",
    color: "#0F4EB3 !important",
    display: "block !important",
    cursor: "pointer",
  },
  citizenPaperStyle: {
    justify: "center",
    alignItems: "center",
    width: "inherit",
    textAlign: "center",
  },
  gridStyle: {
    padding: "4% 0px 4% 0px",
  },
  EmploymentStatusBoxGrid: {
    padding: "4% 0px 4% 0px",
    marginTop: "5%",
    marginBottom: "2%;",
  },
  exsistingUserTypoStyle: {
    align: "center",
    justify: "center",
    alignItems: "center",
    marginBottom: "1%",
    marginTop: "1%",
  },
  negativeMargin: {
    marginTop: "-4%",
  },
  exsistingUserPaperStyle: {
    justify: "center",
    alignItems: "center",
    width: "inherit",
    marginBottom: "10%",
    marginTop: "10%",
    textAlign: "center",
  },
  homwAdressGridStyle: {
    padding: "4% 0",
    margin: "auto",
    marginTop: "5%",
    marginBottom: "2%;",
  },
  homwAdressPaperStyle: {
    justify: "center",
    alignItems: "center",
    textAlign: "center",
  },
  subPaper: {
    margin: "15px",
    padding: "10px 15px",
    boxShadow:
      "0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 1px 5px 0 rgb(0 0 0 / 20%)",
    position: "relative",
    borderRadius: "4px !important",
    transition: "box-shadow .25s",
    backgroundColor: "#fff",
    textAlign: "justify",
  },
  paraInsideSubPaper: {
    fontFamily: "'Muli', sans-serif",
    color: "#595959",
    fontSize: "15px",
  },
  livingSpaceBoxGrid: {
    padding: "4% 0px 4% 0px",
    marginTop: "5%",
    marginBottom: "2%;",
  },
  paper: {
    padding: Theme.spacing(2),
    height: "100%",
    textAlign: "center",
    color: Theme.palette.text.secondary,
    boxSizing: "border-box",
  },
  gridPadding: {
    paddingTop: "7px",
    paddingBottom: "15px",
  },
  gridItem: {
    boxSizing: "border-box",
    padding: Theme.spacing(1),
  },
  masonryItemFirst: {
    padding: Theme.spacing(1),
    boxSizing: "border-box",
  },
  mainGridPadding: {
    padding: "4% 0%",
  },
  gridMargin: {
    margin: "15px 0px 19px 0 !important",
  },
  maritalStatustypoStyle: {
    align: "center",
    justify: "center",
    alignItems: "center",
    marginBottom: "1%",
    marginTop: "1%",
  },
  maritalStatusPaperStyle: {
    justify: "center",
    alignItems: "center",
    width: "inherit",
    marginBottom: "10%",
    marginTop: "10%",
    textAlign: "center",
  },
  newUserBoxGrid: {
    width: "100%",
    paddingTop: "70px",
    paddingBottom: "70px",
  },
  newUserTypoStyle: {
    fontSize: "0.938rem",
    color: "595959",
  },
  oneLastStepLinks: {
    marginTop: "3px !important",
    marginBottom: "3px !important",
    marginLeft: "7%",
    paddingLeft: "5px",
    textDecoration: "underline !important",
    color: "#0F4EB3 !important",
    display: "block !important",
    cursor: "pointer",
  },
  oneLastStepLinksWrap: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  paddingOneSide: {
    padding: "4% 0px",
  },
  fullWidth: {
    width: "100%",
  },
  typoAlign: {
    textAlign: "left",
    marginLeft: "8%",
    marginTop: "2%",
  },
  personalInfoPaperStyle: {
    justify: "center",
    alignItems: "center",
    textAlign: "center",
  },
  justifyGrid: {
    justifyContent: "center",
    alignItems: "stretch",
    textAlign: "center",
    padding: "0% 4%",
  },
  justifyGridMargin: {
    justifyContent: "center",
    margin: " 15px 0px 19px 0px",
  },
  gridAlign: {
    justifyContent: "center",
    padding: "4% 0%",
  },
  offerAmountStyle: {
    color: "#0F4EB3",
    lineHeight: "110%",
    fontFamily: "'Muli', sans-serif",
    fontWeight: "400",
    fontSize: "1.64rem",
    marginTop: "5px",
    marginBottom: "5px",
  },
  preApprovedTypoStyle: {
    color: "black",
    fontWeight: "400",
    fontFamily: "Muli, sans-serif",
  },
  smallTextStyle: {
    paddingTop: "25px",
    paddingBottom: "70px",
    marginBottom: "3%",
  },
  cardWrapper: {
    paddingTop: "4%",
    marginTop: "5%",
    marginBottom: "2%",
  },
  showSection: {
    color: "#fec33a",
  },
  hideSection: {
    color: "#c4c4c4",
  },
  submitApplicationRecaptcha:{
    display: "flex",
    justifyContent: "center",
    paddingTop: "10px"
  }
}));

export { preLoginStyle };
