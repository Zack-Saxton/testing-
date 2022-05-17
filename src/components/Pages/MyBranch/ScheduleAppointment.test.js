import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import ProfilePicture from "../../../contexts/ProfilePicture";
import ScheduleAppointment from "./ScheduleAppointment";
const theme = createTheme();
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

const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<ProfilePicture>
					<ScheduleAppointment />
				</ProfilePicture>
			</QueryClientProvider>
		</ThemeProvider>
	);
};



test("Button Onclick", () => {
  render(component(), { wrapper: MemoryRouter });  
	const button = screen.getByTestId("appointment");
	fireEvent.click(button);
});


test("Check Dialog Avaliabilty", () => {
	render(component(), { wrapper: MemoryRouter });
	const button = screen.getByTestId("appointment"); 
	fireEvent.click(button);
	expect(screen.getByTestId('dialog')).toBeInTheDocument();
})

test("Check Date Picker Avalability Once Click on the Button", () => {
	render(component(), { wrapper: MemoryRouter });
	const button = screen.getByTestId("appointment"); 
	fireEvent.click(button);
	const Date = screen.getByText("Date")
	expect(Date).toBeInTheDocument(); 
})

test("Check the time slot input field is rendered.", () => {
	render(component(), { wrapper: MemoryRouter });
	const button = screen.getByTestId("appointment"); 
	fireEvent.click(button);
	const Time = screen.getByText("Time Slot")
	expect(Time).toBeInTheDocument();
})

