import { makeStyles } from "@mui/styles";

const useStylesFaq = makeStyles((theme) => ({
  titleHeading: {
    color: "#214476",
    fontWeight: "400",
    fontSize: "1.64rem",
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    textAlign: "justify",
  },
  centerGrid: {
    marginTop: "20px",
    paddingRight: "30px",
    paddingLeft: "30px",
    paddingBottom: "30px",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  tabsWrap: {
    display: "flex",
    justifyContent: "spaceBetween",
  },
  accordianWrap: {
    marginBottom: "10px",
  },
  messageFaq: {
    textAlign: "justify",
  },
}));

export { useStylesFaq };
