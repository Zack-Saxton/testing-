import {makeStyles} from "@material-ui/core/styles";

const useStylesLoanHistory = makeStyles((theme) => ({
      paper: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        color: theme.palette.text.secondary
      },
      paperPointer: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        color: theme.palette.text.secondary,
        cursor: "pointer"
      },
      papertotal: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        color: theme.palette.text.secondary,
        background: "linear-gradient(85deg, #0F4EB3, #264266) !important"
      },
      heading: {
        color: "#fff",
        fontWeight: "400",
        fontSize: "1.563rem",
        margin:"0px",
        lineHeight:"0"
      },
      cardLoanHistory: {
        padding: "10px",
      },
      cardContentLoanHistory: {
        color: "#fff",
        fontWeight: "600",
        fontSize: "18px",
      },
      cardAmountLoanHistory: {
        fontSize: "1.563rem",
        marginTop: "10px",
      },
      cardApplyLoan: {
        fontSize: "1.125rem",
        fontWeight: 400,
        color: "#171717",
        margin: 0,
      },
      tableHead: {
        color: "#171717!important",
        fontWeight: "600",
        fontSize: "1rem",
      },
      tableHeadRow: {
        color: "#171717!important",
        fontSize: "15px",
      },
    }));

  export { useStylesLoanHistory };
