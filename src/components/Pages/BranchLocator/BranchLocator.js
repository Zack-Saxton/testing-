import { makeStyles } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CloseIcon from "@material-ui/icons/Close";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import PhoneIcon from "@material-ui/icons/Phone";
import SearchIcon from "@material-ui/icons/Search";
import { useLoadScript } from "@react-google-maps/api";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import PlacesAutocomplete from "react-places-autocomplete";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MFStates, MFStateShort } from "../../../assets/data/marinerBusinesStates";
import BranchImageMobile from "../../../assets/images/Branch_Locator_Mobile_Image.png";
import BranchImageWeb from "../../../assets/images/Branch_Locator_Web_Image.jpg";
import TitleImage from "../../../assets/images/Favicon.png";
import BranchDayTiming, { mapInformationBranchLocator } from "../../Controllers/BranchDayTiming";
import BranchLocatorController from "../../Controllers/BranchLocatorController";
import { ButtonPrimary, ButtonSecondary } from "../../FormsUI";
import { useStylesConsumer } from "../../Layout/ConsumerFooterDialog/Style";
import ErrorLogger from "../../lib/ErrorLogger";
import Map from "../BranchLocator/BranchLocatorMap";
import { useStylesMyBranch } from "../BranchLocator/Style";
import CustomerRatings from "../MyBranch/CustomerRatings";
import "./BranchLocator.css";

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
  //Material UI css class
  const classes = useStylesMyBranch();
  const getDirectionsClass = useStylesConsumer();
  const [ getDirectionModal, setgetDirectionModal ] = useState(false);
  const [ getBranchList, setBranchList ] = useState();
  const [ getBranchAddress, setBranchAddress ] = useState(null);
  const [ getMap, setMap ] = useState([]);
  const [ getCurrentLocation, setCurrentLocation ] = useState();
  const [ loading, setLoading ] = useState(false);
  const [ zoomDepth, setZoomDepth ] = useState(10);
  const clessesforptag = useStyles();
  const navigate = useNavigate();
  const [ address1, setAddress1 ] = React.useState("");
  const [ address2, setAddress2 ] = React.useState("");
  const [ showMapListSearch2DirectionButton, setshowMapListSearch2DirectionButton ] = useState(false);
  const [ libraries ] = useState([ 'places' ]);
  let params = useParams();
  const mapSection = useRef();
  //API call
  const getBranchLists = async (search_text) => {
    try {
      setLoading(true);
      let result = await BranchLocatorController(search_text);
      if ((result.status === 400) || (result.data.branchData[0].BranchNumber === "0001") || (result.data.branchData[0].BranchNumber === "1022")) {
        toast.error(" No branches within that area. Please enter a valid city and state.");
      } else {
        setCurrentLocation(result?.data?.searchLocation);
        setZoomDepth(
          (result?.data?.branchData[ 0 ]?.distance).replace(/[^\d]/g, "") / 100
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
    if (document.getElementById('search1').value) {
      setshowMapListSearch2DirectionButton(true);
      apiGetBranchList(document?.getElementById('search1').value);
      clearSearchText();
      mapSection.current.scrollIntoView({ behavior: 'smooth' });
    } else if (document?.getElementById('search2').value) {
      apiGetBranchList(document?.getElementById('search2').value);
      clearSearchText();
    }
  };
  const openGetDirectionModal = () => {
    setgetDirectionModal(true);
  };
  const closeGetDirectionModal = () => {
    setgetDirectionModal(false);
    setBranchAddress(null);
  };

  const MFButtonClick = (event) => {
    params.statename = event.target.innerText;
    apiGetBranchList(params.statename);
    navigate(`/branch-locator/personal-loans-in-${ params.statename }`);
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
  const handleSelect1 = async (value) => {
    setAddress1(value);
  };
  const handleSelect2 = async (value) => {
    setAddress2(value);
  };
  const showDialogforDrivingDirection = (
    <Dialog
      id="getDirectionModal"
      open={ getDirectionModal }
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={ { paper: getDirectionsClass.consumerDialog } }
    >
      <div
        id="closeBtn"
        className={ getDirectionsClass.buttonClose }
      >
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
          Mariner Finance provides this link for your convenience
          and is not responsible for and makes no claims or
          representations regarding the content, terms of use, or
          privacy policies of third party websites.
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
  );

  const stateLinksandStaticText = (
    <Grid
      id="mainContent"
      ref={ mapSection }
      container
      item xs={ 12 } md={ 10 }
    >
      <Grid container item xs={ 12 } justifyContent="center">
        <Typography
          className="mainHeading"
          variant="h4"
        >
          Mariner Finance Branch Near You!
        </Typography>
        <p className="mainParagraph">
          Mariner Finance operates
          over 480 branches in twenty-four states.
          Find a branch in your neighborhood and explore personal loans near you.
          Our experienced team members are ready to assist with your financial needs.
        </p>
      </Grid>
      <Grid container item xs={ 12 } justifyContent="center">
        <Typography
          className="mainParagraph"
          style={ {
            margin: "15px 0px 15px 0px",
            fontSize: "0.938rem",
            fontWeight: "400",
          } }
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
        { MFStates.map((item, index) => {
          return (
            <Grid
              key={ index }
              style={ { padding: "0px 15px 15px 15px", textAlign: "left", fontSize: "1.125rem", color: "#214476" } }
              item
              xs={ 6 }
              sm={ 3 }
              md={ 2 }
              xl={ 2 }
            >
              <p
                // to={"/login"}
                state={ { item } }
                className="nav_link stateLinks"
                onClick={ MFButtonClick }
              >
                { item }
              </p>
            </Grid>
          );
        }) }
      </Grid>
      <Grid>

        <Typography className="mainHeading">
          Apply Online For a Personal Loans
        </Typography>
        <p className="mainParagraph">
          Do you live in one of the 27 states in which we operate and need a
          personal loans? Can’t reach a branch or prefer to apply online? If so,
          you’re in luck! You can apply online today*. It’s quick, easy, and secure.
        </p>
        <Typography className="mainHeading">
          Need money but don’t know much about personal loans?
        </Typography>
        <p className="mainParagraph">
          You’re not alone. We understand taking out a personal loans may be a big decision
          so we want you to be as informed as possible. To help you become a more informed
          customer we put together a whole section to <a href="https://www.marinerfinance.com/blog/?s=personal+loans+" className="stateLinks">educate you on making a personal loans decision.</a>
        </p>
      </Grid>
    </Grid>
  );

  const search2andDirectionfromSearch2 = (
    <Grid id="getDirectionWrap" className={ clessesforptag.gridMargin } container>
      <Grid className={ clessesforptag.gridPadding } item xs={12} s={12} md={ 6 }>
        <ButtonPrimary
          href={ getBranchAddress }
          id="Continue"
          onClick={ () => {
            if (document.getElementById('search2').value) {
              openGetDirectionModal();
              setBranchAddress(`https://www.google.com/maps/search/${ document.getElementById('search2').value }`);
              setAddress2("");
            } else {
              toast.error(' Please provide address.');
            }
          } }
          stylebutton='{"width": "100%", "padding":"0 15px", "fontSize":"0.938rem", "fontWeight":"400", "height":"47px" }'
          target="_blank"
        >
          Get Driving Directions To Nearest Location
        </ButtonPrimary>
      </Grid>
      <Grid id="getDirectionSearch" item md={ 6 } className={ classes.blueBackground }>
        <Grid id="findBranchGridBottom">
          <p className="zipLabel">
            { "Can't find it? Try searching another" }
          </p>
          <SearchIcon
            className="searchIconBottom"
            style={ { color: "white" } }
          />
         <PlacesAutocomplete
                value={ address2 }
                onChange={ setAddress2 }
                onSelect={ handleSelect2 }
                style={ { width: '50%' } }
              >
                { ({ getInputProps, suggestions, getSuggestionItemProps, loading2 }) => (
                  <div className="searchInputWrap">
                    <input id="search2" className="branchSearchTwo" { ...getInputProps({ placeholder: 'Enter city & state or zip code' }) } />
                    <div className="serachResult">
                      { loading2 && <div>Loading...</div> }
                      { suggestions.map(suggestion => {
                        const style = {
                          backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                        };
                        return (
                          <div key={ Math.random() * 1000 }{ ...getSuggestionItemProps(suggestion, {
                            style
                          }) }>
                            <span>{ suggestion.description }</span>
                          </div>
                        );
                      }) }
                    </div>
                  </div>
                ) }
              </PlacesAutocomplete>
          <ButtonPrimary
            className="branchSearchButton"
            onClick={ getActivePlaces }
            stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "padding":"0px 30px"}'
          >
            <ArrowForwardIcon className="goIcon" />
          </ButtonPrimary>
        </Grid>
      </Grid>
    </Grid>
  );

  const displayBranchListinDropDown = (
    <Grid className="findBranchWrap" item xs={ 12 } sm={ 12 } md={ 6 } xl={ 6 }>
      { loading ? (
        <div align="center">
          <CircularProgress />{ " " }
        </div>
      ) : (
        <Grid
          id="branchLists"
          style={ { width: "100%", height: "450px", overflowY: "scroll" } }
        >
          <Grid
            className="addressList"
          >
            { getBranchList ? (
              getBranchList.map((item, index) => {
                if (Number(item?.distance.replace(' mi', '')) <= 60) {
                return (
                  <Grid key={ index }  className="locationInfo">
                    <NavLink
                      to={ `/branchLocator/[${ MFStates[ MFStateShort.indexOf(item?.Address.substring(item?.Address.length - 8, item?.Address.length).substring(0, 2)) ] }]-personal-loans-in-${ item?.BranchName }-${ item?.Address?.substring(item?.Address.length - 8, item?.Address.length).substring(0, 2) }` }
                      state={ { Branch_Details: item } }
                      className="nav_link"
                    >
                      <b>
                        <h4 className={ clessesforptag.h4tag }>
                          { item?.BranchName } Branch
                        </h4>
                      </b>
                      <ChevronRightIcon />
                    </NavLink>
                    <p className={ clessesforptag.ptag }>
                      { item?.distance }les away | { item?.BranchTime?.Value1 }{ " " }
                      { item?.BranchTime?.Value2 }
                    </p>
                    <p
                      className={ clessesforptag.addressFont }
                      id={ item?.id }
                    >
                      { item?.Address }
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
                    <ButtonSecondary
                      onClick={ () => {
                        setBranchAddress(
                          "https://www.google.com/maps/search/" +
                          item?.Address
                        );
                        openGetDirectionModal();
                      } }
                      stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
                    >
                      Get Directions
                    </ButtonSecondary>
                  </Grid>
                )}
              })
            ) : (
              <p> No Branch found.</p>
            ) }
            { showDialogforDrivingDirection }
          </Grid>
        </Grid>
      ) }
    </Grid>
  );

  const search1andgetList = (
    <Grid id="findBranchWrapTwo" className={ classes.blueBackground }>
      <h4 className={ classes.headigText }>Find a <span>Branch Near You!</span></h4>
      <Grid id="findBranchGrid">
        <SearchIcon className="searchIcon" style={ { color: "white" } } />
        <PlacesAutocomplete
          id="address1"
          value={ address1 }
          onChange={ setAddress1 }
          onSelect={ handleSelect1 }
          style={ { width: '50%' } }
        >
          { ({ getInputProps, suggestions, getSuggestionItemProps, loading2 }) => (
            <div className="searchInputWrap">
              <input id="search1" className="stateSearch" { ...getInputProps({ placeholder: 'Enter city & state or zip code' }) } />
              <div className="serachResult">
                { loading2 && <div>Loading...</div> }
                { React.Children.toArray(suggestions.map(suggestion => {
                  const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                  };
                  return (
                    <div key={ Math.random() * 1000 } { ...getSuggestionItemProps(suggestion, {
                      style
                    }) }>
                      <span style={ { padding: "10px 0px" } }>{ suggestion.description }</span>
                    </div>
                  );
                })) }
              </div>
            </div>
          ) }
        </PlacesAutocomplete>
        <ButtonPrimary
          className="branchSearchButton"
          onClick={ getActivePlaces }
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
      separator={ <NavigateNextIcon className="navigateNextIcon" /> }
      aria-label="breadcrumb"
    >
      <Link
        className="breadcrumbLink"
        onClick={ () => window.open(`/`, "_self") }
      >
        Home
      </Link>
      <Link className="breadcrumbLink">Branch Locator</Link>
    </Breadcrumbs>
  );
  const BreadCrumsAndSearch1AndText = (
    <Grid className="branchLayoutGrid" container>
      <Grid className="branchImage" item md={ 7 } sm={ 12 } xs={ 12 }>
        <img className="mobileImage" src={ BranchImageMobile } alt="MF Banner" />
        <img className="webImage" src={ BranchImageWeb } alt="MF Banner" />
      </Grid>

      <Grid className="greyBackground mobilePadding" style={ { padding: "24px 0px" } } item md={ 5 } sm={ 12 } xs={ 12 }>
        { BreadCrumsDisplay }
        <Grid className="blueBoxWrap">
        { search1andgetList }
        <h4 className="branchLocatorHeadingMain">
          Get one on one support for a personal loans near you
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
    </Grid>
  );

  const displayMap = (
    <Grid id="mapGridWrap" item xs={ 12 } sm={ 12 } md={ 6 } xl={ 6 }>
        <Map
          id="mapBox"
          getMap={ getMap }
          CurrentLocation={ getCurrentLocation }
          Zoom={ zoomDepth }
        />
    </Grid>
  );
  const MapBranchListandSearch2Buttons = (
    <Grid
      style={ { padding: "4% 0px"} }
      container
      id="mapAndBranchList"
    >
      <Grid container>
        <h3 ref={ mapSection } className="mapTopHeading">Branches Near You</h3>
      </Grid>
      { displayMap }
      { displayBranchListinDropDown }
      { search2andDirectionfromSearch2 }
    </Grid>
  );
  //View part
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mariner Finance States | Personal Loans |Discover More</title>
        <link rel="icon" type="image/png" href={ TitleImage } sizes="16x16" />
        <meta name="description" content="Looking for a personal loans?  Discover which states Mariner Finance serves.  Visit a branch in one of our many states today." />
      </Helmet>
      <Grid
        className="greyBackground"
        container
        justifyContent={ "center" }
      >
        { BreadCrumsAndSearch1AndText }
        <Grid className="mapAndBranchListWrap">

        { showMapListSearch2DirectionButton && MapBranchListandSearch2Buttons }
        </Grid>
        <Grid className="mainContentWrap">
          { stateLinksandStaticText }
        </Grid>
        <Grid className="customerRatingsWrap">
          <CustomerRatings />
        </Grid>
      </Grid>
    </div>
  );
}
BranchLocator.propTypes = {
  CurrentLocation: PropTypes.object,
  Zoom: PropTypes.object,
  getMap: PropTypes.object,
};