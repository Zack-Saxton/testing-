import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render } from '@testing-library/react';
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import LoanAccount from '../../../contexts/LoanAccount';
import  NavContext  from "../../../contexts/NavContext";
import AccountOverview from './AccountOverview';

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
const MockAccountOverview = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LoanAccount>
            <NavContext>
            <AccountOverview />
            </NavContext>
          </LoanAccount>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

test('should render the entire component', () => {
  const container = render(MockAccountOverview());
  const headingElement = container.getByTestId("subtitle_Title");
  expect(headingElement).toBeTruthy();
});

test('Limiter Offers render test', () => {
  const container = render(MockAccountOverview());
  const headingElement = container.getByTestId("limited_offer");
  expect(headingElement).toBeTruthy();
})

test('Active Loans render test', () => {
  const container = render(MockAccountOverview());
  const headingElement = container.getByTestId("active loans");
  expect(headingElement).toBeTruthy();
})

test('Recent Payment render test', () => {
  const container = render(MockAccountOverview());
  const headingElement = container.getByText("Recent Payments")
  expect(headingElement).toBeTruthy();
})

test('Recent Applications render test', () => {
  const container = render(MockAccountOverview());
  const headingElement = container.getByTestId("recent applications");
  expect(headingElement).toBeTruthy();
})
