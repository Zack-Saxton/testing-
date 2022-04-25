import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { Form, Formik } from 'formik';
import React from "react";
import Checkbox from './index';


const component = () => {
    return (
        <Formik>
            <Form>
                <Checkbox
                    inputProps={{ "data-testid": "checkbox" }}
                    name="termsOfService"
                    labelform="Checkbox"
                    value="checked"
                    stylelabelform='{ "color":"" }'
                    stylecheckbox='{ "color":"blue" }'
                    stylecheckboxlabel='{ "color":"" }'
                    type="checkbox"
                >
                    Checkbox
                </Checkbox>
            </Form>
        </Formik>
    );
};


test("checkbox Availability", () => {
    const { getByTestId } = render(component());
    const checkbox = getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();

});

test("initially unchecked", () => {
    const { getByTestId } = render(component());
    const checkbox = getByTestId('checkbox');
    expect(checkbox).not.toBeChecked();
});

test("Checkbox Checked", () => {
    const { getByTestId } = render(component());
    const checkbox = getByTestId('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
});

test('should match the snapshot', () => {
    const { asFragment } = render(component());
    expect(asFragment).toMatchSnapshot();
});
