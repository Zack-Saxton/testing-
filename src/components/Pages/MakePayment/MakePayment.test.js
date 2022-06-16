import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import MakePayment from "./MakePayment";
import { useAccountOverview } from './useAccountOverview';
import { useHolidayCalender } from './useHolidayCalender';
import { usePaymentMethod } from './usePaymentMethod';
import { accOverviewData, holidayData, paymentData } from './MakePaymentMockData';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 500000,
    },
  },
});
jest.mock("./useAccountOverview", () => ({
  useAccountOverview: jest.fn(),
}))

jest.mock("./usePaymentMethod", () => ({
  usePaymentMethod: jest.fn(),
}))

jest.mock("./useHolidayCalender", () => ({
  useHolidayCalender: jest.fn(),
}))



const theme = createTheme();
window.scrollTo = jest.fn();



const component = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MakePayment />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};


test("Please Contact Text Availability test", () => {
  useAccountOverview.mockImplementation(() => ({
    isFetching: false,
    accountDetails: accOverviewData(),
  }));

  usePaymentMethod.mockImplementation(() => ({
    isLoadingPayment: false,
    paymentsData: paymentData()
  }));

  useHolidayCalender.mockImplementation(() => ({
    isLoadingHoliday: false,
    holidayCalenderData: holidayData(),
  }));

  render(component());
  const element = screen.getByTestId("makePaymentComponent");
  expect(element).toBeTruthy();
});