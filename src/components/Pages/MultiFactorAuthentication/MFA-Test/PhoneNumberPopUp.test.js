import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import PhoneNumberPopUp from "../PhoneNumberPopUp";

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
					<PhoneNumberPopUp 
             cellPhoneNumber = "96532545588" 
             optionalPhoneNumber = "9841177365"
                  />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the PhoneNumberPopUp  is rendered", () => {
	render(component());
	const element = screen.getByTestId('PhoneNumberPopUp_component');
	expect(element).toBeTruthy();
});

test("Checks the Phone Number function  is rendered", () => {
	render(component());
	const element = screen.getByText('Get a code on (***) *** 5588');
	expect(element).toBeTruthy();
});

test("Checks the Option Phone Number function  is rendered", () => {
	render(component());
	const element = screen.getByText('Get a code on (***) *** 7365');
	expect(element).toBeTruthy();
});


test("Check Radio Button is rendered", () => {
  const { container } = render(component());
	const input = container.querySelector(`input[name="method"]`);
  expect(input).toBeTruthy();
  
});

test("Select Phone Number for OTP", () => {
  const {container} = render(component());
  const radio = container.querySelector(`input[name="method"]`);
  fireEvent.change(radio, { target: { value: "96532545588" } });
  expect(radio.value).toBe('96532545588');
});