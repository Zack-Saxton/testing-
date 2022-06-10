import { makeStyles } from "@mui/styles";

const AmOneNoOffersStyle = makeStyles((theme) => ({
  greyBackGround: {
    backgroundColor: "#f6f6f6",
    minHeight: "90vh",
  },
  AmOneGrid: {
    maxWidth: "750px",
    margin: "25px auto ",
    "@media (max-width: 799px)": {
      margin: "25px",
    },
    "@media (max-width: 420px)": {
      margin: "15px",
    },
  },
  AmOnePaper: {
    padding: "20px",
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
    color:"#8f8f8f",
    fontSize:"0.875rem"
  },
  getMoreOptionGrid: {
    maxWidth: "580px",
    margin: "30px auto",
    border: "3px solid #8c8c8c",
    padding: "20px",
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