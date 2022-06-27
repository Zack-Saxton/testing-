import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen, act } from '@testing-library/react';
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import StatePage from './BranchPage';
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
					<StatePage />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

// in test file.
beforeAll(() => {
  setupGoogleMock();
});

jest.mock("./BranchLocatorMap", () => () => {
});

test('Checks the component is rendered', async () => {
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  await act(() => {		
    const element = screen.getByTestId('branchpage_component');
	  expect(element).toBeTruthy();
	});	  
});

test('Check Banner is rendered', async () => {
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  await act(() => {		
    const element = screen.getByTestId('check_banner');
	  expect(element).toBeTruthy();
	});	  
});

test('Check find a Branch', async () => {
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  await act(() => {		
    const element = screen.getByTestId('findBranch');
	  expect(element).toBeTruthy();
	});	  
});

test('Check Personal loan is available in the Branch', async () => {
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  await act(() => {		
    const element = screen.getByTestId('personalLoan_branch');
	  expect(element).toBeTruthy();
	});	  
});

test('Check Branch address is correct', async () => {
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  await act(() => {		
    const element = screen.getByTestId('branch_address');
	  expect(element).toBeTruthy();
	});	  
});


test('Check Business hours', async () => {
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  await act(() => {		
    const element = screen.getByTestId('businessHours');
	  expect(element).toBeTruthy();
	});	  
});

test('Check Branch Manager Name', async () => {
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  await act(() => {		
    const element = screen.getByTestId('branchManager');
	  expect(element).toBeTruthy();
	});	  
});

test('Check get direction button', async () => {
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  await act(() => {		
    const element = screen.getByTestId('directionButton');
	  expect(element).toBeTruthy();
	});	  
});

test('Check Button is clickable', async () => {
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  await act(() => {		
    const element = screen.getByTestId('directionButton');
	  fireEvent.click(element);
	});	  
});

test('Check Branch map', async () => {
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  await act(() => {		
    const element = screen.getByTestId('branchMap');
	  expect(element).toBeTruthy();
	});	  
});

test('Check apply now header', async () => {
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  await act(() => {		
    const element = screen.getByTestId('applynowHeader');
	  expect(element).toBeTruthy();
	});	  
});

test('Check apply now button', async () => {
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  await act(() => {		
    const element = screen.getByTestId('applynowButton');
	  expect(element).toBeTruthy();
	});	  
});

test('Check button is clickable', async () => {
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  await act(() => {		
    const element = screen.getByTestId('applynowButton');
	  fireEvent.click(element);
	});	  
});