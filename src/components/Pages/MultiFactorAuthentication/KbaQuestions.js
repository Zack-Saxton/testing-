import React, { useState, useEffect } from 'react'
import { Typography, Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import Cookies from 'js-cookie';
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { ButtonPrimary, Popup } from "../../FormsUI";
import { useStylesMFA } from "./Style";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import APICall from "../../lib/AxiosLib";
import './MultiFactorAuthentication.css';
import LoadQuestions from "../ApplyLoan/Stepper/LoadQuestions";
import MultipleQuestion from './MultipleQuestion';
import ScrollToTopOnMount from "../ScrollToTop";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckLoginTimeout from '../../Layout/CheckLoginTimeout';
import CheckLoginStatus from '../../App/CheckLoginStatus';


const KbaQuestions = () => {
  const classes = useStylesMFA();
  const navigate = useNavigate();
  const location = useLocation();
  const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');
  const customerEmail = Cookies.get("email");
  const [responseData, setResponseData] = useState();
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [responseDataMultipleQ, setResponseDataMultipleQ] = useState([]);
  const [setOneFinished, setSetOneFinished] = useState(false);
  const [check, setCheck] = useState(null);
  const [questionSetIdMultiple, setQuestionSetIdMultiple] = useState(null);
  const [transactionIdMultiple, setTransactionIdMultiple] = useState(null);
  const [popUp, setPopUp] = useState(false);
  const [isProd, setIsProd] = useState(false);

  useEffect(() => {
    let kbaSkipCookie = Cookies.get("kbaSkip");
		if (!location?.state?.mfaSecurityQuestions) {
			navigate("/customers/accountOverview");
		} else if(kbaSkipCookie) {
      navigate("/MFA");
    }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

  const handlePopUp = () => {
    setPopUp(true);
  };
  const handlePopUpClose = () => {
    setPopUp(false);
  }
  async function getKbaQuestions() {
    let url = "mfa_questions_cac";
    let data = {
      email: customerEmail
    }
    let method = "POST";
    let addAccessToken = true;
    let response = await APICall(url, '', data, method, addAccessToken);

    // structure the API data response to store it in array
    let tempArray = [];
    if (response?.data?.kba_response?.data?.questions) {
      tempArray.push({
        "key": 0,
        "fullData": response.data?.kba_response?.data,
        "question": response.data?.kba_response?.data?.questions?.question["help-text"]?.statement,
        "choice": response.data?.kba_response?.data?.questions?.question?.choice,
        "questionId": response.data?.kba_response?.data?.questions?.question["question-id"],
        "answer": ""
      });
      setResponseData(tempArray);
    }
    else if (response?.data?.result && response?.data?.result?.questions?.question.length > 1) {
      setIsProd(true);
      setQuestionSetIdMultiple(response?.data?.result?.questions?.["question-set-id"]);
      setTransactionIdMultiple(response?.data?.result?.["transaction-status"]?.["transaction-id"]);
      response?.data?.result?.questions?.question.map((val, key) => {
        tempArray.push({
          "key": key,
          "fullData": val,
          "question": val.text.statement,
          "choice": val.choice,
          "questionId": val["question-id"]
        });
        return null;
      });
      setResponseDataMultipleQ(tempArray);
      setSetOneFinished(true);
      setLoadingFlag(false);
    }
    else {
      toast.error("Something went wrong, please try again");
    }
  }

  // get the function to fetch api on page load
  useEffect(() => {
    getKbaQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (setOneFinished && !isProd) {
      toast.success("Saved");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setOneFinished]);
  const backToVerificationStep = () => {
    navigate(-1);
  }

  return (
    <div>
      <CheckLoginTimeout />
      {loginToken.isLoggedIn && location?.state?.mfaSecurityQuestions ? (
        <>
          <div
            data-testid="KbaQuestions_component"
            className={loadingFlag ? classes.loadingOn : classes.loadingOff}
          >
            <ScrollToTopOnMount />
            <Grid>
              <Grid
                spacing={1}
                container
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                className={classes.twoStepWrap}
              >
                <Paper className={classes.twoStepPaper}>
                  <Grid className={classes.headingTextWrap}>
                    <Typography className={classes.twoStepHeading} variant="h5">
                      ID Verification Questions
                    </Typography>
                    <IconButton
                      className={classes.backArrow}
                      onClick={backToVerificationStep}
                    >
                      <ArrowBackIcon className={classes.yellowBackArrow} />
                    </IconButton>
                  </Grid>
                  <Typography className={classes.twoStepParagraph}>
                    Please answer the questions below to help verify your
                    identity. Please provide your responses within five minutes.
                  </Typography>
                  <div
                    id="questionDiv"
                    data-testid="question_component"
                    className={classes.button_div}
                  >
                    {responseData && !setOneFinished ? (
                      <LoadQuestions
                        responseData={responseData}
                        setResponseData={setResponseData}
                        classes={classes}
                        check={check}
                        setCheck={setCheck}
                      />
                    ) : isProd ? (
                      <> </>
                    ) : setOneFinished ? (
                      <> </>
                    ) : (
                      <CircularProgress />
                    )}
                    <div>
                      {setOneFinished ? (
                        <MultipleQuestion
                          mfaDetails={location?.state?.mfaSecurityQuestions}
                          setLoadingFlag={setLoadingFlag}
                          customerEmail={customerEmail}
                          transactionIdMultiple={transactionIdMultiple}
                          questionSetIdMultiple={questionSetIdMultiple}
                          responseData={responseDataMultipleQ}
                          setResponseData={setResponseDataMultipleQ}
                          classes={classes}
                          check={check}
                          setCheck={setCheck}
                          navigate={navigate}
                        />
                      ) : null}
                    </div>
                    {!setOneFinished ? (
                      <div className={classes.alignCenterDiv}>
                        <ButtonPrimary
                          variant="contained"
                          color="primary"
                          data-testid="submit"
                          id="button_stepper_next"
                          stylebutton='{"marginRight": "10px","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
                          onClick={async () => {
                            if (check) {
                              setLoadingFlag(true);
                              let sendData = {
                                email: customerEmail,
                                ref: responseData[0]?.fullData?.[
                                  "transaction-status"
                                ]?.["transaction-id"],
                                answers: {
                                  question_set_id:
                                    responseData[0]?.fullData?.questions?.[
                                      "question-set-id"
                                    ],
                                  questions: [
                                    {
                                      id: responseData[0]?.questionId,
                                      answer: check,
                                    },
                                  ],
                                },
                              };
                              let nxtRes = await APICall(
                                "mfa_answers_cac",
                                "",
                                sendData,
                                "POST",
                                true
                              );
                              let tempArray = [];
                              if (nxtRes?.data?.result) {
                                setQuestionSetIdMultiple(
                                  nxtRes?.data?.result?.questions?.[
                                    "question-set-id"
                                  ]
                                );
                                setTransactionIdMultiple(
                                  nxtRes?.data?.result?.[
                                    "transaction-status"
                                  ]?.["transaction-id"]
                                );
                                nxtRes?.data?.result?.questions?.question.map(
                                  (val, key) => {
                                    tempArray.push({
                                      key: key,
                                      fullData: val,
                                      question: val.text.statement,
                                      choice: val.choice,
                                      questionId: val["question-id"],
                                    });
                                    return null;
                                  }
                                );
                                setResponseDataMultipleQ(tempArray);
                                setSetOneFinished(true);
                                setLoadingFlag(false);
                              } else {
                                setLoadingFlag(false);
                                toast.error("Internal Server Error");
                                navigate("/MFA", {
                                  state: location?.state?.mfaSecurityQuestions,
                                });
                              }
                            } else {
                              setLoadingFlag(false);
                              toast.error(
                                "Please answer the question before continuing"
                              );
                            }
                          }}
                        >
                          Submit and Continue
                        </ButtonPrimary>
                      </div>
                    ) : null}
                  </div>
                  <Typography
                    data-testid="kba_content"
                    className={classes.twoStepParagraph}
                  >
                    Loan funding and disbursement is conditioned upon our
                    satisfactory review of any documents and other information
                    that we require from you to verify your loan application
                    and/or your identity. This loan may not be consummated if
                    you obtain another loan from us prior to our disbursing
                    funds for this loan. If you have any questions, please{" "}
                    <Link
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handlePopUp();
                      }}
                    >
                      contact us.
                    </Link>
                  </Typography>
                </Paper>
                <Popup
                  maxWidth="sm"
                  popupFlag={popUp}
                  closePopup={handlePopUpClose}
                  title="Contact Us"
                >
                  <Typography
                    className="printPage"
                    style={{ textDecoration: "none" }}
                  >
                    Please contact us with any questions
                    <br />
                  </Typography>
                  <ul>
                    <li>
                      <strong>Phone</strong> : 833-421-3184 <br />
                    </li>
                    <li>
                      {" "}
                      <strong>Hours</strong> : M,W,Th:9:00a.m.-5:00 p.m.
                      Tue:9:00 a.m. - 7:00 p.m. Fri:9:00 a.m. - 5:30 p.m. <br />
                    </li>
                  </ul>
                  <Typography>We look forward to hearing from you!</Typography>
                </Popup>
              </Grid>
            </Grid>
          </div>
        </>
      ) : (
        <CheckLoginStatus />
      )}
    </div>
  );
}

export default KbaQuestions