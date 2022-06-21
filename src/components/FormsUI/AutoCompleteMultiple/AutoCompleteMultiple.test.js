import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, act } from '@testing-library/react';
import { Form, Formik } from "formik";
import React from 'react';
import AutoCompleteMultipleWrapper from './index.js';

afterEach(cleanup);

test('Checks Auto complete based on entered value', async () => {
  const container = render(
    <Formik
      className="form"
    >
      <Form className="form">
        <AutoCompleteMultipleWrapper
          name="autoCompleteMultiple"
          label="AutoComplete"
          variant="outlined"
          jsonInput='[{"value":"India"}, {"value":"USA"}, {"value":"Indonesia"}, {"value":"Italy"}]'
          placeholder="Choose Country"
          stylecheckbox='{ "color":""}'
          data-test-id="autoComplete"
        />
      </Form>
    </Formik>);
  const autocomplete = container.getByRole('combobox');
  expect(autocomplete).toBeTruthy();
  autocomplete.focus();
  await act(() => {
    fireEvent.change(document.activeElement, { target: { value: 'I' } });
    fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
    fireEvent.keyDown(document.activeElement, { key: 'Enter' });
  });
  // expect(autocomplete.value).toEqual('India');
  expect(container.getAllByText('India')[ 0 ]).toBeInTheDocument();
});

test('should match the snapshot', () => {
  const { asFragment } = render(<Formik className="form" >
    <Form className="form">
      <AutoCompleteMultipleWrapper
        name="autoCompleteMultiple"
        label="AutoComplete"
        variant="outlined"
        jsonInput='[{"value":"India"}, {"value":"USA"}, {"value":"Indonesia"}, {"value":"Italy"}]'
        placeholder="Choose Country"
        stylecheckbox='{ "color":""}'
        data-test-id="autoComplete"
      />
    </Form>
  </Formik>);
  expect(asFragment).toMatchSnapshot();
});