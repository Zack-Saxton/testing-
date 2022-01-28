import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStylesAccountOverview } from "./Style";
import { ButtonPrimary } from "../../FormsUI";
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import "./Style.css";

export default function RecentApplications({ isLoading, userApplicationsData }) {
  //Material UI css class
  const classes = useStylesAccountOverview();
  window.zeHide();
  //Recentapplications data
  let userApplications = (userApplicationsData != null) ? userApplicationsData : null;
  const presenceOfLoan = userApplications?.some((applicant) => applicant.isActive === true);
  const presenceOfLoanStatus = userApplications?.find((applicant) => applicant.isActive === true);
  let statusStr = {
    "approved": "Approved",
    "completing_application": "Completing Application",
    "contact_branch": "Contact branch",
    "confirming_info": "Confirming info",
    "expired": "Expired",
    "invalid": "Invalid",
    "offer_selected": "Offer selected",
    "offers_available": "Offers available",
    "pre_qual_referred": "Prequal referred",
    "pre_qual_rejected": "Prequal rejected",
    "pre_qualified": "Pre qualified",
    "referred": "Referred",
    "rejected": "Rejected",
    "under_review": "Under review",
    "closing_process": "Closing process",
    "signature_complete": "Signature completed",
    "final_review": "Final review"
  };

  let statusStrLink = {
    "approved": "/customers/finalVerification",
    "completing_application": "/customers/finalVerification",
    "contact_branch": "/customers/myBranch",
    "confirming_info": "/partner/confirm-signup",
    "expired": "/select-amount",
    "invalid": "/select-amount",
    "signature_complete": "/customers/finalVerification",
    "offer_selected": "/customers/reviewAndSign",
    "offers_available": "/customers/selectOffer",
    "pre_qual_referred": "/select-amount",
    "pre_qual_rejected": "/select-amount",
    "pre_qualified": "/credit-karma",
    "referred": "/referred-to-branch",
    "rejected": "/no-offers-available",
    "under_review": "/customers/loanDocument",
    "closing_process": "/customers/finalVerification",
    "final_review": "/customers/loanDocument"
  };

  const history = useHistory();

  //resumebtn click
  const resumeNavigate = (appData) => {
    history.push({
      pathname: statusStrLink[appData]
    });
  }

  //View
  return (
    <>
      <Grid
        item
        xs={12}
        className={classes.mainGrid}
        container
        direction="row"
      >
        <Typography
          variant="h5"
          className={classes.subheading}
          data-testid="subtitle"
        >
          Summary of applications
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.tableGrid}>
        <TableContainer id="summaryOfApplications" component={Paper}>
          <Table id="summaryOfApplicationsTable" className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHead}>
                  Applied on
                </TableCell>
                <TableCell className={classes.tableHead} align="left">
                  Product Type
                </TableCell>
                <TableCell className={classes.tableHead} align="center">
                  Requested Amount
                </TableCell>
                <TableCell className={classes.tableHead} align="left">
                  Loan Purpose
                </TableCell>
                <TableCell className={classes.tableHead} align="left">
                  Status
                </TableCell>
                <TableCell className={classes.tableHead} align="left">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan="7"
                    component="th"
                    className={classes.tableHeadRow}
                    scope="row"
                    align="center"
                  >
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) :
                userApplications?.length && presenceOfLoan === true
                  ?
                  <TableRow>
                    <TableCell className={classes.tableheadrow} >
                      {presenceOfLoanStatus.submissionDate}
                    </TableCell>
                    <TableCell className={classes.tableheadrow} align="left">
                      {presenceOfLoanStatus.product}
                    </TableCell>
                    <TableCell className={classes.tableheadrow} align="center">
                      <NumberFormat value={presenceOfLoanStatus.amountRequested} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                    </TableCell>
                    <TableCell className={classes.tableheadrow} align="left">
                      {presenceOfLoanStatus.loanPurpose}
                    </TableCell>
                    <TableCell className={classes.tableheadrow} align="left">
                      {(statusStr[presenceOfLoanStatus.status]) ? statusStr[presenceOfLoanStatus.status] : (presenceOfLoanStatus.status)}
                    </TableCell>
                    <TableCell align="left">
                      {presenceOfLoanStatus.isActive && presenceOfLoanStatus?.status !== "referred" && presenceOfLoanStatus?.status !== "contact_branch" ?
                        (
                          <ButtonPrimary stylebutton='{"color":"","width":"72%" }'
                            onClick={() => resumeNavigate(presenceOfLoanStatus.status)}
                          >
                            Resume
                          </ButtonPrimary>
                        ) : (
                          <></>
                        )
                      }
                    </TableCell>
                  </TableRow>
                  :
                  <TableRow>
                    <TableCell
                      colSpan="7"
                      align="center"
                    >
                      You do not have any recent applications
                    </TableCell>
                  </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}
