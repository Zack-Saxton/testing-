import  { useAccountOverview }  from '../hooks/useAccountOverview';
import { mockDataActiveLoans } from './data/ActiveLoansMockData';
import {mockDataOne, mockData as recentPaymentData, noData} from './data/RecentPaymentsMockData';
import { mockData } from './data/RecentApplicationsMockData'
import { accountOverviewData } from './data/Loan.data'

jest.mock('../hooks/useAccountOverview', ()=>({
  useAccountOverview: jest.fn(),
}))

export const AccountOverviewDataMock = () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    data: mockDataActiveLoans,
  }));
}

export const RecentPaymentsDataMock = () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    data: accountOverviewData,
  }));
}

export const RecentPaymentsDataMockTwo = () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    data: recentPaymentData,
  }));
}

export const RecentPaymentsNoData = () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    data: noData,
  }));
}

export const RecentApplicationsDataMock = () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    data: accountOverviewData,
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

export const LimitedOffersMock = () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    data: accountOverviewData,
  }));
}