import { makeStyles } from "@mui/styles";

const useStyleVantageScore = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
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
  MainkeyFactorHeading: {
    fontSize: "15px",
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  // Credit Start
  graph: {
    "@media (max-width: 599px)": {
      borderRight: "none",
    },
    borderRight: "1px solid #9a9a9a",
  },
  flex: {
    display: "flex",
  },
  thumb: {
    marginRight: "10px",
    color: "#212121",
  },

  vantageScore: {
    padding: "10px",
  },
  textDecoration: {
    textDecoration: "none",
  },

  texts: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    color: "#212121",
  },
  Button: {
    textAlignLast: "center",
  },
  smallText: {
    color: "#353535",
    fontSize: "12px",
  },
  // Credit end

  // HistoricalData Start
  HistoricalDataHeading: {
    textAlign: "left",
    color: "#171717",
    fontWeight: "normal",
    fontSize: "18px",
    margin: "0px",
    padding: "4px",
  },
  // HistoricalData End

  // KeyFactors Start
  BoldText: {
    fontWeight: "bolder",
  },

  KeyFactorsHeading: {
    fontSize: "18px",
    padding: "15px",
    margin: "0px",
    color: "#171717",
    fontWeight: "normal",
    borderBottom: "1px solid #ddd",
  },

  VantageScoreSmallText: {
    width: "100%",
    fontSize: "13.5px",
    borderTop: "1px solid #949494",
    borderBottom: "1px solid #949494",
    paddingBottom: "35px",
    textAlign: "justify",
  },

  // KeyFactors End
  NoFlex: {
    display: "block",
  },
  VantageScoreCredit: {
    padding: "0px 15px",
    fontSize: "12px",
    color: "#595959",
    lineHeight: "20px",
    marginBottom: "0px",
  },
  VantageScoreText: {
    lineHeight: "20px",
    textAlign: "justify",
  },
  guageChart: {
    width: '60%',
    margin: 'auto'
  }
}));

export { useStyleVantageScore };
