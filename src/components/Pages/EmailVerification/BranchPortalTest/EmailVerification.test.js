import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import EmailVerification from "../EmailVerification";
import { BranchPortalHook } from './BranchPortalHook';

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

jest.mock("./BranchPortalHook", () => ({
  BranchPortalHook: jest.fn(),
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

test("Checks the Email Verification component is rendered", () => {
	render(component());
	const element = screen.getByTestId('emailVerification_component');
	expect(element).toBeTruthy();
});

it("Load Email Verification", () => {
  BranchPortalHook.mockImplementation(() => ({
    isLoading: true,
  }));
  const container = render(component());
  const headingElement = container.getByTestId("while_Loading");
  expect(headingElement).toBeTruthy();
});


