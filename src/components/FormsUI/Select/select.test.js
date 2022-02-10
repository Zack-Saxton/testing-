import '@testing-library/jest-dom';
import { fireEvent, render, within } from "@testing-library/react";
import React from "react";
import Select from './index.js';

test('Render Select Box', () => {
  const { getByTestId } = render(
    <>
      <Select
        name="select"
        labelform="Language Known"
        required={ true }
        select='[{"value":"Tamil"}, {"value":"Eng"}]'
      />
    </>
  );

  const input = getByTestId('selectBox');
  expect(input).toBeTruthy();

});
test('Checks whether all the options are rendered', () => {
  const { getByRole } = render(
    <>
      <Select
        data-test-id="selectBox"
        name="select"
        labelform="Language Known"
        required={ true }
        select='[{"value":"Tamil"}, {"value":"Eng"}]'
      />
    </>
  );
  fireEvent.mouseDown(getByRole('button'));

  const listbox = within(getByRole('listbox'));

  expect(listbox.getByText(/Tamil/i)).toBeTruthy();
  expect(listbox.getByText(/Eng/i)).toBeTruthy();
});

test('selects the correct option', () => {
  const { getByRole, getByTestId } = render(
    <>
      <Select
        data-test-id="selectBox"
        name="select"
        labelform="Language Known"
        required={ true }
        select='[{"value":"Tamil"}, {"value":"Eng"}]'
      />
    </>
  );

  fireEvent.mouseDown(getByRole('button'));

  const listbox = within(getByRole('listbox'));

  fireEvent.click(listbox.getByText(/Tamil/i));

  const input = getByTestId('selectInput');
  expect(input.value).toBe("Tamil");

});

test('should match the snapshot', () => {
  const { asFragment } = render(<Select
    data-test-id="selectBox"
    name="select"
    labelform="Language Known"
    required={ true }
    select='[{"value":"Tamil"}, {"value":"Eng"}]'
  />);
  expect(asFragment).toMatchSnapshot();
});