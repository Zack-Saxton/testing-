import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
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

const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<DocumentIdAndPhotoId />
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