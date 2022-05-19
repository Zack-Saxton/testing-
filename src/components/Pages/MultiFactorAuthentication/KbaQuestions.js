import React, {useState, useEffect} from 'react'
import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { ButtonPrimary } from "../../FormsUI";
import { useStylesMFA } from "./Style";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import APICall from "../../lib/AxiosLib";
import'./MultiFactorAuthentication.css';
import LoadQuestions from "../ApplyLoan/Stepper/LoadQuestions";
import MultipleQuestion from './MultipleQuestion';

const KbaQuestions = () => {
  const classes = useStylesMFA();
  const navigate = useNavigate();
  const location = useLocation();
  const customerEmail = location?.state?.mfaSecurityQuestions?.customerEmail;
  const [ responseData, setResponseData ] = useState();
  const [ loadingFlag, setLoadingFlag ] = useState(false); 
  const [ responseDataMultipleQ, setResponseDataMultipleQ ] = useState([]);
  const [ setOneFinished, setSetOneFinished ] = useState(false);
  const [ check, setCheck ] = useState(null);
  const [ questionSetIdMultiple, setQuestionSetIdMultiple ] = useState(null);
  const [ transactionIdMultiple, setTransactionIdMultiple ] = useState(null);

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
        "questionId": response.data?.kba_response?.data?.questions?.question[ "question-id" ],
        "answer": ""
      });
      setResponseData(tempArray);
    }
  }

  // get the function to fetch api on page load
  useEffect(() => {
    getKbaQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={loadingFlag ? classes.loadingOn : classes.loadingOff}>
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
            <Typography className={classes.twoStepHeading} variant="h5">
              2-Step Verification
            </Typography>
            <Typography className={classes.twoStepParagraph}>
            Please answer the questions below to help verify your identity.
            </Typography>
            <div className={classes.button_div} >
              {responseData ? <LoadQuestions responseData={responseData} setResponseData={setResponseData} classes={classes} check={check} setCheck={setCheck} /> : <CircularProgress />}
              <div>
                {setOneFinished ? <MultipleQuestion setLoadingFlag={setLoadingFlag} customerEmail={customerEmail} transactionIdMultiple={transactionIdMultiple} questionSetIdMultiple={questionSetIdMultiple} responseData={responseDataMultipleQ} setResponseData={setResponseDataMultipleQ} classes={classes} check={check} setCheck={setCheck} navigate={navigate} /> : null}
              </div>
              {
            !setOneFinished ?
              <ButtonPrimary
                variant="contained"
                color="primary"
                id="button_stepper_next"
                stylebutton='{"marginRight": "10px","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
                onClick={async () => {
                  if (check) {
                    setLoadingFlag(true);
                    let sendData = {
                      "email": customerEmail,
                      "ref": responseData[ 0 ]?.fullData?.['transaction-status']?.['transaction-id'],
                      "answers": {
                        "question_set_id": responseData[ 0 ]?.fullData?.questions?.[ "question-set-id" ],
                        "questions": [ {
                          "id": responseData[ 0 ]?.questionId,
                          "answer": check
                        } ]
                      }
                    };
                    let nxtRes = await APICall("mfa_answers_cac", '', sendData, "POST", true);
                    let tempArray = [];
                    if (nxtRes?.data?.result) {
                      setQuestionSetIdMultiple(nxtRes?.data?.result?.questions?.[ "question-set-id" ]);
                      setTransactionIdMultiple(nxtRes?.data?.result?.[ "transaction-status" ]?.[ "transaction-id" ]);
                      nxtRes?.data?.result?.questions?.question.map((val, key) => {
                        tempArray.push({
                          "key": key,
                          "fullData": val,
                          "question": val.text.statement,
                          "choice": val.choice,
                          "questionId": val[ "question-id" ]
                        });
                        return null;
                      });
                      setResponseDataMultipleQ(tempArray);
                      setSetOneFinished(true);
                      setLoadingFlag(false);
                    } else {
                      setLoadingFlag(false);
                      toast.error("Internal Server Error");
                    }
                  }
                  else {
                    setLoadingFlag(false);
                    toast.error("Internal Server Error");
                  }
                 }}
              >
                Next
              </ButtonPrimary>
              :
              null
          }
            </div>
          </Paper>
        </Grid>
      </Grid>
      </div>
  )
}

export default KbaQuestions