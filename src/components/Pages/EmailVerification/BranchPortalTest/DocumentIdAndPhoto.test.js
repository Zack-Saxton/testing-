import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen, act, fireEvent } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import DocumentIdAndPhotoId from "../DocumentIdAndPhotoId";

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

const steps = [
	"ID Document & Photo",
	"Income Verification",
	"Bank Account Verification",
	"Vehicle Photos"
]

const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<DocumentIdAndPhotoId
          applicationNumber={"7001-0000016058"}
          customerEmail={"mariner@mariner.com"}
          steps={steps}
          activeStep={0}
        />;
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}


test("Render Select Document", () => {
	render(component());
	const element = screen.getByTestId('render_selectDocument');
	expect(element).toBeTruthy();
});

test("Render Document Type", () => {
	render(component());
	const element = screen.getByTestId('render_CheckList');
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

test("Select Document Type ", async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="selectDocument"]`);
	await act(() => {	
	fireEvent.change(input, { target: { value: "id_doc" } });
});
	expect(input).toBeTruthy();
	expect(input.value).toBe('id_doc');
});
