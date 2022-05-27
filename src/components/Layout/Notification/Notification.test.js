import "@testing-library/jest-dom";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import Notification from "../Notification/Notification";
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
					<Notification />
			</QueryClientProvider>
		</ThemeProvider>	
	);
}


// Check if Notification button functions correctly
test("Checks that Bell button functions correctly and notifications appear and disapear on click", async () => {
  render(component(), { wrapper: MemoryRouter });

  const button = screen.getByTestId('BellButton'); 

 fireEvent.click(button)

 expect(await screen.findByText(`You have no New Notifications`, { exact: false })).toBeVisible();

 fireEvent.click(button)

 expect(await screen.findByText(`You have no New Notifications`, { exact: false })).not.toBeVisible();

});

