import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import PhoneIcon from "@material-ui/icons/Phone";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import { useLoadScript } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BranchDayTiming, { mapInformationBranchLocator } from "../../Controllers/BranchDayTiming";
import BranchLocatorController from "../../Controllers/BranchLocatorController";
import { ButtonPrimary, ButtonSecondary, TextField } from "../../FormsUI";
import { useStylesConsumer } from "../../Layout/ConsumerFooterDialog/Style";
import ErrorLogger from "../../lib/ErrorLogger";
import Map from "../BranchLocator/BranchLocatorMap";
import { MFStates } from "../../../assets/data/marinerBusinesStates";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "@material-ui/core/Link";
import { useStylesMyBranch } from "../BranchLocator/Style";
import BranchImageWeb from "../../../assets/images/BranchLocatorWeb.png";
import BranchImageMobile from "../../../assets/images/BranchLocatorMobile.png";
import "./BranchLocator.css"
import { NavLink, useNavigate, useParams } from "react-router-dom";
import PlacesAutocomplete from "react-places-autocomplete";

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
  gridMargin: {
    margin: "80px 0px 0px 0px",
  },
});
export default function BranchLocator() {
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
  const [zoomDepth, setZoomDepth] = useState(10);
  const clessesforptag = useStyles();
  const navigate = useNavigate();
  const [address1, setAddress1] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  let params = useParams();
  //API call
  const getBranchLists = async (search_text) => {
    try {
      setLoading(true);
      let result = await BranchLocatorController(search_text);
      if (result.status === 400) {
        toast.error(" Error from getBranchLists");
      } else {
        setCurrentLocation(result?.data?.searchLocation);
        setZoomDepth(
          (result?.data?.branchData[0]?.distance).replace(/[^0-9]/g, "") / 100
        );
        return result.data.branchData;
      }
    } catch (error) {
      ErrorLogger(" Error occured, can't retrive Branch list. ", error);
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
  const clearSearchText =  () => {
    setAddress1("");
    setAddress2("");
  }
  const getActivePlaces = () => {
    if (address1 !== "") {
      apiGetBranchList(address1);
      clearSearchText();
    } else if (address2 !== "") {
      apiGetBranchList(address2);
      clearSearchText();
    }
  };
  const openGetDirectionModal = () => {
    setgetDirectionModal(true);
  };
  const closeGetDirectionModal = () => {
    setgetDirectionModal(false);
    setBranchAddress(null)
  };

  const MFButtonClick =  (event) => {
      params.statename = event.target.innerText;
      apiGetBranchList(params.statename);
      navigate(`/StatePage/${params.statename}`)
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_SECKey,
    libraries: ["places"],
  });
 
  // useEffect(() => {
   
  //   // inputText1.value = "21236";
  //   // getActivePlaces();
  //   // return null
  // }, []);
  const findBranchTimings = async (value) => {
    try {
      if (value) {
        return await BranchDayTiming(value);
      }
    } catch (error) {
      ErrorLogger(" Error from findBranchTimings", error);
    }
  };
  const handleSelect1 = async (value) => {
    setAddress1(value);
  }
  const handleSelect2 = async (value) => {
    setAddress2(value);
  }

  const showDialogforDrivingDirection = (
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
  );

  const showMapandBranchList = (
    <Grid>
      <Grid id="mapGridWrap" item xs={12} sm={12} md={6} xl={6}>
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
            style={{ width: "100%", height: "450px", overflowY: "scroll" }}
          >
            <Grid
              className="addressList"
            >
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
              {showDialogforDrivingDirection}
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
  );
  //View part
  return (
    <div>
      <Grid
        container
        justifyContent={"center"}
        style={{
          backgroundColor: "#f9f9f9",
        }}
      >
        <Grid container style={{  width: "100%" }}>
          <Grid className="branchImage" item md={6} sm={12} xs={12}>
            <img className="mobileImage" src={BranchImageMobile} alt="MF Banner" />
          <img className="webImage" src={BranchImageWeb} alt="MF Banner" />
          </Grid>

          <Grid style={{ padding: "2% 4%" }} item md={6} sm={12} xs={12}>
            <Breadcrumbs
              className="breadcrumbWrap"
              separator={<NavigateNextIcon className="navigateNextIcon" />}
              aria-label="breadcrumb"
            >
              <Link
                className="breadcrumbLink"
                onClick={() => window.open(`/`, "_self")}
              >
                Home
              </Link>
              <Link className="breadcrumbLink">Branch Locator</Link>
            </Breadcrumbs>
            <Grid id="findBranchWrapTwo" className={classes.blueBackground}>
              <h4 className={classes.headigText}>Find a Branch Near You!</h4>
              <Grid id="findBranchGrid">
                <SearchIcon className="searchIcon" style={{ color: "white" }} />
                <PlacesAutocomplete
                  value={address1}
                  onChange={setAddress1}
                  onSelect={handleSelect1}
                  style={{ width: '50%' }}
                >
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading2 }) => (
                    <div className="searchInputWrap">
                      <input className="stateSearch" {...getInputProps({ placeholder: 'Enter city & state or zip code' })} />
                      <div className="serachResult">
                        {loading2 && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                          const style = {
                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                          }
                          return (
                            <div {...getSuggestionItemProps(suggestion, {
                              style
                            })}>
                              <span style={{padding:"10px 0px"}}>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
                <ButtonPrimary
                  className="branchSearchButton"
                  onClick={getActivePlaces}
                  stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "padding":"0px 30px"}'
                >
                  <ArrowForwardIcon className="goIcon" />
                </ButtonPrimary>
              </Grid>
            </Grid>
            <h4 className="branchLocatorHeadingMain">
              Get one on one support
              <br />
              for a personal loan near you
            </h4>

            <Typography className="branchLocatorHeading">
              <b className="numberText">470+</b>

              <span className="branchSmallText">Branches in 24 states</span>
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
          id=""
        >
          { showMapandBranchList}
          
          <Grid id="getDirectionWrap" className={clessesforptag.gridMargin} container>
            <Grid className={clessesforptag.gridPadding} item md={6}>
              <ButtonPrimary
                href={getBranchAddress}
                id="Continue"
                onClick={() => {
                  if (Address2) {
                    openGetDirectionModal();
                    setBranchAddress(`https://www.google.com/maps/search/${Address2}`);
                    setAddress2("");
                  } else {
                    toast.error(' Please provide address.')
                  }
                }}
                stylebutton='{"width": "100%", "padding":"0 15px", "fontSize":"0.938rem", "fontWeight":"400", "height":"47px" }'
                target="_blank"
              >
                Get Driving Directions To Nearest Location
              </ButtonPrimary>
            </Grid>
            <Grid id="getDirectionSearch" item md={6} className={classes.blueBackground}>
              <Grid id="findBranchGridBottom">
                <p className="zipLabel">
                  Can't find it? Try searching another{" "}
                </p>
                <SearchIcon
                  className="searchIconBottom"
                  style={{ color: "white" }}
                />
                 <PlacesAutocomplete
                  value={address2}
                  onChange={setAddress2}
                  onSelect={handleSelect2}
                  style={{ width: '50%' }}
                >
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading2 }) => (
                    <div className="searchInputWrap">
                      <input className="stateSearch" {...getInputProps({ placeholder: 'Enter city & state or zip code' })} />
                      <div className="serachResult">
                        {loading2 && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                          const style = {
                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                          }
                          return (
                            <div {...getSuggestionItemProps(suggestion, {
                              style
                            })}>
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
                <ButtonPrimary
                  className="branchSearchButton"
                  onClick={getActivePlaces}
                  stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "padding":"0px 30px"}'
                >
                  <ArrowForwardIcon className="goIcon" />
                </ButtonPrimary>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item xs={12} md={10}
          style={{
            textAlign: "center",
            padding: "4% 0px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Grid container item xs={12} justifyContent="center">
            <Typography
              className="mainHeading"
              variant="h4"
            >
              Mariner Finance Branch Near You!
            </Typography>
            <p className="mainParagraph">
            Mariner Finance, serving communities since 1927, operates 
            over 480 branches in twenty-seven states. 
            Find a branch in your neighborhood and explore personal loans near you.
             Our experienced team members are ready to assist with your financial needs.
            </p>
          </Grid>
          <Grid container item xs={12} justifyContent="center">
            <Typography
              className="mainParagraph"
              style={{
                margin: "15px 0px 15px 0px",
                fontSize: "0.938rem",
                fontWeight: "400",
              }}
              variant="h6"
            >
              To find a branch near you select your state below
            </Typography>
            <h5 className="mainSubHeading">
            Mariner Finance States
            </h5>
          </Grid>
          <Grid
            container
            className={
              loading ? classes.loadingOnWithoutBlur : classes.loadingOff
            }
          >
            {MFStates.map((item, index) => {
              return (
                <Grid
                  key={index}
                  style={{ padding: "0px 15px 15px 15px", textAlign:"left", fontSize:"1.125rem", color:"#214476" }}
                  item
                  xs={6}
                  sm={3}
                  md={2}
                  xl={2}
                >
                  <p
                    // to={"/login"}
                    state={{ item }}
                    className="nav_link stateLinks"
                    onClick={MFButtonClick}
                  >
                    {item}
                  </p>
                </Grid>
              );
            })}
          </Grid>
          <Grid>

          <Typography className="mainHeading">
            Apply Online For a Personal Loan
          </Typography>
          <p className="mainParagraph">
            Do you live in one of the 27 states in which we operate and need a 
            personal loan? Can’t reach a branch or prefer to apply online? If so,
            you’re in luck! You can apply online today*. It’s quick, easy, and secure.
          </p>
          <Typography className="mainHeading">
          Need money but don’t know much about personal loans?
          </Typography>

          <p className="mainParagraph">
          You’re not alone. We understand taking out a personal loan may be a big decision 
          so we want you to be as informed as possible. To help you become a more informed 
          customer we put together a whole section to <a href="https://www.marinerfinance.com/blog/?s=personal+loans+" className="stateLinks">educate you on making a personal loan decision.</a>
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
