import React from "react";
import "./Style.css";
import { useStyleVantageScore } from "./Style";
import { Grid } from "@material-ui/core";
import { ButtonPrimary } from "../../FormsUI";
import { useHistory } from "react-router-dom";
import ThumbUpIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDownAlt";
import VantageScore from "../../../assets/images/Vantagescore-logo.png";
import Equifax from "../../../assets/images/equifax-logo.png";
import GaugeChart from "react-gauge-chart";
import Moment from "moment";

export default function Credit(creditData) {
  window.zeHide();
  //Material UI css class
  const classes = useStyleVantageScore();
  const history = useHistory();
  let percent;
  let score = creditData.creditData[0].parsed.vantage_score;
  let creditDate = Moment(creditData.creditData[0].createdat).format("MMMM Y");
  let lastMnthScore = creditData?.creditData[1] ? creditData.creditData[1].parsed.vantage_score : 0;
  let status;
  let compareLastmnth;

  //chart percent
  if (score >= 750) {
    percent = 0.9;
  } else if (score >= 700) {
    percent = 0.68;
  } else if (score >= 640) {
    percent = 0.5;
  } else if (score >= 580) {
    percent = 0.3;
  } else if (score < 580) {
    percent = 0.1;
  }

  //Credit score comparison vs lastmnth
  if (score > lastMnthScore) {
    compareLastmnth = "Your credit score has increased since last month.";
  } else if (score === lastMnthScore) {
    compareLastmnth = "Your credit score has not changed since last month.";
  } else if (score < lastMnthScore) {
    compareLastmnth = "Your credit score has decreased since last month.";
  }

  //Credit score message
  if (score >= 750) {
    status = "Congratulations, you have an Excellent credit score!";
  } else if (score >= 700) {
    status = "Congratulations, you have a Good credit score!";
  } else if (score >= 640) {
    status = "Congratulations, you have an Average credit score!";
  } else if (score >= 580) {
    status = "Sorry, you have a Below Average credit score!";
  } else if (score < 580) {
    status = "Sorry, you have a Poor credit score!";
  }

  //Navigation
  const navigateCheckMyOffers = () => {
    history.push({
      pathname: "/customers/applyForLoan",
      state: { statusCheck: false, from: "user" },
    });
  };

  //View
  return (
    <Grid container direction="row" spacing={3}>
      <Grid className={classes.graph} item xs={12} sm={6}>
        <GaugeChart
          id="gauge-chart4"
          nrOfLevels={5}
          arcPadding={-0.5}
          cornerRadius={0}
          textColor={"#212121"}
          percent={percent}
          style={{ width: "60%", margin: "auto" }}
          formatTextValue={(value) => score}
          colors={["#a50100", "#e05534", "#f2d82b", "#BCEA78", "#85c900"]}
        />
        <p id="date">{creditDate}</p>
        <img id="VantageScoreImg" src={VantageScore} alt="VantageScore-logo" ></img>
        <p id="ProvidedBy">Provided by</p>
        <img id="Equifax" src={Equifax} alt="EquifaxLogo"></img>
      </Grid>
      <Grid className={classes.texts} item xs={12} sm={6}>
        <p className={classes.flex}>
          {" "}
          {score >= 750 || score >= 700 || score >= 640 ? (
            <ThumbUpIcon className={classes.thumb} />
          ) : (
            <ThumbDownIcon className={classes.thumb} />
          )}{" "}
          {status}
        </p>
        <p>{compareLastmnth}</p>
        { score >= 640 && 
        <>
        <ButtonPrimary onClick={navigateCheckMyOffers} stylebutton='{"background": ""}' >
          {" "}
          Check My Offers
        </ButtonPrimary>
        <p className={classes.smallText}>
          See if you qualify for a loan offer, it won’t affect your credit
          score.
        </p>
        </>
}
      </Grid>
    </Grid>
  );
}
