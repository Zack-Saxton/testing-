import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen,waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import Disclaimer from "./Disclaimer";
import { userOffers,userOffersPres,userOffersConv,userOffersBci,userOffersAuto } from "../../../../__mock__/data/UserOffersMockData"

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


const component = (userOffersData) => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Disclaimer offerData={userOffersData} />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the component is rendered", () => {
	render(component(userOffers));
	const element = screen.getByTestId('discalimerContainer');
	expect(element).toBeTruthy();
});

test('Check Offer Information disclaimer is displayed',async () => {
	const { getByText } = render(component(userOffers));
  await waitFor(() => {    
    expect(getByText("Important Offer Information")).toBeTruthy();
	}); 
})

test('Check CA Resident disclaimer is displayed',async () => {
	const { getByText } = render(component(userOffers));
  await waitFor(() => {    
    expect(getByText("CA Residents")).toBeTruthy();
	}); 
})

test('Check Existing Loans disclaimer is displayed',async () => {
	const { getByText } = render(component(userOffersBci));
  await waitFor(() => {    
    expect(getByText("Existing Loans")).toBeTruthy();
	}); 
})

test('Check USA Patriot Act disclaimer is displayed',async () => {
	const { getByText } = render(component(userOffersPres));
  await waitFor(() => {    
    expect(getByText("USA Patriot Act")).toBeTruthy();
	}); 
})

test('Check Credit Application disclaimer is displayed',async () => {
	const { getByText } = render(component(userOffersConv));
  await waitFor(() => {    
    expect(getByText("Credit Application")).toBeTruthy();
	}); 
})

test('Check Prohibited Use of Proceeds disclaimer is displayed',async () => {
	const { getByText } = render(component(userOffersAuto));
  await waitFor(() => {    
    expect(getByText("Prohibited Use of Proceeds")).toBeTruthy();
	}); 
})