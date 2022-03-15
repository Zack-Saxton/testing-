import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ButtonPrimary } from "../../../FormsUI";
import APICall from "../../../lib/AxiosLib";
import messages from "../../../lib/Lang/applyForLoan.json";
import LoadQuestions from "./LoadQuestions";
import MultipleQuestion from "./multipleQuestion";

const useStyles = makeStyles((theme) => ({
  content_grid: {
    marginTop: "15px",
  },
}));

//View Part
export default function VerificationQuestion(props) {
  let response;
  const classes = useStyles();
  const [ responseData, setResponseData ] = useState([]);
  const [ responseDataMultipleQ, setResponseDataMultipleQ ] = useState([]);
  const [ setOneFinished, setSetOneFinished ] = useState(false);
  const [ check, setCheck ] = useState(null);
  const [ questionSetIdMultiple, setQuestionSetIdMultiple ] = useState(null);
  const [ transactionIdMultiple, setTransactionIdMultiple ] = useState(null);

  async function getUserAccountDetails() {
    let url = "kba_questions_cac",
      data = {},
      method = "POST",
      addAccessToken = true;
    response = await APICall(url, '', data, method, addAccessToken);

    // structure the API data response to store it in array
    let tempArray = [];
    if (response?.data?.questions) {
      tempArray.push({
        "key": 0,
        "fullData": response.data,
        "question": response?.data?.questions.question.text.statement,
        "choice": response?.data?.questions.question.choice,
        "questionId": response?.data?.questions.question[ "question-id" ],
        "answer": ""
      });
      setResponseData(tempArray);
    }
  }

  // get the function to fetch api on page load
  useEffect(() => {
    getUserAccountDetails();
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Purposly commented
  return (
    <div>
      <p style={ { textAlign: "justify", fontSize: "0.938rem" } }>
        Please answer the questions below to help verify your identity. Please
        provide your response within 5 minutes.
      </p>
      <div className={ props.classes.actionsContainer }>
        <div className={ props.classes.button_div } >
          { responseData ? <LoadQuestions responseData={ responseData } setResponseData={ setResponseData } classes={ classes } check={ check } setCheck={ setCheck } /> : <CircularProgress /> }
          <div>
            { setOneFinished ? <MultipleQuestion setLoadingFlag={ props.setLoadingFlag } next={ props.next } transactionIdMultiple={ transactionIdMultiple } questionSetIdMultiple={ questionSetIdMultiple } responseData={ responseDataMultipleQ } setResponseData={ setResponseDataMultipleQ } classes={ classes } check={ check } setCheck={ setCheck } /> : null }
          </div>
          {
            !setOneFinished ?
              <ButtonPrimary
                variant="contained"
                color="primary"
                id="button_stepper_next"
                stylebutton='{"marginRight": "10px","padding":"0px 30px", "fontSize":"0.938rem","fontFamily":"Muli,sans-serif" }'
                onClick={ async () => {
                  if (check) {
                    props.setLoadingFlag(true);
                    let sendData = {
                      "ref": responseData[ 0 ]?.fullData?.questions?.transaction_id,
                      "answers": {
                        "question_set_id": responseData[ 0 ]?.fullData?.questions?.question_set_id,
                        "questions": [ {
                          "id": responseData[ 0 ]?.fullData?.questions?.question[ "question-id" ],
                          "answer": check
                        } ]
                      }
                    };
                    let nxtRes = await APICall("kba_disambiguate_answer", '', sendData, "POST", true);
                    let tempArray = [];
                    if (nxtRes?.data?.kba) {
                      setQuestionSetIdMultiple(nxtRes?.data?.kba?.questions[ "question-set-id" ]);
                      setTransactionIdMultiple(nxtRes?.data?.kba[ "transaction-status" ][ "transaction-id" ]);
                      nxtRes?.data?.kba?.questions?.question.map((val, key) => {
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
                      props.setLoadingFlag(false);
                    }
                    else if (nxtRes?.data?.result === "success" && !nxtRes?.data?.kba && nxtRes?.data?.kba?.failed) {
                      props.setLoadingFlag(false);
                      props.next();
                    } else {
                      props.setLoadingFlag(false);
                      toast.error(messages?.unHandledError);
                    }
                  }
                  else {
                    props.setLoadingFlag(false);
                    toast.error(messages?.verificationQuestions?.selectToContinue);
                  }
                } }
              >
                { props.activeStep === props?.steps.length - 1 ? "Finish" : "Continue" }
              </ButtonPrimary>
              :
              null
          }
        </div>
      </div>
    </div>
  );
}

VerificationQuestion.propTypes = {
  classes: PropTypes.object,
  setLoadingFlag: PropTypes.func,
  next: PropTypes.func,
  activeStep: PropTypes.number,
  steps: PropTypes.array
};
