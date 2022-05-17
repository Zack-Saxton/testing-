import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import NoOffersAvailable from "./index.js";

afterEach(cleanup);

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
const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<CheckMyOffers>
						<NoOffersAvailable  />
					</CheckMyOffers>
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Image Availability test", () => {
	render(component());
	const element = screen.getByTestId('noOffersAvailableImage');
	expect(element).toBeTruthy();
});

test("Text Availability test", () => {
	render(component());
	const element = screen.getByTestId('noOffersTypography');
	expect(element).toBeTruthy();
});

test("Blog button Availability Test", () => {
	render(component());
	const element = screen.getByText('Blog');
	expect(element).toBeTruthy();
});

test("Back To Home button Availability Test", () => {
	render(component());
	const element = screen.getByText('Back to Home');
	expect(element).toBeTruthy();
});
