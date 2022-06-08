import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen, act } from '@testing-library/react';
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import ProfilePicture from '../../../contexts/ProfilePicture';
import BranchLocator from './BranchLocator';
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
					<BranchLocator />
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

test('Mariner Mariner Finance States section ', async () => {
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  await act(() => {		
    const element = screen.getByText('Mariner Finance States');
	  expect(element).toBeTruthy();
	});	  
});

test('Mariner Mariner Finance States section ', async () => {
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  await act(() => {		
    const element = screen.getByText('Branches Near You');
	  expect(element).toBeTruthy();
	});	  
});