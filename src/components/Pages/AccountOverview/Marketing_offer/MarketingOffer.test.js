import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen,waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import MarketingOffer from "./MarketingOffer";

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
					<MarketingOffer
          promoType={"GRIDS"}
          offerCode = {"TEST000036"}
          amount={10000} 
          branchPhone={"3213213210"}
          branchName={"Mariner"} />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the component is rendered", () => {
	render(component());
	const element = screen.getByTestId('MarketingOffer_component');
	expect(element).toBeTruthy();
});

test("Check why Mariner content is rendered", () => {
	render(component());
	const element = screen.getByTestId('whyMariner');
	expect(element).toBeTruthy();
});

test('Check Vacation plan is displayed',async () => {
	const { getByText } = render(component());
  await waitFor(() => {    
    expect(getByText("Are you looking to plan a vacation? Perhaps make a major purchase? Do you need to consolidate your debt? Life and expenses aren't always on the same schedule.")).toBeTruthy();
	}); 
})
