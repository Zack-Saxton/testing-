import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import ProfilePicture from '../../../contexts/ProfilePicture';
import HistoricalData from "./HistoricalData";
const theme = createTheme();
window.scrollTo = jest.fn();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 500000,
    },
  },
});
HTMLCanvasElement.prototype.getContext = () => {};

const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<ProfilePicture>
          <HistoricalData />
				</ProfilePicture>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

it("All the text Messages are loaded", () => {
  render(component(), { wrapper: MemoryRouter });
  expect(screen.getByTestId('vantagescoreedit')).toBeInTheDocument();
})
