import { makeStyles } from "@mui/styles";

//Styling
const ReferredUsestyle = makeStyles((theme) => ({
  circularGrid: {    
      display: "flex",
      justifyContent: "center",
      padding: "50px 0"
  },  
  congratulationsGrid: {
    maxWidth: "800px",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  congratsHeading: {
    textAlign: "center",
    fontSize: "2rem",
    margin: "1.14rem 0 .912rem 0",
    color: "#171717",
  },
  congratsPara: {
    textAlign: "center",
    fontSize: "1rem",
    color: "#171717",
    fontWeight: "400",
    // padding:"0px 28px"
  },
  telNumber: {
    color: "#171717",
    textDecoration: "none",
  },
  branchNumber: {
    color: "#0F4EB3",
    textDecoration: "none",
  },
  questions: {
    color: "#595959",
    margin: "8px 0px",
    textAlign: "center",
    fontSize: "0.875rem",
  },
  TableGrid: {
    margin: "10px 0px 50px 0px",
  },
  preFooterText: {
    fontSize: "0.75rem",
    color: "#595959",
    textAlign: "justify",
    "@media (min-width: 600px)": {
      maxWidth: "1200px",
      margin: "auto",
    },
  },
}));

export { ReferredUsestyle };