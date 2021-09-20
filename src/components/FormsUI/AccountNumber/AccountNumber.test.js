import React from 'react'
import {cleanup, fireEvent, render} from '@testing-library/react'
import AccountField from './index.js'

afterEach(cleanup)



 test('Availability test', () => {
 
   const container = render(										
    <AccountField
    type="text"
    name="text"
    label="test"
    materialProps={{"data-test-id": "accountNum"}}
  />); 
 
   const input = container.getByTestId('accountNum');
   expect(input).toBeTruthy();
   expect(input.value).toBe('');
   expect(input.hasAttribute('name')).toBe(true);

 });

 
 test('Input test', () => {
   const container = render(										
    <AccountField
    type="text"
    name="accountNum"
    label="accountNum"
    materialProps={{"data-test-id": "accountNum"}}
  />); 
 
   const input = container.getByTestId('accountNum');
   fireEvent.change(input, { target: { value: "123" } });
   expect(input.value).toBe('123');
 });

 
 test('Get only numeric value', () => {
   const container = render(										
    <AccountField
    type="text"
    name="accountNum"
    label="accountNum"
    materialProps={{"data-test-id": "accountNum", maxLength: 10}}
  />); 
 
   const input = container.getByTestId('accountNum');
   fireEvent.change(input, { target: { value: "abc" } });
   expect(input.value).toBe('');
   fireEvent.change(input, { target: { value: "123" } });
   expect(input.value).toBe('123');
 });

 it('should be between 6 to 17 characters', () => {
  const wrapper = render(<AccountField
    type="text"
    name="accountNum"
    label="accountNum"
    materialProps={{"data-test-id": "accountNum"}}
  />);
  const input = wrapper.getByTestId('accountNum');
  expect(input.maxLength).toBe(17);
  expect(input.minLength).toBe(6);
});

test('should match the snapshot', () => {
  const { asFragment } = render(<AccountField
    type="text"
    name="accountNum"
    label="accountNum"
    materialProps={{"data-test-id": "accountNum"}}
  />)
  expect(asFragment).toMatchSnapshot()
 });