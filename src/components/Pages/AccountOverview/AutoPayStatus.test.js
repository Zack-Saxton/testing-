import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import AutoPayStatus from "./AutoPayStatus";

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

const account = {
  "isAutoPay": true,
  "accountNumber": "4103-001995-21",
  "dataTestid": "enableAutoPay"
}

const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<AutoPayStatus />
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
					<AutoPayStatus isAutoPay = {true} />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the component is rendered", () => {
	render(component());
	const element = screen.getByTestId('autoPay_component');
	expect(element).toBeTruthy();
});


test("Checks the AutoPay link is rendered", () => {
	render(component());
	const element = screen.getByTestId('enableAutoPayLink');
	expect(element).toBeTruthy();
});

test("Checks the AutoPay Account is Displayed", () => {
	render(component());
	const element = screen.getByTestId('autoPay_account');
	expect(element).toBeTruthy();
});


test("Checks the AutoPay option in Enabled", async () => {
	render(componentWithData());

  await waitFor(() => {    
    const element = screen.getByTestId('autoPayEnabled');
	expect(element).toBeTruthy();
});
});


test("Check Auto pay enabled Image is rendered", async () => {
	render(componentWithData());

  await waitFor(() => {    
    const element = screen.getByTestId('Enable_image');
	expect(element).toBeTruthy();
});
});