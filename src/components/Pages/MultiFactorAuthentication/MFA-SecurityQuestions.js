import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ButtonPrimary } from "../../FormsUI";
import "./MultiFactorAuthentication.css";
import { useStylesMFA } from "./Style";
import { saveSecurityAnswer } from "../../Controllers/MFAController";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import * as yup from "yup";

//Yup validations for all the input fields
const validationSchema = yup.object({
  answer: yup
    .string("Enter your answer")
    .trim()
    .max(30, "Should be maximum of 30 characters")
    .required("Enter your answer"),
});

const MFASecurityQuestions = () => {
  const classes = useStylesMFA();
  let location = useLocation();
  const navigate = useNavigate();
  const [selectedQuestions, setSelectedQuestions] = useState();

  //Form Submission
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      answer: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const userEmail = Cookies.get("email");

      let answerData = {
        email: userEmail,
        deviceType: navigator.userAgent,
        securityQuestions: [
          {
            question_id: selectedQuestions?.question_id,
            answer: values.answer,
          },
        ],
      };

      let verify = await saveSecurityAnswer(answerData);
      if (verify?.data?.hasError === false && verify?.data?.result === "Ok") {
        toast.success(verify?.data?.Message);
        const tokenString = Cookies.get("token") ? Cookies.get("token") : "{ }";
        let userToken = JSON.parse(tokenString);
        userToken.isMFACompleted = true;
        Cookies.set("token", JSON.stringify(userToken));
        navigate("/customers/accountoverview");
      } else if (
        verify?.data?.hasError === true &&
        verify?.data?.result === "error"
      ) {
        toast.error(verify?.data?.Message);
      } else {
        toast.error("Network error");
      }
    },
  });
  const getMFAQuestion = () => {
    let question =
      location?.state?.mfaSecurityQuestions?.mfaDetails?.securityQuestions;
    let questionArray = question[Math.floor(Math.random() * question?.length)];
    setSelectedQuestions(questionArray);
  };

  const backToVerificationStep = () => {
    navigate(-1);
  };

  useEffect(() => {
    getMFAQuestion();
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
                <IconButton
                  className={classes.backArrow}
                  onClick={backToVerificationStep}
                >
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
                    label={selectedQuestions?.question}
                    type="text"
                    variant="standard"
                    fullWidth
                    value={formik.values.answer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.answer && Boolean(formik.errors.answer)
                    }
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
