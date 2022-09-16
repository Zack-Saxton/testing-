import { makeStyles } from "@mui/styles";

const AmOneNoOffersStyle = makeStyles((_theme) => ({
  blueBackGround: {
    backgroundColor: "#013474",
    minHeight: "90vh",
  },
  AmOneGrid: {
    maxWidth: "750px",
    margin: "0px auto ",
    padding:"20px 0px",
    backgroundColor:"#013474",
    "@media (max-width: 799px)": {
      margin: "25px",
    },
    "@media (max-width: 420px)": {
      margin: "15px",
    },
  },
  AmOnePaper: {
    padding: "20px",
    boxShadow: "0px 1px 2px rgba(0,0,0,0.2)",
    borderRadius: "20px !important",
    backgroundImage:"linear-gradient(#1b4788, #02295c)"
  },
  amOneMainTypography: {
    textAlign: "center",
    maxWidth: "580px",
    margin: "30px auto",
  },
  amOneTypography: {
    textAlign: "center",
    maxWidth: "580px",
    margin: "30px auto",
    fontSize:"0.875rem",
    color:"#fff"
  },
  preFooterWrap:{
    borderTop:"2px solid #ffbd12",
    marginTop:"2.8%"
  },
  preFooterText:{
    maxWidth:"1200px",
    margin:"auto",
    padding:"2.8% 0 5% 0",
  },
  preFooterTypography:{
    textAlign:"justify",
    color:"#fff",
    fontSize:"1.25rem",
    lineHeight: "26px"
  },
  getMoreOptionGrid: {
    maxWidth: "580px",
    margin: "30px auto",
    border: "3px solid #8c8c8c",
    padding: "20px",
    color:"#fff",
    "@media (max-width: 370px)": {
      padding: "20px 5px",
    },
  },
  getMoreOptionWrap: {
    maxWidth: "466px",
    margin: "auto",
  },
  getMoreOptionHeading: {
    maxWidth: "430px",
    margin: "auto",
  },
  getMoreOption: {
    display: "flex",
    textAlign: "center",
    margin: "20px 0px",
    fontSize:"1.125rem",
    "@media (max-width: 699px)": {
      textAlign: "left",
    },
  },
  checkMyOption: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));

export { AmOneNoOffersStyle };