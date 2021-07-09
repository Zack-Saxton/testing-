import React from 'react';
import {render, cleanup, fireEvent } from '@testing-library/react';
import Zipcode from './index.js';

 afterEach(cleanup)



 test('Availability test', () => {
   const container = render(										
    <Zipcode
    type="text"
    name="text"
    label="test"
    materialProps={{"data-testid": "test"}}
  />); 
 
   const input = container.getByTestId('test');
   expect(input).toBeTruthy();
   expect(input.value).toBe('');
   expect(input.hasAttribute('name')).toBe(true);

 });

 
 test('Input test', () => {
   const container = render(										
    <Zipcode
    type="text"
    name="text"
    label="test"
    materialProps={{"data-testid": "test"}}
  />); 
 
   const input = container.getByTestId('test');
   fireEvent.change(input, { target: { value: "123" } });
   expect(input.value).toBe('123');
 });

 
 test('Get only numeric value', () => {
   const container = render(										
    <Zipcode
    type="text"
    name="text"
    label="test"
    materialProps={{"data-testid": "test", maxLength: 10}}
  />); 
 
   const input = container.getByTestId('test');
   fireEvent.change(input, { target: { value: "abc" } });
   expect(input.value).toBe('');
   fireEvent.change(input, { target: { value: "123" } });
   expect(input.value).toBe('123');
 });

 it('should be 5 digits', () => {
  const wrapper = render(<Zipcode
    type="text"
    name="text"
    label="test"
    materialProps={{"data-testid": "test"}}
  />);
  const input = wrapper.getByTestId('test');
  expect(input.maxLength).toBe(5);
});

test('should match the snapshot', () => {
  const { asFragment } = render()
  
  expect(asFragment(<Zipcode
    type="text"
    name="text"
    label="test"
    materialProps={{"data-testid": "test"}}
  />)).toMatchSnapshot()
 });