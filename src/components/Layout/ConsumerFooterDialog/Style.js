import { makeStyles } from "@mui/styles";

const useStylesConsumer = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  heading: {
    color: "white",
  },
  consumerDialogHeading: {
    fontSize: "25px",
    color: "#171717",
    fontFamily: "'Muli', sans-serif",
    fontWeight: "bolder",
    margin: "0",
  },
  consumerParagaraph: {
    fontSize: "15px",
    color: "#595959",
    padding: "0px",
    lineHeight: "22px",
    textAlign: "justify",
  },
  consumerDialog: {
    padding: "24px",
    maxWidth: "700px",
    margin: "15px"
  },
}));

export { useStylesConsumer };
