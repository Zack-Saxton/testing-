import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import EmailVerification from "../EmailVerification";
import {BranchPortalMock , BranchPortalMockWithoutData , BranchPortalMockIsLoading} from "../../../../__mock__/BranchPortal.mock"

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
				<BrowserRouter>
					<EmailVerification />
				</BrowserRouter>
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