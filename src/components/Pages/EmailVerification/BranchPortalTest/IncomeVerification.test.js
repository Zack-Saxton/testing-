import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import IncomeVerification from "../IncomeVerification";
import { steps } from '../../../../__mock__/data/BranchPortalData';

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
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<IncomeVerification
          applicationNumber={"7001-0000016058"}
          customerEmail={"mariner@mariner.com"}
          steps={steps}
          activeStep={1} />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the Income Verification component is rendered", () => {
	render(component());
	const element = screen.getByTestId('incomeVerification_component');
	expect(element).toBeTruthy();
});

test("Render Select Document", () => {
	render(component());
	const element = screen.getByTestId('render_selectDocument');
	expect(element).toBeTruthy();
});

test("Render Previous Button", () => {
	render(component());
	const element = screen.getByTestId('render_prevButton');
	expect(element).toBeTruthy();
});

test("Render Next Button", () => {
	render(component());
	const element = screen.getByTestId('render_nextButton');
	expect(element).toBeTruthy();
});

test("Render Select File ", () => {
	render(component());
	const element = screen.getByTestId('selectFile');
	expect(element).toBeTruthy();
});

test("Render Upload from camera ", () => {
	render(component());
	const element = screen.getByTestId('render_uploadFromCamera');
	expect(element).toBeTruthy();
});