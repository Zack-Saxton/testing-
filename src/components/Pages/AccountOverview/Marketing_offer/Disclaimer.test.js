import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen,waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import Disclaimer from "./Disclaimer";
import { userOffers } from "./UserOffersMockData"

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

const userOffersData = userOffers;

const component = () => {
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