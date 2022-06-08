import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import ProfilePicture from '../../../contexts/ProfilePicture';
import BranchDetail from './BranchDetail';

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
let myBranchData = {"contenttypes":[],"entitytype":"branchinfo","branchNumber":3729,"branchName":"Kokomo","Address":"1818 E. Hoffer St.","branchaddress2":"","branchstate":"IN","branchcity":"Kokomo","branchzipcode":"46902","PhoneNumber":"765-452-3023","dripsPhoneNumber":null,"branchmanager":"Bethany Seger","branchmanageremail":"bseger@pfcloan.com","timezone":"Eastern","brand":"Mariner","employees":3,"date_closed":null,"google_id":"NULL","virtualbranchflag":"0","hq_flag":null,"latitude":null,"longitutde":null,"onlinemilemaximum":null,"_id":"5d69cdb7f89eb52452da08c2","time_zone":"Eastern","date_opened":"2017-04-01T00:00:00.000Z","dateclosed":"NULL","hqflag":0,"createdat":"2019-08-31T01:30:31.643Z","updatedat":"2019-08-31T01:30:31.643Z","__v":0,"branchHours":{"monday":"9:00 a.m. – 5:00 p.m.","tuesday":"9:00 a.m. – 7:00 p.m.","wednesday":"9:00 a.m. – 5:00 p.m.","thursday":"9:00 a.m. – 5:00 p.m.","friday":"9:00 a.m. – 5:30 p.m."},"branchIsOpen":false};
let myBranchDataCA = {"contenttypes":[],"entitytype":"branchinfo","branchNumber":3729,"branchName":"Kokomo","Address":"1818 E, CA.","branchaddress2":"","branchstate":"CA","branchcity":"Kokomo","branchzipcode":"46902","PhoneNumber":"765-452-3023","dripsPhoneNumber":null,"branchmanager":"Bethany Seger","branchmanageremail":"bseger@pfcloan.com","timezone":"Eastern","brand":"Mariner","employees":3,"date_closed":null,"google_id":"NULL","virtualbranchflag":"0","hq_flag":null,"latitude":null,"longitutde":null,"onlinemilemaximum":null,"_id":"5d69cdb7f89eb52452da08c2","time_zone":"Eastern","date_opened":"2017-04-01T00:00:00.000Z","dateclosed":"NULL","hqflag":0,"createdat":"2019-08-31T01:30:31.643Z","updatedat":"2019-08-31T01:30:31.643Z","__v":0,"branchHours":{"monday":"9:00 a.m. – 5:00 p.m.","tuesday":"9:00 a.m. – 7:00 p.m.","wednesday":"9:00 a.m. – 5:00 p.m.","thursday":"9:00 a.m. – 5:00 p.m.","friday":"9:00 a.m. – 5:30 p.m."},"branchIsOpen":false};
const component = (myBranchData) => {
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

test("Checks the component is rendered", () => {
	render(component(myBranchData), { wrapper: MemoryRouter });
	const element = screen.getByTestId('branch-details-component');
  expect(element).toBeTruthy();
});

test("Check the branch details are showing in the UI", () => {
	const { container, getByText } = render(component(myBranchData), { wrapper: MemoryRouter });
	expect(getByText("Kokomo")).toBeTruthy();
  expect(getByText("1818 E. Hoffer St.")).toBeTruthy();
  expect(getByText("(765) 452-3023")).toBeTruthy();
});

test("Check the branch hours details are showing in the UI", () => {
	const { container, getByText } = render(component(myBranchData), { wrapper: MemoryRouter });
	expect(getByText("Mon-Wed-Thur")).toBeTruthy();
  expect(getByText("Tue")).toBeTruthy();
  expect(getByText("Fri")).toBeTruthy();
});

test("Check the Schedule Call and Schedule Appointment loaded in this component", () => {
	render(component(myBranchData), { wrapper: MemoryRouter });
	const element = screen.getByTestId('appointment');
  expect(element).toBeTruthy();	
  const scheduleCall = screen.getByTestId('schedule-call-component');
  expect(scheduleCall).toBeTruthy();	
  
});

test("Check the branch hours details for CA state", () => {
	const { container, getByText } = render(component(myBranchDataCA), { wrapper: MemoryRouter });  
	expect(getByText("Mon-Wed-Thur-Fri")).toBeTruthy();
  expect(getByText("Tue")).toBeTruthy();
});

test("Check the Schedule Call popup is opening when click on schedule call button", () => {
	render(component(myBranchData), { wrapper: MemoryRouter });
	const element = screen.getByTestId('appointment');
  expect(element).toBeTruthy();	
  fireEvent.click(element);
  const datePicker = screen.getByTestId('datePicker');
  expect(datePicker).toBeTruthy();	
  fireEvent.click(datePicker);
});

test("Check the Schedule Appointment popup is opening when click on schedule call button", () => {
	const { container, getByText } = render(component(myBranchData), { wrapper: MemoryRouter });
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
	const { asFragment } = render(component(myBranchData), { wrapper: MemoryRouter });
	expect(asFragment).toMatchSnapshot();
});