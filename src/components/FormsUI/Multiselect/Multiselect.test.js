import '@testing-library/jest-dom';
import { fireEvent, render, within } from "@testing-library/react";
import React from "react";
import MultiSelect from './index.js';

test('Render Select Box', () => {
  const { getByTestId } = render(
    <>
      <MultiSelect
        name="multiselect"
        labelform="Language Known"
        multiselect='[{"value":"Tamil"}, {"value":"Eng"}]'
        checkboxcolor="red"
      />
    </>
  );


  const input = getByTestId('multiSelectInput');
  expect(input).toBeTruthy();


});
test('Checks whether all the options are rendered', () => {
  const { getByRole } = render(
    <>
      <MultiSelect
        name="multiselect"
        labelform="Language Known"
        multiselect='[{"value":"Tamil"}, {"value":"Eng"}]'
        checkboxcolor="red"
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
      <MultiSelect
        name="multiselect"
        labelform="Language Known"
        multiselect='[{"value":"Tamil"}, {"value":"Eng"}]'
        checkboxcolor="red"
      />
    </>
  );



  fireEvent.mouseDown(getByRole('button'));

  const listbox = within(getByRole('listbox'));

  fireEvent.click(listbox.getByText(/Tamil/i));
  fireEvent.click(listbox.getByText(/Eng/i));

  const input = getByTestId('multiSelectInput');
  expect(input.value).toBe("Tamil,Eng");


});

test('should match the snapshot', () => {
  const { asFragment } = render(<MultiSelect
    name="multiselect"
    labelform="Language Known"
    multiselect='[{"value":"Tamil"}, {"value":"Eng"}]'
    checkboxcolor="red"
  />);
  expect(asFragment).toMatchSnapshot();
});