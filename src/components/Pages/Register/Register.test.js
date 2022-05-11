import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import Register from "./Register";

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


const component = () => {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Register />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

test("Checks the component is rendered", () => {
	render(component());
	const element = screen.getByTestId('register_component');
	expect(element).toBeTruthy();
});

test("Render First name ", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="firstName"]`);
	fireEvent.change(input, { target: { value: "Mariner" } });
	expect(input).toBeTruthy();
	expect(input.value).toBe('Mariner');
});


test("Invalid Firstname", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="firstName"]`);
	fireEvent.change(input, { target: { value: "123" } });
	fireEvent.change(input, { target: { value: "" } });
	fireEvent.change(input, { target: { value: "test123" } });
	expect(input.value).not.toBe(true);
});


test("Render Last name ", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="lastName"]`);
	fireEvent.change(input, { target: { value: "Mariner" } });
	expect(input).toBeTruthy();
	expect(input.value).toBe('Mariner');
});

test("Invalid Last Name", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="lastName"]`);
	fireEvent.change(input, { target: { value: "123" } });
	fireEvent.change(input, { target: { value: "" } });
	fireEvent.change(input, { target: { value: "test123" } });
	expect(input.value).not.toBe(true);
});

test("Render Email ", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="email"]`);
	fireEvent.change(input, { target: { value: "mariner@gmail.com" } });
	expect(input).toBeTruthy();
	expect(input.value).toBe('mariner@gmail.com');
});

test("Check invalid email", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="email"]`);
	fireEvent.change(input, { target: { value: "test" } });
	fireEvent.change(input, { target: { value: "test@" } });
	fireEvent.change(input, { target: { value: "test@gmail" } });
	fireEvent.change(input, { target: { value: "123" } });
	fireEvent.change(input, { target: { value: "@test" } });
	expect(input.value).not.toBe(true);
});

test("Render Social Security Number ", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="ssn"]`);
	fireEvent.change(input, { target: { value: "123-45-6789" } });
	expect(input).toBeTruthy();
	expect(input.value).toBe('123-45-6789');
});

test("Check Valid Social Security Number", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="ssn"]`);
	fireEvent.change(input, { target: { value: "abc" } });
	expect(input.value).toBe("");
	fireEvent.change(input, { target: { value: "123-45-6789" } });
	expect(input.value).toBe("123-45-6789");
});

test("Render ZipCode ", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="zip"]`);
	fireEvent.change(input, { target: { value: "12345" } });
	expect(input).toBeTruthy();
	expect(input.value).toBe('12345');
});


it("zipcode should be 5 digits", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="zip"]`);
	expect(input.maxLength).toBe(5);
});

test("Zipcode Valid Input", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="zip"]`);
	fireEvent.change(input, { target: { value: "abc" } });
	expect(input.value).toBe("");
	fireEvent.change(input, { target: { value: "12345" } });
	expect(input.value).toBe("12345");
});


test("Render DOB ", () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="dob"]`);
	fireEvent.change(input, { target: { value: "01/01/2000" } });
	expect(input).toBeTruthy();
});

test("Render password", () => {
	const { container } = render(component());
	const element = container.querySelector(`input[name="password"]`);
	expect(element.hasAttribute("name")).toBe(true);
	fireEvent.change(element, { target: { value: "Test@123" } });
	expect(element.value).toBe("Test@123");
});


test('Password Length Test', () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="password"]`);
	expect(input.maxLength).toBe(30);
})

test('Password Prevent Cut Test', () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="password"]`);
	fireEvent.cut(input);
	expect(input.value).toBe('');
})

test('Password Prevent Copy Test', () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="password"]`);
	fireEvent.copy(input);
	expect(input.value).toBe('');
})

test('Password Prevent Paste Test', () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="password"]`);
	fireEvent.paste(input);
	expect(input.value).toBe('');
})


test("Render confirmPassword", () => {
	const { container } = render(component());
	const element = container.querySelector(`input[name="confirmPassword"]`);
	expect(element.hasAttribute("name")).toBe(true);
	fireEvent.change(element, { target: { value: "Test@123" } });
	expect(element.value).toBe("Test@123");
});

test('confirmPassword Length Test', () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="confirmPassword"]`);
	expect(input.maxLength).toBe(30);
})

test('confirmPassword Prevent Cut Test', () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="confirmPassword"]`);
	fireEvent.cut(input);
	expect(input.value).toBe('');
})

test('confirmPassword Prevent Copy Test', () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="confirmPassword"]`);
	fireEvent.copy(input);
	expect(input.value).toBe('');
})

test('confirmPassword Prevent Paste Test', () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="confirmPassword"]`);
	fireEvent.paste(input);
	expect(input.value).toBe('');
})

test("Check Password Match", async () => {
	const { container } = render(component());
	const newPassword = container.querySelector(`input[name="password"]`);
	const input = container.querySelector(`input[name="confirmPassword"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "Mariner1@1" } });
		fireEvent.change(newPassword, { target: { value: "Mariner1@" } });
		fireEvent.blur(input);
	});
	const errorInfo = container.querySelector(`p[id="cpass-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Your confirmation password must match your password');
});


test("Button Onclick", () => {
	render(component());
	const button = screen.getByTestId("submit");
	fireEvent.click(button);
});

test('Should match the snapshot', () => {
	const { asFragment } = render(component());
	expect(asFragment).toMatchSnapshot();
});