import '@testing-library/jest-dom';
import { fireEvent, render, within  } from "@testing-library/react";
import React from "react";
import Select from './index.js';

const component = () =>{  
  return (
    <Select
    name="select"
    labelform="Language Known"
    required={ true }
    select='[{"label": "Tamil", "value": "Tamil"},{"label": "Eng", "value": "Eng"}]'
    value = "Tamil"    
  />   
  );
};


test('Select Box Availability', () => {
  const container = render(component());
  const input =  container.getByTestId('selectInput');
  expect(input).toBeTruthy();
});

test('Checks whether all the options are rendered', () => {
  const { getByRole } = render(component());
  fireEvent.mouseDown(getByRole('button'));
  const listbox = within(getByRole('listbox'));
  expect(listbox.getByText(/Tamil/i)).toBeTruthy();
  expect(listbox.getByText(/Eng/i)).toBeTruthy();
});

test('selects the correct option', async () => {
  const container = render(component());
  const input =  container.getByTestId('selectInput');

        expect(input).toBeDefined();
        expect(input).not.toBeNull();
        input.focus();
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
        fireEvent.keyDown(document.activeElement, { key: 'Enter' });
        expect(input.value).toEqual('Tamil');
});

test('should match the snapshot', () => {
  const { asFragment } = render(component);
  expect(asFragment).toMatchSnapshot();
});