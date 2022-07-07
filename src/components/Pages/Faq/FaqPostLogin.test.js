import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import FaqPostLogin from "./FaqPostLogin";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 500000,
    },
  },
});

const theme = createTheme();
window.scrollTo = jest.fn();
const component = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <QueryClientProvider client={queryClient}>
          <FaqPostLogin />
        </QueryClientProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

//==========================================!! TEST 1-5 !!==========================================
it("account inquiries clicked", () => {
  render(component(), { wrapper: MemoryRouter });
  const button = screen.getByTestId("account-inquiries");
  fireEvent.click(button);
});

it("application questions clicked", () => {
  render(component(), { wrapper: MemoryRouter });
  const button = screen.getByTestId("application-questions");
  fireEvent.click(button);
});

it("general loan questions questions clicked", () => {
  render(component(), { wrapper: MemoryRouter });
  const button = screen.getByTestId("general-loan-questions");
  fireEvent.click(button);
});

it("payment questions clicked", () => {
  render(component(), { wrapper: MemoryRouter });
  const button = screen.getByTestId("payment-questions");
  fireEvent.click(button);
});

it("about mariner clicked", () => {
  render(component(), { wrapper: MemoryRouter });
  const button = screen.getByTestId("about-mariner");
  fireEvent.click(button);
});

//==========================================!! TEST 6 !!==========================================
test("proper sub-items populated after selecting option 2) application questions", async () => {
  render(component(), { wrapper: MemoryRouter });

  //select and click 'application questions' component
  const button = screen.getByTestId("application-questions");
  fireEvent.click(button);

  //checks that first sub-item is visible
  expect(await screen.findByText(`What is a Mariner Finance offer code?`, { exact: false })).toBeVisible();

  //checks that second sub-item is visible
  expect(await screen.findByText(`What should I bring to the branch to complete my application?`, { exact: false })).toBeVisible();

  //checks that third sub-item is visible
  expect(await screen.findByText(`Do you consider applicants that have filed bankruptcy?`, { exact: false })).toBeVisible();

  //checks that improper sub-item isn't present on page
  const improperContent = screen.queryByText(`Where can I cash a check that I have received from your company?`, { exact: false });
  expect(improperContent).toBeNull();
});

//==========================================!! TEST 7 !!==========================================
test("proper accordion functionality after selecting option 3) account inquiries", async () => {
  const { container } = render(component(), { wrapper: MemoryRouter });

  //select and click 'general loan questions' component
  const button = screen.getByTestId("general-loan-questions");
  fireEvent.click(button);

  //select and expand accordion
  let firstAccordionItem = container.querySelector(".MuiAccordionSummary-expandIconWrapper");
  fireEvent.click(firstAccordionItem);

  //checks that accordion sub-item is visible
  expect(await screen.findByText(`No, there is no prepayment penalty.`, { exact: false })).toBeVisible();
  
});