import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import ScheduleCall from "./ScheduleCall";
import { ThemeProvider } from '@mui/styles';
import { createTheme, StyledEngineProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from 'react-query';
const theme = createTheme();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 500000,
    },
  },
});





// it("button Availability", () => {
//     render(
//       <BrowserRouter>
//       <ScheduleCall />
//       </BrowserRouter>
// 	);
// 	const button = screen.getByTestId("ScheduleaCall");
//     expect(button).toBeTruthy();
// });

it("Button Onclick", () => {

	render(
			<ThemeProvider theme={theme}>
				<StyledEngineProvider injectFirst>
					<QueryClientProvider client={queryClient}>
						<BrowserRouter>
							<ScheduleCall />
						</BrowserRouter>
					</QueryClientProvider>
				</StyledEngineProvider>
			</ThemeProvider>
	);
	const button = screen.getByTestId("ScheduleaCall");
	fireEvent.click(button);

});

it("Check Dialog Avaliabilty",()=>{
	render(
		<ThemeProvider theme={theme}>
			<StyledEngineProvider injectFirst>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<ScheduleCall />
					</BrowserRouter>
				</QueryClientProvider>
			</StyledEngineProvider>
		</ThemeProvider>
);
const button = screen.getByTestId("ScheduleaCall");
fireEvent.click(button);
expect(screen.getByTestId('dialog')).toBeInTheDocument();
})

it("Check Date Picker Avalability",()=>{
	render(
		<ThemeProvider theme={theme}>
			<StyledEngineProvider injectFirst>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<ScheduleCall />
					</BrowserRouter>
				</QueryClientProvider>
			</StyledEngineProvider>
		</ThemeProvider>
);
const button = screen.getByTestId("ScheduleaCall");
fireEvent.click(button);
expect(screen.getByLabelText('Date *')).toBeInTheDocument();
})