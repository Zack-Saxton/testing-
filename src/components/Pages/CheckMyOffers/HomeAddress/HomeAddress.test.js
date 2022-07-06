import React from "react";
import { BrowserRouter } from "react-router-dom";
import CheckMyOffers from "../../../../contexts/CheckMyOffers";
import HomeAddress from "./index.js";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, act, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from 'react-query';


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
				<CheckMyOffers>
        <HomeAddress />
      </CheckMyOffers>
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the component is rendered", () => {
	render(component());
	const element = screen.getByTestId('homeAddress_Component');
	expect(element).toBeTruthy();
});

test("Check streetAddress is rendered", () => {
	render(component());
	const element = screen.getByTestId('streetAddress');
	expect(element).toBeTruthy();
});

test("Check zipcode is rendered", () => {
	render(component());
	const element = screen.getByTestId('zipcode');
	expect(element).toBeTruthy();
});

test("Check city is rendered", () => {
	render(component());
	const element = screen.getByTestId('city');
	expect(element).toBeTruthy();
});

test("Check state is rendered", () => {
	render(component());
	const element = screen.getByTestId('state');
	expect(element).toBeTruthy();
});

test("Check Button is rendered", () => {
	render(component());
	const element = screen.getByTestId('homeAddressCntBtn');
	expect(element).toBeTruthy();
});

test("Render Address", async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="streetAddress"]`);
 await act(() => {
    fireEvent.change(input, { target: { value: "1234 MAIN AVE" } });
  });

	expect(input).toBeTruthy();
	expect(input.value).toBe('1234 MAIN AVE');
});

it("zipcode should be 5 digits", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="zip"]`);
	expect(input.maxLength).toBe(5);
});

test("Zipcode Valid Input", async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="zip"]`);
 await act(() => {
  fireEvent.change(input, { target: { value: "1234 MAIN AVE" } });
	fireEvent.change(input, { target: { value: "abc" } });
	expect(input.value).toBe("");
	fireEvent.change(input, { target: { value: "12345" } });
	expect(input.value).toBe("12345");
  });
  	
});

test("Render City", async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="city"]`);
 await act(() => {
    fireEvent.change(input, { target: { value: "NEWARK" } });
  });

	expect(input).toBeTruthy();
	expect(input.value).toBe('NEWARK');
});

test("Render State", async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="state"]`);
  await act(() => {
    fireEvent.change(input, { target: { value: "DE" } });
  });

	expect(input).toBeTruthy();
	expect(input.value).toBe('DE');
});

test("Render Zipcode", async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="zip"]`);
 await act(() => {
    fireEvent.change(input, { target: { value: "19702" } });
  });

	expect(input).toBeTruthy();
	expect(input.value).toBe('19702');
});

test("Check city field is disabled", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="city"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test("Check state field is disabled", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="state"]`);
	expect(input).toBeTruthy();
	expect(input).toHaveAttribute("disabled");
});

test('should match the snapshot Test', () => {
  const { asFragment } = render(component());
  expect(asFragment).toMatchSnapshot();
})