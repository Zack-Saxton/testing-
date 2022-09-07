import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PhoneIcon from "@mui/icons-material/Phone";
import SearchIcon from "@mui/icons-material/Search";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import PlacesAutocomplete from "react-places-autocomplete";
import { NavLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { howManyBranchesforBranchLocatorPages, BrnachLocatorURLs, VirtualBranch } from "../../../assets/data/marinerBusinesStates";
import BranchImageMobile from "../../../assets/images/Branch_Locator_Mobile_Image.png";
import BranchImageWeb from "../../../assets/images/Branch_Locator_Web_Image.jpg";
import TitleImage from "../../../assets/images/Favicon.png";
import BranchDayTiming, { convertDistanceUnit, mapInformationBranchLocator } from "../../Controllers/BranchDayTiming";
import BranchLocatorController from "../../Controllers/BranchLocatorController";
import { ButtonPrimary, ButtonSecondary } from "../../FormsUI";
import { useStylesConsumer } from "../../Layout/ConsumerFooterDialog/Style";
import ErrorLogger from "../../lib/ErrorLogger";
import { useStylesMyBranch } from "../BranchLocator/Style";
import CustomerRatings from "../MyBranch/CustomerRatings";
import Map from "./BranchLocatorMap";
import globalMessages from "../../../assets/data/globalMessages.json";

export default function StatePage() {
  const classes = useStylesMyBranch();
  const location = useLocation();
  let stateNamefromUrl = location?.pathname?.split('/');
  const name = location?.state?.value ?? formatString(stateNamefromUrl[ 2 ]);
  const directionsClass = useStylesConsumer();
  const refMapSection = useRef();
  const refSearch1 = useRef();
  const refSearch2 = useRef();

  const [ directionModal, setDirectionModal ] = useState(() => false);
  const [ branchList, setBranchList ] = useState();
  const [ branchAddress, setBranchAddress ] = useState(() => null);
  const [ googleMap, setGoogleMap ] = useState([]);
  const [ currentLocation, setCurrentLocation ] = useState();
  const [ loading, setLoading ] = useState(() => false);
  const [ zoomDepth, setZoomDepth ] = useState();
  const [ address1, setAddress1 ] = useState(() => "");
  const [ address2, setAddress2 ] = useState(() => "");
  const [ branchDistance, setBranchDistance ] = useState(() => Math.abs(parseInt(howManyBranchesforBranchLocatorPages?.stateBranchDistanceinMiles, 10)));
  const [ stateLongName, setStateLongName ] = useState();
  const [ stateShortName, setStateShortName ] = useState();
  const [ stateSearchFlag, setStateSearchFlag ] = useState(() => location?.state?.flag ?? false);

  //API call
  const getBranchLists = async (search_text) => {
    try {
      setLoading(true);
      let result = await BranchLocatorController(search_text, howManyBranchesforBranchLocatorPages.StatePage, stateSearchFlag);
      if ( result.status == 400 || VirtualBranch.includes(result?.data?.branchData[0]?.BranchNumber)) {
        if (!toast.isActive("closeToast")) {
          toast.error(globalMessages.No_Branch_in_Area, { toastId: "closeToast" });
        }
      } else {
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
      if (List) {
        setGoogleMap(await mapInformationBranchLocator(List));
      }
    } catch (error) {
      ErrorLogger(" Error from listForMapView", error);
    }
  };
  const apiGetBranchList = async (value) => {
    try {
      let result = await getBranchLists(value);
      for (let ele in result) {
        let BranchTime = await findBranchTimings(result[ ele ]);
        result[ ele ] = Object.assign(result[ ele ], { BranchTime: BranchTime });
        if (result[ele].BranchName.toLowerCase() === 'lees summit') result[ele] = Object.assign(result[ele], { BranchName: `Lee's Summit` }, { Address: `1171 NE Rice Road, Lee's Summit, MO 64086` }); 
      }
      setBranchList(result);
      setLoading(false);
      listForMapView(result);
    } catch (error) {
      ErrorLogger(" Error from apiGetBranchList ", error);
    }
  };
  const clearSearchText = () => {
    setAddress1("");
    setAddress2("");
  };
  const getActivePlaces = () => {
    let searchText = refSearch1?.current?.value.trim().length ? refSearch1?.current?.value.trim() : refSearch2?.current?.value.trim();

    setBranchDistance(howManyBranchesforBranchLocatorPages.stateBranchDistanceinMiles);
    apiGetBranchList(searchText);
    refMapSection.current.scrollIntoView({ behavior: 'smooth' });
    clearSearchText();
  };
  // -------- To Display Dialog to get Directions of Address.......
  const openGetDirectionModal = () => setDirectionModal(true);
  const closeGetDirectionModal = () => {
    setDirectionModal(false);
    setBranchAddress(null);
  };
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
    apiGetBranchList(name);
    setStateSearchFlag(false);
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSelect1 = async (value) => setAddress1(value);
  const handleSelect2 = async (value) => setAddress2(value);

  const ShowFirstandLastBranch = (val) => {
    return (
      <>
        {branchList &&
          <NavLink
            to={`/branch-locator/${ stateLongName.replace(/\s+/, '-').toLocaleLowerCase() }/personal-loans-in-${ val.BranchInformation.BranchName.replace(/[.']/g, "").replace(/\s+/g, '-').toLocaleLowerCase() }-${ stateShortName.toLocaleLowerCase() }`}
            state={{ branch_Details: val.BranchInformation, stateLongNm: stateLongName, stateShortNm: stateShortName }}
            className="blueColorLink"
          >
            <b>{val.BranchInformation.BranchName}</b>
          </NavLink>}
      </>
    )
  }
  //View part
  return (
    <div data-testid="branch-locator-state-page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Personal Loans in {name} | Mariner Finance Branch | Discover More
        </title>
        <link rel="icon" type="image/png" href={TitleImage} sizes="16x16" />
        <link rel="canonical" href={window.location.href} />
        <meta
          name="description"
          content={`Looking for a personal loans in ${ name }?  Mariner Finance branch employees can help. Discover a ${ name } location today.`}
        />
      </Helmet>
      <Grid
        className="greyBackground"
        container
        justifyContent={"center"}
      >
        <Grid className="branchLayoutGrid" container>
          <Grid className="branchImage" item md={7} sm={12} xs={12}>
            <img
              className="mobileImage"
              src={BranchImageMobile}
              alt="MF Banner"
            />
            <img className="webImage" src={BranchImageWeb} alt="MF Banner" />
          </Grid>
          <Grid
            className="greyBackground mobilePadding"
            item
            md={5}
            sm={12}
            xs={12}
          >
            <Breadcrumbs
              className="breadcrumbWrap"
              separator={
                <NavigateNextIcon
                  className="navigateNextIcon"
                />
              }
              aria-label="breadcrumb"
            >
              <Link
                className="breadcrumbLink"
                href="/"
              >
                Home
              </Link>
              <Link
                className="breadcrumbLink"
                onClick={() => window.open(`/branch-locator/`, "_self")}
              >
                Find a branch
              </Link>
              <Link className="breadcrumbLink">Personal Loans In {name}</Link>
            </Breadcrumbs>
            <Grid className="blueBoxWrap">
              <Grid id="findBranchWrapTwo">
                <h4 className={classes.headigText}>
                  Personal Loans in <strong>{name}</strong>
                </h4>
                <Grid id="findBranchGrid">
                  <SearchIcon
                    className="searchIcon"
                  />
                  <PlacesAutocomplete
                    id="addressOne"
                    value={address1}
                    onChange={setAddress1}
                    onSelect={handleSelect1}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading2,
                    }) => (
                      <div className="searchInputWrap">
                        <input
                          id="search1"
                          ref={refSearch1}
                          className="stateSearch"
                          {...getInputProps({
                            placeholder: "Enter city & state or zip code",
                          })}
                          data-testid="search-branch-1"
                        />
                        <div className="serachResult">
                          {loading2 && <div>Loading...</div>}
                          {suggestions.map((suggestion) => {
                            const style = {
                              backgroundColor: suggestion.active
                                ? "#41b6e6"
                                : "#fff",
                            };
                            return (
                              <div
                                key={suggestion.placeId}
                                {...getSuggestionItemProps(suggestion, {
                                  style,
                                })}
                              >
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
              <h4 className="branchLocatorHeadingMain">
                Get one on one support for a personal loan near you
              </h4>
              <Typography className="branchLocatorHeading">
                <span className="branchSmallText"><b>Operating coast-to-coast</b> with physical locations in over half the states</span>
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
        </Grid>
        <Grid className="mapAndListWrap">
          <Grid className="whiteBackgroundGrid">
            <Grid
              className="mapWrap"
              ref={refMapSection}
              container
            >
              <h3 className="mapTopHeading">Branches Near You</h3>
              <Grid
                id="mapGridWrap"
                item
                xs={12}
                sm={12}
                md={6}
                xl={6}
              >
                <Map
                  id="mapBox"
                  googleMap={googleMap}
                  CurrentLocation={currentLocation}
                  Zoom={zoomDepth}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                xl={6}
                className="personalLoanGrid"
              >
                <Grid className="personalLoanText">
                  <h4 className="PesonalLoanHeading">
                    <span>Personal Loans in {name}</span>
                  </h4>
                  <p className="PesonalLoanParagraph">
                    Mariner Finance branches are all over {name}, from {" "}
                    {branchList && <ShowFirstandLastBranch BranchInformation={branchList[ 0 ]} />}
                    {" "} to {" "}
                    {branchList && <ShowFirstandLastBranch BranchInformation={branchList[ branchList.length - 1 ]} />}
                    . Use our interactive map to locate the one closest to
                    you.
                  </p>
                  <h3>We’re here for you.</h3>
                  <p className="PesonalLoanParagraph">
                    Every one of our {name} branches share a common benefit: lending
                    professionals proud of the neighborhoods they live and work in,
                    who are totally focused on solving your personal financial
                    challenges.
                  </p>
                  <p className="PesonalLoanParagraph">
                    For all the reasons to choose Mariner Finance, visit{" "}
                    <Link
                      rel="link"
                      className="Links"
                      href={`${ process.env.REACT_APP_WEBSITE }/why-mariner-finance/`}
                    >
                      Why Us{" "}
                    </Link>
                    .
                  </p>
                </Grid>
              </Grid>

            </Grid>
            <Grid id="greyBackground" container>
              <Grid
                id="getDirectionButton"
                container
                className={classes.gridPadding}
                item
                md={6}
                sm={12}
                xs={12}
              >
                <ButtonPrimary
                  href={branchAddress}
                  id="Continue"
                  onClick={() => {
                    if (refSearch2.current.value) {
                      openGetDirectionModal();
                      setBranchAddress(`${BrnachLocatorURLs.GoogleMapURL}${ refSearch2.current.value }`);
                      setAddress2("");
                    } else if (branchList && branchList[ 0 ]?.Address) {
                      openGetDirectionModal();
                      setBranchAddress(`${BrnachLocatorURLs.GoogleMapURL}${ branchList[ 0 ]?.Address }`);
                    }
                    else {
                      toast.error(`Please enter address in search.`);
                    }
                  }}
                  stylebutton='{"width": "100%", "padding":"0 15px", "fontSize":"0.938rem", "fontWeight":"400", "height":"47px" }'
                >
                  Get Driving Directions To Nearest Location
                </ButtonPrimary>
              </Grid>
              <Grid id="searchBoxBottom" item md={6} sm={12} xs={12}>
                <Grid id="findBranchGrid">
                  <p className="zipLabel">
                    {" Can't find it? Try searching another "}
                  </p>
                  <SearchIcon
                    className="searchIconBottomTwo"
                  />
                  <PlacesAutocomplete
                    id="addressOne"
                    value={address2}
                    onChange={setAddress2}
                    onSelect={handleSelect2}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading2,
                    }) => (
                      <div className="searchInputWrap">
                        <input
                          id="search2"
                          ref={refSearch2}
                          className="branchSearchTwo"
                          {...getInputProps({
                            placeholder: "Enter city & state or zip code",
                          })}
                          data-testid="search-branch-2"
                        />
                        <div className="serachResult">
                          {loading2 && <div>Loading...</div>}
                          {suggestions.map((suggestion) => {
                            const style = {
                              backgroundColor: suggestion.active
                                ? "#41b6e6"
                                : "#fff",
                            };
                            return (
                              <div
                                key={suggestion.placeId}
                                {...getSuggestionItemProps(suggestion, {
                                  style,
                                })}
                              >
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

            <Grid className="findBranchWrap" item xs={12} sm={12} >
              {loading ? (
                <div align="center">
                  <CircularProgress />{" "}
                </div>
              ) : (
                <Grid
                  id="branchLists"
                >
                  <Grid container className="addressList">
                    {branchList ? (
                      branchList.map((item, index) => {
                        if (Number(item?.distance.replace(' mi', '')) <= howManyBranchesforBranchLocatorPages.stateBranchDistanceinMiles) {
                          return (
                            <Grid key={index} className="locationInfo" item lg={4} md={4} sm={6} xs={12}>
                              <NavLink
                                to={`/branch-locator/${ stateLongName.replace(/\s+/, '-').toLocaleLowerCase() }/personal-loans-in-${ item?.BranchName.replace(/[.']/g, "").replace(/\s+/g, '-').toLocaleLowerCase() }-${ stateShortName.toLocaleLowerCase() }`}
                                state={{ branch_Details: item, stateLongNm: stateLongName, stateShortNm: stateShortName }}
                                className="nav_link"
                              >
                                <b>
                                  <h4 className={classes.h4tag}>
                                    {item?.BranchName} Branch
                                  </h4>
                                </b>
                                <ChevronRightIcon />
                              </NavLink>
                              <p className={classes.ptag}>
                                {convertDistanceUnit(item.distance)} away |{" "}
                                {item?.BranchTime?.Value1}{" "}
                                {item?.BranchTime?.Value2}
                              </p>
                              <p
                                className={classes.addressFont}
                                id={item?.id}
                              >
                                {item?.Address}
                              </p>
                              <p className={classes.phoneNumber}>
                                <PhoneIcon />
                                <a
                                  className="blueColorLink"
                                  href={"tel:+1" + item?.PhoneNumber}
                                >
                                  {" "}
                                  {item?.PhoneNumber}
                                </a>
                              </p>
                              <ButtonSecondary
                                onClick={() => {
                                  setBranchAddress(`${BrnachLocatorURLs.GoogleMapURL}${item.Address}`);
                                  openGetDirectionModal();
                                }}
                                stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
                              >
                                Get Directions
                              </ButtonSecondary>
                            </Grid>
                          );
                        }
                      })
                    ) : (
                      <p> No Branch found.</p>
                    )}
                    <Dialog
                      id="directionModal"
                      open={directionModal}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      classes={{ paper: directionsClass.consumerDialog }}
                    >
                      <div
                        id="closeBtn"
                        className={directionsClass.buttonClose}
                      >
                        <IconButton
                          aria-label="close"
                          onClick={closeGetDirectionModal}
                          className={directionsClass.closeButton}
                        >
                          <CloseIcon />
                        </IconButton>
                      </div>
                      <h2
                        id="consumerDialogHeading"
                        className={directionsClass.consumerDialogHeading}
                      >
                          {globalMessages.LeaveMFWebsite}
                      </h2>
                      <div>
                        <p className={directionsClass.consumerParagaraph}>
                          Mariner Finance provides this link for your
                          convenience and is not responsible for and makes no
                          claims or representations regarding the content, terms
                          of use, or privacy policies of third party websites.
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
                          href={branchAddress}
                          onClick={closeGetDirectionModal}
                          id="Continue"
                          stylebutton='{"float": "" }'
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
        </Grid>
        <Grid className="customerRatingsWrap">
          <CustomerRatings />
        </Grid>
      </Grid>
    </div>
  );
}
const formatString = (str) => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}