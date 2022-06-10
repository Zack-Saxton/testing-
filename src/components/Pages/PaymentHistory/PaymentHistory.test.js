import PaymentHistory from './PaymentHistory';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import LoanAccount from '../../../contexts/LoanAccount';


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
        <LoanAccount>
					<PaymentHistory />
          </LoanAccount>
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the component is rendered", () => {
	render(component());
	const element = screen.getByTestId('paymentHistoryDiv');
	expect(element).toBeTruthy();
});

test("Checks the Heading is rendered", () => {
	render(component());
	const element = screen.getByTestId('historyHeading');
	expect(element).toBeTruthy();
});

test("Checks the Button is rendered", () => {
	render(component());
	const element = screen.getByTestId('buttonIcon');
	expect(element).toBeTruthy();
});

test("Button Onclick", () => {
	render(component());
	const button = screen.getByTestId("buttonIcon");
	fireEvent.click(button);
});

test("Checks download Button is rendered", () => {
	render(component());
	const element = screen.getByTestId('downloadButton');
	expect(element).toBeTruthy();
});

test("Download Button Onclick", () => {
	render(component());
	const button = screen.getByTestId("downloadButton");
	fireEvent.click(button);
});

test("Checks download option CSV and PDF is available", () => {
	render(component());
	const element = screen.getByTestId('downloadOption');
	expect(element).toBeTruthy();
});

test("Check CSV is rendered", () => {
	render(component());
	const element = screen.getByTestId('csvOption');
	expect(element).toBeTruthy();
});


test("check CSV menu is clickable", () => {
	render(component());
	const button = screen.getByTestId("csvOption");
	fireEvent.click(button);
});

test("Check pdf is rendered", () => {
	render(component());
	const element = screen.getByTestId('pdfOption');
	expect(element).toBeTruthy();
});


test("check pdf menu is clickable", () => {
	render(component());
	const button = screen.getByTestId("pdfOption");
	fireEvent.click(button);
});

test("Check pdf content is rendered", () => {
	render(component());
	const element = screen.getByTestId('pdfDiv');
	expect(element).toBeTruthy();
});