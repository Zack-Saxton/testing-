import "@testing-library/jest-dom";
import { cleanup, render, act, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import HeaderWithoutMenu from "./HeaderWithoutMenu";
import { QueryClient, QueryClientProvider } from 'react-query';

afterEach(cleanup);
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

const theme = createTheme();
const component = () =>{
	return(
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
					<HeaderWithoutMenu />
			</QueryClientProvider>
		</ThemeProvider>	
	);
}

it("Logo and Link Availability tests", () => {
  render(component());
  screen.debug(undefined, 200000)
  const element = screen.getByTestId("mf-logo");
  expect(element).toBeTruthy();
});