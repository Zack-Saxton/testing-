import  { useAccountOverview }  from './../components/Pages/AccountOverview/AccountOverviewHook/useAccountOverview';
import { accountOverviewData } from "./data/Loan.data";
jest.mock("./../components/Pages/AccountOverview/AccountOverviewHook/useAccountOverview", ()=>({
  useAccountOverview: jest.fn(),
}))
export const LoanDataMock = () => {
  useAccountOverview.mockImplementation(() => ({
    isLoading: false,
    accountDetails: accountOverviewData,
  }));
}