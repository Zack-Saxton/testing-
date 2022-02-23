import { Grid } from "@material-ui/core";
import ThumbDownIcon from "@material-ui/icons/ThumbDownAlt";
import ThumbUpIcon from "@material-ui/icons/ThumbUpAlt";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";
import Equifax from "../../../assets/images/equifax-logo.png";
import VantageScore from "../../../assets/images/Vantagescore-logo.png";
import setAccountDetails from "../../Controllers/AccountOverviewController";
import { ButtonPrimary } from "../../FormsUI";
import { useStyleVantageScore } from "./Style";
import "./Style.css";

export default function Credit(creditData) {
  window.zeHide();
  //Material UI css class
  const classes = useStyleVantageScore();
  const navigate = useNavigate();
  const [ loanstatus, setloanstatus ] = useState(null);
  const { data: accountDetails } = useQuery('loan-data', setAccountDetails);
  let percent;
  let score = creditData.creditData[ 0 ].parsed.vantage_score;
  let creditDate = Moment(creditData.creditData[ 0 ].createdat).format("MMMM Y");
  let lastMnthScore = creditData?.creditData[ 1 ] ? creditData.creditData[ 1 ].parsed.vantage_score : 0;
  let status;
  let compareLastmnth;

  //chart percent
  if (score >= 750) {
    percent = 0.9;
    status = "Congratulations, you have an Excellent credit score!";
  } else if (score >= 700) {
    percent = 0.68;
    status = "Congratulations, you have a Good credit score!";
  } else if (score >= 640) {
    percent = 0.5;
    status = "Congratulations, you have an Average credit score!";
  } else if (score >= 580) {
    percent = 0.3;
    status = "Sorry, you have a Below Average credit score!";
  } else if (score < 580) {
    percent = 0.1;
    status = "Sorry, you have a Poor credit score!";
  }

  //Credit score comparison vs lastmnth
  if (score > lastMnthScore) {
    compareLastmnth = "Your credit score has increased since last month.";
  } else if (score === lastMnthScore) {
    compareLastmnth = "Your credit score has not changed since last month.";
  } else if (score < lastMnthScore) {
    compareLastmnth = "Your credit score has decreased since last month.";
  }

  useEffect(() => {
    if (accountDetails) {
      setloanstatus(accountDetails?.data?.customer?.user_account?.status);
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ accountDetails ]);

  //Navigation
  const navigateCheckMyOffers = () => {
    navigate("/customers/applyForLoan", { state: { statusCheck: false, from: "user" }, });
  };

  //View
  return (
    <Grid container direction="row" spacing={ 3 }>
      <Grid className={ classes.graph } item xs={ 12 } sm={ 6 }>
        <GaugeChart
          id="gauge-chart4"
          nrOfLevels={ 5 }
          arcPadding={ -0.5 }
          cornerRadius={ 0 }
          textColor={ "#212121" }
          percent={ percent }
          style={ { width: '60%', margin: 'auto' } }
          formatTextValue={ (value) => score }
          colors={ [ "#a50100", "#e05534", "#f2d82b", "#BCEA78", "#85c900" ] }
        />
        <p id="date">{ creditDate }</p>
        <img id="VantageScoreImg" src={ VantageScore } alt="VantageScore-logo" ></img>
        <p id="ProvidedBy">Provided by</p>
        <img id="Equifax" src={ Equifax } alt="EquifaxLogo"></img>
      </Grid>
      <Grid className={ classes.texts } item xs={ 12 } sm={ 6 }>
        <p className={ classes.flex }>
          { " " }
          { score >= 640 ? (
            <ThumbUpIcon className={ classes.thumb } />
          ) : (
            <ThumbDownIcon className={ classes.thumb } />
          ) }{ " " }
          { status }
        </p>
        <p>{ compareLastmnth }</p>
        { (loanstatus != "closed" && loanstatus != null) &&
          <>
            <ButtonPrimary onClick={ navigateCheckMyOffers } stylebutton='{"background": ""}' >
              { " " }
              Check My Offers
            </ButtonPrimary>
            <p className={ classes.smallText }>
              See if you qualify for a loan offer, it won’t affect your credit
              score.
            </p>
          </>
        }
      </Grid>
    </Grid>
  );
}
