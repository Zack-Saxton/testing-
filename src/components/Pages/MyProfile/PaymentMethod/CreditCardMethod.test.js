import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, act } from "@testing-library/react";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles'
import ProfilePicture from '../../../../contexts/ProfilePicture';
import { GlobalStateProvider } from "../../../../../src/contexts/GlobalStateProvider";
// import PaymentMethod from '../PaymentMethod.js';
import PaymentMethod from "../PaymentMethod";
import CreditCardMethod from './CreditCardMethod'
import { LoanDataMock } from ".././../../../__mock__/LoanData.mock";

const handleFunction = jest.fn();

let propsValue = {
  "formikAddDebitCard": {
      "values": {
          "cardNumber": "4567890123123456",
          "cardName": "vicky",
          "cvv": "111",
          "expiryDate": null,
          "streetAddress": "999 NEW ST",
          "city": "Lafayette",
          "state": "LA",
          "zipcode": "70503",
          "setDefault": false,
          "addDebitcard": "70503"
      },
      "errors": {
          "cardNumber": "Card Number is required.",
          "cardName": "Cardholder Name is required.",
          "city": "City is required.",
          "cvv": "CVV is required",
          "expiryDate": "Expiration Date is required"
      },
      "touched": {},
      "isSubmitting": false,
      "isValidating": false,
      "submitCount": 0,
      "initialValues": {
          "cardNumber": "",
          "cardName": "",
          "cvv": "",
          "expiryDate": null,
          "streetAddress": "",
          "city": "",
          "state": "",
          "zipcode": "",
          "setDefault": false
      },
      "initialErrors": {},
      "initialTouched": {},
      "isValid": false,
      "dirty": true,
      "validateOnBlur": true,
      "validateOnChange": true,
      "validateOnMount": false,
      "handleSubmit": handleFunction()
  },
  "formikAddDebitCardInitial": {
    "values": {
        "cardNumber": "",
        "cardName": "",
        "cvv": "",
        "expiryDate": null,
        "streetAddress": "",
        "city": "",
        "state": "",
        "zipcode": "",
        "setDefault": false,
        "addDebitcard": ""
    },
    "errors": {
        "cardNumber": "Card Number is required.",
        "cardName": "Cardholder Name is required.",
        "city": "City is required.",
        "cvv": "CVV is required",
        "expiryDate": "Expiration Date is required"
    },
    "touched": {},
    "isSubmitting": false,
    "isValidating": false,
    "submitCount": 0,
    "initialValues": {
        "cardNumber": "",
        "cardName": "",
        "cvv": "",
        "expiryDate": null,
        "streetAddress": "",
        "city": "",
        "state": "",
        "zipcode": "",
        "setDefault": false
    },
    "initialErrors": {},
    "initialTouched": {},
    "isValid": false,
    "dirty": true,
    "validateOnBlur": true,
    "validateOnChange": true,
    "validateOnMount": false.valueOf,
    "handleSubmit": {handleFunction}
},
}

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
const component = (formikValue) =>{


	return(
		<GlobalStateProvider>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<ProfilePicture>
						<CreditCardMethod
              formikAddDebitCard={formikValue}
              closeDebitCardModal={handleFunction}
              addCreditCardYes={handleFunction}
              debitCardModal={false}
              mailingStreetAddress="" 
              mailingZipcode="" 
              detectCardType={handleFunction} 
              editMode={false} 
              handleMenuProfile={handleFunction} 
              closeDebitCardButton={handleFunction} 
              cardType={false} 
              removeSpace={handleFunction} 
              setSameAsMailAddress={handleFunction} 
              fetchAddress={handleFunction} 
              getAddressOnChange={handleFunction} 
              setDefaultAccount={handleFunction} 
              addBankOnChange={handleFunction} 
              checkedDebitCard={false} 
              validZip={true} 
              openDebitCardModal={handleFunction} 
              validateCardAndAccountNumber={handleFunction} 
              sameAsMailAddress={true} 
              preventSpace={handleFunction}
            />
					</ProfilePicture>				
				</QueryClientProvider>
			</ThemeProvider>
		</GlobalStateProvider>		
	);
}


const PaymnetComponent = () =>{
	return(
		<GlobalStateProvider>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<ProfilePicture>
						<PaymentMethod/>
					</ProfilePicture>				
				</QueryClientProvider>
			</ThemeProvider>
		</GlobalStateProvider>		
	);
}
jest.mock("../../../../hooks/useAccountOverview", ()=>({
  useAccountOverview: jest.fn(),
}))

test("Check the component is rendered", async () => {
  LoanDataMock();
	render(component(propsValue.formikAddDebitCardInitial),{wrapper: MemoryRouter});
	const element = screen.getByTestId('creditMethodComponent');
	expect(element).toBeTruthy();
});

test("Check all input filed exist in the UI. Card number, Name on Card, Expiration Date, CVV, ", async () => {
  // LoanDataMock();
	const { container } = render(component(propsValue.formikAddDebitCardInitial),{wrapper: MemoryRouter});	
	const cardNumber = container.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();
	expect(cardNumber.value).toBe('');

	const cardName = container.querySelector(`input[name="cardName"]`);
	expect(cardName).toBeTruthy();
	expect(cardName.value).toBe('');

	const expiryDate = container.querySelector(`input[name="expiryDate"]`);
	expect(expiryDate).toBeTruthy();
	expect(expiryDate.value).toBe('');

	const cvv = container.querySelector(`input[name="cvv"]`);
	expect(cvv).toBeTruthy();
	expect(cvv.value).toBe('');

	const sameAsMailAddress = container.querySelector(`input[name="sameAsMailAddress"]`);
	expect(sameAsMailAddress).toBeTruthy();
	expect(sameAsMailAddress).toBeChecked(false);

	const streetAddress = container.querySelector(`input[name="streetAddress"]`);
	expect(streetAddress).toBeTruthy();
	expect(streetAddress.value).toBe('');

	const zipcode = container.querySelector(`input[name="zipcode"]`);
	expect(zipcode).toBeTruthy();
	expect(zipcode.value).toBe('');

	const city = container.querySelector(`input[name="city"]`);
	expect(city).toBeTruthy();
	expect(city.value).toBe('');

	const state = container.querySelector(`input[name="state"]`);
	expect(state).toBeTruthy();
	expect(state.value).toBe('');

	const defaultCheckBox = container.querySelector(`input[name="setDefault"]`);
	expect(defaultCheckBox).toBeTruthy();

});

test("Check all input filed exist in the UI. Card number, Name on Card, Expiration Date, CVV, ", async () => {
  // LoanDataMock();
	const { container } = render(component(propsValue.formikAddDebitCard),{wrapper: MemoryRouter});	
	const cardNumber = container.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();
	expect(cardNumber.value).toBe('4567890123123456');

	const cardName = container.querySelector(`input[name="cardName"]`);
	expect(cardName).toBeTruthy();
	expect(cardName.value).toBe('vicky');

	const expiryDate = container.querySelector(`input[name="expiryDate"]`);
	expect(expiryDate).toBeTruthy();
	expect(expiryDate.value).toBe('');

	const cvv = container.querySelector(`input[name="cvv"]`);
	expect(cvv).toBeTruthy();
	expect(cvv.value).toBe('111');

	const sameAsMailAddress = container.querySelector(`input[name="sameAsMailAddress"]`);
	expect(sameAsMailAddress).toBeTruthy();
	expect(sameAsMailAddress).toBeChecked(false);

	const streetAddress = container.querySelector(`input[name="streetAddress"]`);
	expect(streetAddress).toBeTruthy();
	expect(streetAddress.value).toBe('999 NEW ST');

	const zipcode = container.querySelector(`input[name="zipcode"]`);
	expect(zipcode).toBeTruthy();
	expect(zipcode.value).toBe('70503');

	const city = container.querySelector(`input[name="city"]`);
	expect(city).toBeTruthy();
	expect(city.value).toBe('Lafayette');

	const state = container.querySelector(`input[name="state"]`);
	expect(state).toBeTruthy();
	expect(state.value).toBe('LA');

	const defaultCheckBox = container.querySelector(`input[name="setDefault"]`);
	expect(defaultCheckBox).toBeTruthy();

});

test("Check Card Number validation is working when value is empty", async () => {
  LoanDataMock();
	const { container } = render(PaymnetComponent(),{wrapper: MemoryRouter});	
	const cardNumber = container.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardNumber, { target: { value: "" } });		
		fireEvent.blur(cardNumber);	
	});	
	const errorInfo = container.querySelector(`p[id="cardNumber-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('Card Number is required.');

});

test("Check Card Number validation is working when entered number less than 16 digit", async () => {
  LoanDataMock();
	const { container } = render(PaymnetComponent(),{wrapper: MemoryRouter});	
	const cardNumber = container.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardNumber, { target: { value: "23232" } });		
		fireEvent.blur(cardNumber);	
	});	
	const errorInfo = container.querySelector(`p[id="cardNumber-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('Card Number should be 13 digits.');

});

test("Check Card Number validation that accept only Visa or Master card	", async () => {
  LoanDataMock();
	const { container } = render(PaymnetComponent(),{wrapper: MemoryRouter});	
	const cardNumber = container.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardNumber, { target: { value: "2333232233333333" } });		
		fireEvent.blur(cardNumber);	
	});	
	const errorInfo = container.querySelector(`p[id="cardNumber-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('We only accept Visa or Master card');

});

test("Check Card Number validation that error message should not be shown when entered valid card	", async () => {
  LoanDataMock();
	const { container } = render(PaymnetComponent(),{wrapper: MemoryRouter});	
	const cardNumber = container.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardNumber, { target: { value: "5487990000000052" } });		
		fireEvent.blur(cardNumber);	
	});	
	const errorInfo = container.querySelector(`p[id="cardNumber-helper-text"]`);
	expect(errorInfo).not.toBeTruthy();	

});

test("Master card image to be shown when entering valid card number", async () => {
  LoanDataMock();
	const { container } = render(PaymnetComponent(),{wrapper: MemoryRouter});	
	const cardNumber = container.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardNumber, { target: { value: "5487990000000052" } });		
		fireEvent.blur(cardNumber);	
	});		
	const element = screen.getByTestId('selected-card-type-image');	
	expect(element).toBeTruthy();
	expect(element).toHaveAttribute('src', window.location.origin + "/Card/MasterCard.png");
});

test("Unknown image to be shown when entering invalid card number", async () => {
  LoanDataMock();
	const { container } = render(PaymnetComponent(),{wrapper: MemoryRouter});	
	const cardNumber = container.querySelector(`input[name="cardNumber"]`);
	expect(cardNumber).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardNumber, { target: { value: "2323990000000052" } });		
		fireEvent.blur(cardNumber);	
	});		
	const element = screen.getByTestId('selected-card-type-image');	
	expect(element).toBeTruthy();
	expect(element).toHaveAttribute('src', window.location.origin + "/Card/unknown.png");
});

test("Check Name on card validation is working", async () => {
  LoanDataMock();
	const { container } = render(PaymnetComponent(),{wrapper: MemoryRouter});	
	const cardName = container.querySelector(`input[name="cardName"]`);
	expect(cardName).toBeTruthy();	
	await act(() => {
		fireEvent.change(cardName, { target: { value: "" } });		
		fireEvent.blur(cardName);	
	});	
	const errorInfo = container.querySelector(`p[id="cardName-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('Cardholder Name is required.');
});

test("Check card expired date validation is working", async () => {
  LoanDataMock();
	const { container } = render(PaymnetComponent(),{wrapper: MemoryRouter});	
	const expiryDate = container.querySelector(`input[name="expiryDate"]`);
	expect(expiryDate).toBeTruthy();	
	await act(() => {
		fireEvent.change(expiryDate, { target: { value: "" } });		
		fireEvent.blur(expiryDate);	
	});	
	const errorInfo = container.querySelector(`p[id="expiryDate-helper-text"]`);
	expect(errorInfo).toBeTruthy();	
	expect(errorInfo).toHaveTextContent('Expiration Date is required');
});