import "@testing-library/jest-dom";
import { cleanup, act, render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/styles";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import { createTheme } from "@mui/material/styles";
import SSN from "./index.js";
import { QueryClient, QueryClientProvider } from "react-query";
import "@testing-library/jest-dom/extend-expect";
import {mockDataStateOneLastStep,mockValidSubmitDataOneLoanStep,mockInvalidSubmitDataOneLoanStep} from "../../../../__mock__/data/CheckMyOfferMockData";


const originalEnv = process.env;
afterEach(cleanup);
beforeEach(() => {
  jest.resetModules();
  process.env = {
    ...originalEnv,
    REACT_APP_ENABLE_RECAPTCHA_SUBMIT_APPLICATION: false,
  };
});
afterEach(() => {
  process.env = originalEnv;
});
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

const theme = createTheme();
const component = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CheckMyOffers>
          <SSN  />
          
        </CheckMyOffers>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

test("test for API response", async() => {
  const asyncMockCA = jest.fn().mockResolvedValue(mockValidSubmitDataOneLoanStep);
  global.fetch = await asyncMockCA();

const { container } = render(component(), { wrapper: MemoryRouter })
const element = container.querySelector(`input[id="reviewedcheckbox"]`);
fireEvent.click(element);
expect(element).toBeChecked(); 
 
  const input = screen.getByTestId("submit-application");
	expect(input).toBeTruthy();
	await act(() => {
	fireEvent.click(input);
	});	 
  
  });

  test("test for failure API response", async() => {
   
    const asyncMock = jest.fn().mockResolvedValue(mockInvalidSubmitDataOneLoanStep);
    global.fetch = await asyncMock();
    const { container } = render(component(), { wrapper: MemoryRouter })
  const element = container.querySelector(`input[id="reviewedcheckbox"]`);
  fireEvent.click(element);
  expect(element).toBeChecked();
   
   
    const input = screen.getByTestId("submit-application");
    expect(input).toBeTruthy();
    await act(() => {
    fireEvent.click(input);
    });	 
    
    });

test("Checks if checkbox for acknowledge and sign our disclosures renders. ", async () => {
const { container } = render(component(), { wrapper: MemoryRouter })
const element = container.querySelector(`input[id="reviewedcheckbox"]`);
fireEvent.click(element);
expect(element).toBeChecked();
});

test("E-Signature Disclosure and Consent Hyperlink Renders, and when hyperlink is clicked pop up appears", async () => {
  render(component(), { wrapper: MemoryRouter });
  const eSignatureLink = screen.getByTestId("eSignatureLink");
  expect(eSignatureLink).toBeTruthy();
  await act(() => {		
		fireEvent.click(eSignatureLink);
	});
  const popUp = screen.getByTestId("popup");
  expect(popUp).toBeTruthy();
  screen.debug(popUp,1000000)
  const elementCloseIcon = screen.getByTestId("closeIcon");
  expect(elementCloseIcon).toBeTruthy();
  const elementPrintPage = screen.getByTestId("printPage");
  expect(elementPrintPage).toBeTruthy();
  await act(() => {		
    fireEvent.click(elementPrintPage);
		fireEvent.click(elementCloseIcon);
	});
});

test("Credit and Contact Authorization, Renders, and when hyperlink is clicked pop up appears", async () => {
  render(component(), { wrapper: MemoryRouter });
  const creditContactAuth = screen.getByTestId("creditContactAuth");
  expect(creditContactAuth).toBeTruthy();  
  await act(() => {		
		fireEvent.click(creditContactAuth);
	});
  const popUp = screen.getByTestId("popup");
  expect(popUp).toBeTruthy();
  const elementCloseIcon = screen.getByTestId("closeIcon");
  expect(elementCloseIcon).toBeTruthy();
  const elementPrintPage = screen.getByTestId("printPage");
  expect(elementPrintPage).toBeTruthy();
  await act(() => {		
    fireEvent.click(elementPrintPage);	
		fireEvent.click(elementCloseIcon);
	});
});

test("Website Terms of Use, and when hyperlink is clicked pop up appears", async () => {
  render(component(), { wrapper: MemoryRouter });

  const websiteTerms = screen.getByTestId("websiteTerms");
  expect(websiteTerms).toBeTruthy();
  await act(() => {		
		fireEvent.click(websiteTerms);
	});
  const popUp = screen.getByTestId("popup");
  expect(popUp).toBeTruthy();
  const elementCloseIcon = screen.getByTestId("closeIcon");
  expect(elementCloseIcon).toBeTruthy();
  const elementPrintPage = screen.getByTestId("printPage");
  expect(elementPrintPage).toBeTruthy();
  await act(() => {		
    fireEvent.click(elementPrintPage);		
		fireEvent.click(elementCloseIcon);
	});
});

test("Website Privacy Statement, and when hyperlink is clicked pop up appears", async () => {
  render(component(), { wrapper: MemoryRouter });

  const websitePrivacy = screen.getByTestId("websitePrivacy");
  expect(websitePrivacy).toBeTruthy();
  await act(() => {		
		fireEvent.click(websitePrivacy);
	});
  const popUp = screen.getByTestId("popup");
  expect(popUp).toBeTruthy();
  const elementCloseIcon = screen.getByTestId("closeIcon");
  expect(elementCloseIcon).toBeTruthy();
  const elementPrintPage = screen.getByTestId("printPage");
  expect(elementPrintPage).toBeTruthy();
  await act(() => {		
    fireEvent.click(elementPrintPage);	
		fireEvent.click(elementCloseIcon);
	});
});

test("test checkbox and popup related to state DA is able to access", async () => {
  const { container } = render(component(), { wrapper: MemoryRouter })
const asyncMock = jest.fn().mockResolvedValue(mockDataStateOneLastStep);
await asyncMock();
const element = container.querySelector(`input[id="DelawareCheckbox"]`);
fireEvent.click(element);
expect(element).toBeChecked();
const delawareLabel = await screen.getByText('Delaware Itemized Schedule Of Charges.,');

  expect(delawareLabel).toBeTruthy();
  await act(() => {		
		fireEvent.click(delawareLabel);
	});
  const popUp = screen.getByTestId("popup");
  expect(popUp).toBeTruthy();
  const elementCloseIcon = screen.getByTestId("closeIcon");
  expect(elementCloseIcon).toBeTruthy();
  const elementPrintPage = screen.getByTestId("printPage");
  expect(elementPrintPage).toBeTruthy();
  await act(() => {		
    fireEvent.click(elementPrintPage);	
		fireEvent.click(elementCloseIcon);
	});
});

test("test checkbox related to states is able to checked", async() => {
const { container } = render(component(), { wrapper: MemoryRouter })
const asyncMockCA = jest.fn().mockResolvedValue(mockDataStateOneLastStep);
await asyncMockCA();
const elementCA = container.querySelector(`input[id="CACheckbox"]`);
fireEvent.click(elementCA);
expect(elementCA).toBeChecked();
const asyncMockNM = jest.fn().mockResolvedValue(mockDataStateOneLastStep);
await asyncMockNM();
const elementNM = container.querySelector(`input[id="NMCheckbox"]`);
fireEvent.click(elementNM);
expect(elementNM).toBeChecked();
});

test("Submit application renders and functions", () => {
  render(component(), { wrapper: MemoryRouter });

  const button = screen.getByTestId("submit-application");
  expect(button).toBeTruthy();

  fireEvent.click(button);

  expect(button).toHaveAttribute("disabled");
});

test('should match the snapshot Test', () => {
  const { asFragment } = render(component(), {wrapper: MemoryRouter}); 
  expect(asFragment).toMatchSnapshot();
})
