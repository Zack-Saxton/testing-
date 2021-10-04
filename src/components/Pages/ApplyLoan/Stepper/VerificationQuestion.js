import React, { useEffect, useState} from "react";
import { ButtonPrimary, ButtonSecondary} from "../../../FormsUI";
import {makeStyles} from "@material-ui/core/styles";
import APICall from '../../../App/APIcall';
import LoadQuestions from './LoadQuestions'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  content_grid: {
    marginTop: "15px",
  },
}));

//View Part
export default function VerificationQuestion(props) {

  let response;
  const classes = useStyles();
  // let dat = '[{"label":"Option1", "value":"option1"},{"label":"Option2", "value":"option2"}, {"label":"Option3", "value":"option3"},{"label":"Option4", "value":"option4"}]';
  const [responseData, setResponseData ] = useState([]);
  const [check, setCheck ] = useState(null);
  // const [questionList, setQuestionList] = useState([]);

  async function getUserAccountDetails() {
    let url = "/integration/lexisnexis/kba_questions_cac?test=true", 
      data = {},
      method = "POST",
      addAccessToken = true;
      response = await APICall(url, data, method, addAccessToken);
      
    
    let tempArray = [];
if(response.data.data.questions){
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

  useEffect(() => {
    getUserAccountDetails();
  }, []);




  const buildOptions = (options) => {
    let newArr = [];
    if(options){
      options.map((question) => {
        newArr.push({"label": question?.text?.statement, "value": question["choice-id"]});
        return null;
      })
    }
    
    return JSON.stringify(newArr);
    // return '[{"label":"Option908", "value":"option1"}, {"label":"Option2", "value":"option2"}, {"label":"Option3", "value":"option3"},{"label":"Option4", "value":"option4"}]';
  }



  return (
    <div>
      <p style={{ textAlign: "justify" }}>
        Please answer the questions below to help verify your identity. Please
        provide your response within 5 minutes.
      </p>


      <div className={props.classes.actionsContainer}>
          <div className={props.classes.button_div} >
          {responseData ? <LoadQuestions  responseData={responseData} setResponseData={setResponseData} classes={classes}  check={check} setCheck={setCheck}/>  : <CircularProgress /> }
            <ButtonSecondary
              stylebutton='{"marginRight": "10px", "color":"" }'
              onClick={props.reset}
              id = "button_stepper_reset"
            >
              Reset
            </ButtonSecondary>
            
            <ButtonSecondary
              disabled={props?.activeStep === 0}
              onClick={props?.prev}
              id = "button_stepper_prev"
              stylebutton='{"marginRight": "10px", "color":"" }'
            >
              Prev
            </ButtonSecondary>
            <ButtonPrimary
              variant="contained"
              color="primary"
              id = "button_stepper_next"
              stylebutton='{"marginRight": "10px", "color":"" }'
              onClick={async ()=>{ 
                let sendData = {
                  "ref": responseData?.data?.data?.questions?.transaction_id,
                  "answers": {
                  "question_set_id": responseData?.data?.data?.questions?.question_set_id,
                  "questions": [{
                  "id": responseData?.data?.data?.questions?.question["question-id"],
                  "answer": check
                  }]
                  }
                 }
                let nxtRes = await APICall("/integration/LexisNexis/kba_disambiguate_answer_cac?test=true", sendData, "POST", true);
                let tempArray = [];
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
                // setQuestionList(tempArray);
                props.next('') 
              }}
            >
              {props.activeStep === props?.steps.length - 1 ? "Finish" : "Next"}
            </ButtonPrimary>
          </div>
        </div>
    </div>
  );
}
