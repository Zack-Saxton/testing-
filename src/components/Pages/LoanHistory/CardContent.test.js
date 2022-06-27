import { createTheme,  } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { waitFor, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import LoanHistoryCard from "./CardContent";
import { useAccountOverview } from '../AccountOverview/AccountOverviewHook/useAccountOverview';
import { LoanDataMock, LoanDataMockWithIsLoading } from "./../../../__mock__/LoanData.mock";

import { mockData } from './CardContentMockData';



const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			staleTime: 500000,
		},
	},
});

jest.mock("../AccountOverview/AccountOverviewHook/useAccountOverview", () => ({
  useAccountOverview: jest.fn(),
}))

const theme = createTheme();
window.scrollTo = jest.fn();

const component = () => {
	return (
     <ThemeProvider theme={theme}>
     <QueryClientProvider client={queryClient}>
       <BrowserRouter>
       <LoanHistoryCard />
       </BrowserRouter>
     </QueryClientProvider>
   </ThemeProvider>
	);
}
test("Checks the component is rendered", () => {
    LoanDataMockWithIsLoading();
    render(component());
    const element = screen.getByTestId("cardContent_component");
    expect(element).toBeTruthy();
  });

  test('Check Loan Heading is Displayed',async () => {
    LoanDataMock();
    const { getByText } = render(component());
    await waitFor(() => {    
      expect(getByText("Total Number of Loans")).toBeTruthy();
    }); 
  })

  it("Check history of loans is render", async () => {
    LoanDataMock();
    render(component());
    const headingElement = screen.getByTestId("numberOfLoans");
    expect(headingElement).toBeTruthy();
  });

  test('Check  Total no of Loans',async () => {
    LoanDataMock();
    const { getByText } = render(component());
    await waitFor(() => {    
      expect(getByText("01")).toBeTruthy();
    }); 
  })

  test("Check Make payment Card is rendered", () => {
      LoanDataMockWithIsLoading();
      render(component());
      const element = screen.getByTestId("makePayment_card");
      expect(element).toBeTruthy();
    });

    test("Check Make payment Card is rendered", () => {
        LoanDataMockWithIsLoading();
        render(component());
        const element = screen.getByTestId("applyforLoan_card");
        expect(element).toBeTruthy();
      });