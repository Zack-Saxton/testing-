import LimitedOffer from './LimitedOffer';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import {  fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 500000,
		},
	},
});

jest.mock("./AccountOverviewHook/useAccountOverview", () => ({
  useAccountOverview: jest.fn(),
}))


const theme = createTheme();
window.scrollTo = jest.fn();
const userOffers =  {
  "title": "NULL",
  "firstName": "TAMMY",
  "middleName": "",
  "lastName": "JJASMINE",
  "suffix": "NULL",
  "addressLine1": "4500 BEARCLAW ST",
  "addressCity": "SALT LAKE CITY",
  "addressState": "UT",
  "addressZip": "84108",
  "addressZip4": null,
  "dateOfBirth": "11/05/1984 12:00:00 AM",
  "offerAmount": "12000",
  "dateCampaign": "06/01/2022 12:00:00 AM",
  "CampaignTypeDesc": "GRIDS",
  "maskedSSN": "6475394",
  "branch": "7866",
  "brand": "Mariner",
  "letterCode": null,
  "FICO_Score": "0",
  "dateExpiration": "12/31/9999 12:00:00 AM",
  "campaignId": "2872",
  "lbmRate": {
    "Company": null,
    "ltrCode": null,
    "APR": null,
    "Fin_Chg": null,
    "Amt_Fin": null,
    "Total": null,
    "No_Payments": null,
    "Pmt_Amt": null,
    "Prepd_FC": null,
    "Interest_Charge": null,
    "Simple_Int_Rate": null,
    "FL_Amount_Given": null,
    "NC_Borrowed_Sum": null,
    "Maintenance_Fee": null,
    "Closing_Fee": null,
    "Four_Percent_Fee": null,
    "Eight_Percent_Fee": null,
    "NSF_Fee": null,
    "Interest_Charge_2": null,
    "Principal_Amt": null,
    "Loan_Origination_Fee": null,
    "Doc_Fee": null,
    "Service_Charge": null,
    "Administrative_Fee": null
  },
  "OfferCode": "TEST000036",
  "CreativeCode": "PCB",
  "campaignTypeMessage": "Prequalified Offer. You may have money available now! Up to: $12,000"
}

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
				<LimitedOffer isLoading = {false} userOffers={userOffers} />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the component is rendered", () => {
	render(component());
	const element = screen.getByTestId("limited_offer");
	expect(element).toBeTruthy();
});

test("Checks the Banner is rendered", () => {
	render(component());
	const element = screen.getByTestId('bannerGrid');
	expect(element).toBeTruthy();
});

test("Checks the Apply for loan is rendered", () => {
  	render(component());
	const element = screen.getByTestId('offerTextTwo');
	expect(element).toBeTruthy();
});

test("Checks the Apply for loan button is rendered", () => {
  render(component());
const element = screen.getByTestId('applyForLoanButton');
expect(element).toBeTruthy();
});


test("check the Apply for loan button is clickable", () => {
	render(component());
	const button = screen.getByTestId("applyForLoanButton");
	fireEvent.click(button);
});

test("Checks Mortgage Banner is rendered", () => {
  render(component());
const element = screen.getByTestId('mortgage_banner');
expect(element).toBeTruthy();
});

test("Checks Mortgage Text is rendered", () => {
  render(component());
const element = screen.getByTestId('mortgageText');
expect(element).toBeTruthy();
});

test("Checks Mortgage Appy Button is rendered", () => {
  render(component());
const element = screen.getByTestId('mortgageApplyNowbutton');
expect(element).toBeTruthy();
});


test("check the Mortgage Apply for loan button is clickable", () => {
	render(component());
	const button = screen.getByTestId("applyForLoanButton");
	fireEvent.click(button);
});


test("Checks the offerText is rendered", () => {
	render(componentWithData());
	const element = screen.getByTestId("offerText");
	expect(element).toBeTruthy();
});

test("Checks Offer amount is rendered", () => {
	render(componentWithData());
	const element = screen.getByTestId("offerMoney");
	expect(element).toBeTruthy();
});

test('Check the offer amount is displayed',async () => {
	const { getByText } = render(componentWithData());
  await waitFor(() => {    
    expect(getByText("$12,000")).toBeTruthy();
	}); 
})

test("Checks the check my offer button is rendered", () => {
  render(componentWithData());
const element = screen.getByTestId('checkMyOfferButton');
expect(element).toBeTruthy();
});

test("check the check my offer button is clickable", () => {
	render(componentWithData()); 
	const button = screen.getByTestId("checkMyOfferButton");
	fireEvent.click(button);
});

test("Check popup is triggred while clicking check my offer", () => {
	render(componentWithData());
  fireEvent.click(screen.getByTestId('checkMyOfferButton'));
	const element = screen.getByTestId("popUpheading");
	expect(element).toBeTruthy();
});

test("Check Apply now button is triggred in check my offer popup", () => {
	render(componentWithData());
  fireEvent.click(screen.getByTestId('checkMyOfferButton'));
	const element = screen.getByTestId("popupApplyNowButton");
	expect(element).toBeTruthy();
});
