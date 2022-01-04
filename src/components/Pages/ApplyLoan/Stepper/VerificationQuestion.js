import React, { useEffect, useState } from "react";
import { ButtonPrimary } from "../../../FormsUI";
import { makeStyles } from "@material-ui/core/styles";
import APICall from '../../../App/APIcall';
import LoadQuestions from './LoadQuestions';
import MultipleQuestion from './multipleQuestion';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  content_grid: {
    marginTop: "15px",
  },
}));

//View Part
export default function VerificationQuestion(props) {

  let response;
  const classes = useStyles();
  const [responseData, setResponseData] = useState([]);
  const [responseDataMultipleQ, setResponseDataMultipleQ] = useState([]);
  const [setOneFinished, setSetOneFinished] = useState(false);
  const [check, setCheck] = useState(null);
  const [questionSetIdMultiple, setQuestionSetIdMultiple] = useState(null);
  const [transactionIdMultiple, setTransactionIdMultiple] = useState(null);

  async function getUserAccountDetails() {
    let url = "/integration/lexisnexis/kba_questions_cac?test=true",
      data = {},
      method = "POST",
      addAccessToken = true;
    response = await APICall(url, data, method, addAccessToken);

    // structure the API data response to store it in array
    let tempArray = [];
    if (response.data.data.questions) {
      tempArray.push({
        "key": 0,
        "fullData": response.data,
        "question": response.data.data.questions.question.text.statement,
        "choice": response.data.data.questions.question.choice,
        "questionId": response.data.data.questions.question["question-id"],
        "answer": ""
      });
      setResponseData(tempArray);
    }
  }

  // get the function to fetch api on page load 
  useEffect(() => {
    getUserAccountDetails();
  }, []);

  //Purposly commented

  return (
    <div>
      <p style={{ textAlign: "justify" }}>
        Please answer the questions below to help verify your identity. Please
        provide your response within 5 minutes.
      </p>
      <div className={props.classes.actionsContainer}>
        <div className={props.classes.button_div} >
          {responseData ? <LoadQuestions responseData={responseData} setResponseData={setResponseData} classes={classes} check={check} setCheck={setCheck} /> : <CircularProgress />}
          <div>
        {setOneFinished ? <MultipleQuestion setLoadingFlag={props.setLoadingFlag} next={props.next} transactionIdMultiple={transactionIdMultiple} questionSetIdMultiple={questionSetIdMultiple} responseData={responseDataMultipleQ} setResponseData={setResponseDataMultipleQ} classes={classes} check={check} setCheck={setCheck} /> : null }
        </div>
     
          {
            !setOneFinished ? 
            <ButtonPrimary
            variant="contained"
            color="primary"
            id="button_stepper_next"
            stylebutton='{"marginRight": "10px", "color":"" }'
            onClick={async () => {
              if(check){
              props.setLoadingFlag(true);
              let sendData = {
                "ref": responseData[0]?.fullData?.data?.questions?.transaction_id,
                "answers": {
                  "question_set_id": responseData[0]?.fullData?.data?.questions?.question_set_id,
                  "questions": [{
                    "id": responseData[0].fullData.data.questions?.question["question-id"],
                    "answer": check
                  }]
                }
              }
              let nxtRes = await APICall("/integration/LexisNexis/kba_disambiguate_answer_cac?test=true", sendData, "POST", true);
              let tempArray = [];
              if(nxtRes?.data?.data?.data?.kba){

              setQuestionSetIdMultiple(nxtRes?.data?.data?.data?.kba?.questions["question-set-id"]);
              setTransactionIdMultiple(nxtRes?.data?.data?.data?.kba["transaction-status"]["transaction-id"])
              
              nxtRes?.data?.data?.data?.kba?.questions?.question.map((val, key) => {
                tempArray.push({
                  "key": key,
                  "fullData": val,
                  "question": val.text.statement,
                  "choice": val.choice,
                  "questionId": val["question-id"]
                });
                return null;
              })

              setResponseDataMultipleQ(tempArray);
              setSetOneFinished(true);
              props.setLoadingFlag(false);

            }
            else if(nxtRes.data.data.result === "success" && !nxtRes?.data?.data?.data?.kba && nxtRes?.data?.data?.data?.kba?.failed === true ){
              props.setLoadingFlag(false);
              props.next();
            }
            else{
              props.setLoadingFlag(false);
              toast.error("Something went wrong, Please try again", {
                position: "bottom-left",
                autoClose: 5500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
             
            }

          }
          else{
            props.setLoadingFlag(false);
            toast.error("Select an option to continue", {
              position: "bottom-left",
              autoClose: 5500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
            }}
          >
            {props.activeStep === props?.steps.length - 1 ? "Finish" : "Continue"}
          </ButtonPrimary>

            :

            null
          }


        </div>

      </div>
    </div>
  );
}
