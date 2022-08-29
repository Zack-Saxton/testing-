import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import ReferredToBranch from "./index.js";

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
						<ReferredToBranch  />
					</CheckMyOffers>
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Component Availability test", () => {
	render(component());
	const element = screen.getByTestId('referredToBranch_Component');
	expect(element).toBeTruthy();
});

test("Gold Doller Icon Availability test", () => {
	render(component());
	const element = screen.getByTestId('goldDollerIcon');
	expect(element).toBeTruthy();
});

test("Congratulations Heading Availability Test", () => {
	render(component());
	const element = screen.getByTestId('congratulationsHeading');
	expect(element).toBeTruthy();
});

test("Call Now Section Text Heading Availability Test", () => {
	render(component());
	const element = screen.getByTestId('callNowSectionText');
	expect(element).toBeTruthy();
});

test("Branch Phone Number Link Availability Test", () => {
	render(component());
	const element = screen.getByTestId('branchPhoneNumber');
	expect(element).toBeTruthy();
});

test("Call Now button Availability Test", () => {
	render(component());
	const element = screen.getByText('Call Now');
	expect(element).toBeTruthy();
});

test("Schedule Call Link Availability Test", () => {
	render(component());
	const element = screen.getByTestId('scheduleCall');
	expect(element).toBeTruthy();
});

test("Schedule a Call Back button Availability Test", () => {
	render(component());
	const element = screen.getByText('Schedule a Call Back');
	expect(element).toBeTruthy();
});

test("Pre Footer Text Availability Test", () => {
	render(component());
	const element = screen.getByTestId('preFooterText');
	expect(element).toBeTruthy();
});