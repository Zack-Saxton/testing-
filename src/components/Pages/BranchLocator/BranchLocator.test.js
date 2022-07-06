import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen, act } from '@testing-library/react';
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import BranchLocator from './BranchLocator';
import { setupGoogleMock } from "../../../__mock__/GoogleAPI.mock";

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
					<BranchLocator />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

beforeAll(() => {
  setupGoogleMock();
});

jest.mock("./BranchLocatorMap", () => () => {
});

test('Checks the state search blue box rendered', async () => {
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  await act(() => {		
    const element = screen.getByTestId('searchBranchBox');
	  expect(element).toBeTruthy();
	});	  
});

test('State search input box rendered', async () => {
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  await act(() => {		
    const element = screen.getByTestId('stateSearchInput');
	  expect(element).toBeTruthy();
	});	  
});

test('State search input box rendered', async () => {
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
    const autocomplete = screen.getByTestId('stateSearchInput');
  expect(autocomplete).toBeTruthy();
  autocomplete.focus();
  fireEvent.change(document.activeElement, { target: { value: 'los' } });

  expect(autocomplete.value).toEqual('los');
});