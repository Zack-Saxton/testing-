import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import ProfilePicture from '../../../../contexts/ProfilePicture';
import AnnualIncome from "./index.js";

afterEach(cleanup);
window.scrollTo = jest.fn();

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
				<CheckMyOffers>
					<ProfilePicture>
						<AnnualIncome />
					</ProfilePicture>
				</CheckMyOffers>
			</QueryClientProvider>
		</ThemeProvider>
	);
}
test("Checks the component is rendered", () => {
	const container = render(component(), { wrapper: MemoryRouter });
	const element = container.getByTestId('annual-income-component');
	//screen.debug(undefined, 300000);
	expect(element).toBeTruthy();
});

test("Checks Annual personal Income filed in the UI", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="personalIncome"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('');
});

test("Checks House hold Income filed in the UI", () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="householdIncome"]`);
	expect(input).toBeTruthy();
	expect(input.value).toBe('');
});

test("Check the Continue button in  UI", () => {
	const { container, getByText } = render(component(), { wrapper: MemoryRouter });
	expect(getByText("Continue")).toBeTruthy();
});

test("Check can able to enter Annual personal Income in the input field", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="personalIncome"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "150000" } });
	});
	expect(input.value).toBe('150000');
});

test("Check can able to enter House hold Income in the input field", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="householdIncome"]`);
	await act(() => {
		fireEvent.change(input, { target: { value: "75000" } });
	});
	expect(input.value).toBe('75000');
});

test("Check accept only number in Annual personal Income field", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="personalIncome"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "Mariner" } });
	});
	expect(input.value).toBe('');
});

test("Check accept only number in House hold Income field", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="householdIncome"]`);
	await act(() => {
		fireEvent.change(input, { target: { value: "Mariner" } });
	});
	expect(input.value).toBe('');
});

test("Check the validation is working for Annual personal Income field", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="personalIncome"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "" } });
		fireEvent.blur(input);
	});
	const errorInfo = container.querySelector(`p[id="personalIncome-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Annual personal income is required');
});

test("Check the validation is working for House hold Income field", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const input = container.querySelector(`input[name="householdIncome"]`);
	await act(() => {
		fireEvent.change(input, { target: { value: "" } });
		fireEvent.blur(input);
	});
	const errorInfo = container.querySelector(`p[id="householdIncome-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Annual household income is required');
});

test("Show error message if button is click without entering Annual and house hold income", async () => {
	const { container } = render(component(), { wrapper: MemoryRouter });
	const element = screen.getByText("Continue")
	expect(element).toBeTruthy();
	await act(() => {
		fireEvent.click(element);
	});
	const personalError = container.querySelector(`p[id="personalIncome-helper-text"]`);
	expect(personalError).toBeTruthy();
	expect(personalError).toHaveTextContent('Annual personal income is required');
	const houseHoldError = container.querySelector(`p[id="householdIncome-helper-text"]`);
	expect(houseHoldError).toBeTruthy();
	expect(houseHoldError).toHaveTextContent('Annual household income is required');
});

test('Should match the snapshot', () => {
	const { asFragment } = render(component(), { wrapper: MemoryRouter });
	expect(asFragment).toMatchSnapshot();
});