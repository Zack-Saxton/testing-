import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { ButtonPrimary, Select } from "../../FormsUI";
import "./MultiFactorAuthentication.css";
import { useStylesMFA } from "./Style";
import { fetchQuestionMFA, saveSecurityAnswer } from "../../Controllers/MFAController";
import { useFormik } from "formik";
import * as yup from "yup";


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


const MFASecurityQuestions = () => {
  const classes = useStylesMFA();
  let questionArray = [];
  // const { questions, setQuestions } = useState([]); 
  const [ questions, setQuestions ] = useState([]);


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
  const getMFAQuestion  = async () => {
    let emailData = {
      email: "zdunkerton@marinerfinance.com"
    }
    let mfaQuestion = await fetchQuestionMFA(emailData);

    mfaQuestion?.data?.MFAInformation?.securityQuestions.forEach(element => {
      questionArray.push(
        {
          "label": element.question, 
          "value": element.question_id
        }
      )
    });
setQuestions(questionArray)
  }

  useEffect(() => {

    getMFAQuestion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                Security Questions
              </Typography>
              <Typography className={classes.securityCubText} variant="h6">
                Answers are not case sensitive
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
                <Select
                          id="selectSecurityQuestion"
                          name="selectSecurityQuestion"
                          labelform="Select security question"
                          value={formik.values.selectSecurityQuestion}
                          onChange={formik.handleChange}
                          // refId={refCitizenship}
                          onBlur={formik.handleBlur}
                          error={(formik.touched.selectSecurityQuestion && Boolean(formik.errors.selectSecurityQuestion)) }
                          helperText={ formik.touched.selectSecurityQuestion && formik.errors.selectSecurityQuestion }
                          // select='[{"label": "USA Citizen", "value": "USA Citizen"},
                          //         {"label": "Permanent Resident", "value": "Permanent Resident"},
                          //         {"label": "Foreign Resident", "value": "Foreign Resident"}]'
                          select = { questions ? JSON.stringify(questions) : '[]' }
                          // select = { JSON.stringify(questions)  }
                        />
              </Grid>
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

export default MFASecurityQuestions;
