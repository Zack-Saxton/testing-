import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ButtonPrimary, Select } from "../../FormsUI";
import "./MultiFactorAuthentication.css";
import Cookies from "js-cookie";
import { useStylesMFA } from "./Style";
import message from "../../../assets/data/globalMessages.json"
import {  saveSecurityAnswer, fetchAllMFAQuestion } from "../../Controllers/MFAController";
import ScrollToTop from "../CheckMyOffers/ScrollToTop";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import "./mfa.css";
import CheckLoginTimeout from '../../Layout/CheckLoginTimeout';
import CheckLoginStatus from '../../App/CheckLoginStatus';


//Yup validations for all the input fields
const questionValidation = () => {
  return yup
  .string(message.Please_Select_Security_Question)
  .max(70, "Maximum of 70")
  .required(message.Please_Select_Security_Question);
}

const answerValidation = () => {
  return yup
  .string(message.provideAnswerForEachQuestion)
  .max(30, message.Security_Question_Answer_Length)
  .min(3, message.Security_Question_Answer_Length)
  .required(message.provideAnswerForEachQuestion);
}
const validationSchema = yup.object({
  question1: questionValidation(),
  question2: questionValidation(),
  question3: questionValidation(),
  question4: questionValidation(),
  question5: questionValidation(),
  answer1: answerValidation(),
  answer2: answerValidation(),
  answer3: answerValidation(),
  answer4: answerValidation(),
  answer5: answerValidation(),
});


const MFASelectSecurityQuestions = () => {
  const classes = useStylesMFA();
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = Cookies.get("email");
  const loginToken = JSON.parse(Cookies.get("token") ? Cookies.get("token") : '{ }');
  const [ questions, setQuestions ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ questionOption, setQuestionOption ] = useState([]);
  const [ selectQuestionArray, setSelectQuestionArry ] = useState([null, null, null, null, null])
  const [ selectOptionArray, setSelectOptionArray ] = useState([[], [], [], [], []])

useEffect(() => {
  if (!location?.state?.currentFlow) {
    navigate("/customers/accountOverview");
  }
  getMFAQuestion();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

    //Form Submission
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        selectSecurityQuestion : "",
        answer : "",
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        answer5: ""
      },

      validationSchema: validationSchema,
      onSubmit: async (values) => {

let selectedQuestionStructured =
[
  {
      "question_id": values.question1,
      "answer": values.answer1
  },
  {
    "question_id": values.question2,
    "answer": values.answer2
  },
  {
    "question_id": values.question3,
    "answer": values.answer3
  },
  {
    "question_id": values.question4,
    "answer": values.answer4
  },
  {
    "question_id": values.question5,
    "answer": values.answer5
  }
];

        let answerData = {
          "email": userEmail,
          "deviceType": navigator.userAgent,
          "securityQuestions": selectedQuestionStructured
        }
        let verify = await saveSecurityAnswer(answerData);
        if(!verify?.data?.hasError && verify?.data?.result === "Ok" && verify?.data?.statusCode === 200 && verify?.data?.user?.attributes?.password_reset)
        {
          setLoading(false)
          toast.success(verify?.data?.Message);
          navigate("/resetpassword", { state: { Email: userEmail }})
        }
        else if(verify?.data?.hasError || verify?.data?.Message)
        {
          setLoading(false)
          toast.error(verify?.data?.Message);
        }
        else
        {
          setLoading(false)
          toast.error("Network error, please try again");
        }
      },
    });



  const getMFAQuestion = async () => {
    let mfaQuestion = await fetchAllMFAQuestion();
    setQuestions(mfaQuestion?.data?.questionsList);
    let mfaQuestionsArray = [];
    mfaQuestion?.data?.questionsList?.forEach((question) => {
      mfaQuestionsArray.push({
        label: question.question,
        value: question.question_id
      })
    })
    setQuestionOption(mfaQuestionsArray);
    let temp = [...selectOptionArray];
    temp[0] = mfaQuestionsArray;
    temp[1] = mfaQuestionsArray;
    temp[2] = mfaQuestionsArray;
    temp[3] = mfaQuestionsArray;
    temp[4] = mfaQuestionsArray;
    setSelectOptionArray(temp)
  }

  const preventSpace = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };

  const handleOnChangeQuestions = (event, index) => {

    formik.handleChange(event);
    let temp = [...selectQuestionArray];
    temp[index] = event.target.value;
    setSelectQuestionArry(temp);

  }
  const getAvailableOptions = (inde) => {
    const availableOptionsLeft = questionOption;
    return availableOptionsLeft.filter(questionOptions => {

        return selectQuestionArray.indexOf(questionOptions.value) === -1 || selectQuestionArray.indexOf(questionOptions.value) === inde;

    });
};

  const backToVerificationStep = () => {
    location?.state?.preVerification ? navigate("/MFA") : navigate(-1);
  }


  return (
    <div>
      <CheckLoginTimeout />
      {loginToken.isLoggedIn ? (
        <>
    <div data-testid="selectSecurityQuestions">
      <ScrollToTop />
      <Grid>
        <Grid
          spacing={1}
          container
          item
          md={10}
          lg={8}
          xl={7}
          className={classes.twoStepWrap}
        >
          <Paper className={classes.twoStepPaper}>
          <form onSubmit={formik.handleSubmit}>
            <Grid className={classes.headingTextWrap}>
            <IconButton className={classes.backArrow} onClick={backToVerificationStep}>
                <ArrowBackIcon className={classes.yellowBackArrow} />
              </IconButton>
              <Typography className={classes.twoStepHeading} variant="h5" data-testid="title">
                Verification Questions Setup
              </Typography>

              <Typography className={classes.securityCubText} variant="h6" data-testid="title1">
                Select five different questions from the list below and enter your answers.<br/>These questions will be used to verify your identity.
              </Typography>

            </Grid>

            <Grid className={classes.otpWrap} container>

              <Grid style={{ width: "100%"}}>
                {
                  questions ?
                      <Grid container>
                      <Grid container>
                      <Grid id="questionGrid" container className="questionWrap" item md={6}  style={{ padding: "10px" }}>
                      <Select
                          id="questionOne"
                          name="question1"
                          labelform="Question 1"
                          value={formik.values.question1}
                          onChange={ (event) => {
                            handleOnChangeQuestions(event, 0)
                          }}
                          onBlur={formik.handleBlur}
                          error={(formik.touched.question1 && Boolean(formik.errors.question1))}
                          helperText={formik.touched.question1 && formik.errors.question1 }
                          select={JSON.stringify(getAvailableOptions(0))}
                        />
                        </Grid>
                        <Grid className="answerGrid" container item md={6}  style={{ padding: "10px" }}>
                        <TextField
                                  id="Answer"
                                  name="answer1"
                                  label="Answer"
                                  type="text"
                                  variant="standard"
                                  inputProps={{maxLength: 30}}
                                  fullWidth
                                  value={formik.values.answer1}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  onKeyDown={preventSpace}
                                  error={(formik.touched.answer1 && Boolean(formik.errors.answer1))}
                                  helperText={formik.touched.answer1 && formik.errors.answer1 }
                                />
                        </Grid>
                        </Grid>
                        <Grid container>
                        <Grid id="questionGrid" container className="questionWrap" item md={6}  style={{ padding: "10px" }}>
                      <Select
                          id="questionTwo"
                          name="question2"
                          labelform="Question 2"
                          value={formik.values.question2}
                          onChange={ (event) => {
                            handleOnChangeQuestions(event, 1)
                          }}
                          onBlur={formik.handleBlur}
                          error={(formik.touched.question2 && Boolean(formik.errors.question2))}
                          helperText={formik.touched.question2 && formik.errors.question2 }
                          select={JSON.stringify(getAvailableOptions(1))}

                        />
                        </Grid>
                        <Grid container className="answerGrid" item md={6}  style={{ padding: "10px" }}>
                        <TextField
                                  id="Answer"
                                  name="answer2"
                                  label="Answer"
                                  type="text"
                                  variant="standard"
                                  inputProps={{maxLength: 30}}
                                  value={formik.values.answer2}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  onKeyDown={preventSpace}
                                  fullWidth
                                  error={(formik.touched.answer2 && Boolean(formik.errors.answer2))}
                                  helperText={formik.touched.answer2 && formik.errors.answer2 }
                                />
                        </Grid>
                        </Grid>
                        <Grid container>
                        <Grid container id="questionGrid" className="questionWrap" item md={6}  style={{ padding: "10px" }}>
                      <Select
                          id="questionThree"
                          name="question3"
                          labelform="Question 3"
                          value={formik.values.question3}
                          onChange={ (event) => {
                            handleOnChangeQuestions(event, 2)
                          }}
                          onBlur={formik.handleBlur}
                          error={(formik.touched.question3 && Boolean(formik.errors.question3))}
                          helperText={formik.touched.question3 && formik.errors.question3 }
                          select={JSON.stringify(getAvailableOptions(2))}

                        />
                        </Grid>
                        <Grid container className="answerGrid" item md={6}  style={{ padding: "10px" }}>
                        <TextField
                                  id="Answer"
                                  name="answer3"
                                  label="Answer"
                                  type="text"
                                  variant="standard"
                                  inputProps={{maxLength: 30}}
                                  fullWidth
                                  value={formik.values.answer3}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  onKeyDown={preventSpace}
                                  error={(formik.touched.answer3 && Boolean(formik.errors.answer3))}
                                  helperText={formik.touched.answer3 && formik.errors.answer3 }
                                />
                        </Grid>
                        </Grid>
                        <Grid container>
                        <Grid container id="questionGrid" className="questionWrap" item md={6}  style={{ padding: "10px" }}>
                      <Select
                          id="questionFour"
                          name="question4"
                          labelform="Question 4"
                          value={formik.values.question4}
                          onChange={ (event) => {
                            handleOnChangeQuestions(event, 3)
                          }}
                          onBlur={formik.handleBlur}
                          error={(formik.touched.question4 && Boolean(formik.errors.question4))}
                          helperText={formik.touched.question4 && formik.errors.question4 }
                          select={JSON.stringify(getAvailableOptions(3))}

                        />
                        </Grid>
                        <Grid container className="answerGrid" item md={6}  style={{ padding: "10px" }}>
                        <TextField
                                  id="Answer"
                                  name="answer4"
                                  label="Answer"
                                  type="text"
                                  variant="standard"
                                  inputProps={{maxLength: 30}}
                                  fullWidth
                                  value={formik.values.answer4}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  onKeyDown={preventSpace}
                                  error={(formik.touched.answer4 && Boolean(formik.errors.answer4))}
                                  helperText={formik.touched.answer4 && formik.errors.answer4 }
                                />
                        </Grid>
                        </Grid>
                        <Grid container>
                        <Grid id="questionGrid" container className="questionWrap" item md={6}  style={{ padding: "10px" }}>
                      <Select
                          id="questionFive"
                          name="question5"
                          labelform="Question 5"
                          value={formik.values.question5}
                          onChange={ (event) => {
                            handleOnChangeQuestions(event, 4)
                          }}
                          onBlur={formik.handleBlur}
                          error={(formik.touched.question5 && Boolean(formik.errors.question5))}
                          helperText={formik.touched.question5 && formik.errors.question5 }
                          select={JSON.stringify(getAvailableOptions(4))}
                        />
                        </Grid>
                        <Grid container className="answerGrid" item md={6}  style={{ padding: "10px" }}>
                        <TextField
                                  id="Answer"
                                  name="answer5"
                                  label="Answer"
                                  type="text"
                                  variant="standard"
                                  inputProps={{maxLength: 30}}
                                  fullWidth
                                  value={formik.values.answer5}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  onKeyDown={preventSpace}
                                  error={(formik.touched.answer5 && Boolean(formik.errors.answer5))}
                                  helperText={formik.touched.answer5 && formik.errors.answer5 }
                                  />
                        </Grid>
                        </Grid>
                      </Grid>
                  :
                  <p>Something went wrong</p>
                }
              </Grid>
            </Grid>
            <Grid className={classes.nextButtonGrid} container>
              <ButtonPrimary stylebutton='{"color":""}' disabled = { loading }  type="submit" >
                Submit Answers
              </ButtonPrimary>
            </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
    </>
      ) : (
        <CheckLoginStatus />
      )}
    </div>
  );
};

export default MFASelectSecurityQuestions;
