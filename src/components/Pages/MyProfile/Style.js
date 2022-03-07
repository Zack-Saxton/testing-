import { makeStyles } from "@mui/styles";

const useStylesMyProfile = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		color: theme.palette.text.secondary,
	},
	hideSection: {
		display: "none"
	},
	showSection: {
		display: "block"
	},
	bottomTestStyle: {
		fontSize: "15px !important",
		color: "#595959 !important",
		fontFamily: "'Muli', sans-serif !important",
		marginTop: "50px !important",
	},
	loadingOn: {
		opacity: 0.55,
		pointerEvents: "none"
	},
	loadingOff: {
		opacity: 1,
		pointerEvents: "initial"
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
		color: "#214476",
		fontWeight: "400",
		fontSize: "1.563rem",
	},
	centerGrid: {
		marginTop: "20px",
		paddingRight: "23px",
		paddingLeft: "23px",
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
		maxWidth: "500px",
		paddingBottom: "20px",
		borderRadius: "2px !important",
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
		maxWidth: "unset",
	},
	deletePayment: {
		width: "60%",
		maxWidth: "unset"
	},
	dialogPaperDebitCard: {
		width: "60%",
		maxWidth: "unset",
	},
	linkStyle: {
		color: "#0F4EB3 !important",
	},
	dialogHeading: {
		color: "#171717!important",
		fontWeight: "400",
		fontSize: "1.64rem",
		textAlign: "center",
	},
	smallText: {
		color: "#353535",
		fontSize: "small",
	},
	paymentBody: {
		paddingBottom: "20px", 
		width: "100%"
	},
	fullWidth: {
		width: "100%"
	},
	dialogAction: {
		justifyContent: "center", 
		marginBottom: "25px"
	},
	accountTypeColumn: {
		marginTop: "4px",
    marginLeft: "-24",
    padding: "0",
	},
	accountDefaultColumn: {
		marginRight: "0", 
		padding: "0"
	},
	defaultRadio: {
		marginTop: "3px",
    marginRight: "0px",
    padding: "0",
	},
	deleteCard: {
		color: "#0F4EB3",
    float: "left",
    cursor: "pointer",
	},
	deleteCardArrow: {
		color: "#0F4EB3",
    float: "right",
    cursor: "pointer",
	},
	paymentMethodWrap: {
		paddingTop: "25px"
	},
	debitCardAddButton: {
		paddingBottom: "30px"
	},
	paymentBreadcrumbs: {
		lineHeight: "30px",
    height: "30px",
    backgroundColor: "#164a9c",
	},
	profileLink: {
		fontSize: "18px",
  	color: "rgba(255, 255, 255, .7)",
    textDecoration: "none",
    padding: "10px",
    cursor: "pointer",
	},
	paymentLink: {
		fontSize: "18px",
    color: "rgba(255, 255, 255, .7)",
    textDecoration: "none",
    cursor: "pointer"
	},
	paymentAccountLink: {
		fontSize: "18px",
    color: "#fff",
    textDecoration: "none",
	},
	routingToolTip: {
		fontSize: "large",
    cursor: "pointer",
    color: "blue",
	}
}));

export { useStylesMyProfile };
