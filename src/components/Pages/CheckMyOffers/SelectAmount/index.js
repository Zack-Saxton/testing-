import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import globalMessages from "../../../../assets/data/globalMessages.json";
import { preLoginStyle } from "../../../../assets/styles/preLoginStyle";
import { CheckMyOffers as Check } from "../../../../contexts/CheckMyOffers";
import OfferCodeValidation from "../../../Controllers/OfferCodeController";
import { ButtonPrimary, Slider, TextField } from "../../../FormsUI";
import "../CheckMyOffer.css";
import ScrollToTopOnMount from "../ScrollToTop";
import "./CheckMyOffer.css";
import Cookies from "js-cookie";

//Styling part
const useStyles = makeStyles(() => ({
  alignSmallText: {
    paddingTop: ".6rem",
    paddingBottom: "70px",
    marginBottom: "3%",
  },
  cardWrapper: {
    paddingTop: "4%",
    marginTop: "5%",
    marginBottom: "2%",
  },
  showSection:{
    color:"#fec33a"
  },
  hideSection:{
    color:"#c4c4c4"
  },
}));

//initializing check my offers functonal component
function SelectAmount(props) {
  const { data, setData, resetData } = useContext(Check);
  const [ hoverColor, setHoverColor ] = useState(true);
  const [ amount, setAmount ] = useState(true);
  const [ hasOfferCode, setHasOfferCode ] = useState(props?.enableOffer ?? false);
  const classes = preLoginStyle();
  const innerClasses = useStyles();
  const navigate = useNavigate();
  let tempCounter = 0;
  let validValueOne = 1000;
  let validValuetwo = 25000; 
  const getValidValue = (selectedValue) => {
    let validValue =
      selectedValue > 5000 && selectedValue % 500 === 250
        ? selectedValue + 250
        : selectedValue;
    if (validValue < validValueOne) {
      return validValueOne;
    } else if (validValue > validValuetwo) {
      return validValuetwo;
    }
    return validValue;
  };
  let params = useParams();
  let selectedAmount = getValidValue(params?.amount);
  const [ select, setSelect ] = useState(
    data.loanAmount
      ? data.loanAmount
      : selectedAmount
        ? parseInt(selectedAmount)
        : 10000
  );
  let location = useLocation();
  useEffect(() => {
    const CKLightbox_Source = Cookies.get("CKLightbox_Source")   
    if(CKLightbox_Source === "CKLightbox"){  
       navigate("/loan-purpose");
    }
    else{
    if (data?.isActiveUser === "closed") {
      toast.error(globalMessages.Account_Closed_New_Apps);
      navigate("/customers/accountOverview");
    } else if (selectedAmount) {
      data.loanAmount = select;
      data.formStatus = "started";
      data.completedPage = data.page.selectAmount;
      setData({ ...data, loanAmount: select, loading: false });
      navigate("/loan-purpose");
    } else if (
      !data.formStatus ||
      !data.completedPage ||
      data.formStatus?.toLowerCase() === "completed" ||
      location?.state?.fromLoanPurpose?.toLowerCase() !== "yes"
    ) {
      setData({ ...data, loading: true });
      resetData();
      setSelect(data.loanAmount ? data.loanAmount : 10000);
    }
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPageStatus = () => {
    data.loanAmount = select;
    data.formStatus = "started";
    data.completedPage = data.page.selectAmount;
    setData({ ...data, loanAmount: select });
  };

  const handleRoute = async (event) => {
    try {
      if (!data.offerCode) {
        setPageStatus();
        navigate("/loan-purpose");
      }
      if (data.offerCode) {
        let offerCodeResponse = await OfferCodeValidation(data.offerCode);
        if (
          offerCodeResponse?.data?.offerData?.Message ||
          offerCodeResponse.status !== 200
        ) {
          toast.error(globalMessages.OfferCode_Valid);
          tempCounter++;
          if (tempCounter === 2) {
            setPageStatus();
            setData({ ...data, offerCode: "" });
            navigate("/loan-purpose");
          }
        } else {
          toast.success(globalMessages.offerCode_Success);
          navigate("/pre-approved", { state: offerCodeResponse?.data });
        }
      }
    } catch (error) {
      ErrorLogger(globalMessages.offerCode_Error, error);
    }
  };

  const changeColor = () =>{
    if (hoverColor !== false){
      setHoverColor(false);
    }     
    if (amount !== false){
      setAmount(false);
    } 
}
  // jsx part
  return (
    <div data-testid="check-my-affer-select-amout">
      <ScrollToTopOnMount />
      <div className={classes.mainDiv} data-testid="selectAmount">
        <Box>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              xs={11}
              sm={10}
              md={6}
              lg={6}
              xl={6}
              className={innerClasses.cardWrapper}
            >
              <Paper
                className="checkMyOffersWrap"
                justify="center"
                alignitems="center"
                id="selectAmountWrap"
              >
                <Typography align="center" className="checkMyOffersHeading">
                  Tell us how much you would like to borrow
                </Typography>
                <Grid
                  item
                  xs={12}
                  className="selectAmountGrid"
                  container
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={11} sm={10} md={8} lg={8} xl={8}>
                    <Slider
                      amount={amount}
                      marks={[]}
                      id="sliderBar"
                      className={hoverColor ? innerClasses.hideSection : innerClasses.showSection}
                      onMouseEnter={changeColor} 
                      name="slider"
                      defaultValue={select ? select : 10000}
                      setSelect={setSelect}
                      min={1000}
                      max={25000}
                    />
                  </Grid>
                </Grid>
                <Grid
                  id="checkMyOffersText"
                  item
                  xs={12}
                  className="alignSlider"
                  container
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={11} sm={10} md={8} lg={8} xl={8}>
                    <Typography
                      data-testid="offerCodeTriggerText"
                      className="setGreenColor cursorPointer"
                      align="center"
                      onClick={(event) => {
                        setHasOfferCode(!hasOfferCode);
                      }}
                    >
                      I have an offer code
                    </Typography>
                  </Grid>
                  <Grid item xs={11} sm={10} md={8} lg={8} xl={8}>
                    <div className={hasOfferCode ? "open" : "close"} data-testid="offer-code-input-box">
                      <TextField
                        id="offerCodeInput"
                        name="offerCode"
                        value={data.offerCode}
                        onChange={(event) => {
                          setData({
                            ...data,
                            offerCode: event.target.value.trim(),
                          });
                        }}
                        label="Enter Offer Code"
                        materialProps={{
                          "data-test-id": "offer",
                          maxLength: "10",
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={11} sm={10} md={8} lg={8} xl={8}>
                    <Grid className="alignButton">
                      <ButtonPrimary
                        data-testid="contButton"
                        stylebutton='{"background": "#FFBC23", "color":"black","fontSize":"15px","padding":"0px 30px"}'
                        onClick={handleRoute}
                        disabled={data.loading}
                      >
                        Continue
                        <i
                          className="fa fa-refresh fa-spin customSpinner"
                          style={{
                            marginRight: "10px",
                            display: data.loading ? "block" : "none",
                          }}
                        />
                      </ButtonPrimary>
                    </Grid>
                  </Grid>

                  <Typography
                    className="checkMyoffersSubHeading"
                    align="center"
                  >
                    Checking your offers will not impact your credit score.*
                  </Typography>
                  <Grid className="alignTextInsideCard justifyText">
                    <Typography
                      data-testid="descriptionInside"
                      className="alignText justifyText checkMyOffersText"
                      align="center"
                    >
                      {globalMessages.We_Offer_personal_loans}
                    </Typography>
                    <Typography
                      className="alignText justifyText checkMyOffersText"
                      align="center"
                    >
                      {globalMessages.Government_fight_the_funding}
                    </Typography>
                    <Typography
                      className="alignText justifyText checkMyOffersText"
                      align="center"
                    >
                      *This process uses a {'"'}soft{'"'} credit inquiry to determine
                      whether a loan offer is available, which does not impact your
                      credit score. If you continue with the application process
                      online and accept a loan offer, or are referred to a branch and
                      continue your application there, we will pull your credit report
                      and credit score again using a “hard” credit inquiry. This
                      “hard” credit inquiry may impact your credit score.
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

SelectAmount.propTypes = {
  enableOffer: PropTypes.bool
};

export default SelectAmount;
