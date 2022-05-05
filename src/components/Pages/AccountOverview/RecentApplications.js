import CircularProgress from '@mui/material/CircularProgress';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React from "react";
import NumberFormat from 'react-number-format';
import { useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../../FormsUI";
import { useStylesAccountOverview } from "./Style";
import { useAccountOverview } from "./AccountOverviewHook/useAccountOverview";
import "./Style.css";

export default function RecentApplications() {
  //Material UI css class
  const classes = useStylesAccountOverview();
  const { isLoading, accountDetails } = useAccountOverview();

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

  const navigate = useNavigate();

  //resumebtn click
  const resumeNavigate = (appData) => navigate(statusStrLink[ appData ]);

  //viewBtn click
  const viewAppData = (contactdata, appData) => {
    Cookies.set("viewAppContact", JSON.stringify(contactdata));
    Cookies.set("viewAppApplicant", JSON.stringify(appData));
    navigate('/customers/viewaccount');
  };

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
          data-testid="recent applications"
        >
          Summary of applications
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.tableGrid}>
        <TableContainer id="summaryOfApplications" component={Paper}>
          <Table id="summaryOfApplicationsTable" className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHead}>Applied on</TableCell>
                <TableCell className={classes.tableHead} align="left">Product Type</TableCell>
                <TableCell className={classes.tableHead} align="right">Requested Amount</TableCell>
                <TableCell className={classes.tableHead} align="left">Loan Purpose</TableCell>
                <TableCell className={classes.tableHead} align="left">Status</TableCell>
                <TableCell className={classes.tableHead} align="center">Actions</TableCell>
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
                    data-testid="while_Loading"
                  >
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) :
                accountDetails?.data?.applicants?.length
                  ?
                  accountDetails.data.applicants.map((appData, index) => (
                    <TableRow key={index}data-testid="with_Data">
                      <TableCell className={classes.tableheadrow} >
                        {appData.submissionDate}
                      </TableCell>
                      <TableCell className={classes.tableheadrow} align="left">
                        {appData.product}
                      </TableCell>
                      <TableCell className={classes.tableheadrow} align="right">
                        <NumberFormat value={appData.amountRequested} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} />
                      </TableCell>
                      <TableCell className={classes.tableheadrow} align="left">
                        {appData.loanPurpose}
                      </TableCell>
                      <TableCell className={classes.tableheadrow} align="left">
                        {(statusStr[ appData.status ]) ? statusStr[ appData.status ] : (appData.status)}
                      </TableCell>
                      <TableCell align="center">
                        {appData.isActive && appData?.status !== "referred" && appData?.status !== "contact_branch" ?
                          (
                            <ButtonPrimary stylebutton='{"color":"","width":"72%" }'
                              onClick={() => resumeNavigate(appData.status)}
                            >
                              Resume
                            </ButtonPrimary>
                          ) : (
                            <ButtonPrimary data-testid={`navigate_View_Account_${index}`} stylebutton='{"color":"","width":"72%","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }' onClick={() => viewAppData(accountDetails?.data?.applicant?.contact, appData)} >
                              View
                            </ButtonPrimary>
                          )
                        }
                      </TableCell>
                    </TableRow>
                  ))
                  :
                  <TableRow data-testid="while_Error">
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
RecentApplications.propTypes = {
  isLoading: PropTypes.bool,
  // userApplicationsData: PropTypes.array,
  // userApplicantData: PropTypes.object,
};
