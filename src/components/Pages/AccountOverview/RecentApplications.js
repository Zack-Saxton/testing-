import CircularProgress from '@mui/material/CircularProgress';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import NumberFormat from 'react-number-format';
import { useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../../FormsUI";
import { useAccountOverview } from "../../../hooks/useAccountOverview";
import { useStylesAccountOverview } from "./Style";
import { NavContext } from "../../../contexts/NavContext";
import { statusStrLinks } from "../../lib/StatusStrLinks" 
import "./Style.css";
import GenerateTableHeader from "./../PaymentHistory/GenerateTableHeader";

export default function RecentApplications() {
  //Material UI css class
  const classes = useStylesAccountOverview();
  const { isLoading, data : accountDetails } = useAccountOverview();
  const { data, setData } = useContext(NavContext);
  const { dataNavmessage } = useContext(NavContext);


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
  let statusStrLink = statusStrLinks;


  const navigate = useNavigate();

  //resumebtn click
  let stateDataToPass  = {
    partnerSignupData: {
      applicant: {
        contact: {
          last_name: Cookies.get("lastName"),
          first_name: Cookies.get("firstName")
        }
      }
    }
  }
  const resumeNavigate = (appData) => navigate(statusStrLink[ appData ], { state: stateDataToPass } );
 
  const resumeNavigaeSelectOffer  = () => {
    setData({ ...data, status: true });
    navigate('/customers/selectOffer');
  }

  //viewBtn click
  const viewAppData = (contactdata, appData) => {
    Cookies.set("viewAppContact", JSON.stringify(contactdata));
    Cookies.set("viewAppApplicant", JSON.stringify(appData));
    navigate('/customers/viewaccount');
  };

  let today = new Date();
  const last30days = new Date(today.setDate(today.getDate() - 30))
  const checkRecentApplication = accountDetails?.data?.applicants;
  
  const getAvailableApplication = (availableApplication) => {
  return availableApplication?.filter((availableRecentApplication) => {
      if( new Date(availableRecentApplication.submissionDate) >= last30days)
      {
        return availableRecentApplication
      }
      return null
  });
};
  let headingLabel = ["Applied on","Product Type","Requested Amount","Loan Purpose","Status","Actions"];
  let columnAlignment = ["left","left","right","left","left","center"];

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
            <GenerateTableHeader headingLabel={ headingLabel } columnAlignment={ columnAlignment } />
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
              getAvailableApplication(checkRecentApplication)?.length
                  ?                  
                  getAvailableApplication(checkRecentApplication)?.map((appData, index) => (
                    <TableRow key={index} data-testid="with_Data">
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
                            dataNavmessage.status === true ?
                            <ButtonPrimary stylebutton='{"color":"","width":"72%" }'
                              onClick={() => resumeNavigaeSelectOffer()}
                            >
                              Resume
                            </ButtonPrimary> :
                            <ButtonPrimary stylebutton='{"color":"","width":"72%" }'
                              onClick={() => resumeNavigate(appData.status)}
                            >
                              Resume
                            </ButtonPrimary>
                          ) : (
                            <ButtonPrimary data-testid={`navigate_View_Account_${ index }`} stylebutton='{"color":"","width":"72%","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }' onClick={() => viewAppData(accountDetails?.data?.applicant?.contact, appData)} >
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
                      You do not have any recent applications in last 30 days
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
  isLoading: PropTypes.bool
};
