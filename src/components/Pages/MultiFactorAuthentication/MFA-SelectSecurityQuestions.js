import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonPrimary, Select, Checkbox } from "../../FormsUI";
import "./MultiFactorAuthentication.css";
import Cookies from "js-cookie";
import { useStylesMFA } from "./Style";
import { fetchQuestionMFA, saveSecurityAnswer, fetchAllMFAQuestion } from "../../Controllers/MFAController";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { ConstructionOutlined } from "@mui/icons-material";


//Yup validations for all the input fields
const validationSchema = yup.object({
  answer: yup
    .string("Enter your answer")
    .trim()
    .max(30, "Should be maximum of 30 characters")
    .required("Enter your answer"),
  selectSecurityQuestion: yup
    .string("Please select a security question")
    .max(70, "Maximum of 70")
    .required("Please select a security question"),
});


const MFASelectSecurityQuestions = () => {
  const classes = useStylesMFA();
  const navigate = useNavigate();
  const userEmail = Cookies.get("email");
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
          email: userEmail,
          deviceType: navigator.userAgent,
          securityQuestions: [
              {question_id: values.selectSecurityQuestion, answer: values.answer} 
          ]
        }

        let verify = await saveSecurityAnswer(answerData);
        if(verify?.data?.hasError === false  && verify?.data?.result === "ok")
        {
          toast.success(verify?.data?.Message);
          const tokenString = Cookies.get("token") ? Cookies.get("token") : '{ }';
          let userToken = JSON.parse(tokenString);
          userToken.isMFACompleted = true;
          Cookies.set("token",JSON.stringify(userToken));
          navigate("/customers/accountoverview")
        }
        else if (verify?.data?.hasError === true && verify?.data?.result === "error")
        {
          toast.error(verify?.data?.Message);
        }
        else {
          toast.error("Network error");
        }
      },
    });

    const handleAdd = (selectData) => {
      const newRecord = [ ...selectData ];
      // newRecord.push(selectedOffer);
      setSelectedQuestions(newRecord);  
    };

    const addSelectedQuestion = (row) => {
      let offersComp = selectedQuestions;

        if (offersComp.findIndex((offerInfo) => offerInfo.id === row.question_id) === -1) {
          // if(offersComp.length <)
          let temp = {
            question: row.question,
            id: row.question_id,
            answer: ""
          }
          offersComp.push(temp)
        } else {
          offersComp.splice( offersComp.findIndex((offerInfo) => offerInfo.id === row.question_id), 1);
        } 
      handleAdd(offersComp);
    };




  const getMFAQuestion  = async () => { 
    let mfaQuestion = await fetchAllMFAQuestion();
    setQuestions(mfaQuestion.data.questionsList);
  }

  const handleAnswerOnchange = (event, que) => {
    let tempt = selectedQuestions
    tempt[selectedQuestions.findIndex( (x) => x.id === que.question_id )].answer = event.target.value;
    handleAdd(tempt);
  }

  const onClickSave = async () => {
  
    if(selectedQuestions.length === 5) {
      let selectedQuestionsArray = [];
      selectedQuestions.forEach((question) => {
        selectedQuestionsArray.push({
          question_id: question.id,
          answer: question.answer
        })
      })
      
      let answerData = {   
        "email": userEmail,
        "deviceType": navigator.userAgent,
        "securityQuestions": selectedQuestionsArray
      }
      let verify = await saveSecurityAnswer(answerData);
      if(!verify?.data?.hasError && verify?.data?.result === "Ok" && verify?.data?.statusCode === 200)
      {
        toast.success(verify?.data?.Message);
        navigate("/customers/accountoverview")
      }
      else if(verify?.data?.hasError || verify?.data?.Message)
      {
        toast.error(verify?.data?.Message);
      }
      else
      {
        toast.error("Network error, please try again");
      }
    } else {
      toast.error("please slect 5 questions");
    }
  }

  useEffect(() => {

    getMFAQuestion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
  }, [selectedQuestions]);

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
                
              <Grid>
                {
                  questions ?
                  questions.map((que, index) => {
                    return(
                      // <p key={index}>{que.question}</p>
                      <Grid key={index} container>
                      <Grid
                        
                        className={classes.selectSecurityQuestionsInput}
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                      >
                      <Checkbox
                               
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
                              </Grid>
                              <Grid
                                // className={classes.securityQuestionsInput}
                                className={
                                  selectedQuestions.findIndex(
                                    (x) => x.id === que.question_id
                                  ) === -1
                                    ? `${classes.divHide} ${classes.securityQuestionsInput}`
                                    : `${classes.divShow} ${classes.securityQuestionsInput}`
                                }
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
                                  className={
                                    selectedQuestions.findIndex(
                                      (x) => x.id === que.question_id
                                    ) === -1
                                      ? classes.divHide
                                      : classes.divShow
                                  }
                                  value={ selectedQuestions ? selectedQuestions[selectedQuestions.findIndex( (x) => x.id === que.question_id )]?.answer : ""}
                                  onChange={(event) => {
                                    handleAnswerOnchange(event, que)
                                  }}
                                  // onBlur={formik.handleBlur}
                                  // error={formik.touched.answer && Boolean(formik.errors.answer)}
                                  // helperText={formik.touched.answer && formik.errors.answer}
                                />
                              </Grid>
                              </Grid>
                    )
                    
                  })
                  : 
                  <p>Empty</p>
                }
              </Grid>
            </Grid>
            <Grid className={classes.nextButtonGrid} container>
              <ButtonPrimary stylebutton='{"color":""}' onClick={() => {
                onClickSave()
              }}>
                Save
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
