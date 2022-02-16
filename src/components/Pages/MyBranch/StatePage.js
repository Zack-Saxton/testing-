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
import StateImage from "../../../assets/images/States.png"
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
  const openGetDirectionModal = () => {
    setgetDirectionModal(true);
  }
  const closeGetDirectionModal = () => {
    setgetDirectionModal(false);
  }
  const MFButtonClick = async (event) => {
    apiGetBranchList(event.target.innerText);
  }
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_SECKey
  });
  useEffect(() => {
    inputText.value = '21236';
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
        <Grid container style={{ backgroundColor: "#afdfed", width: "100%" }}>
          <Grid className="branchImage" item md={6} sm={12} xs={12}>
            <img src={ StateImage } alt="MF logo" />
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
                Personal Loans In Alabama
              </Link>
            </Breadcrumbs>

            <Grid id="findBranchWrapTwo" className={classes.blueBackground}>
              <h4 className={classes.headigText}>
                Find a Branch in <strong>Alabama</strong>
              </h4>
              <Grid id="findBranchGrid">
                <SearchIcon className="searchIcon"  />
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
            </Grid>

            <h4 className="branchLocatorHeadingMain">
              <b>Get one on one support</b>
              <br />
              for a personal loan near you
            </h4>

            <Typography className="branchLocatorHeading">
              <b className="numberText">470+</b>

              <p className="branchSmallText">Branches in 25 states</p>
            </Typography>

            <Typography className="branchLocatorHeading">
              <b className="numberText">$1k - $25k</b>

              <p className="branchSmallText">Available loan amount</p>
            </Typography>

            <Typography className="branchLocatorHeading">
              <b className="numberText">4.8</b>

              <p className="branchSmallText">
                Star Rating based on over 10,000 verified reviews
              </p>
            </Typography>

           
          </Grid>
        </Grid>

        <Grid
          style={{ padding: "4% 30px 4% 30px", backgroundColor: "white" }}
          container
          id=""
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
            {/* <Grid id="findBranchWrap" className={classes.blueBackground}>
              <h4 className={classes.headigText}>Find a Branch Near You!</h4>
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
            {loading ? (
              <div align="center">
                <CircularProgress />{" "}
              </div>
            ) : (
              <Grid
                id="branchLists"
                style={{ width: "100%", height: "542px", overflowY: "scroll" }}
              >
                <Grid style={{ padding: "1% 4% 1% 4%" }}>
                  {getBranchList ? (
                    getBranchList.map((item, index) => {
                      return (
                        <Grid className="locationInfo">
                          <h4
                            style={{
                              margin: ".575rem 0 .46rem 0",
                              lineHeight: "1.5",
                              fontWeight: "400",
                              fontSize: "17px",
                            }}
                          >
                            {item.BranchName} Branch
                          </h4>
                          <p
                            style={{
                              margin: "0px",
                              lineHeight: "1.5",
                              fontSize: "15px",
                            }}
                          >
                            {item.distance} away
                          </p>
                          <p
                            style={{
                              margin: "0px",
                              lineHeight: "1.5",
                              color: "#595959",
                              fontSize: "15px",
                            }}
                            id={item.id}
                          >
                            {item.Address}
                          </p>
                          <p
                            style={{
                              margin: "0px",
                              lineHeight: "1.5",
                              fontSize: "15px",
                            }}
                          >
                            <a
                              href={"tel:+1" + item.PhoneNumber}
                              className="BlacktextColor"
                            >
                              Phone - {item.PhoneNumber}
                            </a>
                          </p>
                          <p
                            style={{
                              margin: "15px 0px 10px 0px",
                              lineHeight: "1.5",
                              fontSize: "15px",
                            }}
                          >
                            {item.timeZoneName}
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

        <Grid style={{ backgroundColor: "#f9f9f9", width: "100%", padding:"4% 2rem 4% 1rem" }}>
          <Grid style={{margin:"auto" }} item md={6}>
            <h4 className="PesonalLoanHeading">
              <strong>Personal Loans in Alabama</strong>
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
