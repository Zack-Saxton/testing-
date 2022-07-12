import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen,waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import OptOutNotice from "./OptOutNotice";
import { userOffers } from "../../../../__mock__/data/UserOffersMockData"

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
					<OptOutNotice offerData={userOffersData} />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Check Opt Out Notice message is rendered", () => {
	render(component());
	const element = screen.getByTestId('OptOutNotice_component');
	expect(element).toBeTruthy();
});

test('Check Opt Out Notice Information is displayed',async () => {
	const { getByText } = render(component());
  await waitFor(() => {    
    expect(getByText("PRESCREEN & OPT-OUT NOTICE")).toBeTruthy();
	}); 
})