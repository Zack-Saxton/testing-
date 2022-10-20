import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import MakePayment from "./MakePayment";
import { useAccountOverview } from '../../../hooks/useAccountOverview';
import { useHolidayCalender } from '../../../hooks/useHolidayCalender';
import { usePaymentMethod } from '../../../hooks/usePaymentMethod';
import LoanAccount from '../../../contexts/LoanAccount';
import { makePaymentMockData, holidayCalendarMockData, paymentMethodsMockData } from "./../../../__mock__/data/MockData";
import AccountOverview from '../AccountOverview/AccountOverview'
import NavContext from '../../../contexts/NavContext';
import { AccountOverviewDataMock, HolidayCalenderDataMock, PaymentMethodMock } from "../../../__mock__/MakePayment.mock";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 500000,
    },
  },
});

jest.mock('../../../hooks/useAccountOverview', ()=>({
  useAccountOverview: jest.fn(),
}))

jest.mock("../../../hooks/useHolidayCalender", ()=>({
  useHolidayCalender: jest.fn(),
}))

jest.mock('../../../hooks/usePaymentMethod', ()=>({
  usePaymentMethod: jest.fn(),
}))

const theme = createTheme();
window.scrollTo = jest.fn();
const component = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LoanAccount>
          <NavContext>
            <MakePayment />
          </NavContext>
          </LoanAccount>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const MockComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LoanAccount>
          <NavContext>
            <AccountOverview />
            <MakePayment />
          </NavContext>
          </LoanAccount>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

test("Checks the component is rendered", () => {
  // useAccountOverview.mockImplementation(() => ({
  //   isFetching: false,
  //   data: makePaymentMockData,
  // }));
  // useHolidayCalender.mockImplementation(() => ({
  //   isLoading: false,
  //   data: holidayCalendarMockData,
  // }))
  // usePaymentMethod.mockImplementation(() => ({
  //   isLoading: false,
  //   data: paymentMethodsMockData,
  // }))
  AccountOverviewDataMock();
  HolidayCalenderDataMock();
  PaymentMethodMock();
  const container = render(component());
  const element = container.getByTestId("makePaymentComponent");
  expect(element).toBeTruthy();
});

test("Please Contact Text Availability test", () => {
  // useAccountOverview.mockImplementation(() => ({
  //   isFetching: false,
  //   data: makePaymentMockData,
  // }));
  // useHolidayCalender.mockImplementation(() => ({
  //   isLoading: false,
  //   data: holidayCalendarMockData,
  // }))
  // usePaymentMethod.mockImplementation(() => ({
  //   isLoading: false,
  //   data: paymentMethodsMockData,
  // }))
  AccountOverviewDataMock();
  HolidayCalenderDataMock();
  PaymentMethodMock();
  const container = render(component());
  const element = container.getByTestId("pleaseContact");
  expect(element).toBeTruthy();
});

test("Cell values rendered correct;y", () => {
  // useAccountOverview.mockImplementation(() => ({
  //   isFetching: false,
  //   data: makePaymentMockData,
  // }));
  // useHolidayCalender.mockImplementation(() => ({
  //   isLoading: false,
  //   data: holidayCalendarMockData,
  // }))
  // usePaymentMethod.mockImplementation(() => ({
  //   isLoading: false,
  //   data: paymentMethodsMockData,
  // }))
    AccountOverviewDataMock();
    HolidayCalenderDataMock();
    PaymentMethodMock();
    render(component());
    const AccNo = screen.getByText("3508-006936-16");
    expect(AccNo).toBeTruthy();  
    const todayPayoff = screen.getByText("$4,167.52*");
    expect(todayPayoff).toBeTruthy();  
    const regAmount = screen.getByText("$174.17");
    expect(regAmount).toBeTruthy();
    const intrest = screen.getByText("22.99%");
    expect(intrest).toBeTruthy();
    const loadFees = screen.getByText("$0.00");
    expect(loadFees).toBeTruthy();
    const dueDate = screen.getByText("09/07/2022");
    expect(dueDate).toBeTruthy();
    const autoPay = screen.getByText("NONE");
    expect(autoPay).toBeTruthy();
    const shedulePayment = screen.getByText("Disabled");
    expect(shedulePayment).toBeTruthy();
  });

  it("Check whether Payment section is Rendering", () => {
    // useAccountOverview.mockImplementation(() => ({
    //   isFetching: false,
    //   data: makePaymentMockData,
    // }));
    // useHolidayCalender.mockImplementation(() => ({
    //   isLoading: false,
    //   data: holidayCalendarMockData,
    // }))
    // usePaymentMethod.mockImplementation(() => ({
    //   isLoading: false,
    //   data: paymentMethodsMockData,
    // }))
    AccountOverviewDataMock();
    HolidayCalenderDataMock();
    PaymentMethodMock();
    const container = render(component());
    const headingElement = container.getByTestId("payment_Mode");
    expect(headingElement).toBeTruthy();
  });

  it("Check whether Payment Methods Dropdown is Rendering", () => {
    // useAccountOverview.mockImplementation(() => ({
    //   isFetching: false,
    //   data: makePaymentMockData,
    // }));
    // useHolidayCalender.mockImplementation(() => ({
    //   isLoading: false,
    //   data: holidayCalendarMockData,
    // }))
    // usePaymentMethod.mockImplementation(() => ({
    //   isLoading: false,
    //   data: paymentMethodsMockData,
    // }))
    AccountOverviewDataMock();
    HolidayCalenderDataMock();
    PaymentMethodMock();
    const container = render(component());
    const headingElement = container.getByTestId("payment_Methods");
    expect(headingElement).toBeTruthy();
  });

  it("Back button navigates to Account Overview page", async() => {
    // useAccountOverview.mockImplementation(() => ({
    //   isFetching: false,
    //   data: makePaymentMockData,
    // }));
    // useHolidayCalender.mockImplementation(() => ({
    //   isLoading: false,
    //   data: holidayCalendarMockData,
    // }))
    // usePaymentMethod.mockImplementation(() => ({
    //   isLoading: false,
    //   data: paymentMethodsMockData,
    // }))
    AccountOverviewDataMock();
    HolidayCalenderDataMock();
    PaymentMethodMock();
    const container = render(MockComponent());
    const backButton = container.getByTestId("back_Button")
    expect(backButton).toBeTruthy();
    fireEvent.click(backButton); 
    const headingElement = container.getByTestId("subtitle_Title");
    await waitFor(() => expect(headingElement).toBeInTheDocument());
  });

  it("Default Account Number in the Payment Section", () => {
    // useAccountOverview.mockImplementation(() => ({
    //   isFetching: false,
    //   data: makePaymentMockData,
    // }));
    // useHolidayCalender.mockImplementation(() => ({
    //   isLoading: false,
    //   data: holidayCalendarMockData,
    // }))
    // usePaymentMethod.mockImplementation(() => ({
    //   isLoading: false,
    //   data: paymentMethodsMockData,
    // }))
    AccountOverviewDataMock();
    HolidayCalenderDataMock();
    PaymentMethodMock();
    const container = render(component());
    const headingElement = container.getByTestId('selectInput');
    expect(headingElement.value).toBe("");
  });

  it("changing payment method from select dropdown test", async() => {
    // useAccountOverview.mockImplementation(() => ({
    //   isFetching: false,
    //   data: makePaymentMockData,
    // }));
    // useHolidayCalender.mockImplementation(() => ({
    //   isLoading: false,
    //   data: holidayCalendarMockData,
    // }))
    // usePaymentMethod.mockImplementation(() => ({
    //   isLoading: false,
    //   data: paymentMethodsMockData,
    // }))
    AccountOverviewDataMock();
    HolidayCalenderDataMock();
    PaymentMethodMock();
    const { container } = render(component());
    const headingElement = container.querySelector(`input[name="select"]`);
  await act(() => {
		fireEvent.change(headingElement, { target: { value: "Savings (Acct-4455) (****4455)" } });
	});
	expect(headingElement).toBeTruthy();
  expect(headingElement.value).toBe("3751");
  });

