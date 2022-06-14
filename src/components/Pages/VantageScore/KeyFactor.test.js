import { Sync } from "@mui/icons-material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
//import {jest} from "jest";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import KeyFactors from "./KeyFactors";
import VantageScore from "./VantageScore";

const theme = createTheme();
window.scrollTo = jest.fn();
const queryClient = new QueryClient({ 
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 500000,
    },
  },
});

let KeyFactorsMock = {
  vantage_score: "666",
  reason1: "98",
  reason2: "47",
  reason3: "14",
  reason4: "12",
  first_name: "SARAH",
  last_name: "DDUPZ",
  middle_initial: null,
  address_city: "ARLINGTON",
  address_state: "VA",
  address_street: "5550 Columbia Pike",
  address_postal_code: "22204",
  score_change: "NoChange",
};

it("Key Factors Component is loading in vantage Score", () => {
  render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <KeyFactors keyFactors={KeyFactorsMock} />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );

  expect(screen.getByTestId("keyfactors")).toBeInTheDocument();
});

it("Key Factors Component is loading in Grid", () => {
  render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <VantageScore>
            <KeyFactors keyFactors={KeyFactorsMock} />
          </VantageScore>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
  expect(screen.getByTestId("keyfactors-loading")).toBeInTheDocument();
});

it("Checking if first accordion rendering and functions", async () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <KeyFactors keyFactors={KeyFactorsMock} />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );

  expect(screen.getByText("There is a bankruptcy on your credit report")).toBeVisible();

  const button = container.querySelector(".MuiAccordionSummary-expandIconWrapper");
  fireEvent.click(button);

  expect(await screen.findByText(`Make all future payments on time. The impact on your credit score from the bankruptcy will diminish over time.`,{ exact: false })).toBeVisible();
});

it("Checking if second accordion rendering and functions", async () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <KeyFactors keyFactors={KeyFactorsMock} />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
  expect(screen.getByText("No open bankcard or revolving accounts in your credit file")).toBeVisible();

  const button = container.querySelector(".MuiAccordionSummary-expandIconWrapper");
  fireEvent.click(button);
});

it("Checking if third accordion rendering and functions", async () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <KeyFactors keyFactors={KeyFactorsMock} />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );

  expect(screen.getByText("Lack of sufficient credit history")).toBeVisible();

  const button = container.querySelector(".MuiAccordionSummary-expandIconWrapper");
  fireEvent.click(button);
});

it("Checking if forth accordion rendering and functions", async () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <KeyFactors keyFactors={KeyFactorsMock} />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );

  expect(screen.getByText("The date that you opened your oldest account is too recent")).toBeVisible();

  const button = container.querySelector(".MuiAccordionSummary-expandIconWrapper");
  fireEvent.click(button);
});
