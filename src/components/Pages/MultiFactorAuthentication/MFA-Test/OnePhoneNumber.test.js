import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import OnePhoneNumber from "../OnePhoneNumber";

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
					<OnePhoneNumber />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}


test("Checks the component is rendered", () => {
	render(component());
	const element = screen.getByTestId('OnePhoneNumber_component');
	expect(element).toBeTruthy();
});

test("Render Sequrity Code", () => {
	render(component());
	const element = screen.getByTestId("textAndCallss");
	expect(element).toBeTruthy();
});

test("Render Sequrity Question", () => {
	render(component());
	const element = screen.getByTestId("securityQuestion");
	expect(element).toBeTruthy();
});

test("Button Onclick", () => {
	render(component());
	const button = screen.getByTestId("next_button");
	fireEvent.click(button);
});

test('Should match the snapshot', () => {
	const { asFragment } = render(component());
	expect(asFragment).toMatchSnapshot();
});