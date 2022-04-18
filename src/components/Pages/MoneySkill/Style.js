import { makeStyles } from "@mui/styles";

const useStylesMoneySkill = makeStyles((theme) => ({
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

  moneySkillDialogHeading: {
    fontSize: "34.2px",
    color: "#171717",
    fontFamily: "'Muli', sans-serif",
    fontWeight: "400",
    textAlign: "center",
    margin: "0",
  },
  moneySkillParagaraph: {
    fontSize: "15px",
    color: "#595959",
    padding: "0px",
    lineHeight: "22px",
    textAlign: "justify",
  },
  moneySkillDialog: {
    padding: "24px",
    maxWidth: "700px",
    margin: "15px"
  },
}));

export { useStylesMoneySkill };
