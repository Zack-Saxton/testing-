import Grid from "@material-ui/core/Grid";
import React, { useState, useEffect } from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import PhoneIcon from "@material-ui/icons/Phone";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SearchIcon from "@material-ui/icons/Search";
import { ButtonPrimary, TextField, ButtonSecondary } from "../../FormsUI";
import { useStylesMyBranch } from "./Style";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "@material-ui/core/Link";
import StateImage from "../../../assets/images/States.png";
import { makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import BranchDayTiming from "../../Controllers/BranchDayTiming";

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

export default function StatePage() {
  window.zeHide();
  //Material UI css class
  const classes = useStylesMyBranch();
  const getDirectionsClass = useStylesConsumer();
  const [getDirectionModal, setgetDirectionModal] = useState(false);
  const [getBranchList, setBranchList] = useState();
  const [getBranchAddress, setBranchAddress] = useState(null);
  const [getMap, setMap] = useState([]);
  const [getCurrentLocation, setCurrentLocation] = useState();
  const [loading, setLoading] = useState(false);
  const [zoomDepth, setZoomDepth] = useState();
  const queryParams = new URLSearchParams(window.location.search);
  const Name = queryParams.get("Name");
  const clessesforptag = useStyles();
  //API call
  const getBranchLists = async (search_text) => {
    try {
      setLoading(true);
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
    if (List) {
      setMap(
        List.map((item) => ({
          id: item.id,
          name: item.Address,
          position: {
            lat: Number(item.latitude),
            lng: Number(item.longitude),
          },
        }))
      );
    }
  };
  const apiGetBranchList = async (value) => {
    try {
      let result = await getBranchLists(value);
      for (let ele in result) {
        let BranchTime = await findBranchTimings(result[ele]);
        result[ele] = Object.assign(result[ele], { BranchTime: BranchTime });
      }
      setBranchList(result);
      setLoading(false);
      listForMapView(result);
    } catch (error) {
      ErrorLogger(" Error from apiGetBranchList ", error);
    }
  };
  const clearSearchText = () => {
    inputText1.value = "";
    inputText2.value = "";
  }
  const getActivePlaces =  () => {
    if (inputText1?.value !== "") {
      apiGetBranchList(inputText1.value);
      clearSearchText();
    } else if (inputText2?.value !== "") {
      apiGetBranchList(inputText2.value);
      clearSearchText();
    }
  };
  // -------- To Display Dialog to get Directions of Address.......
  const openGetDirectionModal = () => {
    setgetDirectionModal(true);
  };
  const closeGetDirectionModal = () => {
    setgetDirectionModal(false);
    setBranchAddress(null);
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_SECKey,
  });
  const findBranchTimings = async (value) => {
    try {
      if (value) {
        return await BranchDayTiming(value);
      }
    } catch (error) {
      ErrorLogger(" Error from findBranchTimings", error);
    }
  };
  useEffect(() => {
    inputText1.value = Name;
    getActivePlaces();
  }, []);
  
  //View part
  return (
    <div>
      <Grid
        container
        justifyContent={"center"}
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <Grid container style={{ backgroundColor: "#afdfed", width: "100%" }}>
          <Grid className="branchImage" item md={6} sm={12} xs={12}>
            <img src={StateImage} alt="MF logo" />
          </Grid>
          <Grid style={{ padding: "2% 4%" }} item md={6} sm={12} xs={12}>
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
                onClick={() => window.open(`/branchlocator/`, "_self")}
              >
                Branch Locator
              </Link>
              <Link
              className="breadcrumbLink"
              >
                Personal Loans In {Name}
              </Link>
            </Breadcrumbs>
            <Grid id="findBranchWrapTwo" className={classes.blueBackground}>
              <h4 className={classes.headigText}>Find a Branch in {Name}</h4>
              <Grid id="findBranchGrid">
                <SearchIcon className="searchIcon" style={{ color: "white" }} />
                <TextField
                  name="Enter City or State"
                  className="branchLocatorInput"
                  style={{ color: "white!important" }}
                  id="inputText1"
                  label="Enter city & state or zip code"
                />
                <ButtonPrimary
                  onClick={getActivePlaces}
                  stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "padding":"0px 30px"}'
                >
                  <ArrowForwardIcon className="goIcon" />
                </ButtonPrimary>
              </Grid>
            </Grid>
            <h4 className="branchLocatorHeadingMain">
              <b>Get one on one support</b>
              <br />
              for a personal loan near you
            </h4>
            <Typography className="branchLocatorHeading">
              <b className="numberText">480+</b>
              <span className="branchSmallText">Branches in 25 states</span>
            </Typography>
            <Typography className="branchLocatorHeading">
              <b className="numberText">$1k - $25k</b>
              <span className="branchSmallText">Available loan amount</span>
            </Typography>
            <Typography className="branchLocatorHeading">
              <b className="numberText">4.8</b>
              <span className="branchSmallText">
                Star Rating based on over 13,000 verified reviews
              </span>
            </Typography>
          </Grid>
        </Grid>
        <Grid
          style={{ padding: "4% 30px 4% 30px", backgroundColor: "#f6f6f6" }}
          container
        >
          <Grid
            style={{ padding: "0px" }}
            id="mapGridWrap"
            item
            xs={12}
            sm={12}
            md={6}
            xl={6}
          >
            {isLoaded ? (
              <Map
                id="mapBox"
                getMap={getMap}
                CurrentLocation={getCurrentLocation}
                Zoom={zoomDepth}
              />
            ) : null}
          </Grid>
          <Grid className="findBranchWrap" item xs={12} sm={12} md={6} xl={6}>
            {loading ? (
              <div align="center">
                <CircularProgress />{" "}
              </div>
            ) : (
              <Grid
                id="branchLists"
                style={{ width: "100%", height: "542px", overflowY: "scroll" }}
              >
                <Grid className="addressList" style={{ padding: "1% 4% 1% 4%" }}>
                  {getBranchList ? (
                    getBranchList.map((item, index) => {
                      return (
                        <Grid key={index} item md={4} className="locationInfo">
                          <NavLink
                            to={`/branchpage/?BranchName=${item?.BranchName}`}
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
                          <p
                            className={clessesforptag.addressFont}
                            id={item.id}
                          >
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
                                "https://www.google.com/maps/search/" +
                                  item.Address
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
                  <Dialog
                    id="getDirectionModal"
                    open={getDirectionModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    classes={{ paper: getDirectionsClass.consumerDialog }}
                  >
                    <div
                      id="closeBtn"
                      className={getDirectionsClass.buttonClose}
                    >
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
                        Mariner Finance provides this link for your convenience
                        and is not responsible for and makes no claims or
                        representations regarding the content, terms of use, or
                        privacy policies of third party websites.
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
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid className={clessesforptag.gridMargin} container>
          <Grid className={clessesforptag.gridPadding} item md={6}>
            <ButtonPrimary
              href={getBranchAddress}
              id="Continue"
              onClick={() => {
                if (inputText2.value && inputText2.value !== '') {
                  setBranchAddress(`https://www.google.com/maps/search/${inputText2.value}`);
                  inputText2.value = '';
                  openGetDirectionModal();
                } else {
                  toast.error(' Please provide address.')
                }
              }}
              stylebutton='{"width": "100%", "padding":"0 15px", "fontSize":"0.938rem", "fontWeight":"400" }'
              target="_blank"
            >
              Get Driving Directions To Nearest Location
            </ButtonPrimary>
            </Grid>
            <Grid item md={6} className={classes.blueBackground}>
              <Grid id="findBranchGrid">
                <p className="zipLabel">
                  Can't find it? Try searching another{" "}
                </p>
                <SearchIcon
                  className="searchIconBottom"
                  style={{ color: "white" }}
                />
                <TextField
                  name="Enter City or State"
                  className="branchLocatorInput"
                  style={{ color: "white!important" }}
                  id="inputText2"
                  placeholder="Enter city & state or zip code"
                />
                <ButtonPrimary
                  onClick={getActivePlaces}
                  stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "padding":"0px 30px"}'
                >
                  <ArrowForwardIcon className="goIcon" />
                </ButtonPrimary>
              </Grid>
            </Grid>
          </Grid>
        <Grid
          style={{
            backgroundColor: "#f9f9f9",
            width: "100%",
            padding: "4% 2rem 4% 1rem",
          }}
        >
          <Grid style={{ margin: "auto" }} item md={6}>
            <h4 className="PesonalLoanHeading">
              <strong>Personal Loans in {Name}</strong>
            </h4>
            <p className="PesonalLoanParagraph">
              Looking for a personal loan near you? Every one of our Maryland
              branches share a common benefit: lending professionals proud of
              the neighborhoods they live and work in, who are totally focused
              on solving your personal financial challenges. For all the reasons
              to choose Mariner Finance, visit Why Mariner Finance.
            </p>
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
