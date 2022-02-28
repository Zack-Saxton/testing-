import { makeStyles } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CloseIcon from "@material-ui/icons/Close";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import PhoneIcon from "@material-ui/icons/Phone";
import { useLoadScript } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  branch_hours,
  ca_branch_hours, MFStates,
  MFStateShort
} from "../../../assets/data/marinerBusinesStates";
import { mapInformationBranchLocator } from "../../Controllers/BranchDayTiming";
import BranchLocatorController from "../../Controllers/BranchLocatorController";
import { ButtonPrimary, ButtonSecondary } from "../../FormsUI";
import { useStylesConsumer } from "../../Layout/ConsumerFooterDialog/Style";
import ErrorLogger from "../../lib/ErrorLogger";
import CustomerRatings from "../MyBranch/CustomerRatings";
import Map from "./BranchLocatorMap";
import BranchImageWeb from "../../../assets/images/Branch_Locator_Web_Image.png";
import BranchImageMobile from "../../../assets/images/Branch_Locator_Mobile_Image.png";
import MarinerFinanceBuilding from "../../../assets/images/mariner-finance-Building.jpeg";
import { NavLink, useLocation, useParams, useNavigate } from "react-router-dom";
import "./BranchLocator.css"
import { Helmet } from "react-helmet";
import TitleImage from "../../../assets/images/Favicon.png";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles({
  ptag: {
    margin: "0px",
    lineHeight: "1.5",
    fontSize: "0.938rem",
  },
  addressFont: {
    color: "#595959",
    margin: "0px",
    lineHeight: "1.5",
    fontSize: "0.938rem",
  },
  phoneNumber: {
    color: "#595959",
    margin: "0px 0px 15px 0px",
    lineHeight: "1.5",
    fontSize: "0.938rem",
  },
  h4tag: {
    margin: ".575rem 0 .46rem 0",
    lineHeight: "1.5",
    fontWeight: "700",
    fontSize: "1.078rem",
    color: "#214476",
  },
});
export default function StatePage(props) {

  //Material UI css class
  const clessesforptag = useStyles();
  const getDirectionsClass = useStylesConsumer();
  const [ getDirectionModal, setgetDirectionModal ] = useState(false);
  const [ getBranchList, setBranchList ] = useState();
  const [ getBranchAddress, setBranchAddress ] = useState();
  const [ getMap, setMap ] = useState([]);
  const [ getCurrentLocation, setCurrentLocation ] = useState();
  const [ zoomDepth, setZoomDepth ] = useState();
  const [ getStateName, setStateName ] = useState();
  const location = useLocation();
  const { Branch_Details } = location.state;
  const [branchHours, setBranchHours] = useState();
  const navigate = useNavigate();
  let StateFullName = MFStates[MFStateShort.indexOf(getStateName)];
  let params = useParams();
  //API call

  const getBranchLists = async (search_text) => {
    try {
      let result = await BranchLocatorController(search_text);
      if (result.status === 400) {
        toast.error(" Check your address and Try again.");
      } else {
        setCurrentLocation(result?.data?.searchLocation);
        setZoomDepth(
          (result?.data?.branchData[ 0 ]?.distance).replace(/[^/d]/g, "") / 100
        );
        return result.data.branchData;
      }
    } catch (error) {
      ErrorLogger(" Error from getBranchList ", error);
    }
  };
  const listForMapView = async (List) => {
    try {
      if (List) {
        setMap(await mapInformationBranchLocator(List));
      }
    } catch (error) {
      ErrorLogger(' Error from listForMapView', error);
    }
  };
  const apiGetBranchList = async (value) => {
    try {
      let result = await getBranchLists(value);
      setBranchList(result);
      listForMapView(result);
    } catch (error) {
      ErrorLogger(" Error from apiGetBranchList ", error);
    }
  };
  const openGetDirectionModal = () => {
    setgetDirectionModal(true);
  };
  const closeGetDirectionModal = () => {
    setgetDirectionModal(false);
  };
  const display_Branch_Times = () => {
    if (getStateName && getStateName === 'CA') {
      setBranchHours(ca_branch_hours);
    } else {
      setBranchHours(branch_hours);
    }
  }
  const ApplyOnlineLoan = () => {

    window.open(`https://wps-qa.marinerfinance.io/`, "_self")
  }
  useEffect(() => {
    apiGetBranchList(Branch_Details.Address);
    let State = Branch_Details.Address.substring(
      Branch_Details.Address.length - 8,
      Branch_Details.Address.length
    );
    setStateName(State.substring(0, 2));
    return null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Branch_Details]);

  useEffect(() => {
    display_Branch_Times();
    window.scrollTo(0, 0);
    document.title = `Personal Loans in  ${Branch_Details.BranchName}, ${getStateName} | Mariner Finance Branch | Discover More `;
    return null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getStateName])
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_SECKey,
  });
  //View part
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href={TitleImage} sizes="16x16" />
        <meta name="description" content={`Looking for a personal loan in ${Branch_Details.BranchName},${getStateName} ?  Mariner Finance branch employees can help. Visit our ${Branch_Details.BranchName}, ${getStateName} location today.`} />
      </Helmet>
      <Grid
        container
        justifyContent={ "center" }
        style={ { backgroundColor: "#f9f9f9" } }
      >
        <Grid container style={{ width: "100%" }}>
          <Grid className="branchImage" item md={6} sm={12} xs={12}>
            <img
              className="mobileImage"
              src={BranchImageMobile}
              alt="MF Banner"
            />
            <img className="webImage" src={BranchImageWeb} alt="MF Banner" />
          </Grid>
          <Grid
            className="greyBackground"
            style={{ padding: "2% 4%" }}
            item
            md={6}
            sm={12}
            xs={12}
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
                onClick={() => window.open(`/`, "_self")}
              >
                Home
              </Link>
              <Link
              className="breadcrumbLink"
                onClick={() => window.open(`/branch-locator/`, "_self")}
              >
                Branch Locator
              </Link>
              <Link
                className="breadcrumbLink"
                onClick={() => {
                  params.statename = StateFullName;
                  navigate(`/StatePage/${params.statename}`);
                }}
              >
                { StateFullName ?? "" }
              </Link>
              <Link className="breadcrumbLink">
                Your {Branch_Details.BranchName}, {getStateName} Branch
              </Link>
            </Breadcrumbs>
            <Grid className="branchInfo">
              <h4 className="branchLocatorHeadingMain">
                <strong>
                  Your { Branch_Details.BranchName }, { getStateName } Branch
                </strong>
              </h4>
              <Grid container>
                <Grid 
                className="marinerFinanceBuildingImageWrap"
                  item
                  sm={6}
                  md={6}
                  lg={6}>
                  <img
                  className="marinerFinanceBuildingImage"
                  src={MarinerFinanceBuilding}
                />
                </Grid>
                <Grid item sm={6} md={6} lg={6} className="businessHours">
                  {Branch_Details?.BranchTime?.Value2 &&
                  Branch_Details?.BranchTime?.Value3 ? (
                    <h4>{Branch_Details?.BranchTime?.Value3}</h4>
                  ) : (
                    <h4>
                      {Branch_Details?.BranchTime?.Value1}{" "}
                      {Branch_Details?.BranchTime?.Value2}{" "}
                    </h4>
                  )}
                  <span className="businessHoursSpan">Business Hours</span>
                  {branchHours
                    ? branchHours.map((ele, index) => {
                        return <div className="weekdays" key={index}>{ele} </div>;
                      })
                    : ""}
                </Grid>
              </Grid>
              <Grid className="branchDetailsWrap" container>
                <Grid item sm={6} md={6} lg={6}>
                  <span className="branchAddressSpan">{Branch_Details?.Address}</span>
                  <span>
                    <a
                      href={"tel:+1" + Branch_Details?.PhoneNumber}
                      className="branchPhoneNumber"
                    >
                      <PhoneIcon />
                      {Branch_Details?.PhoneNumber}
                    </a>
                  </span>
                </Grid>
                <Grid item sm={6} md={6} lg={6} className="branchManager">
                  <small>Branch Manager</small>
                  <br />
                  {Branch_Details?.branchManager}
                </Grid>
              </Grid>
              <Grid className="secondaryButtonWrap" container>
                 <ButtonSecondary
                onClick={() => {
                  setBranchAddress(
                    "https://www.google.com/maps/search/" +
                    Branch_Details.Address
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
        <Dialog
          id="getDirectionModal"
          open={ getDirectionModal }
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={ { paper: getDirectionsClass.consumerDialog } }
        >
          <div id="closeBtn" className={ getDirectionsClass.buttonClose }>
            <IconButton
              aria-label="close"
              onClick={ closeGetDirectionModal }
              className={ getDirectionsClass.closeButton }
            >
              <CloseIcon />
            </IconButton>
          </div>
          <h2
            id="consumerDialogHeading"
            className={ getDirectionsClass.consumerDialogHeading }
          >
            You are about to leave marinerfinance.com
          </h2>
          <div>
            <p className={ getDirectionsClass.consumerParagaraph }>
              Mariner Finance provides this link for your convenience and is not
              responsible for and makes no claims or representations regarding
              the content, terms of use, or privacy policies of third party
              websites.
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
              href={ getBranchAddress }
              onClick={ closeGetDirectionModal }
              id="Continue"
              stylebutton='{"float": "" }'
              target="_blank"
            >
              Continue
            </ButtonPrimary>
          </div>
        </Dialog>
        <Grid
          style={ {
            backgroundColor: "#f9f9f9",
            width: "100%",
            padding: "4% 2rem 4% 1rem",
          } }
        >
          <Grid style={ { margin: "auto" } }>
            <h4 className="PesonalLoanMapHeading">
              <strong>
                One-On-One Support With Your Personal Loan in{ " " }
                { Branch_Details.BranchName }, { getStateName }
              </strong>
            </h4>
          </Grid>
          <Grid className="branchMap">
            { isLoaded ? (
              <Map
                getMap={ getMap }
                CurrentLocation={ getCurrentLocation }
                Zoom={ zoomDepth }
              />
            ) : null }
          </Grid>
          <Grid style={ { margin: "auto", paddingTop: "4%" } } item md={ 10 }>
            <h4 className="PesonalLoanMapHeading">
              <strong>
                The { Branch_Details.BranchName }, { getStateName } Branch Welcomes
                You For Personal Loans That Fit Your Needs
              </strong>
            </h4>
            <p className="PesonalLoanMapParagraph">
              Our { Branch_Details.BranchName } lending professionals are proud of
              the neighborhoods they live and work in. Ready to speak to a
              Huntsville lending professional in person? The better we know you,
              the more we can help. You have your own unique goals to meet, and
              it all starts with a conversation at your local branch.A personal
              loan can meet a variety of needs, including medical emergencies,
              home improvement projects, vacations, weddings, tuitions costs,
              and debt consolidation. Mariner Finance has a personal loan that
              fits every one of those situations, and more.Ready to apply for a
              personal loan at the { Branch_Details.BranchName }, { getStateName }{ " " }
              branch? Our Huntsville branch is totally focused on solving your
              personal financial challenges.
            </p>
          </Grid>
          <Grid style={ { margin: "auto" } } item md={ 10 }>
            <h4 className="PesonalLoanMapHeading">
              <strong>Find nearby { StateFullName } branches</strong>
            </h4>
            <p className="PesonalLoanMapParagraph">
              Mariner Finance operates over 480 branch locations in twenty-four
              states, working and living as close to our customers as we can.
              Chances are we’re in your neighborhood, or we will be soon as we
              continue to grow. Our experienced team members are ready to assist
              with your financial needs. See other branches with personal loans
              near you below:
            </p>
          </Grid>
          <Grid
            container
            style={ { margin: "auto", justifyContent: "space-between" } }
            item
            md={ 10 }
          >
            <Grid container className="branchListWrap">
              { getBranchList ? (
                getBranchList.map((item, index) => {
                  return (
                    <Grid key={ index } item md={ 4 } className="locationInfo">
                      <NavLink
                        to={`/branchpage/personal-loan-in-${item.BranchName}-${item.Address.substring(item.Address.length - 8, item.Address.length).substring(0, 2)}`}
                        state={{ Branch_Details: item }}
                        className="nav_link"
                        onClick={() => {
                          let State = item.Address.substring(
                            item.Address.length - 8,
                            item.Address.length
                          );
                          document.title = `Personal Loans in ${item.BranchName}, ${State.substring(0, 2)} | Mariner Finance Branch | Discover More`;
                        }}
                      >
                        <b>
                          <h4 className={ clessesforptag.h4tag }>
                            { item?.BranchName } Branch
                          </h4>
                        </b>
                        <ChevronRightIcon />
                      </NavLink>
                      <p className={ clessesforptag.ptag }>
                        { item.distance }les away | { item?.BranchTime?.Value1 }{ " " }
                        { item?.BranchTime?.Value2 }
                      </p>
                      <p className={ clessesforptag.addressFont } id={ item.id }>
                        { item.Address }
                      </p>
                      <p className={ clessesforptag.phoneNumber }>
                        <PhoneIcon />
                        <a
                          href={ "tel:+1" + item?.PhoneNumber }
                          style={ { color: "#214476" } }
                        >
                          { " " }
                          { item?.PhoneNumber }
                        </a>
                      </p>
                      <ButtonPrimary
                        onClick={ () => {
                          setBranchAddress(
                            "https://www.google.com/maps/search/" + item.Address
                          );
                          openGetDirectionModal();
                        } }
                        stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
                      >
                        Get Directions
                      </ButtonPrimary>
                    </Grid>
                  );
                })
              ) : (
                <p> No Branch found.</p>
              ) }
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={10}>
          <Typography className="learnMoreLinks">
          Learn more about our <a href="https://www.marinerfinance.com/personal-loans/">personal loans</a>, <a href="https://www.marinerfinance.com/car-loans/">car loans</a>, <a href="https://www.marinerfinance.com/personal-loans/debt-consolidation-loans/">debt consolidation loans</a>, <a href="https://www.marinerfinance.com/personal-loans/home-improvement-loans/">home improvement loans</a>, <a href="https://www.marinerfinance.com/personal-loans/vacation-loans/">vacation loans</a>, and <a href="https://www.marinerfinance.com/personal-loans/wedding-loans/">wedding loans</a>. 
          </Typography>
        </Grid>
        <Grid item md={10}>
          <Grid className="greyBackgroundWrap">
            <Typography className="applyOnlineHeading">
          {"Can't get to a branch? No worries, apply for an online loan today!"}
          </Typography>
          <Typography className="applyOnlineParagraph">
          Apply now! Loans starting from $1k up to $25k | Fast Application | Quick Decision | ACH Money Transfers Available
          </Typography>
          <Grid container className="applyOnlineButton">
            <ButtonPrimary 
            onClick={ApplyOnlineLoan}
            stylebutton='{"padding":"24px 34px","fontWeight":"900", "fontSize":"1.25rem","fontFamily":"Muli,sans-serif"}'
          >
            Apply Online Now
          </ButtonPrimary>
          </Grid>
          </Grid>
        </Grid>
          <CustomerRatings />
      </Grid>
    </div>
  );
}