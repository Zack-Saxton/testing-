import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import KbaQuestions from "../KbaQuestions";

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

