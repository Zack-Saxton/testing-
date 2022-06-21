import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import AnnualIncome from "../AnnualIncome/index";
import PersonalInfo from "../PersonalInfo/index";
import EmploymentStatus from "./index.js";

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
window.scrollTo = jest.fn();
const MockEmploymentStatus = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<CheckMyOffers>
						<PersonalInfo />
						<EmploymentStatus />
						<AnnualIncome />
					</CheckMyOffers>
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	)
}


test("Employment Status Render test", () => {
	const container = render(<MockEmploymentStatus />);
	const Hourly = container.getByTestId("Hourly");
	expect(Hourly).toBeTruthy();
	const Salary = container.getByTestId("Employed Salaried");
	expect(Salary).toBeTruthy();
	const selfEmployed = container.getByTestId("Self-Employed");
	expect(selfEmployed).toBeTruthy();
	const Unemployed = container.getByTestId("Unemployed");
	expect(Unemployed).toBeTruthy();
	const Retired = container.getByTestId("Retired");
	expect(Retired).toBeTruthy();
	const ContinueButton = container.getByTestId("cntButton");
	expect(ContinueButton).toBeTruthy();
	expect(ContinueButton.hasAttribute("disabled")).toBe(true);
});

test("Employment Status on Clicking Hourly", async () => {
	const container = render(<MockEmploymentStatus />);

	const Hourly = container.getByTestId("Hourly");
	const Salary = container.getByTestId("Employed Salaried");
	const selfEmployed = container.getByTestId("Self-Employed");
	const Unemployed = container.getByTestId("Unemployed");
	const Retired = container.getByTestId("Retired");
	await act(() => { fireEvent.click(Hourly) })
	expect(Hourly).toHaveClass("activeBorder");
	expect(Salary).not.toHaveClass("activeBorder");
	expect(selfEmployed).not.toHaveClass("activeBorder");
	expect(Unemployed).not.toHaveClass("activeBorder");
	expect(Retired).not.toHaveClass("activeBorder");
	const ContinueButton = container.getByTestId("cntButton");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
	const SelectField = container.getByTestId("select field");
	expect(SelectField).toHaveClass("showMsg")
	const PhoneNumberField = container.getByTestId("phone number field")
	expect(PhoneNumberField).toHaveClass("showMsg")
});

test("Employment Status on Clicking Salaried", async () => {
	const container = render(<MockEmploymentStatus />);

	const Hourly = container.getByTestId("Hourly");
	const Salary = container.getByTestId("Employed Salaried");
	const selfEmployed = container.getByTestId("Self-Employed");
	const Unemployed = container.getByTestId("Unemployed");
	const Retired = container.getByTestId("Retired");
	await act(() => { fireEvent.click(Salary) })
	expect(Hourly).not.toHaveClass("activeBorder");
	expect(Salary).toHaveClass("activeBorder");
	expect(selfEmployed).not.toHaveClass("activeBorder");
	expect(Unemployed).not.toHaveClass("activeBorder");
	expect(Retired).not.toHaveClass("activeBorder");
	const ContinueButton = container.getByTestId("cntButton");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
	const SelectField = container.getByTestId("select field");
	expect(SelectField).toHaveClass("showMsg")
	const PhoneNumberField = container.getByTestId("phone number field")
	expect(PhoneNumberField).toHaveClass("showMsg")
});

test("Employment Status on Clicking Self-Employed", async () => {
	const container = render(<MockEmploymentStatus />);

	const Hourly = container.getByTestId("Hourly");
	const Salary = container.getByTestId("Employed Salaried");
	const selfEmployed = container.getByTestId("Self-Employed");
	const Unemployed = container.getByTestId("Unemployed");
	const Retired = container.getByTestId("Retired");
	await act(() => { fireEvent.click(selfEmployed) })
	expect(Hourly).not.toHaveClass("activeBorder");
	expect(Salary).not.toHaveClass("activeBorder");
	expect(selfEmployed).toHaveClass("activeBorder");
	expect(Unemployed).not.toHaveClass("activeBorder");
	expect(Retired).not.toHaveClass("activeBorder");
	const ContinueButton = container.getByTestId("cntButton");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
	const SelectField = container.getByTestId("select field");
	expect(SelectField).toHaveClass("showMsg")
	const PhoneNumberField = container.getByTestId("phone number field")
	expect(PhoneNumberField).toHaveClass("hideMsg")
});

test("Employment Status on Clicking Unemployed", async () => {
	const container = render(<MockEmploymentStatus />);

	const Hourly = container.getByTestId("Hourly");
	const Salary = container.getByTestId("Employed Salaried");
	const selfEmployed = container.getByTestId("Self-Employed");
	const Unemployed = container.getByTestId("Unemployed");
	const Retired = container.getByTestId("Retired");
	await act(() => { fireEvent.click(Unemployed) })
	expect(Hourly).not.toHaveClass("activeBorder");
	expect(Salary).not.toHaveClass("activeBorder");
	expect(selfEmployed).not.toHaveClass("activeBorder");
	expect(Unemployed).toHaveClass("activeBorder");
	expect(Retired).not.toHaveClass("activeBorder");
	const ContinueButton = container.getByTestId("cntButton");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
	const SelectField = container.getByTestId("select field");
	expect(SelectField).toHaveClass("hideMsg")
	const PhoneNumberField = container.getByTestId("phone number field")
	expect(PhoneNumberField).toHaveClass("hideMsg")
});

test("Employment Status on Clicking Retired", async () => {
	const container = render(<MockEmploymentStatus />);

	const Hourly = container.getByTestId("Hourly");
	const Salary = container.getByTestId("Employed Salaried");
	const selfEmployed = container.getByTestId("Self-Employed");
	const Unemployed = container.getByTestId("Unemployed");
	const Retired = container.getByTestId("Retired");
	await act(() => { fireEvent.click(Retired) })
	expect(Hourly).not.toHaveClass("activeBorder");
	expect(Salary).not.toHaveClass("activeBorder");
	expect(selfEmployed).not.toHaveClass("activeBorder");
	expect(Unemployed).not.toHaveClass("activeBorder");
	expect(Retired).toHaveClass("activeBorder");
	const ContinueButton = container.getByTestId("cntButton");
	expect(ContinueButton.hasAttribute("disabled")).toBe(false);
	const SelectField = container.getByTestId("select field");
	expect(SelectField).toHaveClass("hideMsg")
	const PhoneNumberField = container.getByTestId("phone number field")
	expect(PhoneNumberField).toHaveClass("hideMsg")
});

test("Routing forward to Annual Income", async () => {
	const container = render(<MockEmploymentStatus />);
	const ContinueButton = container.getByTestId("cntButton");
	act(() => {
		fireEvent.click(ContinueButton);
	});
	const page = container.queryByText("Tell us about your income")
	await waitFor(() => expect(page).toBeInTheDocument());
})

test("Routing Back to Personal Info Test", async () => {
	const container = render(<MockEmploymentStatus />);
	const BackButton = container.getByTestId("route backward");
	act(() => {
		fireEvent.click(BackButton);
	});
	const page = container.queryByText("Tell us about yourself")
	await waitFor(() => expect(page).toBeInTheDocument());
})
