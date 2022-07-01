import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import KbaQuestions from "../KbaQuestions";
import Cookies from 'js-cookie'
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
				<BrowserRouter>
					<KbaQuestions />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}


test("Checks the component is rendered", () => {
	render(component());
	const element = screen.getByTestId('KbaQuestions_component');
	expect(element).toBeTruthy();
});

test("Render Questions", () => {
	render(component());
	const element = screen.getByTestId("question_component");
	expect(element).toBeTruthy();
});

test("Render Paragraph Content", () => {
	render(component());
	const element = screen.getByTestId("kba_content");
	expect(element).toBeTruthy();
});

test("Render Button", () => {
	render(component());
	const element = screen.getByTestId("submit");
	expect(element).toBeTruthy();
});

test("Button Onclick", () => {
	render(component());
	const button = screen.getByTestId("submit");
	fireEvent.click(button);
});

