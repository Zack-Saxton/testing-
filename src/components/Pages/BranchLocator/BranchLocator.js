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
import PropTypes from "prop-types";
import React, { Suspense, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import PlacesAutocomplete from "react-places-autocomplete";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { businesStates, howManyBranchesforBranchLocatorPages, BrnachLocatorURLs, VirtualBranch } from "../../../assets/data/marinerBusinesStates";
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
import "./BranchLocator.css";
import globalMessages from "../../../assets/data/globalMessages.json";
const Map = React.lazy(() => import("../BranchLocator/BranchLocatorMap"));

export default function BranchLocator() {
  //Material UI css class
  const classes = useStylesMyBranch();
  const directionsClass = useStylesConsumer();
  const params = useParams();
  const refMapSection = useRef();
  const refSearch1 = useRef();
  const refSearch2 = useRef();
  const navigate = useNavigate();

  const [ directionModal, setDirectionModal ] = useState(() => false);
  const [ branchList, setBranchList ] = useState();
  const [ branchAddress, setBranchAddress ] = useState(() => null);
  const [ googleMap, setGoogleMap ] = useState([]);
  const [ currentLocation, setCurrentLocation ] = useState();
  const [ loading, setLoading ] = useState(() => false);
  const [ zoomDepth, setZoomDepth ] = useState(() => 10);
  const [ address1, setAddress1 ] = useState(() => "");
  const [ address2, setAddress2 ] = useState(() => "");
  const [ showMapListSearch2DirectionButton, setShowMapListSearch2DirectionButton ] = useState(() => false);
  const [ stateLongName, setStateLongName ] = useState();
  const [ stateShortName, setStateShortName ] = useState();

  //API call
  const getBranchLists = async (search_text) => {
    try {
      setLoading(true);
      let result = await BranchLocatorController(search_text, howManyBranchesforBranchLocatorPages.BranchLocator, false);
      if ((result?.status === 400) || VirtualBranch.includes(result?.data?.branchData[ 0 ]?.BranchNumber) ) {
        if (!toast.isActive("closeToast")) {
          toast.error(globalMessages.No_Branch_in_Area, { toastId: "closeToast" });
        }
      } else {
        setCurrentLocation(result?.data?.searchLocation);
        setZoomDepth(
          (result?.data?.branchData[ 0 ]?.distance).replace(/[^\d]/g, "") / 100
        );
        setStateLongName(result?.data?.stateLongName);
        setStateShortName(result?.data?.stateShortName);
        return result?.data?.branchData;
      }
    } catch (error) {
      ErrorLogger(" Error occured, can't retrive Branch list. ", error);
    }
  };
  const listForMapView = async (List) => {
    try {
      if (List) setGoogleMap(await mapInformationBranchLocator(List));
    } catch (error) {
      ErrorLogger(' Error from listForMapView', error);
    }
  };
  const apiGetBranchList = async (value) => {
    try {
      let result = await getBranchLists(value);
      for (let ele in result) {
        let BranchTime = await findBranchTimings(result[ ele ]);
        result[ ele ] = Object.assign(result[ ele ], { BranchTime: BranchTime });
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
    let searchText = refSearch1?.current?.value.trim().length ? refSearch1?.current?.value.trim() : refSearch2?.current?.value.trim()
    setShowMapListSearch2DirectionButton(true);
    apiGetBranchList(searchText);
    refMapSection.current.scrollIntoView({ behavior: 'smooth' });
    clearSearchText();
  };
  const openGetDirectionModal = () => setDirectionModal(true);
  const closeGetDirectionModal = () => {
    setDirectionModal(false);
    setBranchAddress(null);
  };
  const MFButtonClick = (event) => {
    params.statename = event.target.innerText;
    navigate(`/branch-locator/${ params.statename.replace(/\s+/g, '-').toLowerCase() }/`, { state: { value: params.statename, flag: true } });
  };

  const findBranchTimings = async (value) => {
    try {
      if (value) return await BranchDayTiming(value);
    } catch (error) {
      ErrorLogger(" Error from findBranchTimings", error);
    }
  };
  const handleSelect1 = async (value) => setAddress1(value);
  const handleSelect2 = async (value) => setAddress2(value);
  const showDialogforDrivingDirection = (
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
          href={branchAddress}
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

  const stateLinksandStaticText = (
    <Grid
      id="mainContent"
      ref={refMapSection}
      container
      item xs={12} md={10}
    >
      <Grid container item xs={12} justifyContent="center">
        <Typography
          className="mainParagraph findBranchNear"
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
        {businesStates.map((item, index) => {
          return (
            <Grid
              key={index}
              className="branchList"
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
    </Grid>
  );

  const staticText = (
    <Grid>

      <Typography className="mainHeading">
        <b>Apply Online</b> For a Personal Loan
      </Typography>
      <p className="mainParagraph">
        Do you live in one of the states in which we operate and need a personal loan? Can’t reach a branch or prefer to apply online? If so, you’re in luck! You can apply online today*. It’s quick, easy, and secure.
      </p>
      <Typography className="mainHeading">
        <b>Need money</b> but don’t know much about personal loans?
      </Typography>
      <p className="mainParagraph">
        You’re not alone. We understand taking out a personal loan may be a big decision
        so we want you to be as informed as possible. To help you become a more informed
        customer we put together a whole section to <a href={`${ process.env.REACT_APP_WEBSITE }/category/blogs/personal-loan/`} className="stateLinks">educate you on making a personal loan decision.</a>
      </p>
    </Grid>
  );
  const search2andDirectionfromSearch2 = (
    <Grid id="getDirectionWrap" className={classes.gridMargin} container>
      <Grid className={classes.gridPadding} item xs={12} s={12} md={6}>
        <ButtonPrimary
          href={branchAddress}
          id="getDrivingButton"
          onClick={() => {
            if (refSearch2.current.value) {
              openGetDirectionModal();
              setBranchAddress(`${BrnachLocatorURLs.GoogleMapURL}${ refSearch2.current.value }`);
              setAddress2("");
            } else if (branchList && branchList.length && branchList[ 0 ]?.Address) {
              openGetDirectionModal();
              setBranchAddress(`${BrnachLocatorURLs.GoogleMapURL}${ branchList[ 0 ]?.Address }`);
            }
            else {
              toast.error(`Please enter address in search.`);
            }
          }}
          stylebutton='{"width": "" }'
          target="_blank"
        >
          Get Driving Directions To Nearest Location
        </ButtonPrimary>
      </Grid>
      <Grid id="getDirectionSearch" item md={6} className={classes.blueBackground}>
        <Grid id="findBranchGridBottom">
          <p className="zipLabel">
            {"Can't find it? Try searching another"}
          </p>
          <SearchIcon
            className="searchIconBottom"
          />
          <PlacesAutocomplete
            id="addressOne"
            value={address2}
            onChange={setAddress2}
            onSelect={handleSelect2}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading2 }) => (
              <div className="searchInputWrap">
                <input id="search2" ref={refSearch2} className="branchSearchTwo" {...getInputProps({ placeholder: 'Enter city & state or zip code' })} />
                <div className="serachResult">
                  {loading2 && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                    };
                    return (
                      <div key={suggestion.placeId}{...getSuggestionItemProps(suggestion, {
                        style
                      })}>
                        <span data-testid="suggestion">{suggestion.description}</span>
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
  );

  const displayBranchListinDropDown = (
    <Grid className="findBranchWrap" >
      {loading ? (
        <div align="center">
          <CircularProgress />{" "}
        </div>
      ) : (
        <Grid
          id="branchLocatorLists"
        >
          <Grid container
            className="branchLocatorAddressList"
          >
            {branchList ? (
              branchList.map((item, index) => {
                if (Number(item?.distance.replace(' mi', '')) <= howManyBranchesforBranchLocatorPages.ShowBranchListWithinMiles) {
                  return (
                    <Grid key={index} className="locationInfo">
                      <NavLink
                        to={`/branch-locator/${ stateLongName.replace(/\s+/, '-').toLocaleLowerCase() }/personal-loans-in-${ item?.BranchName.replace(/[.]/g, "").replace(/\s+/g, '-').toLocaleLowerCase() }-${ stateShortName.toLocaleLowerCase() }`}
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
                        {convertDistanceUnit(item.distance)} away | {item?.BranchTime?.Value1}{" "}
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
            {showDialogforDrivingDirection}
          </Grid>
        </Grid>
      )}
    </Grid>
  );

  const search1andgetList = (
    <Grid id="findBranchWrapTwo" className={classes.blueBackground} data-testid="searchBranchBox">
      <h4 className={classes.headigText}>Find a <span>Branch Near You!</span></h4>
      <Grid id="findBranchGrid">
        <SearchIcon className="searchIcon" />
        <PlacesAutocomplete
          id="addressOne"
          value={address1}
          onChange={setAddress1}
          onSelect={handleSelect1}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading2 }) => (
            <div className="searchInputWrap">
              <input data-testid="stateSearchInput" id="search1" ref={refSearch1} className="stateSearch" {...getInputProps({ placeholder: 'Enter city & state or zip code' })} />
              <div className="serachResult">
                {loading2 && <div>Loading...</div>}
                {React.Children.toArray(suggestions.map(suggestion => {
                  const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                  };
                  return (
                    <div key={suggestion.placeId} {...getSuggestionItemProps(suggestion, {
                      style
                    })}>
                      <span style={{ padding: "10px 0px" }}>{suggestion.description}</span>
                    </div>
                  );
                }))}
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
  );

  const BreadCrumsDisplay = (
    <Breadcrumbs
      className="breadcrumbWrap"
      separator={<NavigateNextIcon className="navigateNextIcon" />}
      aria-label="breadcrumb"
    >
      <Link
        className="breadcrumbLink"
        href="/"
      >
        Home
      </Link>
      <Link className="breadcrumbLink">Find a branch</Link>
    </Breadcrumbs>
  );
  const BreadCrumsAndSearch1AndText = (
    <Grid className="branchLayoutGrid" container>
      <Grid className="branchImage" item md={7} sm={12} xs={12}>
        <img className="mobileImage" src={BranchImageMobile} alt="MF Banner" />
        <img className="webImage" src={BranchImageWeb} alt="MF Banner" />
      </Grid>

      <Grid className="greyBackground mobilePadding" item md={5} sm={12} xs={12}>
        {BreadCrumsDisplay}
        <Grid className="blueBoxWrap">
          {search1andgetList}
          <h4 className="branchLocatorHeadingMain">
            Get one on one support for a personal loan near you
          </h4>

          <Typography className="branchLocatorHeading">
            <span className="branchSmallText"><b className="numberText">Operating coast-to-coast</b>with physical locations in over half the states</span>
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
  );

  const displayMap = (
    <Grid container>
      <Grid id="mapGridWrap" item xs={12} sm={12} md={6} xl={6}>
        <Suspense fallback={<div>Loading...</div>}>
          <Map
            id="mapBox"
            googleMap={googleMap}
            CurrentLocation={currentLocation}
            Zoom={zoomDepth}
          />
        </Suspense>

      </Grid>
      <Grid item xs={12} sm={12} md={6} xl={6} className="personalLoanGrid">
        <Typography
          className="mainHeading"
          variant="h4"
        >
          Mariner Finance Branch Near You!
        </Typography>
        <p className="mainParagraph">
          Mariner Finance, serving communities since 1927, operates
          over 470 branches in twenty-seven states.
          Find a branch in your neighborhood and explore personal loans near you.
          Our experienced team members are ready to assist with your financial needs.
        </p>
      </Grid>
    </Grid>
  );
  const MapBranchListandSearch2Buttons = (
    <Grid
      container
      id="mapAndBranchList"
    >
      <Grid container>
        <h3 ref={refMapSection} className="mapTopHeading">Branches Near You</h3>
      </Grid>
      {displayMap}
      {search2andDirectionfromSearch2}
      {displayBranchListinDropDown}
    </Grid>
  );
  //View part
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mariner Finance States | Personal Loans |Discover More</title>
        <link rel="icon" type="image/png" href={TitleImage} sizes="16x16" />
        <meta name="description" content="Looking for a personal loans?  Discover which states Mariner Finance serves.  Visit a branch in one of our many states today." />
      </Helmet>
      <Grid
        className="greyBackground"
        container
        justifyContent={"center"}
      >
        {BreadCrumsAndSearch1AndText}

        <Grid className="boxDivWrap">
          <Grid className="boxDiv">
            <Grid className="mapAndBranchListWrap">

              {showMapListSearch2DirectionButton && MapBranchListandSearch2Buttons}
            </Grid>
            <Grid className="mainContentWrap">
              {stateLinksandStaticText}
            </Grid>
          </Grid>
          <Grid className="staticTextWrap">
            {staticText}
          </Grid>
          <Grid className="customerRatingsWrap">
            <CustomerRatings />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
BranchLocator.propTypes = {
  CurrentLocation: PropTypes.object,
  Zoom: PropTypes.object,
  googleMap: PropTypes.object,
};