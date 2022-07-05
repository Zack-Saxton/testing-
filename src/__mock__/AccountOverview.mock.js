import  { useAccountOverview }  from './../components/Pages/AccountOverview/AccountOverviewHook/useAccountOverview';
import { mockDataActiveLoans } from './data/ActiveLoansMockData';
import {mockDataOne, mockData as recentPaymentData} from './data/RecentPaymentsMockData';
import { mockData } from './data/RecentApplicationsMockData'

jest.mock("./../components/Pages/AccountOverview/AccountOverviewHook/useAccountOverview", ()=>({
  useAccountOverview: jest.fn(),
}))

export const AccountOverviewDataMock = () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataActiveLoans,
  }));
}

export const RecentPaymentsDataMock = () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockDataOne,
  }));
}

export const RecentPaymentsDataMockTwo = () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: recentPaymentData,
  }));
}

export const RecentApplicationsDataMock = () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: mockData,
  }));
}

export const AccountOverviewDataMockIsLoading = () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: true,
  }));
}

export const AccountOverviewDataMockIsError = () => {
  useAccountOverview.mockImplementation(() => ({
    isError: true,
  }));
}