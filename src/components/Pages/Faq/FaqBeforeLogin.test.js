import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import FaqBeforeLogin from "./FaqBeforeLogin";
import { ThemeProvider } from "@mui/styles";
import { MemoryRouter } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import ProfilePicture from "../../../contexts/ProfilePicture";
import { QueryClient, QueryClientProvider } from "react-query";
const theme = createTheme();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 500000,
    },
  },
});


const component = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ProfilePicture>
          <FaqBeforeLogin />
        </ProfilePicture>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

test("Account Inquires Button clicked", async() => {
  render(component(), { wrapper: MemoryRouter });
  const button = screen.getByTestId("account-inquiries");
  fireEvent.click(button);
});

test("Application questions button clicked", async() => {
  render(component(), { wrapper: MemoryRouter });
  const button = screen.getByTestId("application-questions");
  fireEvent.click(button);
 
});

test("General loan button clicked", () => {
  render(component(), { wrapper: MemoryRouter });
  const button = screen.getByTestId("general-loan-questions");
  fireEvent.click(button);
});

test("Payment questions button clicked", () => {
  render(component(), { wrapper: MemoryRouter });
  const button = screen.getByTestId("payment-questions");
  fireEvent.click(button);
});

test("About Mariner button clicked", () => {
  render(component(), { wrapper: MemoryRouter });
  const button = screen.getByTestId("about-mariner");
  fireEvent.click(button);
});


test("Questions are appearing", async() => {
 render(component(), { wrapper: MemoryRouter });
 const button = screen.getByTestId("application-questions");
 fireEvent.click(button);
 expect(await screen.findByText(`What is a Mariner Finance offer code?`, {exact:false})).toBeVisible();
 expect(await screen.findByText(`What should I bring to the branch to complete my application?`, {exact:false})).toBeVisible();
 expect(await screen.findByText(`Do you consider applicants that have filed bankruptcy?`, {exact:false})).toBeVisible();

});

test('First accordian item functionality is opening, closeing and displaying correctly after clicking', async() =>{

  const { container } =  render(component(), { wrapper: MemoryRouter });

  const button = screen.getByTestId("application-questions");
  fireEvent.click(button);
 
 
  const firstAccordionItem = container.querySelector(".css-ahj2mt-MuiTypography-root");

  fireEvent.click(firstAccordionItem);

  expect(await screen.findByText(`Prescreened credit offers mailed to qualified consumers include an offer code. With this offer code, the recipient can accept the offer online, complete the verification process, and have his or her funds deposited into their bank account. When using the offer code online, the recipient may also be informed of eligibility for other loan amounts. This offer code needs to be submitted on our offer code page: loans.marinerfinance.com/offers.`, {exact:false})).toBeVisible();

  fireEvent.click(firstAccordionItem);

  expect(await screen.findByText(`Prescreened credit offers mailed to qualified consumers include an offer code. With this offer code, the recipient can accept the offer online, complete the verification process, and have his or her funds deposited into their bank account. When using the offer code online, the recipient may also be informed of eligibility for other loan amounts. This offer code needs to be submitted on our offer code page: loans.marinerfinance.com/offers.`, {exact:false})).not.toBeVisible();

})










