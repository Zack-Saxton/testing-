import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render  } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import PreApproved from "./index";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";

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

const MockPreApproved = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
        <CheckMyOffers>
        <PreApproved />
        </CheckMyOffers>
					</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	)
}

test("Button Avaliability and Triggering", () => {
	const container = render(<MockPreApproved />);
  const ContinueButton = container.getByTestId("continue");
	expect(ContinueButton).toBeTruthy();
  fireEvent.click(ContinueButton); 
})

test("Back Arrow is loaded",()=>{
  const container = render(<MockPreApproved />);
  const back_arrow = container.getByTestId("backarrow");
	expect(back_arrow).toBeTruthy();
})


test("Offer Code Text is Loaded",()=>{
  const container = render(<MockPreApproved/>);
  const text = container.getByTestId("offerCodeTriggerText");
  expect(text).toBeTruthy();
})

test("Offer Amount Loaded",()=>{
  const container = render(<MockPreApproved/>);
  const offerCode = container.getByTestId("offeramount");
  expect(offerCode).toBeTruthy();
})



