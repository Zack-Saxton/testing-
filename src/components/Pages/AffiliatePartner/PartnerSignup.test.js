import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from "react-router-dom";
import NavContext from "../../../contexts/NavContext";
import SelectOffer from "../ApplyLoan/SelectOffer/SelectOffer";
import { mockData2, mockDataPartnerStateNC,mockDataPartnerStateWI,mockDataPartnerStateNM,mockDataPartnerStateDE,mockDataPartnerStateCA } from './../../../__mock__/data/PartnerMockData';
import PartnerSignUp from "./PartnerSignUp";

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
					<NavContext>
						<PartnerSignUp />
						<SelectOffer />
					</NavContext>
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	);
}


test("Checks the component is rendered", async () => {
	await act(() => {
		render(component());
	});	
	const element = screen.getByTestId('partnerSignup_component');
	expect(element).toBeTruthy();
});

test("Render Email ", async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="email"]`);
	await act(() => {
	fireEvent.change(input, { target: { value: "mariner@gmail.com" } });
	});
	expect(input).toBeTruthy();
	expect(input.value).toBe('mariner@gmail.com');
});

test("Check invalid email", async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="email"]`);
	await act(() => {
	fireEvent.change(input, { target: { value: "test" } });
	fireEvent.change(input, { target: { value: "test@" } });
	fireEvent.change(input, { target: { value: "test@gmail" } });
	fireEvent.change(input, { target: { value: "123" } });
	fireEvent.change(input, { target: { value: "@test" } });
});
	expect(input.value).not.toBe(true);
});

test("Render  Last 4 digit Social Security Number ", async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="ssn"]`);
	await act(() => {	
	fireEvent.change(input, { target: { value: "1234" } });
});
	expect(input).toBeTruthy();
	expect(input.value).toBe('1234');
});

test("Check Valid Last 4 digit Social Security Number", async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="ssn"]`);
	await act(() => {		
	fireEvent.change(input, { target: { value: "abc" } });
	expect(input.value).toBe("");
	fireEvent.change(input, { target: { value: "1234" } });
	expect(input.value).toBe("1234");
});
});

test("Check invalid ssn", async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="ssn"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "123" } });
		fireEvent.blur(input);
	});
	const errorInfo = screen.getByText('Please enter a valid SSN');
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Please enter a valid SSN');
});

test("Render phone number ", async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="callPhNo"]`);
	await act(() => {	
	fireEvent.change(input, { target: { value: "(123) 123-1233" } });
});
	expect(input).toBeTruthy();
	expect(input.value).toBe('(123) 123-1233');
});

test("Check Phonenumber masking after entering phone number", async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="callPhNo"]`);
	expect(input).toBeTruthy();
	await act(() => {
		fireEvent.change(input, { target: { value: "1231231233" } });
		fireEvent.blur(input);
	});
	expect(input.value).not.toBe('1231231233');
});

test("Check invalid Phone Number", async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="callPhNo"]`);
	await act(() => {
		fireEvent.change(input, { target: { value: "123456" } });
		fireEvent.blur(input);
	});
	const errorInfo = container.querySelector(`p[id="phonePartner-helper-text"]`);
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Please enter a valid phone number');
});


test("Render phone Type ", async () => {
	const { container } = render(component());		
	await act(() => {
		const input = container.querySelector(`input[name="phoneType"]`);
		expect(input).toBeTruthy();
	});	
});

test("Select phone Type ", async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="phoneType"]`);
	await act(() => {	
	fireEvent.change(input, { target: { value: "Cell" } });
});
	expect(input).toBeTruthy();
	expect(input.value).toBe('Cell');
});

test("Render password", async () => {
	const { container } = render(component());
	const element = container.querySelector(`input[name="password"]`);
	expect(element.hasAttribute("name")).toBe(true);
	await act(() => {		
	fireEvent.change(element, { target: { value: "Test@123" } });
	expect(element.value).toBe("Test@123");
});
});


test('Password Length Test', async () => {
	const { container } = render(component());
	await act(() => {		
		const input = container.querySelector(`input[name="password"]`);
		expect(input.maxLength).toBe(30);
	});
})

test('Password Prevent Cut Test', async() => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="password"]`);
	await act(() => {
		fireEvent.cut(input);
		expect(input.value).toBe('');
	});
})

test('Password Prevent Copy Test', async() => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="password"]`);
	await act(() => {
		fireEvent.copy(input);
		expect(input.value).toBe('');
	});
})

test('Password Prevent Paste Test', async() => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="password"]`);
	await act(() => {
		fireEvent.paste(input);
		expect(input.value).toBe('');
	});
})


test("Render confirmPassword", async () => {
	const { container } = render(component());
	const element = container.querySelector(`input[name="confirmPassword"]`);
	expect(element.hasAttribute("name")).toBe(true);
	await act(() => {
		fireEvent.change(element, { target: { value: "Test@123" } });
		expect(element.value).toBe("Test@123");
	});
});

test('confirmPassword Length Test', async () => {
	const { container } = render(component());
	await act(() => {
	const input = container.querySelector(`input[name="confirmPassword"]`);
	expect(input.maxLength).toBe(30);
	});
})

test('confirmPassword Prevent Cut Test', async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="confirmPassword"]`);
await act(() => {
		fireEvent.cut(input);
		expect(input.value).toBe('');
	});
})

test('confirmPassword Prevent Copy Test',async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="confirmPassword"]`);
	await act(() => {
		fireEvent.copy(input);
		expect(input.value).toBe('');
	});
})

test('confirmPassword Prevent Paste Test',async () => {
	const { container } = render(component());
	const input = container.querySelector(`input[name="confirmPassword"]`);
	await act(() => {
		fireEvent.paste(input);
		expect(input.value).toBe('');
	});
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



test("Check Active Duty", async () => {
	const { container } = render(component());
	const asyncMock = jest.fn().mockResolvedValue(mockDataPartnerStateNC);
	await asyncMock();
	const activeDuty = container.querySelector(`input[name="activeDuty"]`);
	const activeDutyRank = container.querySelector(`input[name="activeDutyRank"]`);
	await act(() => {
		fireEvent.change(activeDuty, { target: { value: "Yes" } });
		fireEvent.change(activeDutyRank, { target: { value: "E5 and above" } });
	});
	expect(activeDutyRank).toBeTruthy();
	expect(activeDutyRank.value).toBe('E5 and above');
});

test("Check Active Duty state for application which does not meet the requirements", async () => {
	const { container } = render(component());
	const asyncMock = jest.fn().mockResolvedValue(mockDataPartnerStateNC);
	await asyncMock();
	const activeDuty = container.querySelector(`input[name="activeDuty"]`);
	const activeDutyRank = container.querySelector(`input[name="activeDutyRank"]`);
	await act(() => {
		fireEvent.change(activeDuty, { target: { value: "Yes" } });
		fireEvent.change(activeDutyRank, { target: { value: "E4 and above" } });
	});
	const errorInfo = screen.getByText('Unfortunately, based on the application information provided, you do not meet our application requirements.');
	expect(errorInfo).toBeTruthy();
	expect(errorInfo).toHaveTextContent('Unfortunately, based on the application information provided, you do not meet our application requirements.');
});

test("Check Marital status for state winconsin", async () => {
	const { container } = render(component());
	const asyncMock = jest.fn().mockResolvedValue(mockDataPartnerStateWI);
	await asyncMock();
	const martialStatus = container.querySelector(`input[name="martialStatus"]`);
	const spouseAddress = container.querySelector(`input[name="spouseadd"]`);
	const spouseZipcode = container.querySelector(`input[name="spouseZipcode"]`);
	const spousecity = container.querySelector(`input[name="spousecity"]`);
	const spouseSelectState = container.querySelector(`input[name="spouseSelectState"]`);
	await act(() => {
		fireEvent.change(martialStatus, { target: { value: "Married" } });
		fireEvent.change(spouseAddress, { target: { value: "4321 MAIN AVE" } });
		fireEvent.change(spouseZipcode, { target: { value: "19701" } });
		fireEvent.change(spousecity, { target: { value: "NEWARK" } });
		fireEvent.change(spouseSelectState, { target: { value: "DE" } });
	});
	expect(martialStatus).toBeTruthy();
	expect(martialStatus.value).toBe('Married');
	expect(spouseAddress.value).toBe('4321 MAIN AVE');
	expect(spouseZipcode.value).toBe('19701');
	expect(spousecity.value).toBe('NEWARK');
	expect(spouseSelectState.value).toBe('DE');
});

test("test Terms and service checkbox is able to checked", () => {
	
		Object.defineProperty(window, 'location', {
			get() {
				return { href: 'http://localhost:3000/partner/signup/c13c9027422833ff?utm_source=amone&utm_medium=API&offer=AMOUNT%3D8000%26APR%3D0.3199%26TERM%3D24%26REF%3D63a44601d720cd044c53022e%26OFFERTYPE%3Donline' };
			  },
		});
    const { container } = render(component())
    const element = container.querySelector(`input[id="TermsAndServiceCheckbox"]`);
    fireEvent.click(element);
    expect(element).toBeChecked();
});

test("test checkbox related to states is able to checked", async() => {
	
	Object.defineProperty(window, 'location', {
		get() {
			return { href: 'http://localhost:3000/partner/signup/c13c9027422833ff?utm_source=amone&utm_medium=API&offer=AMOUNT%3D8000%26APR%3D0.3199%26TERM%3D24%26REF%3D63a44601d720cd044c53022e%26OFFERTYPE%3Donline' };
		  },
	});
const { container } = render(component())
const asyncMock = jest.fn().mockResolvedValue(mockDataPartnerStateDE);
await asyncMock();
const element = container.querySelector(`input[id="DelawareCheckbox"]`);
fireEvent.click(element);
expect(element).toBeChecked();
const asyncMockCA = jest.fn().mockResolvedValue(mockDataPartnerStateCA);
await asyncMockCA();
const elementCA = container.querySelector(`input[id="CACheckbox"]`);
fireEvent.click(elementCA);
expect(elementCA).toBeChecked();
const asyncMockNM = jest.fn().mockResolvedValue(mockDataPartnerStateNM);
await asyncMockNM();
const elementNM = container.querySelector(`input[id="NMCheckbox"]`);
fireEvent.click(elementNM);
expect(elementNM).toBeChecked();
});

test("Button Onclick", async () => {
	render(component());
	const button = screen.getByTestId("submit");
	await act(() => {
		fireEvent.click(button);
	});
});


it("Navigate to Respective Page", async () => {
	render(component());
	const input = screen.getByTestId("submit");
	expect(input).toBeTruthy();
	await act(() => {
	fireEvent.click(input);
	});	
	const asyncMock = jest.fn().mockResolvedValue(mockData2);
	await asyncMock();
	const page = screen.getByTestId("selectOfferComponent")
	await waitFor(() => expect(page).toBeInTheDocument());
});

test('Should match the snapshot', async () => {
	const { asFragment } = render(component());
	await act(() => {
		expect(asFragment).toMatchSnapshot();
	});	
});
