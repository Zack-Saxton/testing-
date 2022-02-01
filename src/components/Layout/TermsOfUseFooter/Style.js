import { makeStyles } from "@material-ui/core/styles";

//Styling
const useStylesTermsOfUse = makeStyles((theme) => ({
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
}));

export { useStylesTermsOfUse };