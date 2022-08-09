import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, act } from "@testing-library/react";
import React from "react";
import Moment from "moment";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import ProfilePicture from "../../../contexts/ProfilePicture";
import ScheduleCall from "./ScheduleCall";

function getFirstWeekDay(dateString, dayOfWeek) {
	let date = Moment(dateString, "YYYY-MM-DD");
	let day = date.day();
	let diffDays = 0;
	if (day > dayOfWeek) {
		diffDays = 7 - (day - dayOfWeek);
	} else {
		diffDays = dayOfWeek - day
	}
	return (date.add(diffDays, 'day').format("YYYY-MM-DD"));
}

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
	const button = screen.getByTestId("schedule-call-component");
	fireEvent.click(button);	
});

test("Check the date and time slot is showing in the UI", async () => {
	render(component(), { wrapper: MemoryRouter });
	const button = screen.getByTestId("schedule-call-component");
	fireEvent.click(button);	
	const dialog = screen.getByTestId("dialog");
	const datePicker = dialog.querySelector(`input[name="appointmentDate"]`);
  expect(datePicker).toBeTruthy();		
	const slot = dialog.querySelector(`input[name="callTime"]`);
	expect(slot).toBeTruthy();
});

test("Check the submit button exist in the UI", async () => {
	const { getByText } = render(component(), { wrapper: MemoryRouter });
	const button = screen.getByTestId("schedule-call-component");
	fireEvent.click(button);	
	screen.getByTestId("dialog");
	expect(getByText("Schedule a call")).toBeTruthy();	
});

test("Check can able to select calendar in UI", async () => {
	const today = new Date();
  const currentMonth = (Moment(today).format("MMMM YYYY"));
	const { getByText } = render(component(), { wrapper: MemoryRouter });
	const button = screen.getByTestId("schedule-call-component");
	fireEvent.click(button);	
	const dialog = screen.getByTestId("dialog");
	const datePicker = dialog.querySelector(`input[name="appointmentDate"]`);
  expect(datePicker).toBeTruthy();
	fireEvent.click(datePicker);
  fireEvent.mouseDown(datePicker);
	expect(getByText(currentMonth)).toBeTruthy();	
});

test("Check the the past date is disabled and saturday and sunday also disabled", async () => {
	const { getByText } = render(component(), { wrapper: MemoryRouter });
	const today = new Date();
  const todayDate = (Moment(today).format("D"));
	let dateToCheck = 0;
	if(todayDate>1){
		dateToCheck = (Moment().subtract(1, 'days')).format("D");
		
	}else{
		dateToCheck =  (Moment(getFirstWeekDay(today, 0)).format("D"));
	}
	const button = screen.getByTestId("schedule-call-component");
	fireEvent.click(button);	
	const dialog = screen.getByTestId("dialog");
	const submitBtn = getByText("Schedule a call");
	fireEvent.click(submitBtn);
	const datePicker = dialog.querySelector(`input[name="appointmentDate"]`);
  expect(datePicker).toBeTruthy();	
	await act(() => {
		fireEvent.click(datePicker);
  	fireEvent.mouseDown(datePicker);
	});
	expect(getByText(dateToCheck).closest('button')).toHaveAttribute('disabled');
});

test("When select on the saturday and sunday, the time slot should not be shown", async () => {
	const { getByText } = render(component(), { wrapper: MemoryRouter });
	const today = new Date();
  (Moment(today).format("D"));
	let dateToCheck = (Moment(getFirstWeekDay(today, 0)).format("D"));
	const button = screen.getByTestId("schedule-call-component");
	fireEvent.click(button);	
	const dialog = screen.getByTestId("dialog");
	const submitBtn = getByText("Schedule a call");
	fireEvent.click(submitBtn);	
	const datePicker = dialog.querySelector(`input[name="appointmentDate"]`);
	expect(datePicker).toBeTruthy();	
	await act(() => {
		fireEvent.click(datePicker);
  	fireEvent.mouseDown(datePicker);
	});
	const dataBtn = getByText(dateToCheck).closest('button');
	fireEvent.click(dataBtn);
});

test('Should match the snapshot', () => {
	const { asFragment } = render(component(), { wrapper: MemoryRouter });
	expect(asFragment).toMatchSnapshot();
});
