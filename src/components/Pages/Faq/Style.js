import { makeStyles } from "@material-ui/core/styles";

const useStylesFaq = makeStyles((theme) => ({
  titleHeading: {
    color: "#fff",
    fontWeight: "400",
    fontSize: "1.64rem",
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    textAlign: "justify",
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
