import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import NavContext from "../../../contexts/NavContext";
import MFASecurityQuestions from "../MultiFactorAuthentication/MFA-SecurityQuestions";
import { createBrowserHistory } from 'history';

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
test('Checks textfield', () => {
    render(component());
    const input = screen.getByTestId('security-input');
    expect(input).toBeTruthy();
});
test('Should match the snapshot', () => {
    const { asFragment } = render(component());
    expect(asFragment).toMatchSnapshot();
});
