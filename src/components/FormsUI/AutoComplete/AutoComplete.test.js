import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import AutoComplete from './index.js'
import '@testing-library/jest-dom';

afterEach(cleanup)

test('Checks Auto complete based on entered value', () => {
  const container = render(
    <AutoComplete
      textfieldlabel="AutoComplete"
      variant="outlined"
      jsonInput='[{"value":"India"}, {"value":"USA"}]'
      placeholder="Choose Country"
      styleAutocomplete='{"width":"300px"}'
      data-test-id="autoComplete"
    />);
  const autocomplete = container.getByRole('textbox')
  expect(autocomplete).toBeTruthy();
  autocomplete.focus()
  fireEvent.change(document.activeElement, { target: { value: 'I' } })
  fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' })
  fireEvent.keyDown(document.activeElement, { key: 'Enter' })
  expect(autocomplete.value).toEqual('India')
});

test('should match the snapshot', () => {
  const { asFragment } = render(<AutoComplete
    textfieldlabel="AutoComplete"
    variant="outlined"
    jsonInput='[{"value":"India"}, {"value":"USA"}]'
    placeholder="Choose Country"
    styleAutocomplete='{"width":"300px"}'
    data-test-id="autoComplete"
  />)
  expect(asFragment).toMatchSnapshot()
});