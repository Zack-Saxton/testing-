import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import ProfilePicture from '../../../contexts/ProfilePicture';
import BranchDetail from './BranchDetail';
import { myBranchData, myBranchDataCA } from "../../../__mock__/data/BranchDetails.data";

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
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn()
};
global.navigator.geolocation = mockGeolocation;
const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<ProfilePicture>
					<BranchDetail MyBranchDetail={myBranchData}/>
				</ProfilePicture>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

const componentCA = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<ProfilePicture>
					<BranchDetail MyBranchDetail={myBranchDataCA}/>
				</ProfilePicture>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the component is rendered", () => {
	render(component(), { wrapper: MemoryRouter });
	const element = screen.getByTestId('branch-details-component');
  expect(element).toBeTruthy();
});

test("Check the branch details are showing in the UI", () => {
	const { getByText } = render(component(), { wrapper: MemoryRouter });
	expect(getByText("Kokomo")).toBeTruthy();
  expect(getByText("1818 E. Hoffer St.")).toBeTruthy();
  expect(getByText("(765) 452-3023")).toBeTruthy();
});

test("Check the branch hours details are showing in the UI", () => {
	const { getByText } = render(component(), { wrapper: MemoryRouter });
	expect(getByText("Mon-Wed-Thur")).toBeTruthy();
  expect(getByText("Tue")).toBeTruthy();
  expect(getByText("Fri")).toBeTruthy();
});

test("Check the Schedule Call and Schedule Appointment loaded in this component", () => {
	render(component(), { wrapper: MemoryRouter });
	const element = screen.getByTestId('appointment');
  expect(element).toBeTruthy();	
  const scheduleCall = screen.getByTestId('schedule-call-component');
  expect(scheduleCall).toBeTruthy();	
  
});

test("Check the branch hours details for CA state", () => {
	const { getByText } = render(componentCA(), { wrapper: MemoryRouter });  
	expect(getByText("Mon-Wed-Thur-Fri")).toBeTruthy();
  expect(getByText("Tue")).toBeTruthy();
});

test("Check the Schedule Call popup is opening when click on schedule call button", () => {
	render(component(), { wrapper: MemoryRouter });
	const element = screen.getByTestId('appointment');
  expect(element).toBeTruthy();	
  fireEvent.click(element);
  const datePicker = screen.getByTestId('datePicker');
  expect(datePicker).toBeTruthy();	
  fireEvent.click(datePicker);
});

test("Check the Schedule Appointment popup is opening when click on schedule call button", () => {
	render(component(), { wrapper: MemoryRouter });
	const element = screen.getByTestId('schedule-call-component');
  expect(element).toBeTruthy();	
  fireEvent.click(element);
  const datePicker = screen.getByTestId('datePicker');
  expect(datePicker).toBeTruthy();	
  const input = datePicker.querySelector(`input[name="appointmentDate"]`);
  fireEvent.click(input);
  fireEvent.mouseDown(input);  
});

test('Should match the snapshot', () => {
	const { asFragment } = render(component(), { wrapper: MemoryRouter });
	expect(asFragment).toMatchSnapshot();
});