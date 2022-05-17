import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import ProfilePicture from "../../../contexts/ProfilePicture";
import ScheduleCall from "./ScheduleCall";
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
					<ScheduleCall />
				</ProfilePicture>
			</QueryClientProvider>
		</ThemeProvider>
	);
};


test("Button Onclick", () => {

	render(component(), { wrapper: MemoryRouter });
	const button = screen.getByText("Schedule a call");
	fireEvent.click(button);

});

test("Check Dialog Avaliabilty", () => {
	render(component(), { wrapper: MemoryRouter });
	const button = screen.getByText("Schedule a call");
	fireEvent.click(button);
	expect(screen.getByTestId('dialog')).toBeInTheDocument();
})

test("Check Date Picker Avalability", () => {
	render(component(), { wrapper: MemoryRouter });
	const button = screen.getByText("Schedule a call");
	fireEvent.click(button);
	const Date = screen.getByText("Date")
	expect(Date).toBeInTheDocument();
})

test("Check can able to set value in the date input filed.", () => {
	render(component(), { wrapper: MemoryRouter });
	const button = screen.getByText("Schedule a call");
	fireEvent.click(button);
	const Date = screen.getByText("Date")
	expect(Date).toBeInTheDocument();
})
test("Check the time slot input field is rendered.", () => {
	render(component(), { wrapper: MemoryRouter });
	const button = screen.getByText("Schedule a call");
	fireEvent.click(button);
	const Time = screen.getByText("Time Slot")
	expect(Time).toBeInTheDocument();
})
test("when selecting the holiday date, the slot field should not be displayed.", () => {
	render(component(), { wrapper: MemoryRouter });
	const button = screen.getByText("Schedule a call");
	fireEvent.click(button);
	const Time = screen.getByText("Time Slot")
	expect(Time).toBeInTheDocument();
})
