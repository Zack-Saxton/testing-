import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  cleanup,
  fireEvent,
  screen,
  act,
  waitFor
} from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import ProfilePicture from "../../../contexts/ProfilePicture";
import StatePage from "./StatePage";
import { setupGoogleMock } from "../../../__mock__/GoogleAPI.mock";
import BranchLocatorController from "../../Controllers/BranchLocatorController";
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
jest.mock("../../Controllers/BranchLocatorController");

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
};

const mockValue = {
  status: 200,
  statusText: "OK",
  data: {
    status: 200,
    result: "success",
    branchData: [
      {
        BranchNumber: "7303",
        BranchName: "Tuscaloosa",
        Address: "1105 Southview Lane, Suite 113, Tuscaloosa, AL 35405",
        PhoneNumber: "205-650-1624",
        openDate: "05/16/2016",
        latitude: "33.124847",
        longitude: "-87.553645",
        branchManager: "Johanna Young",
        timeZoneId: "America/Chicago",
        timeZoneName: "Central Standard Time",
        id: 0,
        latLng: "33.124847,-87.553645",
        distance: "99.3 mi",
        BranchTime: {
          Value1: "Will open ",
          Value2: "Wednesday at 9am CST",
          Value3: "",
        },
      },
      {
        BranchNumber: "7304",
        BranchName: "Hoover",
        Address: "2798 John Hawkins Parkway, Suite 120, Hoover, AL 35244",
        PhoneNumber: "205-588-6712",
        openDate: "06/27/2016",
        latitude: "33.365872",
        longitude: "-86.822635",
        branchManager: "Krystal Owens",
        timeZoneId: "America/Chicago",
        timeZoneName: "Central Standard Time",
        id: 1,
        latLng: "33.365872,-86.822635",
        distance: "120 mi",
        BranchTime: {
          Value1: "Will open ",
          Value2: "Wednesday at 9am CST",
          Value3: "",
        },
      },
      {
        BranchNumber: "7302",
        BranchName: "Fultondale",
        Address: "1725 Decatur Hwy., Suite 101, Fultondale, AL 35068",
        PhoneNumber: "205-623-2477",
        openDate: "10/24/2016",
        latitude: "33.604209",
        longitude: "-86.798062",
        branchManager: "Joshua Suddeth",
        timeZoneId: "America/Chicago",
        timeZoneName: "Central Standard Time",
        id: 2,
        latLng: "33.604209,-86.798062",
        distance: "134 mi",
        BranchTime: {
          Value1: "Will open ",
          Value2: "Wednesday at 9am CST",
          Value3: "",
        },
      },
      {
        BranchNumber: "7306",
        BranchName: "Dothan",
        Address: "2969 Ross Clark Cir., Suite 2, Dothan, AL 36301",
        PhoneNumber: "334-231-3307",
        openDate: "08/31/2015",
        latitude: "31.220574",
        longitude: "-85.432348",
        branchManager: "Joseph Carter",
        timeZoneId: "America/Chicago",
        timeZoneName: "Central Standard Time",
        id: 3,
        latLng: "31.220574,-85.432348",
        distance: "128 mi",
        BranchTime: {
          Value1: "Will open ",
          Value2: "Wednesday at 9am CST",
          Value3: "",
        },
      },
      {
        BranchNumber: "7307",
        BranchName: "Hamilton",
        Address: "115 2nd Ave. SE, Hamilton, AL 35570",
        PhoneNumber: "205-921-7919",
        openDate: "08/31/2015",
        latitude: "34.140841",
        longitude: "-87.987677",
        branchManager: "Courtney Brown",
        timeZoneId: "America/Chicago",
        timeZoneName: "Central Standard Time",
        id: 4,
        latLng: "34.140841,-87.987677",
        distance: "216 mi",
        BranchTime: {
          Value1: "Will open ",
          Value2: "Wednesday at 9am CST",
          Value3: "",
        },
      },
      {
        BranchNumber: "7305",
        BranchName: "Huntsville",
        Address: "11220 Memorial Pkwy., Suite T, Huntsville, AL 35803",
        PhoneNumber: "256-217-5820",
        openDate: "12/05/2016",
        latitude: "34.636268",
        longitude: "-86.567154",
        branchManager: "Angie Doran",
        timeZoneId: "America/Chicago",
        timeZoneName: "Central Standard Time",
        id: 5,
        latLng: "34.636268,-86.567154",
        distance: "223 mi",
        BranchTime: {
          Value1: "Will open ",
          Value2: "Wednesday at 9am CST",
          Value3: "",
        },
      },
    ],
    zipcode: "36785",
    searchLocation: {
      lat: 32.3182314,
      lng: -86.902298,
    },
    stateLongName: "Alabama",
    stateShortName: "AL",
  },
};
// in test file.
beforeAll(() => {
  setupGoogleMock();
});

jest.mock("./BranchLocatorMap", () => () => {});
jest.mock("../../Controllers/BranchLocatorController");

test("Checks the component is rendered", async () => {
  BranchLocatorController.mockResolvedValue(mockValue);
  render(
    <MemoryRouter
      initialEntries={[
        { pathname: "/", state: { value: "indiana", flag: true } },
      ]}
    >
      {component()}
    </MemoryRouter>
  );
  await act(() => {
    const element = screen.getByTestId("branch-locator-state-page");
    expect(element).toBeTruthy();
  });
});

test("Check the state name is displaying correctly", () => {
  BranchLocatorController.mockResolvedValue(mockValue);
  const { getByText } = render(
    <MemoryRouter
      initialEntries={[
        { pathname: "/", state: { value: "indiana", flag: true } },
      ]}
    >
      {component()}
    </MemoryRouter>
  );
  expect(getByText("Personal Loans In indiana")).toBeTruthy();
});

test("Check customer rating exist in the UI", () => {
  BranchLocatorController.mockResolvedValue(mockValue);
  const { getByText } = render(
    <MemoryRouter
      initialEntries={[
        { pathname: "/", state: { value: "indiana", flag: true } },
      ]}
    >
      {component()}
    </MemoryRouter>
  );
  expect(getByText("Customer Ratings***")).toBeTruthy();
});

test("Check onclick for find a branch", () => {
  const { getByText } = render(
    <MemoryRouter
      initialEntries={[
        { pathname: "/", state: { value: "indiana", flag: true } },
      ]}
    >
      {component()}
    </MemoryRouter>
  );
  fireEvent.click(getByText("Find a branch"));
});

test("Check onclick for Get Driving Directions To Nearest Location", () => {
  const { getByText } = render(
    <MemoryRouter
      initialEntries={[
        { pathname: "/", state: { value: "indiana", flag: true } },
      ]}
    >
      {component()}
    </MemoryRouter>
  );
  fireEvent.click(getByText("Get Driving Directions To Nearest Location"));
});

test("Should match the snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter
      initialEntries={[
        { pathname: "/", state: { value: "indiana", flag: true } },
      ]}
    >
      {component()}
    </MemoryRouter>
  );
  expect(asFragment).toMatchSnapshot();
});
