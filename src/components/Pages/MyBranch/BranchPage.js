import Grid from "@material-ui/core/Grid";
import React, { useState, useEffect } from "react";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SearchIcon from '@material-ui/icons/Search';
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
import { useLoadScript } from "@react-google-maps/api"
import Map from "./BranchLocatorMap";
import CircularProgress from '@material-ui/core/CircularProgress';
import { MFStates } from "../../../assets/data/marinerBusinesStates"
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "@material-ui/core/Link";
import BranchImage from "../../../assets/images/Branch.jpg"

export default function StatePage() {
  window.zeHide();
  //Material UI css class
  const classes = useStylesMyBranch();
  const getDirectionsClass = useStylesConsumer();
  const [getDirectionModal, setgetDirectionModal] = useState(false);
  const [getBranchList, setBranchList] = useState();
  const [getBranchAddress, setBranchAddress] = useState();
  const [getMap, setMap] = useState([]);
  const [getCurrentLocation, setCurrentLocation] = useState();
  const [loading, setLoading] = useState(false);
  const [zoomDepth, setZoomDepth] = useState();
  //API call
  const getBranchLists = async (search_text) => {
    try {
      setLoading(true);
      let result = await BranchLocatorController(search_text);
      setCurrentLocation(result?.data?.searchLocation);
      let N = (result?.data?.branchData[0]?.distance).replace(/[^0-9]/g, '');
      switch (N) {
        case (N > 190):
          {
            setZoomDepth(11);
            break;
          }
        case (N > 150):
          {
            setZoomDepth(10);
            break;
          }
        case (N > 100):
          {
            setZoomDepth(9);
            break;
          }
        case (N > 75):
          {
            setZoomDepth(8);
            break;
          }
        case (N > 25):
          {
            setZoomDepth(5);
            break;
          }
        case (N > 15):
          {
            setZoomDepth(3);
            break;
          }
        case (N > 10):
          {
            setZoomDepth(2);
            break;
          }
        default:
          {
            setZoomDepth(1);
            break;
          }
      }

      if (result.status === 400) {
        toast.error(' Check your address and Try again.')
      } else {
        return (result.data.branchData);
      }
    } catch (error) {
      toast.error(' Error from getBranchList ', error)
    }
  }
  const listForMapView = async (List) => {
    if (List) {
      setMap(
        List.map((item) =>
        ({
          id: item.id,
          name: item.Address,
          position: {
            lat: Number(item.latitude),
            lng: Number(item.longitude)
          }
        })
        ))
    }
  }
  const apiGetBranchList = async (value) => {
    try {
      let result = await getBranchLists(value);
      setBranchList(result);
      setLoading(false);
      listForMapView(result);
    } catch (error) {
      ErrorLogger(' Error from apiGetBranchList ', error);
    }
  }
  const getActivePlaces = async () => {
    apiGetBranchList(inputText.value);
  }
  // -------- To Display Dialog to get Directions of Address.......
//   const openGetDirectionModal = () => {
//     setgetDirectionModal(true);
//   }
//   const closeGetDirectionModal = () => {
//     setgetDirectionModal(false);
//   }
//   const MFButtonClick = async (event) => {
//     apiGetBranchList(event.target.innerText);
//   }
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_SECKey
//   });
  useEffect(() => {
    // inputText.value = '21236';
    getActivePlaces();
  }, [])
  //View part
  return (
    <div>
      <Grid
        container
        justifyContent={"center"}
        style={{ backgroundColor: "#f9f9f9"}}
      >
        <Grid container style={{ backgroundColor: "#f9f9f9", width: "100%" }}>
          <Grid className="branchImage" item md={6} sm={12} xs={12}>
            <img src={ BranchImage } alt="MF logo" />
          </Grid>

          <Grid style={{ padding: "2% 4%" }} item md={6} sm={12} xs={12}>
            <Breadcrumbs
              separator={
                <NavigateNextIcon
                  className="navigateNextIcon"
                  style={{ color: "#171717" }}
                />
              }
              style={{
                lineHeight: "30px",
                height: "30px",
                color: "#171717",
                fontSize: "0.75rem",

                // backgroundColor: "#164a9c",
              }}
              aria-label="breadcrumb"
            >
              <Link
                // onClick={handleMenuProfile}
                style={{
                  fontSize: "0.75rem",
                  color: "#171717",
                  textDecoration: "none",
                  // padding: "10px",
                  cursor: "pointer",
                }}
              >
                Home
              </Link>
              <Link
                style={{
                  fontSize: "0.75rem",
                  color: "#171717",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                // onClick={() => closeBankAccountButton()}
              >
                Branch Locator
              </Link>
              <Link
                style={{
                  fontSize: "0.75rem",
                  color: "#171717",
                  textDecoration: "none",
                }}
              >
               Alabama
              </Link>
              <Link
                style={{
                  fontSize: "0.75rem",
                  color: "#171717",
                  textDecoration: "none",
                }}
              >
               Your Huntsville, AL Branch
              </Link>
            </Breadcrumbs>
            <Grid>
                <h4 className="branchLocatorHeadingMain">
              <strong>Your Huntsville, AL Branch</strong>
            </h4>

            <Typography className="">
                 <span className="black-text">11220 Memorial Pkwy.<br/>Suite, Huntsville AL 35803</span>
                 <span className="black-text"><small>Branch Manager</small><br/>Branch Manager</span>
                 <span className="black-text"><small>Open Now</small><br/>Thursday 9:00am - 5:00pm EST</span>
                 <span className="black-text"><small>Phone Number</small><br/><a href="tel:2562175820" className="blueText">256-217-5820</a></span>             
            </Typography>
            <ButtonPrimary
                //   onClick={getActivePlaces}
                  stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "padding":"0px 30px", "marginTop":"4%"}'
                >
                  Get Directions
                </ButtonPrimary>
            </Grid>
            

            {/* <Grid id="findBranchWrapTwo" className={classes.blueBackground}>
              <h4 className={classes.headigText}>
                Find a Branch in <strong>Alabama</strong>
              </h4>
              <Grid id="findBranchGrid">
                <SearchIcon className="searchIcon" style={{ color: "white" }} />
                <TextField
                  className="branchLocatorInput"
                  style={{ color: "white!important" }}
                  id="inputText"
                  label="Enter city & state or zip code"
                />
                <ButtonPrimary
                  onClick={getActivePlaces}
                  stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "padding":"0px 30px"}'
                >
                  <ArrowForwardIcon className="goIcon" />
                </ButtonPrimary>
              </Grid>
            </Grid> */}
          </Grid>
        </Grid>

        {/* <Grid
          style={{ padding: "4% 15px 4% 15px", backgroundColor: "white" }}
          container
          id=""
        >
          <Grid
            style={{ padding: "0px 15px 0px 15px" }}
            id="mapGridWrap"
            item
            xs={12}
            sm={12}
            md={6}
            xl={6}
          >
            {isLoaded ? (
              <Map
                getMap={getMap}
                CurrentLocation={getCurrentLocation}
                Zoom={zoomDepth}
              />
            ) : null}
          </Grid>
          
        </Grid> */}

        <Grid style={{ backgroundColor: "#f9f9f9", width: "100%", padding:"4% 2rem 4% 1rem" }}>
          <Grid style={{margin:"auto" }}>
            <h4 className="PesonalLoanMapHeading">
              <strong>One-On-One Support With Your Personal Loan in Huntsville, AL</strong>
            </h4>
            
          </Grid>
          <iframe
          title="branchLocation"
          style={ { height: "530px", width: "100%" } }
          id="gmap_canvas"
          src={
            "https://maps.google.com/maps?q=Huntsville, AL, United States&t=&z=11&ie=UTF8&iwloc=&output=embed"
          }
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
        ></iframe>

          <Grid style={{margin:"auto" }} item md={10}>
            <h4 className="PesonalLoanMapHeading">
              <strong>The Huntsville, AL Branch Welcomes You For Personal Loans That Fit Your Needs</strong>
            </h4>
            <p className="PesonalLoanMapParagraph">
            Our Huntsville lending professionals are proud of the neighborhoods 
            they live and work in. Ready to speak to a Huntsville lending professional 
            in person? The better we know you, the more we can help. You have your own unique
            goals to meet, and it all starts with a conversation at your local branch.A personal 
            loan can meet a variety of needs, including medical emergencies, home improvement projects, 
            vacations, weddings, tuitions costs, and debt consolidation. Mariner Finance has a personal 
            loan that fits every one of those situations, and more.Ready to apply for a personal loan at
             the Huntsville, Alabama branch? Our Huntsville branch is totally focused on solving your 
             personal financial challenges.
            </p>
          </Grid>
          <Grid style={{margin:"auto" }} item md={10}>
            <h4 className="PesonalLoanMapHeading">
              <strong>Find nearby Alabama branches</strong>
            </h4>
            <p className="PesonalLoanMapParagraph">
            Mariner Finance operates over 470 branch locations in twenty-four states, 
            working and living as close to our customers as we can. Chances are we’re in
            your neighborhood, or we will be soon as we continue to grow. Our experienced 
            team members are ready to assist with your financial needs. See other branches 
            with personal loans near you below:
            </p>
          </Grid>

          <Grid container  style={{margin:"auto", justifyContent:"space-between" }}  item md={10}>
              <Grid>
                <Typography className="">
                 <span>11220 Memorial Pkwy.<br/>Suite, Huntsville AL 35803</span>
                 <span><small>Branch Manager</small><br/>Branch Manager</span>
                 <span><small>Open Now</small><br/>Thursday 9:00am - 5:00pm EST</span>
                 <span><small>Phone Number</small><br/><a href="tel:2562175820" className="blueText">256-217-5820</a></span>             
            </Typography>
            <ButtonPrimary
                //   onClick={getActivePlaces}
                  stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "padding":"0px 30px", "marginTop":"4%"}'
                >
                  Get Directions
                </ButtonPrimary>
              </Grid>
             
              <Grid>
                <Typography className="">
                 <span>11220 Memorial Pkwy.<br/>Suite, Huntsville AL 35803</span>
                 <span><small>Branch Manager</small><br/>Branch Manager</span>
                 <span><small>Open Now</small><br/>Thursday 9:00am - 5:00pm EST</span>
                 <span><small>Phone Number</small><br/><a href="tel:2562175820" className="blueText">256-217-5820</a></span>             
            </Typography>
            <ButtonPrimary
                //   onClick={getActivePlaces}
                  stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "padding":"0px 30px", "marginTop":"4%"}'
                >
                  Get Directions
                </ButtonPrimary>
              </Grid>
             
              <Grid>
                <Typography className="">
                 <span>11220 Memorial Pkwy.<br/>Suite, Huntsville AL 35803</span>
                 <span><small>Branch Manager</small><br/>Branch Manager</span>
                 <span><small>Open Now</small><br/>Thursday 9:00am - 5:00pm EST</span>
                 <span><small>Phone Number</small><br/><a href="tel:2562175820" className="blueText">256-217-5820</a></span>             
            </Typography>
            <ButtonPrimary
                //   onClick={getActivePlaces}
                  stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px", "padding":"0px 30px", "marginTop":"4%"}'
                >
                  Get Directions
                </ButtonPrimary>
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
