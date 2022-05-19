import { cleanup, fireEvent, render,screen } from "@testing-library/react";
import React from "react";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import Zipcode from "./index.js";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';

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

const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
				<CheckMyOffers>
				<Zipcode />
			</CheckMyOffers>
			</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the component is rendered", () => {
	render(component());
	const element = screen.getByTestId('zipCode_Component');
	expect(element).toBeTruthy();
});


test("Render ZipCode ", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="zip"]`);
	fireEvent.change(input, { target: { value: "12345" } });
	expect(input).toBeTruthy();
	expect(input.value).toBe('12345');
});


it("zipcode should be 5 digits", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="zip"]`);
	expect(input.maxLength).toBe(5);
});

test("Zipcode Valid Input", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="zip"]`);
	fireEvent.change(input, { target: { value: "abc" } });
	expect(input.value).toBe("");
	fireEvent.change(input, { target: { value: "12345" } });
	expect(input.value).toBe("12345");
});



test("Button Onclick", () => {
	render(component());
	const button = screen.getByTestId("submit");
	fireEvent.click(button);
});

test('Should match the snapshot', () => {
	const { asFragment } = render(component());
	expect(asFragment).toMatchSnapshot();
});
