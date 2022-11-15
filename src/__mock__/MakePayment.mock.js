import { useAccountOverview } from "../hooks/useAccountOverview";
import { useHolidayCalender } from "../hooks/useHolidayCalender";
import { usePaymentMethod } from "../hooks/usePaymentMethod";
import { makePaymentMockData, holidayCalendarMockData, paymentMethodsMockData } from "./data/MakePaymentMock";

jest.mock("../hooks/useAccountOverview", ()=>({
  useAccountOverview: jest.fn(),
}))

jest.mock("../hooks/useHolidayCalender", ()=>({
  useHolidayCalender: jest.fn(),
}))

jest.mock("../hooks/usePaymentMethod", ()=>({
  usePaymentMethod: jest.fn(),
}))

export const AccountOverviewDataMock = () => {
  useAccountOverview.mockImplementation(() => ({
    isFetching: false,
    data: makePaymentMockData,
  }));
}

export const HolidayCalenderDataMock = () => {
  useHolidayCalender.mockImplementation(() => ({
    isLoading: false,
    data: holidayCalendarMockData,
  }))
}

export const PaymentMethodMock = () => {
  usePaymentMethod.mockImplementation(() => ({
    isLoading: false,
    data: paymentMethodsMockData,
  }))
}