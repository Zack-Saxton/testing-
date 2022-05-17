import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import EligibleForOffer from "./index.js";

afterEach(cleanup);
window.scrollTo = jest.fn();
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
						<EligibleForOffer  />
					</CheckMyOffers>
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Image Availability test", () => {
	render(component());
	const element = screen.getByTestId('EligibleForOffersImage');
	expect(element).toBeTruthy();
});

test("Congrats Text Availability test", () => {
	render(component());
	const element = screen.getByTestId('congratsTypography');
	expect(element).toBeTruthy();
});

test("Eligible Text Availability test", () => {
	render(component());
	const element = screen.getByTestId('eligibleTypography');
	expect(element).toBeTruthy();
});

test("View Offers button Availability Test", () => {
	render(component());
	const element = screen.getByText('View Offers');
	expect(element).toBeTruthy();
});

test("Loan Funding Text Availability test", () => {
	render(component());
	const element = screen.getByTestId('loanFundingTypography');
	expect(element).toBeTruthy();
});

test("Loan Funding Text Availability test", () => {
	render(component());
	const element = screen.getByTestId('approvalLoanTextTypography');
	expect(element).toBeTruthy();
});