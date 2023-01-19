import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor, act, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import EmailVerification from "../EmailVerification";
import {BranchPortalMock , BranchPortalMockWithoutData , BranchPortalMockIsLoading} from "../../../../__mock__/BranchPortal.mock"
import { MemoryRouter } from "react-router-dom";

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

jest.mock("./useBranchPortalHook", () => ({
  useBranchPortalHook: jest.fn(),
}))

const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
					<EmailVerification />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

it("Checks the Email Verification component is rendered", () => {
  BranchPortalMockWithoutData()
  const container = render(component());
  const headingElement = container.getByTestId("emailVerification_component");
  expect(headingElement).toBeTruthy();
});

it("Load Email Verification", () => {
  BranchPortalMockIsLoading()
  const container = render(component());
  const headingElement = container.getByTestId("while_Loading");
  expect(headingElement).toBeTruthy();
});
 
it("Load Email Verification Heading", () => {
  BranchPortalMock()
  const container = render(component());
  const headingElement = container.getByTestId("emailVerification_heading");
  expect(headingElement).toBeTruthy();
});

it("Load Thank you message", async () => {
  BranchPortalMockWithoutData()
	const { getByText } = render(component());
  await waitFor(() => {    
    expect(getByText("Thank you for verifying your email.")).toBeTruthy();
	}); 
})
 
it("Load Acknowledgement links", () => {
  BranchPortalMockWithoutData()
  const container = render(component());
  const esignClick = container.getByTestId("esignClick");
  expect(esignClick).toBeTruthy();
	const creditContact = container.getByTestId("creditContact");
  expect(creditContact).toBeTruthy();
	const websitePrivacy = container.getByTestId("websitePrivacy");
  expect(websitePrivacy).toBeTruthy();
}); 

it("check chekbox is clicked", () => {
  BranchPortalMock()
  const container = render(component());
  const headingElement = container.getByTestId("checkboxGrid");
  expect(headingElement).toBeTruthy();
});

test("E-Signature Disclosure and Consent Hyperlink Renders, and when hyperlink is clicked pop up appears", async () => {
  BranchPortalMockWithoutData()
  render(component(), { wrapper: MemoryRouter });
  const eSignatureLink = screen.getByTestId("esignClick");
  expect(eSignatureLink).toBeTruthy();
  await act(() => {		
		fireEvent.click(eSignatureLink);
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

test("Credit and Contact Authorization, Renders, and when hyperlink is clicked pop up appears", async () => {
  BranchPortalMockWithoutData()
  render(component(), { wrapper: MemoryRouter });
  const creditContactAuth = screen.getByTestId("creditContact");
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

test("Website Privacy Statement, and when hyperlink is clicked pop up appears", async () => {
  BranchPortalMockWithoutData()
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