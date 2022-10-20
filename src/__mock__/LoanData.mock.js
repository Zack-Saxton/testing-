import  { useAccountOverview }  from '../hooks/useAccountOverview';
import { accountOverviewData } from "./data/Loan.data";
jest.mock('../hooks/useAccountOverview', ()=>({
  useAccountOverview: jest.fn(),
}))
export const LoanDataMock = () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    data: accountOverviewData,
  }));
}

export const LoanDataMockWithIsLoading = () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: true,
  }));
}