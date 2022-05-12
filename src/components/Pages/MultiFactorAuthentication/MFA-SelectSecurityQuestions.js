import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { ButtonPrimary, Select, Checkbox } from "../../FormsUI";
import "./MultiFactorAuthentication.css";
import { useStylesMFA } from "./Style";
import { fetchQuestionMFA, saveSecurityAnswer, fetchAllMFAQuestion } from "../../Controllers/MFAController";
import { useFormik } from "formik";
import * as yup from "yup";
import { ConstructionOutlined } from "@mui/icons-material";


//Yup validations for all the input fields
const validationSchema = yup.object({
  answer: yup
    .string("Enter your answer")
    .trim()
    .max(30, "Should be maximum of 50 characters")
    .required("Enter your answer"),
  selectSecurityQuestion: yup
    .string("Please select a security question")
    .max(70, "Maximum of 70")
    .required("Please select a security question"),
});


const MFASelectSecurityQuestions = () => {
  const classes = useStylesMFA();
  let questionArray = [];
  // const { questions, setQuestions } = useState([]); 
  const [ questions, setQuestions ] = useState([]);
  const [ selectedQuestions, setSelectedQuestions ] = useState([]);



    //Form Submission
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        selectSecurityQuestion : "",
        answer : ""
      },
  
      validationSchema: validationSchema,
      onSubmit: async (values) => {

        let answerData = {
          email: "zdunkerton@marinerfinance.com",
          deviceType: "IPhone NEW!!",
          securityQuestions: [
              {question_id: values.selectSecurityQuestion, answer: values.answer} 
          ]
        }

        let verify = await saveSecurityAnswer(answerData);
        if(verify?.data?.hasError === false  && verify?.data?.result === "ok")
        {
          alert("verification successfull");
        }
        else if (verify?.data?.hasError === true && verify?.data?.result === "error")
        {
          alert("verificatiofailed");
        }
        else {
          alert("network error");
        }
      },
    });

    const handleAdd = (selectedOffer) => {
      const newRecord = [ ...selectData ];
      newRecord.push(selectedOffer);
      setSelectData(newRecord);
    };

    const addSelectedQuestion = (row) => {
      let offersComp = selectedQuestions;
      
      if (offersComp.findIndex((offerInfo) => offerInfo.id === row.question_id) === -1) {
        let temp = {
          question: row.question,
          id: row.question_id,
          answer: ""
        }
        offersComp.push(temp)
      } else {
        // offersComp.findIndex((offerInfo) => offerInfo._id === row._id) === -1
        // 	? offersComp.push(row)
        // :
        offersComp.splice(row, 1);
      }
      setSelectedQuestions(offersComp);
      console.log("offersComp", offersComp)
      // handleAdd(row);
    };

    console.log("selectedQuestions",selectedQuestions);



  const getMFAQuestion  = async () => {
    let emailData = {
      email: "zdunkerton@marinerfinance.com"
    }
    let mfaQuestion = await fetchAllMFAQuestion();
    console.log(mfaQuestion.data.questionsList);
    setQuestions(mfaQuestion.data.questionsList);
//     mfaQuestion?.data?.MFAInformation?.securityQuestions.forEach(element => {
//       questionArray.push(
//         {
//           "label": element.question, 
//           "value": element.question_id
//         }
//       )
//     });
// setQuestions(questionArray)
  }

  useEffect(() => {

    getMFAQuestion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(selectedQuestions);
  }, [selectedQuestions]);

  console.log("question", questions);
  return (
    <div>
      <Grid>
        <Grid
          spacing={1}
          container
          item
          md={6}
          lg={6}
          xl={6}
          className={classes.twoStepWrap}
        >
          <Paper className={classes.twoStepPaper}>
          <form onSubmit={formik.handleSubmit}>
            <Grid className={classes.headingTextWrap}>
              <Typography className={classes.twoStepHeading} variant="h5">
                Select Security Questions
              </Typography>
              <Typography className={classes.securityCubText} variant="h6">
                Select 5 questions and fill the answers
              </Typography>
              <IconButton className={classes.backArrow}>
                <ArrowBackIcon className={classes.yellowBackArrow} />
              </IconButton>
            </Grid>
            
            <Grid className={classes.otpWrap} container>
              <Grid
                className={classes.securityQuestionsInput}
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <TextField
                  id="Answer"
                  name="answer"
                  label="Answer"
                  type="text"
                  variant="standard"
                  fullWidth
                  value={formik.values.answer}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.answer && Boolean(formik.errors.answer)}
                  helperText={formik.touched.answer && formik.errors.answer}
                />
              </Grid>   
              <Grid>
                <p>hello</p>
                {
                  questions ?
                  questions.map((que, index) => {
                    return(
                      // <p key={index}>{que.question}</p>
                      <Checkbox
                                key={index}
                                name="offerToCompare"
                                label={que.question}
                                labelid="offerToCompare"
                                testid="checkbox"
                                value={que.question_id}
                                onChange={ () => {
                                  addSelectedQuestion(que)
                                }}
                                checked={
                                  selectedQuestions.findIndex(
                                    (x) => x.id === que.question_id
                                  ) === -1
                                    ? false
                                    : true
                                }
                                // checked={true}
                                // onChange={() => {
                                //   selectOfferToCompare(row);
                                // }}
                                stylelabelform='{ "color":"" }'
                                stylecheckbox='{ "color":"" }'
                                stylecheckboxlabel='{ "color":"" }'
                              />
                    )
                    
                  })
                  : 
                  <p>Empty</p>
                }
              </Grid>
            </Grid>
            <Grid className={classes.nextButtonGrid} container>
              <ButtonPrimary stylebutton='{"color":""}' type="submit">
                Verify Now
              </ButtonPrimary>
            </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default MFASelectSecurityQuestions;
