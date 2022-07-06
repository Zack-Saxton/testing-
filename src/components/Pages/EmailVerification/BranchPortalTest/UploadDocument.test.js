import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, act } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import UploadDocument from '../UploadDocument';

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
					<UploadDocument
					title="Select Your Document"
          applicationNumber={"7001-0000016058"}
          customerEmail={"mariner@mariner.com"}
          documentType="proof_of_income" />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}



test("Check can able to choose upload type" , async () => {
  render(component());
  const button = screen.getByTestId('render_selectDocument'); 

 act(() => {
 fireEvent.click(button)
});
 expect(await screen.findByText(`Select from Existing Files`, { exact: false })).toBeVisible();

 act(() => {
 fireEvent.click(button)
});
 expect(await screen.findByText(`Upload from Camera`, { exact: false })).toBeVisible();

});


test("Check can able to capture in camera" , async () => {
  render(component());
  const button = screen.getByTestId('render_selectDocument'); 
  act(() => {
 fireEvent.click(button)
});
 expect(await screen.findByText(`Upload from Camera`, { exact: false })).toBeVisible();
 const uploadButton =  screen.getByTestId("render_uploadFromCamera")

 act(() => {
  fireEvent.click(uploadButton)
 });
  expect(await screen.findByText(`Capture Photo`, { exact: false, showCamera : true })).toBeVisible(); 

});
