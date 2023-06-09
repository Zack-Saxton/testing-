import { makeStyles } from "@mui/styles";

//Styling
const useStylesDisclosure = makeStyles((theme) => ({
  heading: {
    color: "#fff",
    fontWeight: "400",
    fontSize: "1.563rem",
  },
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    borderRadius: "2px",
    flexDirection: "column",
    color: theme.palette.text.secondary,
  },
  mainDivDynamicPage: {
    backgroundColor: "#f6f6f6",
    minHeight: "500px !important",
    padding: "30px",
    textAlign: "justify !important"
  }
}));

export { useStylesDisclosure };
