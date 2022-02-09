import Grid from "@material-ui/core/Grid";
import React, { useState, useEffect } from "react";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
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
export default function BranchLocator() {
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

  const MFStates = ['Alabama', 'Arizona', 'California', 'Delaware', 'Florida', 'Georgia', 'Illinois', 'Indiana', 'Kentucky', 'Louisiana',
    'Maryland', 'Mississippi', 'Missouri', 'New ersey', 'New Mexico', 'New York', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'South Carolina', 'Tennessee', 'Texas', 'Utah', 'Virginia', 'Wisconsin', 'Washington'];

  const getBranchLists = async (search_text) => {
    try {
      setLoading(true);
      let result = await BranchLocatorController(search_text);
      setCurrentLocation(result?.data?.searchLocation);
      let N = (result?.data?.branchData[0].distance).replace(/[^0-9]/g, '');
      if (N > 190) {
        setZoomDepth(11);
      } else if (N > 150) {
        setZoomDepth(10);
      } else if (N > 100) {
        setZoomDepth(9);
      } else if (N > 75) {
        setZoomDepth(8);
      } else if (N > 50) {
        setZoomDepth(7);
      } else if (N > 25) {
        setZoomDepth(5);
      } else if (N > 15) {
        setZoomDepth(3);
      } else if (N > 10) {
        setZoomDepth(2);
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
    try {
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
    } catch (error) {
      ErrorLogger('Error from lsitForMapView ', error)
    }
  }
  const getActivePlaces = async () => {
    try {
      let result = await getBranchLists(inputText.value);
      setBranchList(result);
      setLoading(false);
      listForMapView(result);
    } catch (error) {
      toast.error(' Error from getActivePlaces ', error)
    }
  }
  // -------- To Display Dialog to get Directions of Address.......
  const openGetDirectionModal = () => {
    setgetDirectionModal(true);
  }
  const closeGetDirectionModal = () => {
    setgetDirectionModal(false);
  }
  const MFButtonClick = async (event) => {
    try {
      let result = await getBranchLists(event.target.innerHTML);
      setBranchList(result);
      setLoading(false);
      listForMapView(result);
    } catch (error) {
      ErrorLogger("Error from MFButtonClick", error);
    }
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
        style={{
          padding: "50px 23px 50px 23px"
        }}
      >
        <Grid container id="">
          <Grid id="mapGridWrap" item xs={12} sm={12} md={6} xl={6} >
            {isLoaded ? <Map getMap={getMap} CurrentLocation={getCurrentLocation} Zoom={zoomDepth} /> : null}
          </Grid>
          <Grid item xs={12} sm={12} md={6} xl={6}>
            <Grid id="findBranchWrap" className={classes.blueBackground} >
              <h4 className={classes.headigText}>Find a Branch Near You!</h4>
              <Grid id="findBranchGrid">
                <TextField
                  style={{ width: "90%" }}
                  id="inputText"
                  label="Enter city & state or zip code"
                />
                <ButtonPrimary
                  onClick={getActivePlaces}
                  stylebutton='{"background": "#FFBC23", "color": "black", "borderRadius": "50px"}'
                >
                  <ArrowForwardIcon />
                </ButtonPrimary>
              </Grid>
            </Grid>
            {(loading) ? <div align="center"><CircularProgress /> </div> :
              <Grid id="branchLists" style={{ width: "100%", height: "520px", overflowY: "scroll" }}>
                <Grid style={{ padding: "0 4% 0 4%" }}>
                  {getBranchList ? getBranchList.map((item, index) => {
                    return (
                      <Grid>
                        <h4>{item.BranchName} Branch</h4>
                        <p>{item.distance} away</p>
                        <p id={item.id}>{item.Address}</p>
                        <p><a href={item.PhoneNumber} class="BlacktextColor">Phone - {item.PhoneNumber}</a></p>
                        <p>{item.timeZoneName}</p>
                        <ButtonPrimary
                          onClick={() => {
                            setBranchAddress("https://www.google.com/maps/search/" + item.Address);
                            openGetDirectionModal();
                          }}
                          stylebutton='{"padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif"}'
                        >
                          Get Directions
                        </ButtonPrimary>
                      </Grid>
                    );
                  }) : <p> No Branch found.</p>
                  }
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
                        responsible for and makes no claims or representations regarding the
                        content, terms of use, or privacy policies of third party websites.
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
              </Grid>}
          </Grid>
          <Grid container style={{ "textAlign": "center" }}>
            <Grid item xs={12} justifyContent="center">
              <Typography variant="h4" >
                Mariner Finance States
              </Typography>
            </Grid>
            <Grid item xs={12} justifyContent="center" >
              <Typography variant="h6" >
                To find a branch near you select your state below
              </Typography>
            </Grid>
          </Grid>
          <Grid container >
            {MFStates.map((item, index) => {
              return (
                <Grid item xs={12} sm={12} md={2} xl={6}>
                  <ButtonSecondary
                    stylebutton='{"float": "","width": "100%","margin":"15px" }'
                    onClick={MFButtonClick}
                  >
                    {item}
                  </ButtonSecondary>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
