import { cleanup, fireEvent, render, act, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from '@mui/styles';
import { createTheme} from '@mui/material/styles'
import EmploymentStatus from "./index.js";
import PersonalInfo from "../PersonalInfo/index";
import AnnualIncome from "../AnnualIncome/index"
import CheckMyOffers from "../../../../contexts/CheckMyOffers"

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
const MockEmploymentStatus = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>    
        <BrowserRouter>
          <CheckMyOffers>
						<PersonalInfo/>
            <EmploymentStatus/>
						<AnnualIncome/>
          </CheckMyOffers>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}


test("Employment Status Render test", () => {
	const container = render(<MockEmploymentStatus/>);
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

test("Employment Status on Clicking Hourly", () => {
	const container = render(<MockEmploymentStatus/>);

	const Hourly = container.getByTestId("Hourly");
	const Salary = container.getByTestId("Employed Salaried");
	const selfEmployed = container.getByTestId("Self-Employed");
	const Unemployed = container.getByTestId("Unemployed");
	const Retired = container.getByTestId("Retired");
	act(() => {fireEvent.click(Hourly)})
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

test("Employment Status on Clicking Salaried", () => {
	const container = render(<MockEmploymentStatus/>);

	const Hourly = container.getByTestId("Hourly");
	const Salary = container.getByTestId("Employed Salaried");
	const selfEmployed = container.getByTestId("Self-Employed");
	const Unemployed = container.getByTestId("Unemployed");
	const Retired = container.getByTestId("Retired");
	act(() => {fireEvent.click(Salary)})
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

test("Employment Status on Clicking Self-Employed", () => {
	const container = render(<MockEmploymentStatus/>);

	const Hourly = container.getByTestId("Hourly");
	const Salary = container.getByTestId("Employed Salaried");
	const selfEmployed = container.getByTestId("Self-Employed");
	const Unemployed = container.getByTestId("Unemployed");
	const Retired = container.getByTestId("Retired");
	act(() => {fireEvent.click(selfEmployed)})
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

test("Employment Status on Clicking Unemployed", () => {
	const container = render(<MockEmploymentStatus/>);

	const Hourly = container.getByTestId("Hourly");
	const Salary = container.getByTestId("Employed Salaried");
	const selfEmployed = container.getByTestId("Self-Employed");
	const Unemployed = container.getByTestId("Unemployed");
	const Retired = container.getByTestId("Retired");
	act(() => {fireEvent.click(Unemployed)})
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

test("Employment Status on Clicking Retired", () => {
	const container = render(<MockEmploymentStatus/>);

	const Hourly = container.getByTestId("Hourly");
	const Salary = container.getByTestId("Employed Salaried");
	const selfEmployed = container.getByTestId("Self-Employed");
	const Unemployed = container.getByTestId("Unemployed");
	const Retired = container.getByTestId("Retired");
	act(() => {fireEvent.click(Retired)})
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

test("Routing forward to Annual Income", async() => {
	const container = render(<MockEmploymentStatus/>);
	const ContinueButton = container.getByTestId("cntButton");
	fireEvent.click(ContinueButton);
	const page = container.queryByText("Tell us about your income")
	await waitFor(() => expect(page).toBeInTheDocument());
})

test("Routing Back to Personal Info Test", async() => {
	const container = render(<MockEmploymentStatus/>);
	const BackButton = container.getByTestId("route backward");
	fireEvent.click(BackButton);
	const page = container.queryByText("Tell us about yourself")
	await waitFor(() => expect(page).toBeInTheDocument());
})




