import { render, } from '@testing-library/react';
import Checkbox from './index';
import '@testing-library/jest-dom';
import { Formik, Form } from 'formik';

test("Render checkbox", () => {
    const { getByTestId } = render(<Formik><Form><Checkbox
        data-testid="checkbox"
        name="termsOfService"
        labelform="Terms & Service"
        value={false}
        label="I agree"
        required={true}
        stylelabelform='{ "color":"" }'
        stylecheckbox='{ "color":"blue" }'
        stylecheckboxlabel='{ "color":"" }'
    /></Form></Formik>);
    const checkbox = getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();

  });

  test("initially unchecked", () => {
    const { getByTestId } = render(<Formik><Form><Checkbox
        data-testid="checkbox"
        name="termsOfService"
        labelform="Terms & Service"
        value={false}
        label="I agree"
        required={true}
        stylelabelform='{ "color":"" }'
        stylecheckbox='{ "color":"blue" }'
        stylecheckboxlabel='{ "color":"" }'
    /></Form></Formik>);
    const checkbox = getByTestId('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('should match the snapshot', () => {
    const { asFragment } = render(<Formik><Form><Checkbox
      data-testid="checkbox"
      name="termsOfService"
      labelform="Terms & Service"
      value={false}
      label="I agree"
      required={true}
      stylelabelform='{ "color":"" }'
      stylecheckbox='{ "color":"blue" }'
      stylecheckboxlabel='{ "color":"" }'
  /></Form></Formik>)
    expect(asFragment).toMatchSnapshot()
   }); 