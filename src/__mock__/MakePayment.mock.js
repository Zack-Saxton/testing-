import { useAccountOverview } from "../components/Pages/MakePayment/useAccountOverview";
import { useHolidayCalender } from "../components/Pages/MakePayment/useHolidayCalender";
import { usePaymentMethod } from "../components/Pages/MakePayment/usePaymentMethod";
import { makePaymentMockData, holidayCalendarMockData, paymentMethodsMockData } from "./data/MakePaymentMock";

jest.mock("../components/Pages/MakePayment/useAccountOverview", ()=>({
  useAccountOverview: jest.fn(),
}))

jest.mock("../components/Pages/MakePayment/useHolidayCalender", ()=>({
  useHolidayCalender: jest.fn(),
}))

jest.mock("../components/Pages/MakePayment/usePaymentMethod", ()=>({
  usePaymentMethod: jest.fn(),
}))

export const AccountOverviewDataMock = () => {
  useAccountOverview.mockImplementation(() => ({
    isFetching: false,
    accountDetails: makePaymentMockData,
  }));
}

export const HolidayCalenderDataMock = () => {
  useHolidayCalender.mockImplementation(() => ({
    isLoadingHoliday: false,
    holidayCalenderData: holidayCalendarMockData,
  }))
}

export const PaymentMethodMock = () => {
  usePaymentMethod.mockImplementation(() => ({
    isLoadingPayment: false,
    payments: paymentMethodsMockData,
  }))
}