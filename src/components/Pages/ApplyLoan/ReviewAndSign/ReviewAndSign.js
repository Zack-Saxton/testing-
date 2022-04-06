import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckLoginStatus from "../../../App/CheckLoginStatus";
import usrAccountDetails from "../../../Controllers/AccountOverviewController";
import { hardPullCheck } from "../../../Controllers/ApplyForLoanController";
import { ButtonSecondary, ButtonWithIcon, Checkbox } from "../../../FormsUI";
import Iframe from "../../../FormsUI/iframe";
import APICall from "../../../lib/AxiosLib";
import messages from '../../../lib/Lang/applyForLoan.json';
import ScrollToTopOnMount from "../../ScrollToTop";
import TabSection from "../TabSection";
import TabPanel from "../TabPanel"
import "./ReviewAndSign.css";
import { useStylesApplyForLoan } from "../Style"

//Initializing the Review and sign functional component
export default function ReviewAndSign(props) {
  const classes = useStylesApplyForLoan();
  //Initializing state variable
  const [ value, setValue ] = useState(1);
  const navigate = useNavigate();
  const [ url, setUrl ] = useState();
  const [ confirm, setConfirm ] = useState(false);
  const [ selectedOffer, setSelectOffer ] = useState();
  const [ loading, setLoading ] = useState(false);
  const { refetch, isLoading, data: accountDetials } = useQuery('loan-data', usrAccountDetails);
  const handleChange = (event, newValue) => setValue(newValue);

  // To get the iframe url from the API
  async function getIframeURL() {
    let data = {};
    let iframeURL = await APICall("esignature_iframe", '', data, "POST", true);
    setUrl(iframeURL?.data?.iframe);
  }

  useEffect(() => {
    getIframeURL();
    setSelectOffer(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call the get URL funtion on page load
  useEffect(() => {
    setSelectOffer(!isLoading ? accountDetials?.data?.application?.selected_offer : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ accountDetials ]);

  //Conver the value into currency format
  const currencyFormat = (val) => {
    if (val) {
      let formated = parseFloat(val);
      let currency = "$";
      return (
        currency + formated.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
      );
    }
  };

  const submitOnClick = async (event) => {
    setLoading(true);
    let data = {};
    let authenticateStatus = await APICall("esignature_complete", '', data, "POST", true);
    if (authenticateStatus?.data?.message === "Applicant successfully updated") {
      let hardPull = await hardPullCheck();
      if (hardPull?.data?.status === 200 || hardPull?.data?.result === "success") {
        setLoading(false);
        refetch();
        navigate("/customers/finalVerification");
      } else {
        setLoading(false);
        toast.error(messages.reviewAndSignin.eSignFailed);
      }
    } else {
      setLoading(false);
      toast.error(messages.reviewAndSignin.completeEsign);
    }
  };

  //Check weather the offers is passed or not
  return (
    <div>
      <CheckLoginStatus /> {/* To check the user logged in or not  */ }
      <ScrollToTopOnMount /> {/* To show the top of the page on load */ }
      <Grid
        container
        justifyContent={ "center" }
        className={ classes.centerGrid }
      >
        <Grid
          container
          item
          xs={ 12 }
          direction="row"
          className = { classes.gridStyle }
        >
          <Typography className={ classes.applyLoanHeading } variant="h3">
            <NavLink
              className={ classes.noDecoration }
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
            </NavLink>{ " " }
            Apply for a Loan
          </Typography>
        </Grid>

        <Grid item xs={ 12 }>
          <TabSection value={ value } handleChange={ handleChange } classes={ classes } ay={ 1 } />

          {/* ##############################################Review And Sign################################################################################################# */ }
          <TabPanel value={ value } index={ 1 } className={classes.TabPanelGrid}>
            <Grid item xs={ 12 } className={ classes.fullWidth } >
              <Paper className={ classes.paper }>
                <Grid container>
                  <Grid item xs={ 12 } sm={ 6 } className={ classes.fullWidth } >
                    <Typography className={classes.typoStyle}>
                      Selected Loan Offer
                    </Typography>
                  </Grid>

                  <Grid item xs={ 12 } sm={ 6 } className={ loading ? classes.loadingOn : classes.loadingOff }>
                    <NavLink
                      to="/customers/selectOffer"
                      className={ classes.noDecoration }
                    >
                      <ButtonSecondary
                        stylebutton='{"float": "right", "color":"" }'
                        styleicon='{ "color":"" }'
                        id="reselect-button"
                      >
                        Re-Select Offer
                      </ButtonSecondary>
                    </NavLink>
                  </Grid>
                </Grid>
                { !selectedOffer ?
                  <Grid
                    className="circleprog loadingCircle"
                  >
                    <CheckLoginStatus />
                    <CircularProgress />
                  </Grid>
                  :
                  <Grid container justifyContent="flex-start">
                    <Grid
                      item
                      xs={ 12 }
                      sm={ 2 }
                      className={ classes.rightBorder }
                      id="rightBorder"
                    >
                      <p className={ classes.columnHeading } id="columnHeading">
                        Select Amount
                      </p>
                      <h2 className={ classes.columnColor } id="column-content">
                        { currencyFormat(selectedOffer.approved_loan_amount) }{ " " }
                      </h2>
                    </Grid>
                    <Grid
                      item
                      xs={ 12 }
                      sm={ 2 }
                      className={ classes.rightBorder }
                      id="right-border-loan-term"
                    >
                      <p className={ classes.columnHeading } id="columnHeading">
                        Loan Term
                      </p>
                      <h2 className={ classes.columnColor } id="column-content">
                        { selectedOffer.term }M
                      </h2>
                    </Grid>
                    <Grid
                      item
                      xs={ 12 }
                      sm={ 2 }
                      className={ classes.rightBorder }
                      id="rightBorder"
                    >
                      <p className={ classes.columnHeading } id="columnHeading">
                        Fee at Origination
                      </p>
                      <h2 className={ classes.columnColor } id="column-content">
                        { selectedOffer.origination_fee_rate }%
                      </h2>
                    </Grid>
                    <Grid
                      item
                      xs={ 12 }
                      sm={ 2 }
                      className={ classes.rightBorder }
                      id="rightBorder"
                    >
                      <p className={ classes.columnHeading } id="columnHeading">
                        Loan Proceeds
                      </p>
                      <h2 className={ classes.columnColor } id="column-content">
                        { currencyFormat(selectedOffer.approved_loan_amount) }
                      </h2>
                    </Grid>
                    <Grid
                      item
                      xs={ 12 }
                      sm={ 2 }
                      className={ classes.rightBorder }
                      id="rightBorder-apr"
                    >
                      <p className={ classes.columnHeading } id="columnHeading">
                        APR
                      </p>
                      <h2 className={ classes.columnColor } id="column-content">
                        { (selectedOffer.apr * 100).toString().match(/^-?\d+(?:\.\d{0,2})?/)[ 0 ] } %
                      </h2>
                    </Grid>
                    <Grid
                      className={ classes.monthlyPaymentGrid }
                      item
                      xs={ 12 }
                      sm={ 2 }
                      id="rightBorder"
                    >
                      <p className={ classes.columnHeading } id="columnHeading">
                        Monthly Payment
                      </p>
                      <h2 className={ classes.columnColor } id="column-content">
                        { currencyFormat(selectedOffer.monthly_payment) }
                      </h2>
                    </Grid>
                  </Grid>
                }
              </Paper>
              <Grid item className={ classes.fullWidth }>
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
              <Grid item xs={ 12 } className={ classes.fullWidth }>
                <Paper className={ classes.paper }>
                  <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
                    { url ? <Iframe src={ url } /> : <p>Loading...</p> }
                  </Grid>
                </Paper>
                <Paper className={`${ classes.paper } ${classes.gridMargintop}`}>
                  <Grid item xs={ 12 }>
                    <Checkbox
                      name="confirm"
                      disabled={ loading }
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
                      value={ confirm }
                      onChange={ (event) => {
                        setConfirm(event.target.checked);
                      } }
                      testid="checkbox"
                      stylelabelform='{ "fontSize":"12px" }'
                      stylecheckbox='{ "marginBottom":"0px" }'
                      stylecheckboxlabel='{ "fontSize":"12px" }'
                    />
                  </Grid>
                  <Grid container direction="row">
                    <Grid
                      className="circleprog loadingCircle"
                      style={ {
                        display: loading ? "block" : "none"
                      } }
                    >
                      <CircularProgress />
                    </Grid>
                  </Grid>

                  <Grid item xs={ 12 } className={classes.buttonGridLineHeight}>
                    <ButtonWithIcon
                      stylebutton='{ "color":"" }'
                      styleicon='{ "color":"" }'
                      id="review-submit-button"
                      disabled={ !confirm || loading }
                      onClick={ submitOnClick }
                    >
                      Submit
                    </ButtonWithIcon>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item className={ classes.fullWidth }>
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