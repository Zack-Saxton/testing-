import { cleanup, fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import CitizenshipStatus from "./index.js";

afterEach(cleanup);


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
						<CitizenshipStatus  />
					</CheckMyOffers>
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Select On Highlight Test", () => {
	render(component());
	
	const USCitizen = screen.getByTestId("usCitizen");
	expect(USCitizen).toBeTruthy();
	const PermanentResident = screen.getByTestId("permanentResident");
	expect(PermanentResident).toBeTruthy();
	const ForeignResident = screen.getByTestId("foreignResident");
	expect(ForeignResident).toBeTruthy();
	const ContinueButton = screen.getByTestId("citizenshipContButton");
	expect(ContinueButton).toBeTruthy();
	expect(ContinueButton.hasAttribute("disabled")).toBe(true);
});

test("Availability test", () => {
	render(component());

	const USCitizen = screen.getByTestId("usCitizen");
	const PermanentResident = screen.getByTestId("permanentResident");
	const ForeignResident = screen.getByTestId("foreignResident");
	expect(USCitizen).toBeTruthy();
	fireEvent.click(USCitizen);
	expect(USCitizen).toHaveClass("activeBorder");
	expect(PermanentResident).not.toHaveClass("activeBorder");
	expect(ForeignResident).not.toHaveClass("activeBorder");
	const ContinueButton = screen.getByTestId("citizenshipContButton");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
});