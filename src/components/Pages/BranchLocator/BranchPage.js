import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from '@material-ui/icons/Info';
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import PhoneIcon from "@material-ui/icons/Phone";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { branch_hours, ca_branch_hours, howManyBranchesforBranchLocatorPages } from "../../../assets/data/marinerBusinesStates";
import BranchImageMobile from "../../../assets/images/Branch_Locator_Mobile_Image.png";
import BranchImageWeb from "../../../assets/images/Branch_Locator_Web_Image.jpg";
import TitleImage from "../../../assets/images/Favicon.png";
import MarinerFinanceBuilding from "../../../assets/images/mf-logo-white.png";
import { branchSaturdaySchedule, mapInformationBranchLocator } from "../../Controllers/BranchDayTiming";
import BranchLocatorController from "../../Controllers/BranchLocatorController";
import { ButtonPrimary, ButtonSecondary } from "../../FormsUI";
import { useStylesConsumer } from "../../Layout/ConsumerFooterDialog/Style";
import ErrorLogger from "../../lib/ErrorLogger";
import CustomerRatings from "../MyBranch/CustomerRatings";
import "./BranchLocator.css";
import Map from "./BranchLocatorMap";
import { useStylesMyBranch } from "./Style";
import YearHolidays from "./YearHolidays";

export default function StatePage(props) {
  const classes = useStylesMyBranch();
  const location = useLocation();
  const navigate = useNavigate();
  const { branch_Details, stateLongNm, stateShortNm } = location.state;
  const directionsClass = useStylesConsumer();

  const [ directionModal, setDirectionModal ] = useState(() => false);
  const [ branchList, setBranchList ] = useState();
  const [ branchAddress, setBranchAddress ] = useState();
  const [ googleMap, setGoogleMap ] = useState([]);
  const [ currentLocation, setCurrentLocation ] = useState();
  const [ zoomDepth, setZoomDepth ] = useState();
  const [ branchHours, setBranchHours ] = useState();
  const [ showDialog, setShowDialog ] = useState(() => false);
  const [ stateLongName, setStateLongName ] = useState();
  const [ stateShortName, setStateShortName ] = useState();
  //API call
  const getBranchLists = async (search_text) => {
    try {
      let result = await BranchLocatorController(search_text, howManyBranchesforBranchLocatorPages.BranchPage, false);
      if (result.status === 400) toast.error(" Check your address and Try again.");
      else {
        setCurrentLocation(result?.data?.searchLocation);
        setZoomDepth(
          (result?.data?.branchData[ 0 ]?.distance).replace(/[^/d]/g, "") / 100
        );
        setStateLongName(result?.data?.stateLongName);
        setStateShortName(result?.data?.stateShortName);
        return result?.data?.branchData;
      }
    } catch (error) {
      ErrorLogger(" Error from branchList ", error);
    }
  };
  const listForMapView = async (List) => {
    try {
      if (List) setGoogleMap(await mapInformationBranchLocator(List));
    } catch (error) {
      ErrorLogger(" Error from listForMapView", error);
    }
  };
  const apiGetBranchList = async (value) => {
    try {
      let result = await getBranchLists(value);
      if (result?.length > 2) result = result.slice(0, 3);
      setBranchList(result);
      listForMapView(result);
    } catch (error) {
      ErrorLogger(" Error from apiGetBranchList ", error);
    }
  };
  const openGetDirectionModal = () => setDirectionModal(true);
  const closeGetDirectionModal = () => setDirectionModal(false);
  const display_Branch_Times = () => (stateShortNm === "CA") ? setBranchHours(ca_branch_hours) : setBranchHours(branch_hours);
  const ApplyOnlineLoan = () => window.open(`${ process.env.REACT_APP_WEBSITE }`, "_self");
  const cancel = () => setShowDialog(false);
  const OpenYearHolidays = () => setShowDialog(true);
  useEffect(() => {
    apiGetBranchList(branch_Details.Address);
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ branch_Details ]);
  useEffect(() => {
    display_Branch_Times();
    window.scrollTo(0, 0);
    document.title = `Personal Loans in  ${ branch_Details.BranchName }, ${ stateShortNm } | Mariner Finance Branch | Discover More `;
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const BranchDetailsInCard = (
    <Grid container style={ { width: "100%" } }>
      <Grid className="branchImage" item md={ 7 } sm={ 12 } xs={ 12 }>
        <img className="mobileImage" src={ BranchImageMobile } alt="MF Banner" />
        <img className="webImage" src={ BranchImageWeb } alt="MF Banner" />
      </Grid>
      <Grid
        className="greyBackground mobilePadding"
        style={ { padding: "24px 0px" } }
        item
        md={ 5 }
        sm={ 12 }
        xs={ 12 }
      >
        <Breadcrumbs
          className="breadcrumbWrap"
          separator={
            <NavigateNextIcon
              className="navigateNextIcon"
              style={ { color: "#171717" } }
            />
          }
          aria-label="breadcrumb"
        >
          <Link
            className="breadcrumbLink"
            onClick={ () => window.open(`/`, "_self") }
          >
            Home
          </Link>
          <Link
            className="breadcrumbLink"
            onClick={ () => window.open(`/branch-locator/`, "_self") }
          >
            Find a branch
          </Link>
          <Link
            className="breadcrumbLink"
            onClick={ () => {
              navigate(`/branch-locator/${ stateLongNm.replace(/\s+/, '-').toLowerCase() }/`,
                { state: { value: stateLongNm, flag: true } });
            } }
          >
            { stateLongNm ?? "" }
          </Link>
          <Link className="breadcrumbLink">
            { branch_Details.BranchName }
          </Link>
        </Breadcrumbs>
        <Grid className="blueBoxWrap">
          <h4 className="branchHeading">
            Personal Loans in{ " " }
            <strong>
              { branch_Details.BranchName }, { stateShortNm } Branch
            </strong>
          </h4>
          <Grid container>
            <Grid
              className="marinerFinanceBuildingImageWrap"
              item
              sm={ 6 }
              md={ 6 }
              lg={ 6 }
            >
              <img
                className="marinerFinanceBuildingImage"
                src={ MarinerFinanceBuilding }
              />
              <Grid>
                <span className="branchAddressSpan">
                  { branch_Details?.Address }
                </span>
                <span>
                  <a
                    href={ "tel:+1" + branch_Details?.PhoneNumber }
                    className="branchPhoneNumber"
                  >
                    <PhoneIcon />
                    { branch_Details?.PhoneNumber }
                  </a>
                </span>
              </Grid>
            </Grid>
            <Grid item sm={ 6 } md={ 6 } lg={ 6 } className="businessHours">
              <span className="businessHoursSpan">
                Business Hours{ " " }
                <InfoIcon
                  className={ classes.InformationIcon }
                  data-test-id="background"
                  alt="Information"
                  onClick={ OpenYearHolidays }
                />
                <Dialog open={ showDialog }>
                  <DialogTitle className="tableTitle">Mariner Finance Holidays Hours</DialogTitle>
                  <DialogContent>
                    <YearHolidays />
                  </DialogContent>
                  <DialogActions className="okButtonWrap">
                    <ButtonPrimary stylebutton='{"background": "", "color":"" }' onClick={ cancel }>OK</ButtonPrimary>
                  </DialogActions>
                </Dialog>
              </span>
              { branchHours
                ? branchHours.map((ele, index) => {
                  return (
                    <div className="weekdays" key={ index }>
                      { ele }{ " " }
                    </div>
                  );
                })
                : "" }
              { branchSaturdaySchedule() ? (
                <div className="weekdays"> Sat 9.00 am - 1:00 p.m. </div>
              ) : (
                ""
              ) }
              <hr />
              <Grid className="branchManager">
                <small>Branch Manager</small>
                <br />
                <span>{ branch_Details?.branchManager }</span>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="secondaryButtonWrap" container>
            <ButtonSecondary
              onClick={ () => {
                setBranchAddress(
                  "https://www.google.com/maps/search/" + branch_Details.Address
                );
                openGetDirectionModal();
              } }
              stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
            >
              Get Directions
            </ButtonSecondary>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const Display3moreClosestBranchList = (
    <Grid
      container
      style={ { margin: "auto", justifyContent: "space-between" } }
    >
      <Grid container className="branchListWrap">
        { branchList ? (
          branchList.map((item, index) => {
            return (
              <Grid key={ index } className="locationInfo">
                <NavLink
                  to={ `/branch-locator/${ stateLongName.replace(/\s+/, '-').toLocaleLowerCase() }/personal-loans-in-${ item?.BranchName.replace(/[.]/g, "").replace(/\s+/g, '-').toLocaleLowerCase() }-${ stateShortName.toLocaleLowerCase() }` }
                  state={ { branch_Details: item, stateLongNm: stateLongName, stateShortNm: stateShortName } }
                  className="nav_link"
                  onClick={ () => {
                    document.title = `Personal Loans in ${ item.BranchName }, ${ stateShortName } | Mariner Finance Branch | Discover More`;
                  } }
                >
                  <b>
                    <h4 className={ classes.h4tag }>
                      { item?.BranchName } Branch
                    </h4>
                  </b>
                  <ChevronRightIcon />
                </NavLink>
                <p className={ classes.ptag }>
                  { item.distance }les away | { item?.BranchTime?.Value1 }{ " " }
                  { item?.BranchTime?.Value2 }
                </p>
                <p className={ classes.addressFont } id={ item.id }>
                  { item.Address }
                </p>
                <p className={ classes.phoneNumber }>
                  <PhoneIcon />
                  <a
                    href={ "tel:+1" + item?.PhoneNumber }
                    style={ { color: "#214476" } }
                  >
                    { " " }
                    { item?.PhoneNumber }
                  </a>
                </p>
                <ButtonSecondary
                  onClick={ () => {
                    setBranchAddress(
                      "https://www.google.com/maps/search/" + item.Address
                    );
                    openGetDirectionModal();
                  } }
                  stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
                >
                  Get Directions
                </ButtonSecondary>
              </Grid>
            );
          })
        ) : (
          <p> No Branch found.</p>
        ) }
      </Grid>
    </Grid>
  );
  const ApplyNowOnlineButton = (
    <Grid className="applyOnlineWrap">
      <Grid className="applyOnline">
        <Typography className="applyOnlineHeading">
          { "Can't get to a branch? No worries, apply for an online loan today!" }
        </Typography>
        <Typography className="applyOnlineParagraph">
          Apply now! Loans starting from $1k up to $25k | Fast Application |
          Quick Decision | ACH Money Transfers Available
        </Typography>
        <Grid container className="applyOnlineButton">
          <ButtonPrimary
            onClick={ ApplyOnlineLoan }
            stylebutton='{"padding":"0px 30px","fontWeight":"400", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
          >
            Apply Online Now
          </ButtonPrimary>
        </Grid>
      </Grid>
    </Grid>
  );

  const DrivingDirectionPopup = (
    <Dialog
      id="directionModal"
      open={ directionModal }
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={ { paper: directionsClass.consumerDialog } }
    >
      <div id="closeBtn" className={ directionsClass.buttonClose }>
        <IconButton
          aria-label="close"
          onClick={ closeGetDirectionModal }
          className={ directionsClass.closeButton }
        >
          <CloseIcon />
        </IconButton>
      </div>
      <h2
        id="consumerDialogHeading"
        className={ directionsClass.consumerDialogHeading }
      >
        You are about to leave marinerfinance.com
      </h2>
      <div>
        <p className={ directionsClass.consumerParagaraph }>
          Mariner Finance provides this link for your convenience and is not
          responsible for and makes no claims or representations regarding the
          content, terms of use, or privacy policies of third party websites.
        </p>
      </div>
      <div id="buttonWrap">
        <ButtonSecondary
          id="stayBtn"
          onClick={ closeGetDirectionModal }
          stylebutton='{"float": "" }'
        >
          Stay on Marinerfinance.com
        </ButtonSecondary>
        <ButtonPrimary
          href={ branchAddress }
          onClick={ closeGetDirectionModal }
          id="Continue"
          stylebutton='{"float": "" }'
          target="_blank"
        >
          Continue
        </ButtonPrimary>
      </div>
    </Dialog>
  );

  const DisplayBranchMap = (
    <Grid className="branchMap">
      <Map
        googleMap={ googleMap }
        CurrentLocation={ currentLocation }
        Zoom={ zoomDepth }
      />
    </Grid>
  );
  //View part
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href={ TitleImage } sizes="16x16" />
        <meta
          name="description"
          content={ `Looking for a personal loans in ${ branch_Details.BranchName },${ stateShortNm } ?  Our ${ branch_Details.BranchName },${ stateShortNm } branch welcomes you for personal loans that fit your needs.` }
        />
      </Helmet>
      <Grid className="greyBackground" container justifyContent={ "center" }>
        <Grid className="addressCardWrap">{ BranchDetailsInCard }</Grid>

        { DrivingDirectionPopup }
        <Grid className="branchPageMap">
          <Grid className="mapContainerWrap" container>
            <Grid className="branchMapSection" item md={ 6 }>
              <Grid>
                <h4 className="PesonalLoanMapHeading">
                  <strong>
                    One-On-One Support With Your Personal Loans in{ " " }
                    { branch_Details.BranchName }, { stateShortNm }
                  </strong>
                </h4>
              </Grid>
              { DisplayBranchMap }
            </Grid>
            <Grid className="branchtextSection" item md={ 6 }>
              <h4 className="PesonalLoanMapHeading">
                <strong>
                  The { branch_Details.BranchName }, { stateShortNm } Branch
                  Welcomes You For Personal Loans That Fit Your Needs
                </strong>
              </h4>
              <p className="PesonalLoanMapParagraph">
                Our { branch_Details.BranchName } lending professionals are proud
                of the neighborhoods they live and work in. Ready to speak to a { branch_Details.BranchName } lending professional in person? The better we know
                you, the more we can help. You have your own unique goals to
                meet, and it all starts with a conversation at your local
                branch. <br /><br />A personal loans can meet a variety of needs, including
                medical emergencies, home improvement projects, vacations,
                weddings, tuitions costs, and debt consolidation. Mariner
                Finance has a personal loans that fits every one of those
                situations, and more. Ready to apply for a personal loans at the{ " " }
                { branch_Details.BranchName }, { stateShortNm } branch? Our { branch_Details.BranchName } branch is totally focused on solving your personal
                financial challenges.
              </p>
            </Grid>
          </Grid>
        </Grid>

        <Grid className="fullWidth">
          <Grid className="findNearbyBranch">
            <Grid style={ { margin: "auto" } }>
              <h4 className="PesonalLoanMapHeading">
                <strong>Find nearby { stateLongNm } branches</strong>
              </h4>
              <p className="PesonalLoanMapParagraph">
                Mariner Finance, serving communities since 1927, operates over 470 branch locations in twenty-seven
                states, working and living as close to our customers as we can.
                Chances are we’re in your neighborhood, or we will be soon as we
                continue to grow. Our experienced team members are ready to assist
                with your financial needs. See other branches with personal loans
                near you below:
              </p>
            </Grid>
            { Display3moreClosestBranchList }
            <Grid>
              <Typography className="learnMoreLinks">
                Learn more about our{ " " }
                <a href="https://www.marinerfinance.com/personal-loans/">
                  personal loans
                </a>
                ,{ " " }
                <a href="https://www.marinerfinance.com/car-loans/">car loans</a>,{ " " }
                <a href="https://www.marinerfinance.com/personal-loans/debt-consolidation-loans/">
                  debt consolidation loans
                </a>
                ,{ " " }
                <a href="https://www.marinerfinance.com/personal-loans/home-improvement-loans/">
                  home improvement loans
                </a>
                ,{ " " }
                <a href="https://www.marinerfinance.com/personal-loans/vacation-loans/">
                  vacation loans
                </a>
                , and{ " " }
                <a href="https://www.marinerfinance.com/personal-loans/wedding-loans/">
                  wedding loans
                </a>
                .
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        { ApplyNowOnlineButton }
        <Grid className="customerRatingsWrap">
          <CustomerRatings />
        </Grid>
      </Grid>
    </div>
  );
}
