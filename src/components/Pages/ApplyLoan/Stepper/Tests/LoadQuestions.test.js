import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import LoadQuestions from "../LoadQuestions";
import { ThemeProvider } from "@mui/styles";
import { createTheme, StyledEngineProvider } from "@mui/material/styles";

const responseSet = jest.fn();
const checkSet = jest.fn();

const theme = createTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 500000,
    },
  },
});

const component = () => {
  window.scrollTo = jest.fn();

  const classes = {
    smallRadioButton: "makeStyles-smallRadioButton-15",
    divHide: "makeStyles-divHide-16",
    divShow: "makeStyles-divShow-17",
    twoStepWrap: "makeStyles-twoStepWrap-18",
    headingTextWrap: "makeStyles-headingTextWrap-19",
    backArrow: "makeStyles-backArrow-20",
    alignCenterDiv: "makeStyles-alignCenterDiv-21",
    yellowBackArrow: "makeStyles-yellowBackArrow-22",
    otpPaper: "makeStyles-otpPaper-23",
    twoStepPaper: "makeStyles-twoStepPaper-24",
    twoStepHeading: "makeStyles-twoStepHeading-25",
    twoStepParagraph: "makeStyles-twoStepParagraph-26",
    securityCodeText: "makeStyles-securityCodeText-27",
    securityQuestions: "makeStyles-securityQuestions-28",
    radioButtonwrap: "makeStyles-radioButtonwrap-29",
    radioGroupWrap: "makeStyles-radioGroupWrap-30",
    nextButtonGrid: "makeStyles-nextButtonGrid-31",
    otpWrap: "makeStyles-otpWrap-32",
    otpNumber: "makeStyles-otpNumber-33",
    securityQuestionsInput: "makeStyles-securityQuestionsInput-34",
    selectSecurityQuestionsInput: "makeStyles-selectSecurityQuestionsInput-35",
    resetText: "makeStyles-resetText-36",
    securityCubText: "makeStyles-securityCubText-37",
    loadingOn: "makeStyles-loadingOn-38",
    loadingOnWithoutBlur: "makeStyles-loadingOnWithoutBlur-39",
    loadingOff: "makeStyles-loadingOff-40",
    button_div: "makeStyles-button_div-41",
    button_space: "makeStyles-button_space-42",
    skip_button: "makeStyles-skip_button-43",
  };

  const responseData = [
    {
      key: 0,
      fullData: {
        "xmlns:java": "java:com.verid.carbon.integration.datatypes",
        "transaction-status": {
          "transaction-id": "31001093779709",
          "transaction-request-id": "1628391109",
          "accounts-transaction-id": "0",
          "transaction-result": "questions",
        },
        questions: {
          "question-set-id": "2415493849",
          question: {
            "question-id": "3333450369",
            "answer-type": "single",
            text: {
              language: "english",
              statement:
                "Which of the following first names have you also been known by?",
            },
            choice: [
              {
                "choice-id": "7579109209",
                text: {
                  language: "english",
                  statement: "Andre",
                },
              },
              {
                "choice-id": "7579109219",
                text: {
                  language: "english",
                  statement: "Ellen",
                },
              },
              {
                "choice-id": "7579109229",
                text: {
                  language: "english",
                  statement: "Lisa",
                },
              },
              {
                "choice-id": "7579109239",
                text: {
                  language: "english",
                  statement: "Merri",
                },
              },
              {
                "choice-id": "7579109249",
                text: {
                  language: "english",
                  statement: "Ralph",
                },
              },
              {
                "choice-id": "7579109259",
                text: {
                  language: "english",
                  statement: "None of the above",
                },
              },
            ],
            "help-text": {
              language: "english",
              statement:
                "In order to clarify your identity, please select the first name that best matches a name that you may have used recently.  Note that there may be slight misspellings. These are unintentional.",
            },
          },
        },
        information: [
          {
            "information-code": "presentation-details",
            "detail-code": "presentation.response.title",
            "detail-description": "Presentation: A response title",
            "simple-detail": {
              text: "Disambiguate Multiple Possible Identity Matches",
            },
          },
          {
            "information-code": "question-details",
            "detail-code": "icheck.disambiguate",
            "detail-description": "iLocate Disambiguate",
            "complex-detail": {
              heading: "Disambiguate Multiple Possible Identity Matches",
              "simple-detail": [
                {
                  text: "LexisNexis has identified more than one person matching the given information.",
                },
                {
                  text: "Prior to continuing with the authentication, please answer the following question in order to ensure that the proper individual is located:",
                },
              ],
            },
            "simple-detail": {
              text: "Disambiguate Multiple Possible Identity Matches",
            },
          },
        ],
      },
      question:
        "In order to clarify your identity, please select the first name that best matches a name that you may have used recently.  Note that there may be slight misspellings. These are unintentional.",
      choice: [
        {
          "choice-id": "7579109209",
          text: {
            language: "english",
            statement: "Andre",
          },
        },
        {
          "choice-id": "7579109219",
          text: {
            language: "english",
            statement: "Ellen",
          },
        },
        {
          "choice-id": "7579109229",
          text: {
            language: "english",
            statement: "Lisa",
          },
        },
        {
          "choice-id": "7579109239",
          text: {
            language: "english",
            statement: "Merri",
          },
        },
        {
          "choice-id": "7579109249",
          text: {
            language: "english",
            statement: "Ralph",
          },
        },
        {
          "choice-id": "7579109259",
          text: {
            language: "english",
            statement: "None of the above",
          },
        },
      ],
      questionId: "3333450369",
      answer: "",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <LoadQuestions
              responseData={responseData}
              setResponseData={responseSet}
              classes={classes}
              check={null}
              setCheck={checkSet}
            />
          </BrowserRouter>
        </QueryClientProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

test("Question Rendered Correctly", () => {
  render(component());
  const question = screen.getByTestId("loadQuestionGrid");
  expect(question).toBeTruthy();
});

test("Question Rendered Correctly", () => {
  render(component());
  const question = screen.getByTestId("3333450369");
  expect(question).toBeTruthy();
});

test("Question option Rendered Correctly", () => {
  render(component());
  const radio = screen.getByLabelText("Ralph");
  expect(radio).toBeTruthy();
});

test("Options function", () => {
  render(component());
  const radio = screen.getByTestId("7579109229");
  expect(radio).toBeTruthy();
});

test("Question options Click functionality", async () => {
  render(component());
  const radio = screen.getByTestId("7579109229");
  await act(() => {
    fireEvent.click(radio);
  });
});
