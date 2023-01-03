import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { NavContext } from "../../../../contexts/NavContext";
import CheckLoginStatus from "../../../App/CheckLoginStatus";
import usrAccountDetails from "../../../Controllers/AccountOverviewController";
import { hardPullCheck } from "../../../Controllers/ApplyForLoanController";
import getClientIp from "../../../Controllers/CommonController";
import { ButtonSecondary, ButtonWithIcon, Checkbox } from "../../../FormsUI";
import Iframe from "../../../FormsUI/iframe";
import APICall from "../../../lib/AxiosLib";
import messages from '../../../lib/Lang/applyForLoan.json';
import ScrollToTop from "../../ScrollToTop";
import { useStylesApplyForLoan } from "../Style";
import TabPanel from "../TabPanel";
import TabSection from "../TabSection";
import Cookies from "js-cookie";
import "./ReviewAndSign.css";
import { currencyFormat } from "../../../lib/CommonUtil";

//Initializing the Review and sign functional component
export default function ReviewAndSign() {
  const classes = useStylesApplyForLoan();
  //Initializing state variable
  const [ value, setValue ] = useState(1);
  const navigate = useNavigate();
  const [ url, setUrl ] = useState();
  const [ confirm, setConfirm ] = useState(false);
  const [ selectedOffer, setSelectOffer ] = useState();
  const [prepaidCharge,setprepaid] = useState(); 
  const [ loading, setLoading ] = useState(false);
  const [ disableSubmitButton, setDisableSubmitButton ] = useState(false);
  const [ checkPresenceOfLoanStatus, setCheckPresenceOfLoanStatus ] = useState('');
  const { refetch, isLoading, data: accountDetials } = useQuery('loan-data', usrAccountDetails);
  const handleChange = (_event, newValue) => setValue(newValue);
  const { data, setData } = useContext(NavContext);
  let location = useLocation();
  let hardpullCounter = 0;

  // To get the iframe url from the API
  async function getIframeURL() {
    let dataIframe = {};
    let iframeURL = await APICall("esignature_iframe", '', dataIframe, "POST", true);
    setUrl(iframeURL?.data?.iframe);
  }

  useEffect(() => {
    getIframeURL();
    setSelectOffer(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const navStatusPage = () => {
    if(checkPresenceOfLoanStatus === "completing_application")
    {
      navigate("/customers/finalVerification")
    }
  }
  // call the get URL funtion on page load
  useEffect(() => {
    if (!location?.state?.selectedIndexOffer) {
      setSelectOffer(!isLoading ? accountDetials?.data?.application?.selected_offer : null);
      let activeLoan = accountDetials?.data?.applicants;
      const presenceOfLoanStatus = activeLoan?.find((applicant) => applicant?.isActive);
      setCheckPresenceOfLoanStatus(presenceOfLoanStatus?.status);
      navStatusPage();
    } else setSelectOffer(location?.state?.selectedIndexOffer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ accountDetials,checkPresenceOfLoanStatus ]);

useEffect(()=>{
  if(selectedOffer && selectedOffer.fees && Object.keys(selectedOffer.fees).length){
    let totalValue = Object.values(selectedOffer.fees).reduce((a,b)=>{
      return a + b
    })
    setprepaid(totalValue);
  }
},[selectedOffer])

  const onHardPullDone = async () => {
    let ipAddress = await getClientIp();
    let dataStatus = {
      isAuthenticated: true,
      headersHost: process.env?.REACT_APP_HOST_NAME,
      geoip: {
        ip: ipAddress
      }
    };
    let authenticateStatus = await APICall("esignature_complete", '', dataStatus, "POST", true);
    if (authenticateStatus?.data?.message === "Applicant successfully updated") {
      setLoading(false);
      refetch();
      toast.success(authenticateStatus?.data?.message);
      navigate("/customers/finalVerification");
    }
    else {
      setLoading(false);
      toast.error(messages.reviewAndSignin.completeEsign);
    }
  }

  const getHardPull = async () => {
    hardpullCounter += 1;
    let hardPull = await hardPullCheck(location?.state?.selectedIndexOffer?.applicant);
    if (hardPull?.data?.status === 200 || hardPull?.data?.result === "success") {
      Cookies.set("hardpulFailsThreeTime", false);
      onHardPullDone();
    }
    else{
      if(hardpullCounter >= 3){
        Cookies.set("hardpulFailsThreeTime", true);        
        setDisableSubmitButton(true);
        setLoading(false);
        toast.error(messages.reviewAndSignin.eSignFailed);
      }
      else{
        getHardPull();
      }
     
    }
  }

  const submitOnClick = async (_event) => {
    setLoading(true);
    if(accountDetials?.data?.customer?.sorad?.third_party_data?.hard_credit_pull){
      onHardPullDone();
    }
    else{
      hardpullCounter = 0;
      getHardPull();
    }
  };

  const resumeNavigate = () => {
    setData({ ...data, status: true });
    navigate('/customers/selectOffer');
  }


  //Check weather the offers is passed or not
  return (
    <div data-testid = "reviewAndSign_testid">
      <CheckLoginStatus /> {/* To check the user logged in or not  */}
      <ScrollToTop /> {/* To show the top of the page on load */}
      <Grid
        container
        justifyContent={"center"}
        className={classes.centerGrid}
      >
        <Grid
          container
          item
          xs={12}
          direction="row"
          className={classes.gridStyle}
        >
          <Typography className={classes.applyLoanHeading} variant="h3">
            <NavLink
              className={classes.noDecoration}
              to="/customers/accountOverview"
            >
              <ButtonWithIcon
                icon="arrow_backwardIcon"
                iconposition="left"
                stylebutton='{"background": "#fff", "color":"#214476",
                        "minWidth": "0px",
                        "width": "36px",
                        "padding": "0px",
                        "marginRight": "5px",
                      "marginTop":"unset" }'
                styleicon='{ "color":"" }'
              />
            </NavLink>{" "}
            Apply for a Loan
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TabSection value={value} handleChange={handleChange} classes={classes} ay={1} />

          {/* ##############################################Review And Sign################################################################################################# */}
          <TabPanel value={value} index={1} className={classes.TabPanelGrid}>
            <Grid item xs={12} className={classes.fullWidth} >
              <Paper className={classes.paper}>
                <Grid container>
                  <Grid item xs={12} sm={6} className={classes.fullWidth} >
                    <Typography className={classes.typoStyle}>
                      Selected Loan Offer
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} className={loading ? classes.loadingOn : classes.loadingOff}>

                    <ButtonSecondary
                      stylebutton='{"float": "right", "color":"" }'
                      styleicon='{ "color":"" }'
                      id="reselect-button"
                      data-testid = "reselect_button"
                      onClick={() => resumeNavigate()}
                    >
                      Re-Select Offer
                    </ButtonSecondary>
                  </Grid>
                </Grid>
                {!selectedOffer ?
                  <Grid
                    className="circleprog loadingCircle"
                  >
                    <CheckLoginStatus />
                    <CircularProgress />
                  </Grid>
                  :
                  <Grid container justifyContent="space-between">
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      className={classes.rightBorder}
                      id="rightBorder"
                    >
                      <p className={classes.columnHeading} id="columnHeading">
                        Select Amount
                      </p>
                      <h2 className={classes.columnColor} id="column-content">
                        {currencyFormat(selectedOffer?.approved_loan_amount)}{" "}
                      </h2>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={1}
                      className={classes.rightBorder}
                      id="right-border-loan-term"
                    >
                      <p className={classes.columnHeading} id="columnHeading">
                        Loan Term
                      </p>
                      <h2 className={classes.columnColor} id="column-content">
                        {selectedOffer?.term}M
                      </h2>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      className={classes.rightBorder}
                      id="rightBorder"
                    >
                      <p className={classes.columnHeading} id="columnHeading">
                        Prepaid Finance Charge
                      </p>
                      <h2 className={classes.columnColor} id="column-content">
                        {prepaidCharge ? currencyFormat(prepaidCharge) : 0}

                      </h2>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={1.5}
                      className={classes.rightBorder}
                      id="rightBorder"
                    >
                      <p className={classes.columnHeading} id="columnHeading">
                        Interest Rate
                      </p>
                      <h2 className={classes.columnColor} id="column-content">
                        {selectedOffer?.annual_interest_rate && (selectedOffer?.annual_interest_rate * 100).toString().match(/^-?\d+(?:\.\d{0,2})?/)[ 0 ]}%
                      </h2>
                    </Grid>
                  <Grid
                      pr={1}
                      item
                      xs={12}
                      sm={1.5}
                      className={classes.rightBorder}
                      id="rightBorder"
                    >
                      <p className={classes.columnHeading} id="columnHeading">
                        Loan Proceeds
                      </p>
                      <h2 className={classes.columnColor} id="column-content">
                        {currencyFormat(selectedOffer?.approved_loan_amount)}
                      </h2>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={1.5}
                      className={classes.rightBorder}
                      id="rightBorder"
                    >
                      <p className={classes.columnHeading} id="columnHeading">
                        APR
                      </p>
                      <h2 className={classes.columnColor} id="column-content">
                        {(selectedOffer?.apr * 100).toString().match(/^-?\d+(?:\.\d{0,2})?/)[ 0 ]} %
                      </h2>
                    </Grid>
                    <Grid
                      className={classes.monthlyPaymentGrid}
                      item
                      xs={12}
                      sm={2}
                      id="rightBorder"
                    >
                      <p className={classes.columnHeading} id="columnHeading">
                        Monthly Payment
                      </p>
                      <h2 className={classes.columnColor} id="column-content">
                        {currencyFormat(selectedOffer?.monthly_payment)}
                      </h2>
                    </Grid>
                  </Grid>
                }
              </Paper>
              <Grid item className={classes.fullWidth}>
                <p
                  className="infoText"
                >
                  Please confirm your selected loan before proceeding. Please
                  note that if you wish to change your loan amount after you
                  continue beyond this step, you will need to contact us to
                  re-apply.
                </p>
                <p
                  className="infoText"
                >
                  To accept your loan offer, please complete the following:
                </p>
                <ol
                  className="infoText"
                >
                  <li>Review all presented disclosures and loan terms in detail.</li>
                  <li>Electronically sign the loan agreement using our digital signature process.</li>
                  <li>After signing, click the ‘Submit’ button.</li>
                </ol>
              </Grid>
              <Grid item xs={12} className={classes.fullWidth}>
                <Paper className={classes.paper}>
                  <Grid item xs={12} md={12} lg={12} data-testid="iframe">
                    {url ? <Iframe src={url} /> : <p>Loading...</p>}
                  </Grid>
                </Paper>
                <Paper className={`${ classes.paper } ${ classes.gridMargintop }`}>
                  <Grid item xs={12}>
                    <Checkbox
                      name="confirm"
                      disabled={loading}
                      label={
                        <span
                          className="pleaseClickText"
                        >
                          Please click this box to confirm you would like to
                          submit your application. Please note that we will make
                          a ‘hard’ credit inquiry as part of this process, and
                          that credit inquiry may affect your credit.
                        </span>
                      }
                      labelid="confirm"
                      id= "confirm_checkbox"
                      data-testid = "confirm_checkbox"
                      value={confirm}
                      onChange={(event) => {
                        setConfirm(event.target.checked);
                      }}
                      testid="checkbox"
                      stylelabelform='{ "fontSize":"12px" }'
                      stylecheckbox='{ "marginBottom":"0px" }'
                      stylecheckboxlabel='{ "fontSize":"12px", "alignItems":"flex-start" }'
                    />
                  </Grid>
                  <Grid container direction="row">
                    <Grid
                      className="circleprog loadingCircle"
                      style={{
                        display: loading ? "block" : "none"
                      }}
                    >
                      <CircularProgress />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} className={classes.buttonGridLineHeight}>
                    <ButtonWithIcon
                      stylebutton='{ "color":"" }'
                      styleicon='{ "color":"" }'
                      id="review-submit-button"
                      data-testid = "review-submit-button"
                      disabled={ !confirm || loading || disableSubmitButton }
                      onClick={submitOnClick}
                    >
                      Submit
                    </ButtonWithIcon>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item className={classes.fullWidth}>
                <p
                  className="infoText"
                >
                  After you accept your loan, you will be required to provide
                  your bank information and verify information that you have
                  provided throughout the application process. Loan funding and
                  disbursement is conditioned upon our satisfactory review of
                  any documents and other information that we require from you
                  to verify your loan application and/or your identity. This
                  loan may not be consummated if you obtain another loan from us
                  prior to our disbursing funds for this loan.
                </p>
              </Grid>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}