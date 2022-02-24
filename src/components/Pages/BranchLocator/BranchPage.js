import Grid from "@material-ui/core/Grid";
import React, { useState, useEffect } from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { ButtonPrimary, ButtonSecondary } from "../../FormsUI";
import { useStylesConsumer } from "../../Layout/ConsumerFooterDialog/Style";
import { toast } from "react-toastify";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import BranchLocatorController from "../../Controllers/BranchLocatorController";
import Typography from "@material-ui/core/Typography";
import ErrorLogger from "../../lib/ErrorLogger";
import { useLoadScript } from "@react-google-maps/api";
import Map from "./BranchLocatorMap";
import { mapInformationBranchLocator } from "../../Controllers/BranchDayTiming";
import {
  MFStates,
  MFStateShort,
  branch_hours,
  ca_branch_hours
} from "../../../assets/data/marinerBusinesStates";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "@material-ui/core/Link";
import BranchImageWeb from "../../../assets/images/BranchLocatorWeb.png";
import BranchImageMobile from "../../../assets/images/BranchLocatorMobile.png";
import { NavLink, useLocation, useParams, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

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
  window.zeHide();
  //Material UI css class
  const clessesforptag = useStyles();
  const getDirectionsClass = useStylesConsumer();
  const [getDirectionModal, setgetDirectionModal] = useState(false);
  const [getBranchList, setBranchList] = useState();
  const [getBranchAddress, setBranchAddress] = useState();
  const [getMap, setMap] = useState([]);
  const [getCurrentLocation, setCurrentLocation] = useState();
  const [zoomDepth, setZoomDepth] = useState();
  const [getStateName, setStateName] = useState();
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
          (result?.data?.branchData[0]?.distance).replace(/[^0-9]/g, "") / 100
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
      ErrorLogger(' Error from listForMapView', error)
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
  useEffect(() => {
    apiGetBranchList(Branch_Details.Address);
    let State = Branch_Details.Address.substring(
      Branch_Details.Address.length - 8,
      Branch_Details.Address.length
    );
    setStateName(State.substring(0, 2));
    return null
  }, []);
  
  useEffect(() => {
    display_Branch_Times();
    window.scrollTo(0, 0);
    return null
  }, [getStateName])


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_SECKey,
  });
  
  //View part
  return (
    <div>
      <Grid
        container
        justifyContent={"center"}
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <Grid container style={{ width: "100%" }}>
          <Grid className="branchImage" item md={6} sm={12} xs={12}>
            <img className="mobileImage" src={BranchImageMobile} alt="MF Banner" />
          <img className="webImage" src={BranchImageWeb} alt="MF Banner" />
          </Grid>

          <Grid className="greyBackground" style={{ padding: "2% 4%" }} item md={6} sm={12} xs={12}>
            <Breadcrumbs
              className="breadcrumbWrap"
              separator={
                <NavigateNextIcon
                  className="navigateNextIcon"
                  style={{ color: "#171717" }}
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
                onClick={() => window.open(`/branch/branchlocator/`, "_self")}
              >
                Branch Locator
              </Link>
              <Link
              className="breadcrumbLink"
                onClick={() =>
                  {params.statename = StateFullName;
                  navigate(`/StatePage/${params.statename}`);
                  // <NavLink
                  //   to={`/branchpage/${params.Name}`}
                  //   state={{ Name: params.Name}}
                  //   className="nav_link"
                  // ></NavLink>
                  // window.open(
                  //   `/StatePage/?Name=${StateFullName}`,
                  //   "_self"
                  // )
                }}
              >
                {StateFullName ?? ""}
              </Link>
              <Link
              className="breadcrumbLink"
              >
                Your {Branch_Details.BranchName}, {getStateName} Branch
              </Link>
            </Breadcrumbs>
            <Grid>
              <h4 className="branchLocatorHeadingMain">
                <strong>
                  Your {Branch_Details.BranchName}, {getStateName} Branch
                </strong>
              </h4>
                <span className="black-text">{Branch_Details?.Address}</span>
                <span className="black-text">
                  <small>Branch Manager</small>
                  <br />
                  {Branch_Details?.branchManager}
                </span>
                <span className="black-text">
                  <small>{Branch_Details?.BranchTime?.Value1} {Branch_Details?.BranchTime?.Value2} </small>
                  <h4>{Branch_Details?.BranchTime?.Value3}</h4>
                  <span>Business Hours</span>
                  {branchHours ? branchHours.map((ele, index) => {
                    return (<div key={index}>{ele} </div>)
                  }) : ""}
                </span>
                <span className="black-text">
                  <small>Phone Number</small>
                  <br />
                  <a
                    href={"tel:+1" + Branch_Details?.PhoneNumber}
                    className="branchPhoneNumber"
                  >
                    <PhoneIcon/>
                    {Branch_Details?.PhoneNumber}
                  </a>
                </span>
              <ButtonPrimary
                onClick={() => {
                  setBranchAddress(
                    "https://www.google.com/maps/search/" +
                      Branch_Details.Address
                  );
                  openGetDirectionModal();
                }}
                stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
              >
                Get Directions
              </ButtonPrimary>
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          id="getDirectionModal"
          open={getDirectionModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={{ paper: getDirectionsClass.consumerDialog }}
        >
          <div id="closeBtn" className={getDirectionsClass.buttonClose}>
            <IconButton
              aria-label="close"
              onClick={closeGetDirectionModal}
              className={getDirectionsClass.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <h2
            id="consumerDialogHeading"
            className={getDirectionsClass.consumerDialogHeading}
          >
            You are about to leave marinerfinance.com
          </h2>
          <div>
            <p className={getDirectionsClass.consumerParagaraph}>
              Mariner Finance provides this link for your convenience and is not
              responsible for and makes no claims or representations regarding
              the content, terms of use, or privacy policies of third party
              websites.
            </p>
          </div>
          <div id="buttonWrap">
            <ButtonSecondary
              id="stayBtn"
              onClick={closeGetDirectionModal}
              stylebutton='{"float": "" }'
            >
              Stay on Marinerfinance.com
            </ButtonSecondary>
            <ButtonPrimary
              href={getBranchAddress}
              onClick={closeGetDirectionModal}
              id="Continue"
              stylebutton='{"float": "" }'
              target="_blank"
            >
              Continue
            </ButtonPrimary>
          </div>
        </Dialog>
        <Grid
          style={{
            backgroundColor: "#f9f9f9",
            width: "100%",
            padding: "4% 2rem 4% 1rem",
          }}
        >
          <Grid style={{ margin: "auto" }}>
            <h4 className="PesonalLoanMapHeading">
              <strong>
                One-On-One Support With Your Personal Loan in{" "}
                {Branch_Details.BranchName}, {getStateName}
              </strong>
            </h4>
          </Grid>
          <Grid className="branchMap">
            {isLoaded ? (
              <Map
                getMap={getMap}
                CurrentLocation={getCurrentLocation}
                Zoom={zoomDepth}
              />
            ) : null}
          </Grid>
          <Grid style={{ margin: "auto", paddingTop: "4%" }} item md={10}>
            <h4 className="PesonalLoanMapHeading">
              <strong>
                The {Branch_Details.BranchName}, {getStateName} Branch Welcomes
                You For Personal Loans That Fit Your Needs
              </strong>
            </h4>
            <p className="PesonalLoanMapParagraph">
              Our {Branch_Details.BranchName} lending professionals are proud of
              the neighborhoods they live and work in. Ready to speak to a
              Huntsville lending professional in person? The better we know you,
              the more we can help. You have your own unique goals to meet, and
              it all starts with a conversation at your local branch.A personal
              loan can meet a variety of needs, including medical emergencies,
              home improvement projects, vacations, weddings, tuitions costs,
              and debt consolidation. Mariner Finance has a personal loan that
              fits every one of those situations, and more.Ready to apply for a
              personal loan at the {Branch_Details.BranchName}, {getStateName}{" "}
              branch? Our Huntsville branch is totally focused on solving your
              personal financial challenges.
            </p>
          </Grid>
          <Grid style={{ margin: "auto" }} item md={10}>
            <h4 className="PesonalLoanMapHeading">
              <strong>Find nearby {StateFullName} branches</strong>
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
            style={{ margin: "auto", justifyContent: "space-between" }}
            item
            md={10}
          >
            <Grid container className="branchListWrap">
              {getBranchList ? (
                getBranchList.map((item, index) => {
                  return (
                    <Grid key={index} item md={4} className="locationInfo">
                      <NavLink
                        to={`/branchpage/${item?.BranchName}`}
                        state={{ Branch_Details: item }}
                        className="nav_link"
                      >
                        <b>
                          <h4 className={clessesforptag.h4tag}>
                            {item?.BranchName} Branch
                          </h4>
                        </b>
                        <ChevronRightIcon />
                      </NavLink>
                      <p className={clessesforptag.ptag}>
                        {item.distance}les away | {item?.BranchTime?.Value1}{" "}
                        {item?.BranchTime?.Value2}
                      </p>
                      <p className={clessesforptag.addressFont} id={item.id}>
                        {item.Address}
                      </p>
                      <p className={clessesforptag.phoneNumber}>
                        <PhoneIcon />
                        <a
                          href={"tel:+1" + item?.PhoneNumber}
                          style={{ color: "#214476" }}
                        >
                          {" "}
                          {item?.PhoneNumber}
                        </a>
                      </p>
                      <ButtonPrimary
                        onClick={() => {
                          setBranchAddress(
                            "https://www.google.com/maps/search/" + item.Address
                          );
                          openGetDirectionModal();
                        }}
                        stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
                      >
                        Get Directions
                      </ButtonPrimary>
                    </Grid>
                  );
                })
              ) : (
                <p> No Branch found.</p>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid className="blueBGColor">
          <h4>Customer Ratings</h4>
          <div
            id="feefo-service-review-carousel-widgetId"
            className="feefo-review-carousel-widget-service"
          ></div>
        </Grid>
      </Grid>
    </div>
  );
}
