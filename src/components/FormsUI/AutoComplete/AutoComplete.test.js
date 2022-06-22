import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, act } from '@testing-library/react';
import React from 'react';
import AutoComplete from './index.js';

afterEach(cleanup);

test('Checks Auto complete based on entered value', async() => {
  const container = render(
    <AutoComplete
      textfieldlabel="AutoComplete"
      variant="outlined"
      jsonInput='[{"value":"India"}, {"value":"USA"}]'
      placeholder="Choose Country"
      styleAutocomplete='{"width":"300px"}'
      data-testid="autoComplete"
    />);
  const autocomplete = container.getByRole('combobox');
  expect(autocomplete).toBeTruthy();
  await act(() => {
    autocomplete.focus();
    fireEvent.change(document.activeElement, { target: { value: 'I' } });
    fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
    fireEvent.keyDown(document.activeElement, { key: 'Enter' });
  });
  expect(autocomplete.value).toEqual('India');
});

test('should match the snapshot', () => {
  const { asFragment } = render(<AutoComplete
    textfieldlabel="AutoComplete"
    variant="outlined"
    jsonInput='[{"value":"India"}, {"value":"USA"}]'
    placeholder="Choose Country"
    styleAutocomplete='{"width":"300px"}'
    data-testid="autoComplete"
  />);
  expect(asFragment).toMatchSnapshot();
});