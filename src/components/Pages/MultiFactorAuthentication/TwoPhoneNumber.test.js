import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import TwoPhoneNumbers from "./TwoPhoneNumbers";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography
  } from "@mui/material";


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
            <BrowserRouter>
				<TwoPhoneNumbers  cellPhoneNumber={"2352353456"}
      optionalPhoneNumber={"2345623457"}
      mfaPhoneNumber ={"4764356721"}
    //   setSelection={setSelection}
    //   selection={true}
    //   selectionValue={"Phone"}
    //   sendPassCode={mutateAsync}
    //   isLoading={isLoading}
    //   mfaDetails={location?.state}
    //   securityQuestionsSaved={false}
      />
            </BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the PhoneNumber  is rendered", () => {
	render(component());
	const element = screen.getByTestId('twophoneNumber');
	expect(element).toBeTruthy();
});
test("Checks the title of the page", () => {
    render(component());
    const titleEl = screen.getByTestId("title");
    expect(titleEl).toBeTruthy();
});
test("Checks the title1 of the page", () => {
    render(component());
    const titleEl = screen.getByTestId("title1");
    expect(titleEl).toBeTruthy();
});
test("Check Radio Button is rendered", () => {
    const { container } = render(component());
    const input = container.querySelector(`input[name="method"]`);
    expect(input).toBeTruthy();
});
// test("Phone selection rendered", () => { 
// //     render( component()  );
// //   fireEvent.change(screen.getByTestId('phoneSelection'));
  
//   const {container} = render(component());
//   const radio = container.querySelector(`input[name="method"]`);
//   fireEvent.change(radio, { target: { value: "96532545588" } });
//   const element = screen.getByText('To phone number (***) *** 5588');
//   expect(element).toBeTruthy();
//   //expect(radio.value).toBe('96532545588');
// }); 