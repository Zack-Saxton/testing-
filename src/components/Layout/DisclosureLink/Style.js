import { makeStyles } from "@material-ui/core/styles";

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
    backgroundColor: "#124ca8",
    backgroundImage: "linear-gradient(to right, #26436a, #104db0)",
    minHeight:"500px !important",
    padding: "30px",
    textAlign: "justify !important"
  }
}));

export { useStylesDisclosure };
