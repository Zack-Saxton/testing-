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
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import PlacesAutocomplete from "react-places-autocomplete";
import { NavLink, useParams } from "react-router-dom";
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
import { useStylesMyBranch } from "../BranchLocator/Style";
import CustomerRatings from "../MyBranch/CustomerRatings";
import Map from "./BranchLocatorMap";
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
    padding: "0px 30px"
  },
});

export default function StatePage() {

  //Material UI css class
  const classes = useStylesMyBranch();
  const getDirectionsClass = useStylesConsumer();
  const [ getDirectionModal, setgetDirectionModal ] = useState(false);
  const [ getBranchList, setBranchList ] = useState();
  const [ getBranchAddress, setBranchAddress ] = useState(null);
  const [ getMap, setMap ] = useState([]);
  const [ getCurrentLocation, setCurrentLocation ] = useState();
  const [ loading, setLoading ] = useState(false);
  const [ zoomDepth, setZoomDepth ] = useState();
  const params = useParams();
  const Name = (params.statename).substring(18);
  const clessesforptag = useStyles();
  const [ address1, setAddress1 ] = React.useState("");
  const [ address2, setAddress2 ] = React.useState("");
  const mapSection = useRef();
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
    if (address1 !== "") {
      apiGetBranchList(address1);
      clearSearchText();
      mapSection.current.scrollIntoView({ behavior: 'smooth' });
    } else if (address2 !== "") {
      apiGetBranchList(address2);
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
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_SECKey,
    libraries: [ "places" ],
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
    apiGetBranchList(Name);
    window.scrollTo(0, 0);
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSelect1 = async (value) => {
    setAddress1(value);
  };
  const handleSelect2 = async (value) => {
    setAddress2(value);
  };
  //View part
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Personal Loans in { Name } | Mariner Finance Branch | Discover More</title>
        <link rel="icon" type="image/png" href={ TitleImage } sizes="16x16" />
        <meta name="description" content={ `Looking for a personal loans in ${ Name }?  Mariner Finance branch employees can help. Discover a ${ Name } location today.` } />
      </Helmet>
      <Grid
        container
        justifyContent={ "center" }
        style={ { backgroundColor: "#f9f9f9" } }
      >
        <Grid className="branchLayoutGrid" container style={ { width: "100%" } }>
          <Grid className="branchImage" item md={ 7 } sm={ 12 } xs={ 12 }>
            <img className="mobileImage" src={ BranchImageMobile } alt="MF Banner" />
            <img className="webImage" src={ BranchImageWeb } alt="MF Banner" />
          </Grid>
          <Grid className="greyBackground" style={ { padding: "24px 0px" } } item md={ 5 } sm={ 12 } xs={ 12 }>
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
                Branch Locator
              </Link>
              <Link
                className="breadcrumbLink"
              >
                Personal Loans In { Name }
              </Link>
            </Breadcrumbs>
            <Grid className="blueBoxWrap">
            <Grid id="findBranchWrapTwo" >
              <h4 className={ classes.headigText }>Personal Loans in <strong>{ Name }</strong></h4>
              <Grid id="findBranchGrid">
                <SearchIcon className="searchIcon" style={ { color: "white" } } />
                <PlacesAutocomplete
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
                        { suggestions.map(suggestion => {
                          const style = {
                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                          };
                          return (
                            <div key={ Math.random() * 1000 } { ...getSuggestionItemProps(suggestion, {
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
                Star Rating based on over 10,000 verified reviews
              </span>
            </Typography>

          </Grid>
          </Grid>
        </Grid>
        <Grid className="mapAndListWrap">
        <Grid
          className="mapWrap"
          ref={ mapSection }
          style={ { padding: "4% 0px 4% 0px", backgroundColor: "#f6f6f6" } }
          container
        >
          <Grid
            style={ { padding: "0px" } }
            id="mapGridWrap"
            item
            xs={ 12 }
            sm={ 12 }
            md={ 6 }
            xl={ 6 }
          >
            { isLoaded ? (
              <Map
                id="mapBox"
                getMap={ getMap }
                CurrentLocation={ getCurrentLocation }
                Zoom={ zoomDepth }
              />
            ) : null }
          </Grid>
          <Grid className="findBranchWrap" item xs={ 12 } sm={ 12 } md={ 6 } xl={ 6 }>
            { loading ? (
              <div align="center">
                <CircularProgress />{ " " }
              </div>
            ) : (
              <Grid
                id="branchLists"
                style={ { width: "100%", height: "542px", overflowY: "scroll" } }
              >
                <Grid className="addressList" >
                  { getBranchList ? (
                    getBranchList.map((item, index) => {
                      return (
                        <Grid key={ index } className="locationInfo">
                          <NavLink
                            to={ `/branchLocator/[${ MFStates[ MFStateShort.indexOf(item.Address.substring(item.Address.length - 8, item.Address.length).substring(0, 2)) ] }]-personal-loans-in-${ item.BranchName }-${ item.Address.substring(item.Address.length - 8, item.Address.length).substring(0, 2) }` }
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
                            { item.distance }les away | { item?.BranchTime?.Value1 }{ " " }
                            { item?.BranchTime?.Value2 }
                          </p>
                          <p
                            className={ clessesforptag.addressFont }
                            id={ item.id }
                          >
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
                                "https://www.google.com/maps/search/" +
                                item.Address
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
                </Grid>
              </Grid>
            ) }
          </Grid>
        </Grid>
        <Grid id="greyBackground"  container>
          <Grid id="getDirectionButton" container className={ clessesforptag.gridPadding } item md={ 6 } sm={ 12 } xs={ 12 }>
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
          <Grid id="searchBoxBottom" item md={ 6 } sm={ 12 } xs={ 12 }>
            <Grid id="findBranchGrid">
              <p className="zipLabel">
                { " Can't find it? Try searching another " }
              </p>
              <SearchIcon
                className="searchIconBottomTwo"
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
        </Grid>
        <Grid
          // className="greyBackground"
          style={ {
            backgroundColor: "#fff",
            width: "100%",
            padding: "4% 2rem 4% 1rem",
          } }
        >
          <Grid className="personalLoanText">
            <h4 className="PesonalLoanHeading">
              <span>Personal Loans in { Name }</span>
            </h4>
            <p>Mariner Finance branches are all over { Name }, from Salisbury to Frederick. Use our interactive map to locate the one closest to you.</p>
            <h3>
              We’re here for you.
            </h3>

            <p className="PesonalLoanParagraph">
              Every one of our { Name } branches share a common benefit: lending professionals 
              proud of the neighborhoods they live and work in, 
              who are totally focused on solving your personal financial challenges.
            </p>
            <p className="PesonalLoanParagraph">
            For all the reasons to choose Mariner Finance, visit <Link target="_blank" rel="link" className="Links" to="https://www.marinerfinance.com/why-mariner-finance/">Why Us </Link>.
            </p>
          </Grid>
        </Grid>
        <Grid className="customerRatingsWrap">
        <CustomerRatings />
        </Grid>
      </Grid>
    </div>
  );
}
