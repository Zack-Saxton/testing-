import {makeStyles} from "@material-ui/core/styles";

const useStylesLoanHistory = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        color: theme.palette.text.secondary
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
        fontSize: "1.64rem",
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
        fontSize: "20px",
        marginTop: "10px",
      },
      cardApplyLoan: {
        fontWeight: 600,
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
