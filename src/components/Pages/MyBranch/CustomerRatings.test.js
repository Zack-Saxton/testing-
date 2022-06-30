import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import CustomerRatings from "./CustomerRatings";
const theme = createTheme();
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
const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
					<CustomerRatings />
			</QueryClientProvider>
		</ThemeProvider>
	);
};

test("Checks the component is rendered", () => {
	render(component());
	const element = screen.getByTestId('feefoRatingComponent');
	expect(element).toBeTruthy();
});

test("Feefo the component is rendered", () => {
	render(component());
	const element = screen.findByAltText('Feefo Platinum Trusted Service Award');
	expect(element).toBeTruthy();
});