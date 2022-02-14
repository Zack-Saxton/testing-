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
import BranchDayTiming from "../../Controllers/BranchDayTiming";
import Typography from "@material-ui/core/Typography";
import ErrorLogger from "../../lib/ErrorLogger";
import { useLoadScript } from "@react-google-maps/api"
import Map from "./BranchLocatorMap";
import CircularProgress from '@material-ui/core/CircularProgress';
import { MFStates } from "../../../assets/data/marinerBusinesStates"
import { makeStyles} from "@material-ui/core";
import { NavLink } from "react-router-dom";
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
      for (let ele in result) {
        let BranchTime = await findBranchTimings(result[ele]);
        result[ele] = Object.assign(result[ele], { "BranchTime": BranchTime })
      }
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
  }, []);
  const findBranchTimings = async (value) => {
    try {
      if (value) {
        return await BranchDayTiming(value);
      } 
    } catch (error) {
      ErrorLogger(' Error from findBranchTimings', error)
    }
  }
  const useStyles = makeStyles({
    ptag: {
      margin: "0px", 
      lineHeight: "1.5", 
      fontSize: "15px" 
    },
    h4tag: { 
      margin: ".575rem 0 .46rem 0", 
      lineHeight: "1.5", 
      fontWeight: "400", 
      fontSize: "17px",
      color: "#3498DB" }
  })
  const clessesforptag = useStyles();
  //View part
  return (
    <div>
      <Grid
        container
        justifyContent={"center"}
        style={{
          // padding: "50px 15px 50px 15px"
        }}
      >
        <Grid style={{ padding: "4% 15px 4% 15px", backgroundColor: "white" }} container id="">
          <Grid style={{ padding: "0px 15px 0px 15px" }} id="mapGridWrap" item xs={12} sm={12} md={6} xl={6} >
            {isLoaded ? <Map getMap={getMap} CurrentLocation={getCurrentLocation} Zoom={zoomDepth} /> : null}
          </Grid>
          <Grid className="findBranchWrap" item xs={12} sm={12} md={6} xl={6}>
            <Grid id="findBranchWrap" className={classes.blueBackground} >
              <h4 className={classes.headigText}>Find a Branch Near You!</h4>
              <Grid id="findBranchGrid">
                <SearchIcon
                  className="searchIcon"
                  style={{ color: "white" }}
                />
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
                  <ArrowForwardIcon
                  className="goIcon"
                  />
                </ButtonPrimary>
              </Grid>
            </Grid>
            {(loading) ? <div align="center"><CircularProgress /> </div> :
              <Grid id="branchLists" style={{ width: "100%", height: "542px", overflowY: "scroll" }}>
                <Grid style={{ padding: "1% 4% 1% 4%" }}>
                  {getBranchList ? getBranchList.map((item, index) => {
                    return (
                      <Grid className="locationInfo">
                        <h4 className={clessesforptag.h4tag}><b>{item.BranchName} Branch</b></h4>
                        <p className={clessesforptag.ptag}>{item.distance}les away {item.BranchTime.Value1} {item.BranchTime.Value2}</p>
                        <p className={clessesforptag.ptag} style={{color: "#595959"}} id={item.id}>{item.Address}</p>
                        <p className={clessesforptag.ptag} ><u><a href={"tel:+1" + item.PhoneNumber} style={{ color: "blue" }}>Phone - {item.PhoneNumber}</a></u></p>
                        {/* <p style={{ margin: "15px 0px 10px 0px", lineHeight: "1.5", fontSize: "15px" }}>{item.timeZoneName}</p> */} 
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
        </Grid>
        <Grid container style={{ "textAlign": "center", padding: "4% 15px", backgroundColor: "#f9f9f9" }}>
          <Grid item xs={12} justifyContent="center">
            <Typography style={{ margin: "1.14rem 0 0.4rem 0", fontWeight: "500" }} variant="h4" >
              Mariner Finance States
            </Typography>
          </Grid>
          <Grid item xs={12} justifyContent="center" >
            <Typography style={{ margin: "0 0 4% 0", fontSize: "1.538rem", fontWeight: "400" }} variant="h6" >
              To find a branch near you select your state below
            </Typography>
          </Grid>
          <Grid container className={loading ? classes.loadingOnWithoutBlur : classes.loadingOff}>
            {MFStates.map((item, index) => {
              return (
                <Grid style={{ padding: "0px 15px 15px 15px" }} item xs={6} sm={3} md={2} xl={2}>
                  <ButtonSecondary
                    stylebutton='{"float": "","width": "100%", "height":"40px" }'
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
