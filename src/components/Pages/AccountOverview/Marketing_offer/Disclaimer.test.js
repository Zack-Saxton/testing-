import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen,waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import Disclaimer from "./Disclaimer";

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

const userOffers =  {
  userOffers: {
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
}

const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Disclaimer offerData={userOffers} />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the component is rendered", () => {
	render(component());
	const element = screen.getByTestId('discalimerContainer');
	expect(element).toBeTruthy();
});

test('Check CA Resident disclaimer is displayed',async () => {
	const { getByText } = render(component());
  await waitFor(() => {    
    expect(getByText("CA Residents")).toBeTruthy();
	}); 
})

test('Check USA Patriot Act disclaimer is displayed',async () => {
	const { getByText } = render(component());
  await waitFor(() => {    
    expect(getByText("USA Patriot Act")).toBeTruthy();
	}); 
})

test('Check Offer Information disclaimer is displayed',async () => {
	const { getByText } = render(component());
  await waitFor(() => {    
    expect(getByText("Important Offer Information")).toBeTruthy();
	}); 
})