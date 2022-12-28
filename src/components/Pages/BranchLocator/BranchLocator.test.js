import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen, act, waitFor, cleanup } from '@testing-library/react';
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

afterEach(cleanup);

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



jest.mock("./BranchLocatorMap", () => ({}))

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

test('Checks the state name section rendered', async () => {
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


test('Check for Branch section loaded and its inner section', async () => {
  render( 
    <MemoryRouter  initialEntries={[{ pathname: '/', state: {value : "indiana", flag:true}} ]}>
      {component()}
    </MemoryRouter>
  );
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  const sampleMock = {
    "status": 200,
    "statusText": "OK",
    "data": {
        "status": 200,
        "result": "success",
        "branchData": [
            {
                "BranchNumber": "1511",
                "BranchName": "Whittier",
                "Address": "10722 Beverly Blvd., Suite F&G, Whittier, CA 90601",
                "PhoneNumber": "626-346-2108",
                "openDate": "03/18/2020",
                "latitude": "33.999241",
                "longitude": "-118.056601",
                "branchManager": "Joana Ultreras",
                "timeZoneId": "America/Los_Angeles",
                "timeZoneName": "Pacific Standard Time",
                "id": 0,
                "latLng": "33.999241,-118.056601",
                "distance": "19.4 mi",
                "BranchTime": {
                    "Value2": "7:00 P.M.  PST",
                    "Value1": "OPEN UNTIL",
                    "Value3": "Tuesday: 10:00am - 7:00pm PST"
                }
            },
            {
                "BranchNumber": "1514",
                "BranchName": "Torrance",
                "Address": "24427 Crenshaw Blvd., Suite D, Torrance, CA 90505",
                "PhoneNumber": "424-262-6742",
                "openDate": "08/26/2020",
                "latitude": "33.803463",
                "longitude": "-118.328039",
                "branchManager": "Antonia Munoz",
                "timeZoneId": "America/Los_Angeles",
                "timeZoneName": "Pacific Standard Time",
                "id": 1,
                "latLng": "33.803463,-118.328039",
                "distance": "22.6 mi",
                "BranchTime": {
                    "Value2": "7:00 P.M.  PST",
                    "Value1": "OPEN UNTIL",
                    "Value3": "Tuesday: 10:00am - 7:00pm PST"
                }
            },
            {
                "BranchNumber": "1516",
                "BranchName": "San Fernando",
                "Address": "1101 Truman St., Suite C, San Fernando, CA 91340",
                "PhoneNumber": "747-210-9120",
                "openDate": "12/31/2019",
                "latitude": "34.283602",
                "longitude": "-118.440929",
                "branchManager": "Juan Ybanez",
                "timeZoneId": "America/Los_Angeles",
                "timeZoneName": "Pacific Standard Time",
                "id": 2,
                "latLng": "34.283602,-118.440929",
                "distance": "22.2 mi",
                "BranchTime": {
                    "Value2": "7:00 P.M.  PST",
                    "Value1": "OPEN UNTIL",
                    "Value3": "Tuesday: 10:00am - 7:00pm PST"
                }
            },
            {
                "BranchNumber": "1513",
                "BranchName": "Santa Ana",
                "Address": "3398 S. Bristol St., Unit C, Santa Ana, CA 92704",
                "PhoneNumber": "657-205-0244",
                "openDate": "07/08/2020",
                "latitude": "33.70395",
                "longitude": "-117.885647",
                "branchManager": "Jacey Fischer",
                "timeZoneId": "America/Los_Angeles",
                "timeZoneName": "Pacific Standard Time",
                "id": 3,
                "latLng": "33.70395,-117.885647",
                "distance": "39.2 mi",
                "BranchTime": {
                    "Value2": "7:00 P.M.  PST",
                    "Value1": "OPEN UNTIL",
                    "Value3": "Tuesday: 10:00am - 7:00pm PST"
                }
            },
            {
                "BranchNumber": "1512",
                "BranchName": "Ontario",
                "Address": "951 Haven Ave., Unit A, Ontario, CA 91764",
                "PhoneNumber": "909-256-5068",
                "openDate": "09/30/2019",
                "latitude": "34.076048",
                "longitude": "-117.575839",
                "branchManager": "Thomas McGinnis",
                "timeZoneId": "America/Los_Angeles",
                "timeZoneName": "Pacific Standard Time",
                "id": 4,
                "latLng": "34.076048,-117.575839",
                "distance": "41.5 mi",
                "BranchTime": {
                    "Value2": "7:00 P.M.  PST",
                    "Value1": "OPEN UNTIL",
                    "Value3": "Tuesday: 10:00am - 7:00pm PST"
                }
            },
            {
                "BranchNumber": "1507",
                "BranchName": "Bakersfield",
                "Address": "3603 Coffee Rd., Suite 200, Bakersfield, CA 93308",
                "PhoneNumber": "661-214-5638",
                "openDate": "08/29/2019",
                "latitude": "35.392509",
                "longitude": "-119.092315",
                "branchManager": "Marco Magana",
                "timeZoneId": "America/Los_Angeles",
                "timeZoneName": "Pacific Standard Time",
                "id": 5,
                "latLng": "35.392509,-119.092315",
                "distance": "115 mi",
                "BranchTime": {
                    "Value2": "7:00 P.M.  PST",
                    "Value1": "OPEN UNTIL",
                    "Value3": "Tuesday: 10:00am - 7:00pm PST"
                }
            },
            {
                "BranchNumber": "1506",
                "BranchName": "Visalia",
                "Address": "3030 N. Dinuba Blvd., Suite B, Visalia, CA 93291",
                "PhoneNumber": "559-429-5230",
                "openDate": "01/30/2020",
                "latitude": "36.356578",
                "longitude": "-119.297198",
                "branchManager": "Jason Olguin",
                "timeZoneId": "America/Los_Angeles",
                "timeZoneName": "Pacific Standard Time",
                "id": 6,
                "latLng": "36.356578,-119.297198",
                "distance": "190 mi",
                "BranchTime": {
                    "Value2": "7:00 P.M.  PST",
                    "Value1": "OPEN UNTIL",
                    "Value3": "Tuesday: 10:00am - 7:00pm PST"
                }
            },
            {
                "BranchNumber": "1505",
                "BranchName": "Clovis",
                "Address": "1785 Herndon Ave., Suite 108, Clovis, CA 93611",
                "PhoneNumber": "559-900-2869",
                "openDate": "06/03/2020",
                "latitude": "36.837366",
                "longitude": "-119.683959",
                "branchManager": "Chelsea Galvan",
                "timeZoneId": "America/Los_Angeles",
                "timeZoneName": "Pacific Standard Time",
                "id": 7,
                "latLng": "36.837366,-119.683959",
                "distance": "229 mi",
                "BranchTime": {
                    "Value2": "7:00 P.M.  PST",
                    "Value1": "OPEN UNTIL",
                    "Value3": "Tuesday: 10:00am - 7:00pm PST"
                }
            },
            {
                "BranchNumber": "1508",
                "BranchName": "Modesto",
                "Address": "3501 McHenry Ave., Suite D10, Modesto, CA 95356",
                "PhoneNumber": "209-215-2255",
                "openDate": "12/31/2019",
                "latitude": "37.689107",
                "longitude": "-120.994405",
                "branchManager": "Rachel Latin",
                "timeZoneId": "America/Los_Angeles",
                "timeZoneName": "Pacific Standard Time",
                "id": 8,
                "latLng": "37.689107,-120.994405",
                "distance": "318 mi",
                "BranchTime": {
                    "Value2": "7:00 P.M.  PST",
                    "Value1": "OPEN UNTIL",
                    "Value3": "Tuesday: 10:00am - 7:00pm PST"
                }
            },
            {
                "BranchNumber": "1520",
                "BranchName": "San Jose",
                "Address": "3150 Almaden Expressway, Suite 200, San Jose, CA 95118",
                "PhoneNumber": "669-288-5737",
                "openDate": "05/05/2021",
                "latitude": "37.276683",
                "longitude": "-121.879165",
                "branchManager": "Emiliano Adams",
                "timeZoneId": "America/Los_Angeles",
                "timeZoneName": "Pacific Standard Time",
                "id": 9,
                "latLng": "37.276683,-121.879165",
                "distance": "336 mi",
                "BranchTime": {
                    "Value2": "7:00 P.M.  PST",
                    "Value1": "OPEN UNTIL",
                    "Value3": "Tuesday: 10:00am - 7:00pm PST"
                }
            }
        ],
        "zipcode": "90012",
        "searchLocation": {
            "lat": 34.0522342,
            "lng": -118.2436849
        },
        "stateLongName": "California",
        "stateShortName": "CA"
    }
}
  jest.mock('../../Controllers/BranchLocatorController', () => {
    return sampleMock;
  });
  const autocomplete = screen.getByTestId('stateSearchInput');
  expect(autocomplete).toBeTruthy();
  autocomplete.focus();
  fireEvent.change(document.activeElement, { target: { value: 'los' } });
  expect(autocomplete.value).toEqual('los');
  fireEvent.keyDown(document.activeElement, {key: 'Enter', code: 'Enter', charCode: 13})
  const arrowButton = screen.getByTestId('testBranchSearchButton');
  fireEvent.click(arrowButton)
  const branchNearYouText = screen.getByText('Mariner Finance Branch Near You!');
  expect(branchNearYouText).toBeTruthy();  
  await waitFor(() => {
    expect(document.querySelector(`div[id="mapGridWrap"]`)).toBeInTheDocument();
  })
 
});