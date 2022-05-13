import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import PaymentHistory from './PaymentHistory';
import PaymentRecords from './PaymentRecords';
import RecordTable from './RecordTable';

afterEach(cleanup);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 500000,
    },
  },
});

let spoofedData = [
    {   
            "loanHistory": [
                {
                "AppAccountHistory": [
                    {
                        "TransactionDate": "2022-05-10T00:00:00",
                        "TransactionDescription": "Regular Payment",
                        "PrincipalAmount": -11.11,
                        "InterestAmount": 0,
                        "OtherAmount": 0,
                        "RunningPrincipalBalance": 4888.01
                    },
                    {
                        "TransactionDate": "2022-05-10T00:00:00",
                        "TransactionDescription": "Regular Payment",
                        "PrincipalAmount": -25,
                        "InterestAmount": 0,
                        "OtherAmount": 0,
                        "RunningPrincipalBalance": 4899.12
                    },
                    {
                        "TransactionDate": "2022-05-10T00:00:00",
                        "TransactionDescription": "Regular Payment",
                        "PrincipalAmount": -22.5,
                        "InterestAmount": 0,
                        "OtherAmount": 0,
                        "RunningPrincipalBalance": 4924.12
                    },
                    {
                        "TransactionDate": "2022-05-10T00:00:00",
                        "TransactionDescription": "Regular Payment",
                        "PrincipalAmount": -7.81,
                        "InterestAmount": 2.19,
                        "OtherAmount": 0,
                        "RunningPrincipalBalance": 4946.62
                    },
                    {
                        "TransactionDate": "2022-05-09T00:00:00",
                        "TransactionDescription": "Regular Payment",
                        "PrincipalAmount": -25,
                        "InterestAmount": 0,
                        "OtherAmount": 0,
                        "RunningPrincipalBalance": 4954.43
                    },
                    {
                        "TransactionDate": "2022-05-09T00:00:00",
                        "TransactionDescription": "Regular Payment",
                        "PrincipalAmount": -20.57,
                        "InterestAmount": 4.43,
                        "OtherAmount": 0,
                        "RunningPrincipalBalance": 4979.43
                    },
                    {
                        "TransactionDate": "2022-05-04T00:00:00",
                        "TransactionDescription": "Open Loan",
                        "PrincipalAmount": 5000,
                        "InterestAmount": 0,
                        "OtherAmount": 0,
                        "RunningPrincipalBalance": 5000
                    },
                    {
                        "TransactionDate": "2022-05-10T00:00:00",
                        "TransactionDescription": "Regular Payment",
                        "PrincipalAmount": -11.11,
                        "InterestAmount": 0,
                        "OtherAmount": 0,
                        "RunningPrincipalBalance": 4888.01
                    },
                    {
                        "TransactionDate": "2022-05-10T00:00:00",
                        "TransactionDescription": "Regular Payment",
                        "PrincipalAmount": -25,
                        "InterestAmount": 0,
                        "OtherAmount": 0,
                        "RunningPrincipalBalance": 4899.12
                    },
                    {
                        "TransactionDate": "2022-05-10T00:00:00",
                        "TransactionDescription": "Regular Payment",
                        "PrincipalAmount": -22.5,
                        "InterestAmount": 0,
                        "OtherAmount": 0,
                        "RunningPrincipalBalance": 4924.12
                    },
                    {
                        "TransactionDate": "2022-05-10T00:00:00",
                        "TransactionDescription": "Regular Payment",
                        "PrincipalAmount": -7.81,
                        "InterestAmount": 2.19,
                        "OtherAmount": 0,
                        "RunningPrincipalBalance": 4946.62
                    },
                    {
                        "TransactionDate": "2022-05-09T00:00:00",
                        "TransactionDescription": "Regular Payment",
                        "PrincipalAmount": -25,
                        "InterestAmount": 0,
                        "OtherAmount": 0,
                        "RunningPrincipalBalance": 4954.43
                    },
                    {
                        "TransactionDate": "2022-05-09T00:00:00",
                        "TransactionDescription": "Regular Payment",
                        "PrincipalAmount": -20.57,
                        "InterestAmount": 4.43,
                        "OtherAmount": 0,
                        "RunningPrincipalBalance": 4979.43
                    },
                    {
                        "TransactionDate": "2022-05-04T00:00:00",
                        "TransactionDescription": "Open Loan",
                        "PrincipalAmount": 5000,
                        "InterestAmount": 0,
                        "OtherAmount": 0,
                        "RunningPrincipalBalance": 5000
                    }
                ]}    
        ]
    }
]

const theme = createTheme();
window.scrollTo = jest.fn();
const populatedComponent = () => {
    return (
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                <RecordTable userRecentPaymentData={spoofedData}>
                    <PaymentHistory>
                        <PaymentRecords />
                    </PaymentHistory>
                </RecordTable>
              </BrowserRouter>
          </QueryClientProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    );
}

const nullDataPopulatedComponent = () => {
    return (
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <QueryClientProvider client={queryClient}>
                <RecordTable>
                    <PaymentHistory>
                        <PaymentRecords userRecentPaymentData={[]} />
                    </PaymentHistory>
                </RecordTable>
          </QueryClientProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    );
}

const nonPopulatedComponent = () => {
    return (
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <QueryClientProvider client={queryClient}>
                <RecordTable>
                    <PaymentHistory>
                        <PaymentRecords />
                    </PaymentHistory>
                </RecordTable>
          </QueryClientProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    );
}

test("no passed data component field availability", () => {
	render(nonPopulatedComponent());	

    //make sure grid item and all fields appear
    expect(screen.getByTestId("recordTableGridItem").toBeTruthy);
    expect(screen.getByTestId("recordTableNoRecentApps").toBeTruthy);
});

test("null passed data component population", () => {
	render(nullDataPopulatedComponent());
    
    //make sure grid item and all fields appear
    expect(screen.getByTestId("recordTableGridItem").toBeTruthy);
    expect(screen.getByTestId("recordTableNoRecentApps").toBeTruthy);    
});

test("populated component field availability", () => {
	render(populatedComponent());	

    //make sure grid item and all fields appear
    expect(screen.getByTestId("recordTableGridItem").toBeTruthy);
    expect(screen.getAllByTestId("dateTableCell").toBeTruthy);
    expect(screen.getAllByTestId("transactionDataTableCell").toBeTruthy);
    expect(screen.getAllByTestId("principalAmountTableCell").toBeTruthy);
    expect(screen.getAllByTestId("interestAmountTableCell").toBeTruthy);
    expect(screen.getAllByTestId("otherAmountTableCell").toBeTruthy);
    expect(screen.getAllByTestId("runningPrincipalBalanceTableCell").toBeTruthy);
});

test("test RecordTable Component population", () => {
	render(populatedComponent());	

    //check index 0 data
    expect(screen.getAllByTestId("dateTableCell")[0].innerHTML).toBe('05/10/2022');
    expect(screen.getAllByTestId("transactionDataTableCell")[0].innerHTML).toBe('Regular Payment');
    expect(screen.getAllByTestId("principalAmountTableCell")[0].innerHTML).toBe('-11.11');
    expect(screen.getAllByTestId("interestAmountTableCell")[0].innerHTML).toBe('0');
    expect(screen.getAllByTestId("otherAmountTableCell")[0].innerHTML).toBe('0');
    expect(screen.getAllByTestId("runningPrincipalBalanceTableCell")[0].innerHTML).toBe('4888.01');

    //check index 4 data
    expect(screen.getAllByTestId("dateTableCell")[4].innerHTML).toBe('05/09/2022');
    expect(screen.getAllByTestId("transactionDataTableCell")[4].innerHTML).toBe('Regular Payment');
    expect(screen.getAllByTestId("principalAmountTableCell")[4].innerHTML).toBe('-25');
    expect(screen.getAllByTestId("interestAmountTableCell")[4].innerHTML).toBe('0');
    expect(screen.getAllByTestId("otherAmountTableCell")[4].innerHTML).toBe('0');
    expect(screen.getAllByTestId("runningPrincipalBalanceTableCell")[4].innerHTML).toBe('4954.43');
});