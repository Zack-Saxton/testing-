import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
import {
  act,
  fireEvent,
  getAllByTestId,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import MakePayment from "./MakePayment";
import { useAccountOverview } from "../../../hooks/useAccountOverview";
import { useHolidayCalender } from "../../../hooks/useHolidayCalender";
import { usePaymentMethod } from "../../../hooks/usePaymentMethod";
import LoanAccount from "../../../contexts/LoanAccount";
import {
  makePaymentMockData,
  holidayCalendarMockData,
  paymentMethodsMockData,
} from "./../../../__mock__/data/MockData";
import AccountOverview from "../AccountOverview/AccountOverview";
import NavContext from "../../../contexts/NavContext";
import {
  AccountOverviewDataMock,
  HolidayCalenderDataMock,
  PaymentMethodMock,
} from "../../../__mock__/MakePayment.mock";
import { Container } from "@mui/system";
import { makePayment } from "../../Controllers/PaymentsController";
jest.mock("../../Controllers/PaymentsController");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 500000,
    },
  },
});

jest.mock("../../../hooks/useAccountOverview", () => ({
  useAccountOverview: jest.fn(),
}));

jest.mock("../../../hooks/useHolidayCalender", () => ({
  useHolidayCalender: jest.fn(),
}));

jest.mock("../../../hooks/usePaymentMethod", () => ({
  usePaymentMethod: jest.fn(),
}));

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
};

test("Checks the component is rendered", () => {
  makePayment.mockResolvedValue({ data: { successful_payment: "Cash Only" } });
  AccountOverviewDataMock();
  HolidayCalenderDataMock();
  PaymentMethodMock();
  const container = render(component());
  const element = container.getByTestId("makePaymentComponent");
  expect(element).toBeTruthy();
});

test("Please Contact Text Availability test", () => {
  makePayment.mockResolvedValue({ data: { successful_payment: "Cash Only" } });
  AccountOverviewDataMock();
  HolidayCalenderDataMock();
  PaymentMethodMock();
  const container = render(component());
  const element = container.getByTestId("pleaseContact");
  expect(element).toBeTruthy();
});

test("Cell values rendered correctly", () => {
  makePayment.mockResolvedValue({ data: { successful_payment: "Cash Only" } });
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
  makePayment.mockResolvedValue({ data: { successful_payment: "Cash Only" } });
  AccountOverviewDataMock();
  HolidayCalenderDataMock();
  PaymentMethodMock();
  const container = render(component());
  const headingElement = container.getByTestId("payment_Mode");
  expect(headingElement).toBeTruthy();
});

it("Check whether Payment Methods Dropdown is Rendering", () => {
  makePayment.mockResolvedValue({ data: { successful_payment: "Cash Only" } });
  AccountOverviewDataMock();
  HolidayCalenderDataMock();
  PaymentMethodMock();
  const container = render(component());
  const headingElement = container.getByTestId("payment_Methods");
  expect(headingElement).toBeTruthy();
});

it("Back button navigates to Account Overview page", async () => {
  makePayment.mockResolvedValue({ data: { successful_payment: "Cash Only" } });
  AccountOverviewDataMock();
  HolidayCalenderDataMock();
  PaymentMethodMock();
  const container = render(MockComponent());
  const backButton = container.getByTestId("back_Button");
  expect(backButton).toBeTruthy();
  fireEvent.click(backButton);
  const headingElement = container.getByTestId("subtitle_Title");
  await waitFor(() => expect(headingElement).toBeInTheDocument());
});

it("Default Account Number in the Payment Section", () => {
  makePayment.mockResolvedValue({ data: { successful_payment: "Cash Only" } });
  AccountOverviewDataMock();
  HolidayCalenderDataMock();
  PaymentMethodMock();
  const container = render(component());
  const headingElement = container.getByTestId("selectInput");
  expect(headingElement.value).toBe("");
});

it("changing payment method from select dropdown test", async () => {
  makePayment.mockResolvedValue({ data: { successful_payment: "Cash Only" } });
  AccountOverviewDataMock();
  HolidayCalenderDataMock();
  PaymentMethodMock();
  const { container } = render(component());
  const headingElement = container.querySelector(`input[name="select"]`);
  await act(() => {
    fireEvent.change(headingElement, {
      target: { value: "Savings (Acct-4455) (****4455)" },
    });
  });
  expect(headingElement).toBeTruthy();
  expect(headingElement.value).toBe("3751");
});

test("Single payment", async () => {
  makePayment.mockResolvedValue({ data: { successful_payment: "Cash Only" } });
  AccountOverviewDataMock();
  HolidayCalenderDataMock();
  PaymentMethodMock();
  const { getAllByText, container, getByTestId, getByText } = render(
    component()
  );

  expect(getAllByText("Add a payment method")).toBeTruthy();
  expect(getAllByText("Submit")).toHaveLength(1);
  expect(getAllByText("Auto Pay - Off")).toHaveLength(1);
  expect(getAllByText("Single Payment")).toHaveLength(1);
  expect(getAllByText("Payment Amount (may include fees)")).toHaveLength(1);
  expect(getAllByText("Cancel Future Payment")).toHaveLength(1);
  fireEvent.click(getByText("Cancel Future Payment"));
  const input = container.querySelector(`input[name="payment"]`);
  expect(input).toBeTruthy();
  await act(() => {
    fireEvent.change(input, { target: { value: "10.00" } });
  });
  expect(getAllByText("Payment Date (No Sundays or Holidays)")).toHaveLength(1);
  const scheduledPaymentBtn = getByTestId("scheduleButton_test");
  fireEvent.click(scheduledPaymentBtn);
  expect(getByTestId("close")).toBeTruthy();
  fireEvent.click(getByTestId("close"));
  expect(getAllByText("Bank/Card:")).toHaveLength(1);
  expect(getAllByText("Payment Date:")).toHaveLength(1);
  expect(getAllByText("Account Number:")).toHaveLength(1);
  expect(getAllByText("Confirm Your Payment?")).toHaveLength(1);
  expect(getAllByText("Cancel")).toHaveLength(1);
  expect(getAllByText("OK")).toHaveLength(1);
  fireEvent.click(getByText("Cancel"));
  fireEvent.click(getByText("OK"));
});

test("check Auto Pay Authorization", () => {
  makePayment.mockResolvedValue({ data: { successful_payment: "Cash Only" } });
  AccountOverviewDataMock();
  HolidayCalenderDataMock();
  PaymentMethodMock();
  const { getAllByText, container, getByTestId, getByText } = render(
    component()
  );
  expect(getAllByText("Auto Pay Authorization")).toHaveLength(1);
  fireEvent.click(getByText("Auto Pay Authorization"));
  expect(getByTestId("dialogParagraph")).toBeInTheDocument();
  fireEvent.click(getByText("OK"))
});

test("should first", () => {
  makePayment.mockResolvedValue({ data: { successful_payment: "Cash Only" } });
  AccountOverviewDataMock();
  HolidayCalenderDataMock();
  PaymentMethodMock();
  const { getAllByText, container, getByTestId, getByText } = render(
    component()
  );
  expect(getAllByText("Single Payment")).toHaveLength(1);
  expect(getAllByText("Payment Amount (may include fees)")).toHaveLength(1);
});

it("Make a Payment", () => {
  AccountOverviewDataMock();
  HolidayCalenderDataMock();
  PaymentMethodMock();
  const container = render(component());
  const heading = container.getByText("Make a Payment");
  // expect(headingElement.value).toBe("Make a Payment");
  expect(heading).toBeInTheDocument();
});

test("test payment all possibilities", async () => {
  makePayment.mockResolvedValue({ data: { successful_payment: "Cash Only" } });
  AccountOverviewDataMock();

  HolidayCalenderDataMock();
  PaymentMethodMock();
  const { getAllByText, container, getByTestId, getByText } = render(
    component()
  );
  const scheduledPaymentBtn = getByTestId("scheduleButton_test");
  fireEvent.click(scheduledPaymentBtn);
  const input = container.querySelector(`input[name="payment"]`);
  expect(input).toBeTruthy();
  await act(() => {
    fireEvent.change(input, { target: { value: "" } });
  });
  fireEvent.click(scheduledPaymentBtn);
  await act(() => {
    fireEvent.change(input, { target: { value: "9" } });
  });
  fireEvent.click(scheduledPaymentBtn);
  await act(() => {
    fireEvent.change(input, { target: { value: "12" } });
  });
  fireEvent.click(scheduledPaymentBtn);
  await act(() => {
    fireEvent.change(input, { target: { value: "1000" } });
  });
  fireEvent.click(scheduledPaymentBtn);
});

test("test Date Picker is clickable", () => {
  makePayment.mockResolvedValue({ data: { successful_payment: "Cash Only" } });
  AccountOverviewDataMock();
  HolidayCalenderDataMock();
  PaymentMethodMock();
  const { getAllByText, container, getByTestId, getByText } = render(
    component()
  );
  const datePicker = container.querySelector(`input[name="date"]`);
  expect(datePicker).toBeTruthy();
  fireEvent.click(datePicker);
});

test("test cancel payment button", () => {
  makePayment.mockResolvedValue({ data: { successful_payment: "Cash Only" } });
  const data = AccountOverviewDataMock();
  console.log(data);
  HolidayCalenderDataMock();
  PaymentMethodMock();
  const { getAllByText, container, getByTestId, getByText } = render(
    component()
  );
  const cancel = container.querySelector(`button[id="cancelPaymentBtn"]`);
  expect(cancel).toBeTruthy;
  fireEvent.click(cancel);
});

test("check schedule Button is clicked in cash onlyv", () => {
 makePayment.mockResolvedValue({ data: { successful_payment: "Cash Only" } });
   AccountOverviewDataMock();
   HolidayCalenderDataMock();
   PaymentMethodMock();
   const { getAllByText, container, getByTestId, getByText } = render(
    component()
   );
   const scheduledPaymentBtn = getByTestId("scheduleButton_test");
   expect(scheduledPaymentBtn).toBeInTheDocument();
});

test("Scheduled payment in status 400", async () => {
  makePayment.mockResolvedValue({
    status: 400,
    data: { message: "Payment is Failed"}
   
  });
  AccountOverviewDataMock();
  HolidayCalenderDataMock();
  PaymentMethodMock();
  const { getAllByText, container, getByTestId, getByText } = render(
    component()
  );
  const input = container.querySelector(`input[name="payment"]`);
  expect(input).toBeTruthy();
  await act(() => {
    fireEvent.change(input, { target: { value: "500" } });
  })
 const scheduledPaymentBtn = getByTestId("scheduleButton_test");
  expect(scheduledPaymentBtn).toBeInTheDocument();
  fireEvent.click(scheduledPaymentBtn);
  expect(getByText("OK")).toBeInTheDocument();
  fireEvent.click(getByText("OK"));
});

test("Scheduled payment in payment completed is undefined", async () => {
  makePayment.mockResolvedValue({
    status: 200,
    data: { paymentdResult: { paymentCompleted: undefined } },
  });
  AccountOverviewDataMock();
  HolidayCalenderDataMock();
  PaymentMethodMock();
  const { getAllByText, container, getByTestId, getByText } = render(
    component()
  );
  const input = container.querySelector(`input[name="payment"]`);
  expect(input).toBeTruthy();
  await act(() => {
    fireEvent.change(input, { target: { value: "500" } });
  });
  const scheduledPaymentBtn = getByTestId("scheduleButton_test");
  expect(scheduledPaymentBtn).toBeInTheDocument();
  fireEvent.click(scheduledPaymentBtn);
  expect(getByText("OK")).toBeInTheDocument();
  fireEvent.click(getByText("OK"));
});

test("Scheduled payment in status in 200", async () => {
  makePayment.mockResolvedValue({
    status: 200,
    data: { paymentResult: { PaymentCompleted: true } },
  });
  AccountOverviewDataMock();
  HolidayCalenderDataMock();
  PaymentMethodMock();
  const { getAllByText, container, getByTestId, getByText } = render(
    component()
  );
  const input = container.querySelector(`input[name="payment"]`);
  expect(input).toBeTruthy();
  await act(() => {
    fireEvent.change(input, { target: { value: "500" } });
  });
  const scheduledPaymentBtn = getByTestId("scheduleButton_test");
  expect(scheduledPaymentBtn).toBeInTheDocument();
  fireEvent.click(scheduledPaymentBtn);
  expect(getByText("OK")).toBeInTheDocument();
  fireEvent.click(getByText("OK"));
 
});




