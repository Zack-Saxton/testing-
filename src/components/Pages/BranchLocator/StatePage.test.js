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
import { mockValue } from "../../../__mock__/data/StatePageMock.data";
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
