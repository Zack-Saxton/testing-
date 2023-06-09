import LimitedOffer from './LimitedOffer';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import {  fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import { userOffers } from "../../../__mock__/data/UserOffersMockData"
import { LimitedOffersMock } from '../../../__mock__/AccountOverview.mock';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 500000,
		},
	},
});

jest.mock("../../../hooks/useAccountOverview", () => ({
  useAccountOverview: jest.fn(),
}))


const theme = createTheme();
window.scrollTo = jest.fn();
const userOffersData = userOffers.userOffers;

const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
				<LimitedOffer />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

const componentWithData = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
				<LimitedOffer isLoading = {false} userOffers={userOffersData} />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the component is rendered", () => {
	LimitedOffersMock()
	render(component());
	const element = screen.getByTestId("limited_offer");
	expect(element).toBeTruthy();
});

test("Checks the Banner is rendered", () => {
	LimitedOffersMock()
	render(component());
	const element = screen.getByTestId('bannerGrid');
	expect(element).toBeTruthy();
});

test("Checks the Apply for loan is rendered", () => {
	LimitedOffersMock()
  	render(component());
	const element = screen.getByTestId('offerTextTwo');
	expect(element).toBeTruthy();
});

test("Checks the Apply for loan button is rendered", () => {
	LimitedOffersMock()
  render(component());
const element = screen.getByTestId('applyForLoanButton');
expect(element).toBeTruthy();
});


test("check the Apply for loan button is clickable", () => {
	LimitedOffersMock()
	render(component());
	const button = screen.getByTestId("applyForLoanButton");
	fireEvent.click(button);
});

test("Checks Mortgage Banner is rendered", () => {
	LimitedOffersMock()
  render(component());
const element = screen.getByTestId('mortgage_banner');
expect(element).toBeTruthy();
});

test("Checks Mortgage Text is rendered", () => {
	LimitedOffersMock()
  render(component());
const element = screen.getByTestId('mortgageText');
expect(element).toBeTruthy();
});

test("Checks Mortgage Appy Button is rendered", () => {
	LimitedOffersMock()
  render(component());
const element = screen.getByTestId('mortgageApplyNowbutton');
expect(element).toBeTruthy();
});


test("Checks the offerText is rendered", () => {
	LimitedOffersMock()
	render(componentWithData());
	const element = screen.getByTestId("offerText");
	expect(element).toBeTruthy();
});

test("Checks Offer amount is rendered", () => {
	LimitedOffersMock()
	render(componentWithData());
	const element = screen.getByTestId("offerMoney");
	expect(element).toBeTruthy();
});

test('Check the offer amount is displayed',async () => {
	LimitedOffersMock()
	const { getByText } = render(componentWithData());
  await waitFor(() => {    
    expect(getByText("$12,000")).toBeTruthy();
	}); 
})

test("Checks the check my offer button is rendered", () => {
	LimitedOffersMock()
  render(componentWithData());
const element = screen.getByTestId('checkMyOfferButton');
expect(element).toBeTruthy();
});

test("check the check my offer button is clickable", () => {
	LimitedOffersMock()
	render(componentWithData()); 
	const button = screen.getByTestId("checkMyOfferButton");
	fireEvent.click(button);
});

test("Check popup is triggred while clicking check my offer", () => {
	LimitedOffersMock()
	render(componentWithData());
  fireEvent.click(screen.getByTestId('checkMyOfferButton'));
	const element = screen.getByTestId("popUpheading");
	expect(element).toBeTruthy();
});

test("Check Apply now button is triggred in check my offer popup", () => {
	LimitedOffersMock()
	render(componentWithData());
  fireEvent.click(screen.getByTestId('checkMyOfferButton'));
	const element = screen.getByTestId("popupApplyNowButton");
	expect(element).toBeTruthy();
});
