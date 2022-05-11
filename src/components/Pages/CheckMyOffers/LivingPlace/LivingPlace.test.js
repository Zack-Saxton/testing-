import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import AnnualIncome from '../AnnualIncome/index';
import OneLastStep from '../OneLastStep/index';
import LivingPlace from './index';

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
const MockLivingPlace = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<CheckMyOffers>
						<LivingPlace />
						<AnnualIncome />
						<OneLastStep />
					</CheckMyOffers>
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	)
}

test("Availability test", () => {
	const container = render(<MockLivingPlace />)

	const Renting = container.getByTestId("Renting");
	expect(Renting).toBeTruthy();
	const HomeWithMortgage = container.getByTestId("HomeWithMortgage");
	expect(HomeWithMortgage).toBeTruthy();
	const HomeWithNoMortgage = container.getByTestId("HomeWithNoMortgage");
	expect(HomeWithNoMortgage).toBeTruthy();
	const MobileHome = container.getByTestId("MobileHome");
	expect(MobileHome).toBeTruthy();
	const LivingWithRelatives = container.getByTestId("LivingWithRelatives");
	expect(LivingWithRelatives).toBeTruthy();
	const ContinueButton = container.getByTestId("cntButton");
	expect(ContinueButton).toBeTruthy();
	expect(ContinueButton.hasAttribute("disabled")).toBe(true);
});

test("Clicking Renting Test", () => {
	const container = render(<MockLivingPlace />)

	const Renting = container.getByTestId("Renting");
	const HomeWithMortgage = container.getByTestId("HomeWithMortgage");
	const HomeWithNoMortgage = container.getByTestId("HomeWithNoMortgage");
	const MobileHome = container.getByTestId("MobileHome");
	const LivingWithRelatives = container.getByTestId("LivingWithRelatives");
	fireEvent.click(Renting);
	expect(Renting).toHaveClass("activeBorder");
	const rentOrMortgage = container.getByTestId("rentOrMortgage")
	expect(rentOrMortgage).toBeTruthy();
	expect(HomeWithMortgage).not.toHaveClass("activeBorder");
	expect(HomeWithNoMortgage).not.toHaveClass("activeBorder");
	expect(MobileHome).not.toHaveClass("activeBorder");
	expect(LivingWithRelatives).not.toHaveClass("activeBorder");
	const ContinueButton = container.getByTestId("cntButton");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
});

test("Clicking HomeWithMortgage Test", () => {
	const container = render(<MockLivingPlace />)
	const HomeWithMortgage = container.getByTestId("HomeWithMortgage");
	fireEvent.click(HomeWithMortgage);
	const rentOrMortgage = container.getByTestId("rentOrMortgage")
	expect(rentOrMortgage).toBeTruthy();
	expect(HomeWithMortgage).toHaveClass("activeBorder");
	const ContinueButton = container.getByTestId("cntButton");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
});

test("Clicking HomeWithNoMortgage Test", () => {
	const container = render(<MockLivingPlace />)
	const HomeWithNoMortgage = container.getByTestId("HomeWithNoMortgage");
	fireEvent.click(HomeWithNoMortgage);
	expect(HomeWithNoMortgage).toHaveClass("activeBorder");
	const rentOrMortgage = container.getByTestId("rentOrMortgage")
	expect(rentOrMortgage).toBeTruthy();
	const TextField = container.getByTestId("rentOrMortgage");
	expect(TextField).toHaveClass("hideMsg")
	const ContinueButton = container.getByTestId("cntButton");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
});

test("Clicking Mobile Home Test", () => {
	const container = render(<MockLivingPlace />)
	const MobileHome = container.getByTestId("MobileHome");
	fireEvent.click(MobileHome);
	expect(MobileHome).toHaveClass("activeBorder");
	const TextField = container.getByTestId("rentOrMortgage");
	expect(TextField).toHaveClass("hideMsg")
	const ContinueButton = container.getByTestId("cntButton");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
});

test("Clicking Living with Relatives Test", () => {
	const container = render(<MockLivingPlace />)
	const LivingWithRelatives = container.getByTestId("LivingWithRelatives");
	fireEvent.click(LivingWithRelatives);
	expect(LivingWithRelatives).toHaveClass("activeBorder");
	const TextField = container.getByTestId("rentOrMortgage");
	expect(TextField).toHaveClass("hideMsg")
	const ContinueButton = container.getByTestId("cntButton");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
});

test("Routing forward to One Last Step", async () => {
	const container = render(<MockLivingPlace />);
	const ContinueButton = container.getByTestId("cntButton");
	fireEvent.click(ContinueButton);
	const page = container.queryByText("One last step")
	await waitFor(() => expect(page).toBeInTheDocument());
})

test("Routing Back to Annual Income Test", async () => {
	const container = render(<MockLivingPlace />);
	const BackButton = container.getByTestId("routeBackwardLivingPlace");
	fireEvent.click(BackButton);
	const page = container.queryByText("Tell us about your income")
	await waitFor(() => expect(page).toBeInTheDocument());
})