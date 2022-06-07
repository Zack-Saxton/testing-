import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import NoOfferAvailable from "./NoOfferAvailable";

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
					<NoOfferAvailable />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the component is rendered", () => {
	render(component());
	const element = screen.getByTestId('noOffer_component');
	expect(element).toBeTruthy();
});

test("Checks the title is rendered", () => {
	render(component());
	const element = screen.getByTestId('title');
	expect(element).toBeTruthy();
});

test("Checks the content is rendered", () => {
	render(component());
	const element = screen.getByTestId('noOfferParagraph');
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
