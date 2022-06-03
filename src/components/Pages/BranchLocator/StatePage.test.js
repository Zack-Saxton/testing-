import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen, act } from '@testing-library/react';
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import ProfilePicture from '../../../contexts/ProfilePicture';
import StatePage from './StatePage';
import BranchLocatorController from "../../Controllers/BranchLocatorController";


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
					<StatePage />
				</ProfilePicture>
			</QueryClientProvider>
		</ThemeProvider>
	);
}
  
const setupGoogleMock = () => {
  /*** Mock Google Maps JavaScript API ***/
  const google = {
    maps: {
      Marker:class{},
      Map: jest.fn().mockImplementation(function (mapDiv, opts) {
        this.mapDiv = mapDiv;
        this.opts = opts;
        createMVCObject(this);
        createMockFuncsFromArray(this, ['setCenter', 'setClickableIcons', 'setHeading', 'setMapTypeId', 'setOptions', 'setStreetView', 'setTilt', 'setZoom', 'fitBounds', 'getBounds', 'panTo', 'panToBounds']);
      }),
      LatLngBounds:class{},
      places:{
        Autocomplete: class {},
        AutocompleteService:class{},
        PlacesServiceStatus: {
            INVALID_REQUEST: 'INVALID_REQUEST',
            NOT_FOUND: 'NOT_FOUND',
            OK: 'OK',
            OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
            REQUEST_DENIED: 'REQUEST_DENIED',
            UNKNOWN_ERROR: 'UNKNOWN_ERROR',
            ZERO_RESULTS: 'ZERO_RESULTS',
        },
        PlacesAutocomplete:{
            INVALID_REQUEST: 'INVALID_REQUEST',
            NOT_FOUND: 'NOT_FOUND',
            OK: 'OK',
            OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
            REQUEST_DENIED: 'REQUEST_DENIED',
            UNKNOWN_ERROR: 'UNKNOWN_ERROR',
            ZERO_RESULTS: 'ZERO_RESULTS',
        }
    },
      Geocoder: () => {},
      GeocoderStatus: {
        ERROR: 'ERROR',
        INVALID_REQUEST: 'INVALID_REQUEST',
        OK: 'OK',
        OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
        REQUEST_DENIED: 'REQUEST_DENIED',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        ZERO_RESULTS: 'ZERO_RESULTS',
      },
    },
  };
  global.window.google = google;
};

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
    const element = screen.getByTestId('branch-locator-state-page');
	  expect(element).toBeTruthy();
	});	  
});

test("Check the state name is displaying correctly", ()=>{
  const { container, getByText } = render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  expect(getByText("Personal Loans In indiana")).toBeTruthy();
});

test("Check the state name search option is available in left top in the UI", ()=>{
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  const element = screen.getByTestId('search-branch-1');
	expect(element).toBeTruthy();	
});

test("Check the state name search option is available after the map", ()=>{
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  const element = screen.getByTestId('search-branch-2');
	expect(element).toBeTruthy();	
});
test("Check the 'Get Driving Directions To Nearest Location' button exist in the UI", ()=>{
  const { container, getByText } = render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  expect(getByText("Get Driving Directions To Nearest Location")).toBeTruthy();
});

test("Check can able to enter value in first search input box", async ()=>{
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  const element = screen.getByTestId('search-branch-1');
  expect(element).toBeTruthy();	
  await act(() => {
		fireEvent.change(element, { target: { value: "kentucky" } });
	});
	expect(element.value).toBe('kentucky');
});

test("Check can able to enter value in second search input box", async ()=>{
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  const element = screen.getByTestId('search-branch-2');
  expect(element).toBeTruthy();	
  await act(() => {
		fireEvent.change(element, { target: { value: "kentucky" } });
	});
	expect(element.value).toBe('kentucky');
});

test("Check customer rating exist in the UI", ()=>{
  const { container, getByText } = render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  expect(getByText("Customer Ratings")).toBeTruthy();
});

test('Should match the snapshot', () => {
	const { asFragment } = render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
	expect(asFragment).toMatchSnapshot();
});