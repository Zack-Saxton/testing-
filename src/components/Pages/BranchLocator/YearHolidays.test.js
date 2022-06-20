import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render,cleanup, fireEvent, screen, act } from '@testing-library/react';
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import ProfilePicture from '../../../contexts/ProfilePicture';
import YearHolidays from './YearHolidays';
import { useUSHolidayList } from "./useYearHolidays";

beforeEach(cleanup);
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
				<ProfilePicture>
					<YearHolidays />
				</ProfilePicture>
			</QueryClientProvider>
		</ThemeProvider>
	);
}
jest.mock("./useYearHolidays", ()=>({
  useUSHolidayList: jest.fn(),
}))
const holidays = {"data":{"MFYearHolidays":[{"Date":"January 3, 2022","Day":"Monday","Holiday_Name":"New Year’s Day (observed)"},{"Date":"January 17, 2022","Day":"Monday","Holiday_Name":"Martin Luther King Jr. Day"},{"Date":"February 21, 2022","Day":"Monday","Holiday_Name":"President’s Day"},{"Date":"May 30, 2022","Day":"Monday","Holiday_Name":"Memorial Day"},{"Date":"June 20, 2022","Day":"Monday","Holiday_Name":"Juneteenth Independence Day (observed)"},{"Date":"July 4, 2022","Day":"Monday","Holiday_Name":"\tLabor Day"},{"Date":"October 10, 2022","Day":"Monday","Holiday_Name":"Columbus Day"},{"Date":"November 24, 2022","Day":"Thursday","Holiday_Name":"Thanksgiving Day"},{"Date":"December 26, 2022","Day":"Monday","Holiday_Name":"Christmas Day (observed)"}]}};
test('Checks the component is rendered', async () => {
  useUSHolidayList.mockImplementation(() => ({
		result: holidays,
	}));
  render(component(), { wrapper: MemoryRouter });
	const element = screen.getByTestId('year-holidays-component');
	expect(element).toBeTruthy();
});

test('Checks the table header is render', async () => {
  useUSHolidayList.mockImplementation(() => ({
		result: holidays,
	}));
  render(component(), { wrapper: MemoryRouter });
	expect(screen.getByTestId("holiday-date-header").toBeTruthy);
  expect(screen.getAllByTestId("holiday-day-header").toBeTruthy);
  expect(screen.getAllByTestId("holiday-name-header").toBeTruthy);
});

test('Checks the table header is render', async () => {
  useUSHolidayList.mockImplementation(() => ({
		result: holidays,
	}));
  render(component(), { wrapper: MemoryRouter });
	//check index 0 data
  expect(screen.getAllByTestId("holiday-date-body")[0].innerHTML).toBe('January 3, 2022');
  expect(screen.getAllByTestId("holiday-day-body")[0].innerHTML).toBe('Monday');
  expect(screen.getAllByTestId("holiday-name-body")[0].innerHTML).toBe('New Year’s Day (observed)');

  //check index 0 data
  expect(screen.getAllByTestId("holiday-date-body")[4].innerHTML).toBe('June 20, 2022');
  expect(screen.getAllByTestId("holiday-day-body")[4].innerHTML).toBe('Monday');
  expect(screen.getAllByTestId("holiday-name-body")[4].innerHTML).toBe('Juneteenth Independence Day (observed)');
});

test('Should match the snapshot', () => {
  useUSHolidayList.mockImplementation(() => ({
		result: holidays,
	}));
	const { asFragment } = render(component(), { wrapper: MemoryRouter });
	expect(asFragment).toMatchSnapshot();
});
