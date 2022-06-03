import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import VehiclePhotos from "../VehiclePhotos";

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
					<VehiclePhotos />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the Vechicle Photo component is rendered", () => {
	render(component());
	const element = screen.getByTestId('vehiclePhotos_component');
	expect(element).toBeTruthy();
});

test("Checks the upload button is rendered", () => {
	render(component());
	const element = screen.getByTestId('UploadVehicle_photo');
	expect(element).toBeTruthy();
});

test("Upload Photo button is clickable", () => {
	render(component());
	const button = screen.getByTestId("UploadVehicle_photo");
	fireEvent.click(button);
});