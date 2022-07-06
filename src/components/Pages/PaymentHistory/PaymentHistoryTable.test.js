import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import PaymentHistoryTable from './PaymentHistoryTable';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 500000,
    },
  },
});

let spoofedDataPR = [
                    {
                        "TransactionDate": "2022-05-10T00:00:00",
                        "TransactionDescription": "First Payment",
                        "PrincipalAmount": -11.11,
                        "InterestAmount": 0,
                        "OtherAmount": 0,
                        "RunningPrincipalBalance": 4888.01
                    },
                    {
                        "TransactionDate": "2022-05-10T00:00:00",
                        "TransactionDescription": "Unit Test Payment 1",
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
                        "TransactionDescription": "Payment 6",
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
                        "TransactionDescription": "Payment 10",
                        "PrincipalAmount": -22.5,
                        "InterestAmount": 0,
                        "OtherAmount": 0,
                        "RunningPrincipalBalance": 4924.12
                    },
                    {
                        "TransactionDate": "2022-05-10T00:00:00",
                        "TransactionDescription": "Unit Test Payment 2",
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
                        "TransactionDescription": "Last Payment",
                        "PrincipalAmount": 5000,
                        "InterestAmount": 0,
                        "OtherAmount": 0,
                        "RunningPrincipalBalance": 5000
                    }
]

const theme = createTheme();
window.scrollTo = jest.fn();
const component = () => {
    return (
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <QueryClientProvider client={queryClient}>
              <PaymentHistoryTable userRecentPaymentData={spoofedDataPR} />
          </QueryClientProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    );
}

test("populated component field availability", () => {
	render(component());	

    //make sure grid item and all fields appear
    let pageNavigation = screen.getByTestId("paymentRecordsTablePagination");
    let firstPageButton = screen.getByTestId("handleFirstPageButtonClick");
    let backPageButton = screen.getByTestId("handleBackButtonClick");
    let nextPagebutton = screen.getByTestId("handleNextButtonClick");
    let lastPageButton = screen.getByTestId("handleLastPageButtonClick");

    expect(pageNavigation.toBeTruthy);
    expect(firstPageButton.toBeTruthy);
    expect(backPageButton.toBeTruthy);
    expect(nextPagebutton.toBeTruthy);
    expect(lastPageButton.toBeTruthy);
});

test("test PaymentRecords Component population and paginations default page", async () => {
	render(component());	

    //check that data populating on default page
    expect(await screen.findByText(`1–10 of 24`, { exact: false })).toBeVisible();
    expect(await screen.findByText(`First Payment`, { exact: false })).toBeVisible();
    expect(await screen.findByText(`Unit Test Payment 1`, { exact: false })).toBeVisible();
});

test("test PaymentRecords Component population and paginations next page", async () => {
	render(component());
    let nextPagebutton = screen.getByTestId("handleNextButtonClick");

    //check next page functionality
    fireEvent.click(nextPagebutton);
    expect(await screen.findByText(`11–20 of 24`, { exact: false })).toBeVisible();
    expect(await screen.findByText(`Unit Test Payment 2`, { exact: false })).toBeVisible();
});

test("test PaymentRecords Component population and paginations previous page", async () => {
	render(component());
    let backPageButton = screen.getByTestId("handleBackButtonClick");


    //check previous page functionality
    fireEvent.click(backPageButton);
    expect(await screen.findByText(`1–10 of 24`, { exact: false })).toBeVisible();
    expect(await screen.findByText(`First Payment`, { exact: false })).toBeVisible();
    expect(await screen.findByText(`Unit Test Payment 1`, { exact: false })).toBeVisible();
});

test("test PaymentRecords Component population and paginations last page", async () => {
	render(component());
    let lastPageButton = screen.getByTestId("handleLastPageButtonClick");

    //check last page functionality
    fireEvent.click(lastPageButton);
    expect(await screen.findByText(`21–24 of 24`, { exact: false })).toBeVisible();
    expect(await screen.findByText(`Last Payment`, { exact: false })).toBeVisible();
});

test("test PaymentRecords Component population and paginations first page", async () => {
	render(component());
    let firstPageButton = screen.getByTestId("handleFirstPageButtonClick");

    //check first page functionality
    fireEvent.click(firstPageButton);
    expect(await screen.findByText(`1–10 of 24`, { exact: false })).toBeVisible();
    expect(await screen.findByText(`First Payment`, { exact: false })).toBeVisible();
    expect(await screen.findByText(`Unit Test Payment 1`, { exact: false })).toBeVisible();
});


test("test rows per page 5", async () => {
    const {container} = render(component());	
    let firstPageButton = screen.getByTestId("handleFirstPageButtonClick");
    let nextPagebutton = screen.getByTestId("handleNextButtonClick");
    let lastPageButton = screen.getByTestId("handleLastPageButtonClick");    
    let dropdown = container.querySelector(`select[aria-label="rows per page"]`);

    //set to 5 rows per page
    fireEvent.change(dropdown, {target: { value: "5" }});
    fireEvent.click(firstPageButton);
    expect(await screen.findByText(`1–5 of 24`, { exact: false })).toBeVisible();
    expect(await screen.findByText(`First Payment`, { exact: false })).toBeVisible();

    fireEvent.click(nextPagebutton);
    expect(await screen.findByText(`6–10 of 24`, { exact: false })).toBeVisible();
    expect(await screen.findByText(`Payment 6`, { exact: false })).toBeVisible();

    fireEvent.click(lastPageButton);
    expect(await screen.findByText(`21–24 of 24`, { exact: false })).toBeVisible();
    expect(await screen.findByText(`Last Payment`, { exact: false })).toBeVisible();
});

test("test rows per page all", async () => {
    const {container} = render(component());		
    let dropdown = container.querySelector(`select[aria-label="rows per page"]`);
    
    //set to all rows per page
    fireEvent.change(dropdown, {target: { value: "-1" }});
    expect(await screen.findByText(`1–24 of 24`, { exact: false })).toBeVisible();
    expect(await screen.findByText(`First Payment`, { exact: false })).toBeVisible();
    expect(await screen.findByText(`Payment 6`, { exact: false })).toBeVisible();
    expect(await screen.findByText(`Last Payment`, { exact: false })).toBeVisible();
});

test("test rows per page 10", async () => {
    const {container} = render(component());	
    let firstPageButton = screen.getByTestId("handleFirstPageButtonClick");
    let dropdown = container.querySelector(`select[aria-label="rows per page"]`);
    
    //set to 10 rows per page
    fireEvent.change(dropdown, {target: { value: "10" }});
    fireEvent.click(firstPageButton);
    expect(await screen.findByText(`1–10 of 24`, { exact: false })).toBeVisible();
    expect(await screen.findByText(`First Payment`, { exact: false })).toBeVisible();
    expect(await screen.findByText(`Payment 6`, { exact: false })).toBeVisible();
    expect(await screen.findByText(`Payment 10`, { exact: false })).toBeVisible();
});