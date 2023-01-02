import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, waitFor, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import MFASecurityQuestions from "../MultiFactorAuthentication/MFA-SecurityQuestions";
import { createBrowserHistory } from 'history';
import Cookies from 'js-cookie'
import { saveSecurityAnswer } from "../../Controllers/MFAController";
jest.mock("../../Controllers/MFAController");

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 500000,
        },
    },
});
const theme = createTheme();
window.scrollTo = jest.fn();
let now = new Date().getTime();

Cookies.set(
	"token",
	JSON.stringify({
		isLoggedIn: true,
		setupTime: now,
		applicantGuid: "AT-LA1656515305385",
		isMFA: true,
		isMFACompleted: true
	})
);

const component = () => {
    const history = createBrowserHistory();
    const state = {
        mfaSecurityQuestions: {
            mfaDetails: {
                securityQuestions:
                    [
                        {
                            "question_id": "1",
                            "question": "What was the name of your favorite pet?"
                        },
                        {
                            "question_id": "2",
                            "question": "What was the name of your favorite teacher?"
                        },
                        {
                            "question_id": "3",
                            "question": "What city did you meet your current spouse?"
                        },
                        {
                            "question_id": "4",
                            "question": "What is your favorite vacation destination?"
                        },
                        {
                            "question_id": "5",
                            "question": "Where did you and your spouse marry?"
                        }
                    ]
            }
        }
    }
    history.push("/", state);
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter >
                    <MFASecurityQuestions />
                </BrowserRouter>
            </QueryClientProvider>
        </ThemeProvider>
    );
}


test("Checks the component is rendered", () => {
    render(component());
    const element = screen.getByTestId('mfa-security-questions-component');
    expect(element).toBeTruthy();
});
test("Button Onclick", async () => {
    render(component());
    const button = screen.getByTestId("submit");
    await act(() => {
		fireEvent.click(button);
	});
    
});
test('Checks textfield', async() => {
    const {container}=render(component());
    const input = container.querySelector(`input[name="answer"]`);
    expect(input).toBeTruthy();
    await act(() => {
        fireEvent.change(input, { target: { value: "new" } });
	});
    const button = container.querySelector(`button[type="submit"]`);
    fireEvent.click(button);
});

test('Should match the snapshot', () => {
    const { asFragment } = render(component());
    expect(asFragment).toMatchSnapshot();
});

test('Check toast error answer does not match',async ()=>{
    saveSecurityAnswer.mockResolvedValue({
        result: "error",
        statusCode: 404,
        hasError: true,
        Message: "Answer does not match.",
        user: true,
      });
    const {container}=render(component());
    const input = container.querySelector(`input[name="answer"]`);
    expect(input).toBeTruthy();
    await act(() => {
        fireEvent.change(input, { target: { value: "nehjgfgfw" } });
	});
    const button = container.querySelector(`button[type="submit"]`);
    fireEvent.click(button);
    await waitFor(() => {
        expect(
          screen.findByText(
            "Answer does not match."
          )
        ).toBeTruthy();
      });
    })

test('Should be called addFocus()', () => {
    const {container}=render(component());
    const input = container.querySelector(`input[name="answer"]`);
    expect(input).toBeTruthy();
    fireEvent.keyDown(input,32)
    expect(input.value).toBe("");
});

  
   