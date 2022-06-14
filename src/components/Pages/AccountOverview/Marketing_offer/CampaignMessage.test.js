import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import CampaignMessage from "./CampaignMessage";

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
					<CampaignMessage />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the component is rendered", () => {
	render(component());
	const element = screen.getByTestId('CampaignMessage_component');
	expect(element).toBeTruthy();
});



test('Check Offer Expire is displayed',async () => {
	const { getByText } = render(component());
    expect(getByText("Don't wait! This offer expires")).toBeTruthy();
	
})
test("Check  PreQualified amount is rendered", () => {
	render(component());
	const element = screen.getByTestId('preQualified_amount');
	expect(element).toBeTruthy();
});

test("Check PreQualified amount is displayed", () => {
	render(component());
	const element = screen.getByTestId('check_preQualified_amount');
	expect(element).toBeTruthy();
});

test("Checks Claim Button is rendered", () => {
	render(component());
	const element = screen.getByTestId('claim_button');
	expect(element).toBeTruthy();
});
