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
import message from "../../../assets/data/globalMessages.json"
import { fetchQuestionMFA, saveSecurityAnswer, fetchAllMFAQuestion } from "../../Controllers/MFAController";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { ConstructionOutlined, FormatLineSpacingOutlined, TrendingUpTwoTone } from "@mui/icons-material";


//Yup validations for all the input fields
const validationSchema = yup.object({

  question1: yup
    .string(message.Please_Select_Security_Question)
    .max(70, "Maximum of 70")
    .required(message.Please_Select_Security_Question),
  question2: yup
    .string(message.Please_Select_Security_Question)
    .max(70, "Maximum of 70")
    .required(message.Please_Select_Security_Question),  
  question3: yup
    .string(message.Please_Select_Security_Question)
    .max(70, "Maximum of 70")
    .required(message.Please_Select_Security_Question),  
  question4: yup
    .string(message.Please_Select_Security_Question)
    .max(70, "Maximum of 70")
    .required(message.Please_Select_Security_Question),
  question5: yup
    .string(message.Please_Select_Security_Question)
    .max(70, "Maximum of 70")
    .required(message.Please_Select_Security_Question),
    answer1: yup
    .string(message.provideAnswerForEachQuestion)
    .max(40, message.Security_Question_Answer_Length)
    .min(3, message.Security_Question_Answer_Length)
    .required(message.provideAnswerForEachQuestion),
    answer2: yup
    .string(message.provideAnswerForEachQuestion)
    .max(40, message.Security_Question_Answer_Length)
    .min(3, message.Security_Question_Answer_Length)
    .required(message.provideAnswerForEachQuestion),
    answer3: yup
    .string(message.provideAnswerForEachQuestion)
    .max(40, message.Security_Question_Answer_Length)
    .min(3, message.Security_Question_Answer_Length)
    .required(message.provideAnswerForEachQuestion),
    answer4: yup
    .string(message.provideAnswerForEachQuestion)
    .max(40, message.Security_Question_Answer_Length)
    .min(3, message.Security_Question_Answer_Length)
    .required(message.provideAnswerForEachQuestion),
    answer5: yup
    .string(message.provideAnswerForEachQuestion)
    .max(40, message.Security_Question_Answer_Length)
    .min(3, message.Security_Question_Answer_Length)
    .required(message.provideAnswerForEachQuestion),
});


const MFASelectSecurityQuestions = () => {
  const classes = useStylesMFA();
  const navigate = useNavigate();
  const userEmail = Cookies.get("email");
  let questionArray = [];
  // const { questions, setQuestions } = useState([]); 
  const [ questions, setQuestions ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ questionOption, setQuestionOption ] = useState([]);
  const [ selectedQuestions, setSelectedQuestions ] = useState([]);
  let constQuestions;

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
        if(!verify?.data?.hasError && verify?.data?.result === "Ok" && verify?.data?.statusCode === 200)
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

    // const handleAdd = (selectData) => {
    //   const newRecord = [ ...selectData ];
    //   // newRecord.push(selectedOffer);
    //   setSelectedQuestions(newRecord);  
    // };





  const getMFAQuestion = async () => {
    let mfaQuestion = await fetchAllMFAQuestion();
    setQuestions(mfaQuestion.data.questionsList);
    let mfaQuestionsArray = [];
    mfaQuestion.data.questionsList.forEach((question) => {
      mfaQuestionsArray.push({
        label: question.question,
        value: question.question_id
      })
    })
    setQuestionOption(mfaQuestionsArray);
    constQuestions = mfaQuestionsArray;
  }

  const preventSpace = (event) => {
    if (event.keyCode === 32) {
      event.preventDefault();
    }
  };


  const onClickSave = async () => {
    if (selectedQuestions.length === 5) {
      setLoading(true);
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
      if (!verify?.data?.hasError && verify?.data?.result === "Ok" && verify?.data?.statusCode === 200) {
        setLoading(false)
        toast.success(verify?.data?.Message);
        navigate("/resetpassword", { state: { Email: userEmail }})
      }
      else if (verify?.data?.hasError || verify?.data?.Message) {
        setLoading(false)
        toast.error(verify?.data?.Message);
      }
      else {
        setLoading(false)
        toast.error("Network error, please try again");
      }
    } else {
      toast.error("please slect 5 questions");
    }
  }



  const filterSelectOption = (options) => {
    let finalOptionArray = options;
    options.map((option) => {
      if(option.value === formik.values.question1 || option.value === formik.values.question2 ){
        finalOptionArray.splice( finalOptionArray.findIndex((finOption) => finOption.value === option.value), 1);
      }
    })
    return finalOptionArray;
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
          md={10}
          lg={8}
          xl={7}
          className={classes.twoStepWrap}
        >
          <Paper className={classes.twoStepPaper}>
          <form onSubmit={formik.handleSubmit}>
            <Grid className={classes.headingTextWrap}>
              <Typography className={classes.twoStepHeading} variant="h5">
                Verification Questions Setup
              </Typography>
              
              <Typography className={classes.securityCubText} variant="h6">
                Select five different questions from the list below and enter your answers.
              </Typography>
              <IconButton className={classes.backArrow}>
                <ArrowBackIcon className={classes.yellowBackArrow} />
              </IconButton>
            </Grid>
            
            <Grid className={classes.otpWrap} container>
                
              <Grid style={{ width: "100%"}}>
                {
                  questions ?
                      <Grid container>
                      <Grid container>
                      <Grid container className="questionWrap" item md={6}  style={{ padding: "10px" }}>
                      <Select
                          id="question1"
                          name="question1"
                          labelform="Question 1"
                          value={formik.values.question1}
                          onChange={ (event) => {

                            formik.handleChange(event);
                          }}
                          onBlur={formik.handleBlur}
                          error={(formik.touched.question1 && Boolean(formik.errors.question1))}
                          helperText={formik.touched.question1 && formik.errors.question1 }
                          select={JSON.stringify(questionOption)}
                        />      
                        </Grid>
                        <Grid className="answerGrid" container item md={6}  style={{ padding: "10px" }}>
                        <TextField
                                  id="Answer"
                                  name="answer1"
                                  label="Answer"
                                  type="text"
                                  variant="standard"
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
                        <Grid container className="questionWrap" item md={6}  style={{ padding: "10px" }}>
                      <Select
                          id="question2"
                          name="question2"
                          labelform="Question 2"
                          value={formik.values.question2}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={(formik.touched.question2 && Boolean(formik.errors.question2))}
                          helperText={formik.touched.question2 && formik.errors.question2 }
                          select={JSON.stringify(questionOption)}
                        />      
                        </Grid>
                        <Grid container className="answerGrid" item md={6}  style={{ padding: "10px" }}>
                        <TextField
                                  id="Answer"
                                  name="answer2"
                                  label="Answer"
                                  type="text"
                                  variant="standard"
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
                        <Grid container className="questionWrap" item md={6}  style={{ padding: "10px" }}>
                      <Select
                          id="question3"
                          name="question3"
                          labelform="Question 3"
                          value={formik.values.question3}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={(formik.touched.question3 && Boolean(formik.errors.question3))}
                          helperText={formik.touched.question3 && formik.errors.question3 } 
                          select={JSON.stringify(questionOption)}
                        />      
                        </Grid>
                        <Grid container className="answerGrid" item md={6}  style={{ padding: "10px" }}>
                        <TextField
                                  id="Answer"
                                  name="answer3"
                                  label="Answer"
                                  type="text"
                                  variant="standard"
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
                        <Grid container className="questionWrap" item md={6}  style={{ padding: "10px" }}>
                      <Select
                          id="question4"
                          name="question4"
                          labelform="Question 4"
                          value={formik.values.question4}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={(formik.touched.question4 && Boolean(formik.errors.question4))}
                          helperText={formik.touched.question4 && formik.errors.question4 }
                          select={JSON.stringify(questionOption)}
                        />      
                        </Grid>
                        <Grid container className="answerGrid" item md={6}  style={{ padding: "10px" }}>
                        <TextField
                                  id="Answer"
                                  name="answer4"
                                  label="Answer"
                                  type="text"
                                  variant="standard"
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
                        <Grid container className="questionWrap" item md={6}  style={{ padding: "10px" }}>
                      <Select
                          id="question5"
                          name="question5"
                          labelform="Question 5"
                          value={formik.values.question5}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={(formik.touched.question5 && Boolean(formik.errors.question5))}
                          helperText={formik.touched.question5 && formik.errors.question5 }
                          select={JSON.stringify(questionOption)}
                        />      
                        </Grid>
                        <Grid container className="answerGrid" item md={6}  style={{ padding: "10px" }}>
                        <TextField
                                  id="Answer"
                                  name="answer5"
                                  label="Answer"
                                  type="text"
                                  variant="standard"
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
                  <p>Empty</p>
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
  );
};

export default MFASelectSecurityQuestions;
