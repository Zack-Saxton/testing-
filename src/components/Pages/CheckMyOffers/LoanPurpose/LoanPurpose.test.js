import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import CitizenshipStatus from "../CitizenshipStatus/index";
import SelectAmount from "../SelectAmount/index";
import LoanPurpose from "./index";

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
const MockLoanPurpose = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<CheckMyOffers>
						<SelectAmount />
						<LoanPurpose />
						<CitizenshipStatus />
					</CheckMyOffers>
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	)
}

test("Availability test", () => {
	const container = render(<MockLoanPurpose />);

	const Home = container.getByTestId("home");
	expect(Home).toBeTruthy();
	const AutoExpence = container.getByTestId("autoExpense");
	expect(AutoExpence).toBeTruthy();
	const Vacation = container.getByTestId("vacation");
	expect(Vacation).toBeTruthy();
	const Holiday = container.getByTestId("holiday");
	expect(Holiday).toBeTruthy();
	const Medical = container.getByTestId("medical");
	expect(Medical).toBeTruthy();
	const Dept = container.getByTestId("deptConsolidation");
	expect(Dept).toBeTruthy();
	const LifeEvent = container.getByTestId("lifeEvent");
	expect(LifeEvent).toBeTruthy();
	const Bills = container.getByTestId("unexpectedBills");
	expect(Bills).toBeTruthy();
	const Major = container.getByTestId("majorPurchase");
	expect(Major).toBeTruthy();
	const Others = container.getByTestId("others");
	expect(Others).toBeTruthy();
	const ContinueButton = container.getByTestId("contButtonLoanPurpose");
	expect(ContinueButton).toBeTruthy();
	expect(ContinueButton.hasAttribute("disabled")).toBe(true);
});

test("Home Loan selection test", () => {
	const container = render(<MockLoanPurpose />);

	const Home = container.getByTestId("home");
	const AutoExpence = container.getByTestId("autoExpense");
	const Vacation = container.getByTestId("vacation");
	const Holiday = container.getByTestId("holiday");
	const Medical = container.getByTestId("medical");
	const Dept = container.getByTestId("deptConsolidation");
	const LifeEvent = container.getByTestId("lifeEvent");
	const Bills = container.getByTestId("unexpectedBills");
	const Major = container.getByTestId("majorPurchase");
	const Others = container.getByTestId("others");
	fireEvent.click(Home);
	expect(Home).toHaveClass("activeCard ");
	expect(AutoExpence).not.toHaveClass("activeCard ");
	expect(Vacation).not.toHaveClass("activeCard ");
	expect(Holiday).not.toHaveClass("activeCard ");
	expect(Medical).not.toHaveClass("activeCard ");
	expect(Dept).not.toHaveClass("activeCard ");
	expect(LifeEvent).not.toHaveClass("activeCard ");
	expect(Bills).not.toHaveClass("activeCard ");
	expect(Major).not.toHaveClass("activeCard ");
	expect(Others).not.toHaveClass("activeCard ");
	const ContinueButton = container.getByTestId("contButtonLoanPurpose");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
});

test("Auto Expense selection test", () => {
	const container = render(<MockLoanPurpose />);
	const AutoExpense = container.getByTestId("autoExpense");
	fireEvent.click(AutoExpense);
	expect(AutoExpense).toHaveClass("activeCard ");
	const ContinueButton = container.getByTestId("contButtonLoanPurpose");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
});

test("Vacation option selection test", () => {
	const container = render(<MockLoanPurpose />);
	const Vacation = container.getByTestId("vacation");
	fireEvent.click(Vacation);
	expect(Vacation).toHaveClass("activeCard ");
	const ContinueButton = container.getByTestId("contButtonLoanPurpose");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
});

test("Holiday option selection test", () => {
	const container = render(<MockLoanPurpose />);
	const Holiday = container.getByTestId("holiday");
	fireEvent.click(Holiday);
	expect(Holiday).toHaveClass("activeCard ");
	const ContinueButton = container.getByTestId("contButtonLoanPurpose");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
});

test("Medical option selection test", () => {
	const container = render(<MockLoanPurpose />);
	const Medical = container.getByTestId("medical");
	fireEvent.click(Medical);
	expect(Medical).toHaveClass("activeCard ");
	const ContinueButton = container.getByTestId("contButtonLoanPurpose");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
});

test("Consolidation option selection test", () => {
	const container = render(<MockLoanPurpose />);
	const Dept = container.getByTestId("deptConsolidation");
	fireEvent.click(Dept);
	expect(Dept).toHaveClass("activeCard ");
	const ContinueButton = container.getByTestId("contButtonLoanPurpose");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
});

test("LifeEvent option selection test", () => {
	const container = render(<MockLoanPurpose />);
	const LifeEvent = container.getByTestId("lifeEvent");
	fireEvent.click(LifeEvent);
	expect(LifeEvent).toHaveClass("activeCard ");
	const ContinueButton = container.getByTestId("contButtonLoanPurpose");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
});

test("Unexpected Bills option selection test", () => {
	const container = render(<MockLoanPurpose />);
	const Bills = container.getByTestId("unexpectedBills");
	fireEvent.click(Bills);
	expect(Bills).toHaveClass("activeCard ");
	const ContinueButton = container.getByTestId("contButtonLoanPurpose");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
});

test("Major Purchase option selection test", () => {
	const container = render(<MockLoanPurpose />);
	const Major = container.getByTestId("majorPurchase");
	fireEvent.click(Major);
	expect(Major).toHaveClass("activeCard ");
	const ContinueButton = container.getByTestId("contButtonLoanPurpose");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
});

test("Other option selection test", () => {
	const container = render(<MockLoanPurpose />);
	const Others = container.getByTestId("others");
	fireEvent.click(Others);
	expect(Others).toHaveClass("activeCard ");
	const ContinueButton = container.getByTestId("contButtonLoanPurpose");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
});

test("Routing forward to Citizenship status", async () => {
	const container = render(<MockLoanPurpose />);
	const ContinueButton = container.getByTestId("contButtonLoanPurpose");
	fireEvent.click(ContinueButton);
	const page = container.queryByText("Describe your citizenship status")
	await waitFor(() => expect(page).toBeInTheDocument());
})

test("Routing Back to Select Amount page", async () => {
	const container = render(<MockLoanPurpose />);
	const BackButton = container.getByTestId("routeBackwardLoanPurpose");
	fireEvent.click(BackButton);
	const page = container.queryByText("Tell us how much you would like to borrow")
	await waitFor(() => expect(page).toBeInTheDocument());
})