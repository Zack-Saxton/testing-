import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import {render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import MultipleQuestion from "./MultipleQuestion";
import { ThemeProvider } from "@mui/styles";
import { createTheme, StyledEngineProvider } from "@mui/material/styles";

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

const check = "7612496809";

const questionSetIdMultiple = "2417736839";

const responseDataMultipleQ = [
{
    "key": 0,
    "fullData": {
        "question-id": "3340113679",
        "answer-type": "single",
        "text": {
            "language": "english",
            "statement": "Which team nickname is associated with a college you attended?"
        },
        "choice": [
            {
                "choice-id": "7612497539",
                "text": {
                    "language": "english",
                    "statement": "Crusaders"
                }
            },
            {
                "choice-id": "7612497549",
                "text": {
                    "language": "english",
                    "statement": "Eagles"
                }
            },
            {
                "choice-id": "7612497559",
                "text": {
                    "language": "english",
                    "statement": "Roadrunners"
                }
            },
            {
                "choice-id": "7612497569",
                "text": {
                    "language": "english",
                    "statement": "Tigers"
                }
            },
            {
                "choice-id": "7612497579",
                "text": {
                    "language": "english",
                    "statement": "Vikings"
                }
            },
            {
                "choice-id": "7612497589",
                "text": {
                    "language": "english",
                    "statement": "None of the above"
                }
            }
        ],
        "help-text": {
            "language": "english",
            "statement": "Select the athletic team name on the college you have attended."
        }
    },
    "question": "Which team nickname is associated with a college you attended?",
    "choice": [
        {
            "choice-id": "7612497539",
            "text": {
                "language": "english",
                "statement": "Crusaders"
            }
        },
        {
            "choice-id": "7612497549",
            "text": {
                "language": "english",
                "statement": "Eagles"
            }
        },
        {
            "choice-id": "7612497559",
            "text": {
                "language": "english",
                "statement": "Roadrunners"
            }
        },
        {
            "choice-id": "7612497569",
            "text": {
                "language": "english",
                "statement": "Tigers"
            }
        },
        {
            "choice-id": "7612497579",
            "text": {
                "language": "english",
                "statement": "Vikings"
            }
        },
        {
            "choice-id": "7612497589",
            "text": {
                "language": "english",
                "statement": "None of the above"
            }
        }
    ],
    "questionId": "3340113679"
},
{
    "key": 1,
    "fullData": {
        "question-id": "3340113689",
        "answer-type": "single",
        "text": {
            "language": "english",
            "statement": "What kind of MN license plate has been on your 1999 Mitsubishi Diamante?"
        },
        "choice": [
            {
                "choice-id": "7612497599",
                "text": {
                    "language": "english",
                    "statement": "Disabled Veteran"
                }
            },
            {
                "choice-id": "7612497609",
                "text": {
                    "language": "english",
                    "statement": "Handicapped"
                }
            },
            {
                "choice-id": "7612497619",
                "text": {
                    "language": "english",
                    "statement": "Livery"
                }
            },
            {
                "choice-id": "7612497629",
                "text": {
                    "language": "english",
                    "statement": "Military"
                }
            },
            {
                "choice-id": "7612497639",
                "text": {
                    "language": "english",
                    "statement": "Taxi"
                }
            },
            {
                "choice-id": "7612497649",
                "text": {
                    "language": "english",
                    "statement": "I have never been associated with this vehicle"
                }
            }
        ],
        "help-text": {
            "language": "english",
            "statement": "May include vehicles which you recently sold or vehicles for which you co-signed. May also include a previous kind of license plate."
        }
    },
    "question": "What kind of MN license plate has been on your 1999 Mitsubishi Diamante?",
    "choice": [
        {
            "choice-id": "7612497599",
            "text": {
                "language": "english",
                "statement": "Disabled Veteran"
            }
        },
        {
            "choice-id": "7612497609",
            "text": {
                "language": "english",
                "statement": "Handicapped"
            }
        },
        {
            "choice-id": "7612497619",
            "text": {
                "language": "english",
                "statement": "Livery"
            }
        },
        {
            "choice-id": "7612497629",
            "text": {
                "language": "english",
                "statement": "Military"
            }
        },
        {
            "choice-id": "7612497639",
            "text": {
                "language": "english",
                "statement": "Taxi"
            }
        },
        {
            "choice-id": "7612497649",
            "text": {
                "language": "english",
                "statement": "I have never been associated with this vehicle"
            }
        }
    ],
    "questionId": "3340113689"
},
{
    "key": 2,
    "fullData": {
        "question-id": "3340113699",
        "answer-type": "single",
        "text": {
            "language": "english",
            "statement": "In which of the following states does 'Christina Aasparagus' currently live or own property?"
        },
        "choice": [
            {
                "choice-id": "7612497659",
                "text": {
                    "language": "english",
                    "statement": "Alabama"
                }
            },
            {
                "choice-id": "7612497669",
                "text": {
                    "language": "english",
                    "statement": "Arizona"
                }
            },
            {
                "choice-id": "7612497679",
                "text": {
                    "language": "english",
                    "statement": "Michigan"
                }
            },
            {
                "choice-id": "7612497689",
                "text": {
                    "language": "english",
                    "statement": "North Carolina"
                }
            },
            {
                "choice-id": "7612497699",
                "text": {
                    "language": "english",
                    "statement": "West Virginia"
                }
            },
            {
                "choice-id": "7612497709",
                "text": {
                    "language": "english",
                    "statement": "None of the above or I am not familiar with this person"
                }
            }
        ],
        "help-text": {
            "language": "english",
            "statement": "Names may be listed as last-name first-name, include maiden names or contain slight misspellings."
        }
    },
    "question": "In which of the following states does 'Christina Aasparagus' currently live or own property?",
    "choice": [
        {
            "choice-id": "7612497659",
            "text": {
                "language": "english",
                "statement": "Alabama"
            }
        },
        {
            "choice-id": "7612497669",
            "text": {
                "language": "english",
                "statement": "Arizona"
            }
        },
        {
            "choice-id": "7612497679",
            "text": {
                "language": "english",
                "statement": "Michigan"
            }
        },
        {
            "choice-id": "7612497689",
            "text": {
                "language": "english",
                "statement": "North Carolina"
            }
        },
        {
            "choice-id": "7612497699",
            "text": {
                "language": "english",
                "statement": "West Virginia"
            }
        },
        {
            "choice-id": "7612497709",
            "text": {
                "language": "english",
                "statement": "None of the above or I am not familiar with this person"
            }
        }
    ],
    "questionId": "3340113699"
},
{
    "key": 3,
    "fullData": {
        "question-id": "3340113709",
        "answer-type": "single",
        "text": {
            "language": "english",
            "statement": "Based on your background, in what city is 1920 Calle Mireya Run?"
        },
        "choice": [
            {
                "choice-id": "7612497719",
                "text": {
                    "language": "english",
                    "statement": "Arvada"
                }
            },
            {
                "choice-id": "7612497729",
                "text": {
                    "language": "english",
                    "statement": "Boulder"
                }
            },
            {
                "choice-id": "7612497739",
                "text": {
                    "language": "english",
                    "statement": "Colorado Springs"
                }
            },
            {
                "choice-id": "7612497749",
                "text": {
                    "language": "english",
                    "statement": "Englewood"
                }
            },
            {
                "choice-id": "7612497759",
                "text": {
                    "language": "english",
                    "statement": "Northglenn"
                }
            },
            {
                "choice-id": "7612497769",
                "text": {
                    "language": "english",
                    "statement": "I have never been associated with this address"
                }
            }
        ],
        "help-text": {
            "language": "english",
            "statement": "The addresses listed may be partial, misspelled or contain minor numbering variations from your actual address"
        }
    },
    "question": "Based on your background, in what city is 1920 Calle Mireya Run?",
    "choice": [
        {
            "choice-id": "7612497719",
            "text": {
                "language": "english",
                "statement": "Arvada"
            }
        },
        {
            "choice-id": "7612497729",
            "text": {
                "language": "english",
                "statement": "Boulder"
            }
        },
        {
            "choice-id": "7612497739",
            "text": {
                "language": "english",
                "statement": "Colorado Springs"
            }
        },
        {
            "choice-id": "7612497749",
            "text": {
                "language": "english",
                "statement": "Englewood"
            }
        },
        {
            "choice-id": "7612497759",
            "text": {
                "language": "english",
                "statement": "Northglenn"
            }
        },
        {
            "choice-id": "7612497769",
            "text": {
                "language": "english",
                "statement": "I have never been associated with this address"
            }
        }
    ],
    "questionId": "3340113709"
},
{
    "key": 4,
    "fullData": {
        "question-id": "3340113719",
        "answer-type": "single",
        "text": {
            "language": "english",
            "statement": "Which of the following corporations have you ever been associated with?"
        },
        "choice": [
            {
                "choice-id": "7612497779",
                "text": {
                    "language": "english",
                    "statement": "Planz"
                }
            },
            {
                "choice-id": "7612497789",
                "text": {
                    "language": "english",
                    "statement": "Software Harmony"
                }
            },
            {
                "choice-id": "7612497799",
                "text": {
                    "language": "english",
                    "statement": "Titan Systems"
                }
            },
            {
                "choice-id": "7612497809",
                "text": {
                    "language": "english",
                    "statement": "Tony Restaurant"
                }
            },
            {
                "choice-id": "7612497819",
                "text": {
                    "language": "english",
                    "statement": "Us Cybertech"
                }
            },
            {
                "choice-id": "7612497829",
                "text": {
                    "language": "english",
                    "statement": "None of the above"
                }
            }
        ],
        "help-text": {
            "language": "english",
            "statement": "Corporation Names may contain slight misspellings."
        }
    },
    "question": "Which of the following corporations have you ever been associated with?",
    "choice": [
        {
            "choice-id": "7612497779",
            "text": {
                "language": "english",
                "statement": "Planz"
            }
        },
        {
            "choice-id": "7612497789",
            "text": {
                "language": "english",
                "statement": "Software Harmony"
            }
        },
        {
            "choice-id": "7612497799",
            "text": {
                "language": "english",
                "statement": "Titan Systems"
            }
        },
        {
            "choice-id": "7612497809",
            "text": {
                "language": "english",
                "statement": "Tony Restaurant"
            }
        },
        {
            "choice-id": "7612497819",
            "text": {
                "language": "english",
                "statement": "Us Cybertech"
            }
        },
        {
            "choice-id": "7612497829",
            "text": {
                "language": "english",
                "statement": "None of the above"
            }
        }
    ],
    "questionId": "3340113719"
}
]

const transactionIdMultiple = "31001101295239";

return (
  <ThemeProvider theme={theme}>
    <StyledEngineProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MultipleQuestion  
            transactionIdMultiple={transactionIdMultiple} 
            questionSetIdMultiple={questionSetIdMultiple} 
            responseData={responseDataMultipleQ}  
            check={check} 
          />
        </BrowserRouter>
      </QueryClientProvider>
    </StyledEngineProvider>
  </ThemeProvider>
);
};

test("Question Rendered Correctly", () => {
    render(component());
  });

  test("First question renders correctly", () => {
    render(component());
    const question = screen.getByTestId("3340113679");
    expect(question).toBeTruthy();
  });
  
  test("Choices rendered correctly", () => {
      render(component());
      const question = screen.getByText("Crusaders");
      expect(question).toBeTruthy();
    });
  
  test("All options renders correctly", () => {
      render(component());
      const option1 = screen.getByText("Tigers");
      expect(option1).toBeTruthy();
      const option2 = screen.getByText("Vikings");
      expect(option2).toBeTruthy();
      const option3 = screen.getByText("Roadrunners");
      expect(option3).toBeTruthy();
      const option4 = screen.getByText("Eagles");
      expect(option4).toBeTruthy();
    });
  
  test("Choices rendered correctly", () => {
      render(component());
      const question = screen.getAllByText("None of the above");
      expect(question).toBeTruthy();
    });
  
    test("All questions ", () => {
      render(component());
      const question2 = screen.getByTestId("3340113689");
      expect(question2).toBeTruthy();
      const question3 = screen.getByTestId("3340113699");
      expect(question3).toBeTruthy();
      const question4 = screen.getByTestId("3340113709");
      expect(question4).toBeTruthy();
    });
  
    test("Continue button  rendered correctly", () => {
      render(component());
      const question = screen.getByText("Continue");
      expect(question).toBeTruthy();
    });
  
