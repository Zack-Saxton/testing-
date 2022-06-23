import "@testing-library/jest-dom";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/styles';
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import { createTheme } from '@mui/material/styles';
import AmOneNoOffersAvailable from "./AmOneNoOffersAvailable";
import { QueryClient, QueryClientProvider } from 'react-query';

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
const component = () =>{
	return(
    <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <CheckMyOffers>
          <AmOneNoOffersAvailable />
        </CheckMyOffers>
      </BrowserRouter>
    </QueryClientProvider>
    </ThemeProvider>
	);
}


test("First paragraph renders accordingly", () => {
render(component());

const firstParagraph = screen.getByTestId("firstParagraph");
expect(firstParagraph).toBeTruthy();

});

test("Second paragraph renders accordingly", () => {
render(component());

const secondParagraph = screen.getByTestId("secondParagraph");

expect(secondParagraph).toBeTruthy()
expect(screen.queryByText(`If you still wish to obtain a loan please consider our partner Amone who provides a free service matching you with other loan options that may fit your credit situation.`, { exact: true })).toBeVisible();

});

test("amOne affiliate box inside texts render and button functionlity works", () => {
render(component());

const firstSentence = screen.getByTestId("firstSentence");

expect(firstSentence).toBeTruthy();
expect(screen.queryByText(`Get More Loan Options. Get Started!`, { exact: true })).toBeVisible();

const secondSentence = screen.getByTestId('secondSentence');

expect(secondSentence).toBeTruthy();
expect(screen.queryByText(`Unsecured options for almost any credit situation`, { exact: true })).toBeVisible();

const thirdSentence = screen.getByTestId('thirdSentence');

expect(thirdSentence).toBeTruthy()
expect(screen.queryByText(`More Loan options that may fit your needs`, { exact: true })).toBeVisible();

const fourthSentence = screen.getByTestId('fourthSentence');

expect(fourthSentence).toBeTruthy()
expect(screen.queryByText(`Checking your rates will not impact your credit score`, { exact: true })).toBeVisible();

});

test('Button renders and Functional ', () =>  {
render(component())

const amOneBtn = screen.getByTestId('amOnebtn'); 

fireEvent.click(amOneBtn);

expect(amOneBtn).toBeTruthy();
})

 test("Third paragraph renders accordingly", () => {
 render(component());

   const thirdParagraph = screen.getByTestId("thirdParagraph");
   expect(thirdParagraph).toBeTruthy();
 });

test("Fourth paragraph renders accordingly", () => {
render(component());

  const fourthParagraph = screen.getByTestId("fourthParagraph");
  
  expect(fourthParagraph).toBeTruthy();
  expect(screen.queryByText(`** Please review the terms and conditions presented on the Quinstreet Website to understand when and how your credit score may be affected if you choose to submit your personal information to the Quinstreet Website. Mariner is not responsible for any change in your credit score or any related inquiries resulting from your submission of personal information to the Quinstreet Website.`, { exact: true })).toBeVisible();

});

