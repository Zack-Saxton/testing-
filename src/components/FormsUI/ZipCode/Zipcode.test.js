import { cleanup, fireEvent, render,act } from '@testing-library/react';
import React from 'react';
import Zipcode from './index.js';

afterEach(cleanup);
const component = () => {
  return (<Zipcode
    type="text"
    name="zip"
    label="test"
    materialProps={{ "data-testid": "zipcode" }}
  />);
}
test('Check the input filed is rendered', () => {
  const container = render(component());
  const input = container.getByTestId('zipcode');
  expect(input).toBeTruthy();
  expect(input.value).toBe('');
  expect(input.hasAttribute('name')).toBe(true);

});

test('Check can able to enter value', () => {
  const container = render(component());

  const input = container.getByTestId('zipcode');
  fireEvent.change(input, { target: { value: "123" } });
  expect(input.value).toBe('123');
});

test('Check input field is allowing only numeric value ', async () => {
  const { container } = render(component());
	const input = container.querySelector(`input[name="zip"]`);
	await act(() => {
		fireEvent.change(input, { target: { value: "abc" } });
	});	
	expect(input.value).not.toBe(true);
	await act(() => {
		fireEvent.change(input, { target: { value: "12345" } });
	});	
	expect(input.value).toBe("12345");
});


it('Check the max length of input, it should be 5 digits', () => {
  const wrapper = render(component());
  const input = wrapper.getByTestId('zipcode');
  expect(input.maxLength).toBe(5);
});

test('Should match the snapshot', () => {
  const { asFragment } = render(component());
  expect(asFragment).toMatchSnapshot();
});