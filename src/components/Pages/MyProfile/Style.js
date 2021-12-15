import { makeStyles } from "@material-ui/core/styles";

const useStylesMyProfile = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        color: theme.palette.text.secondary
      },
      paperVerticalTab: {
        paddingTop: "20px",
        paddingBottom: "20px",
        display: "flex",
        flexDirection: "column",
        color: theme.palette.text.secondary,
      },
      tabVerticalLabel: {
        color: "#6b6f82",
        textTransform: "none",
        fontWeight: "400 !important",
        fontFamily: "'Multi', sans-serif",
        fontSize: "1em !important",
        textAlign: "start",
      },
      heading: {
        color: "#fff",
        fontWeight: "400",
        fontSize: "1.64rem",
        paddingLeft: "7px",
        paddingBottom: "25px"
     },
      table: {
        minWidth: 650,
      },
      tableHeadRow: {
        color: "#171717!important",
        fontSize: "15px",
      },
      dialogPaper: {
        width: "100%",
        maxWidth:"500px",
        paddingBottom:"20px",
        borderRadius:"2px !important"
        // left: 10,
        // bottom: 100,
      },
      indicator: {
        left: "0px",
        background: "unset",
      },
      closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: "#171717!important",
      },
      dialogPaperAddBank: {
        width: "60%",
        maxWidth: "unset"
      },
      dialogPaperDebitCard: {
        width: "60%",
        maxWidth: "unset"
      },
      linkStyle: {
        color: "blue !important"
      },
      dialogHeading: {
        color: "#171717!important",
        fontWeight: "400",
        fontSize: "1.64rem",
        textAlign: "left",
      },
      smallText:{
        color:"#353535",
        fontSize:"small"
      },
    }));

export { useStylesMyProfile };
