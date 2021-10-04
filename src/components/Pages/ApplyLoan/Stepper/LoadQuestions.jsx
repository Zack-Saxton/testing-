import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Radio} from "../../../FormsUI";
import { useState} from "react";


const buildOptions = (options) => {
    let newArr = [];
    if(options){
      options.map((question) => {
        newArr.push({"label": question?.text?.statement, "value": question["choice-id"]});
        return null;
      })
    }

return JSON.stringify(newArr);
    
}

  // let dat = '[{"label":"Option1", "value":"option1"},{"label":"Option2", "value":"option2"}, {"label":"Option3", "value":"option3"},{"label":"Option4", "value":"option4"}]';


export default function LoadQuestions(props) {
  const [check, setCheck ] = useState(null);


    return(
        <>
        {
           
            props.responseData.map((question, index) => {
            //  <Typography>{question?.question}</Typography>
            return(
            <Grid key={index} item xs={12} >
            <Typography>{question?.question}</Typography> 
            <Radio
            name="question"
            radiolabel={buildOptions(question.choice)}
            
            // radiolabel={() => {buildOptions(JSON.stringify(props.responseData?.data?.data?.questions?.question?.choice))}}
            // value="male"
            value = {check}
            checked = {check}
            onClick = {setCheck}  
            row={true}
            required={true}
            labelplacement={"end"}
            style={{ fontWeight: "normal" }}
        />
       </Grid>);
       })

    }
     {/* <Grid item xs={12} >
            <Typography>Question</Typography> 
            <Radio
            name="question"
            radiolabel={dat}
            // radiolabel={() => {JSON.stringify( buildOptions(props.responseData?.data?.data?.questions?.question?.text?.choice))}}
            // value="male"
            // value = {check}
            checked = {check}
            onClick = {setCheck}  
            row={true}
            required={true}
            labelplacement={"end"}
            style={{ fontWeight: "normal" }}
        />
      </Grid> */}
      <Grid container>
      {/* <ButtonPrimary
              onClick={async () => {
                let data = {

                  "ref": "31000708040989",
              
                  "answers": {
              
                  "question_set_id": props?.responseData[0].fullData.data.questions.transaction_id,
              
                  "questions": [{
              
                      "id": props?.responseData[0].questionId,
              
                      "answer": check
              
                      }]
                  }
              }

              let nxtRes = await APICall("/integration/LexisNexis/kba_disambiguate_answer_cac?test=true", data, "POST", true);
       
              }}
              id = "button_stepper_prev"
              stylebutton='{"margin": "20px", "color":"" }'
            >
              Next
            </ButtonPrimary> */}
            </Grid>
        </ >
    );
}