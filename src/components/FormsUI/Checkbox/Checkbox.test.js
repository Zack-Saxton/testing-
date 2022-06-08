import '@testing-library/jest-dom';
import { fireEvent, render,screen } from '@testing-library/react';
import { Form, Formik } from 'formik';
import React from "react";
import Checkbox from './index';


const component = () => {
    return (
        <Formik>
            <Form>
                <Checkbox
                    data-testid = "checkbox"
                    name="termsOfService"
                    labelform="Checkbox"
                    value="checked"
                    stylelabelform='{ "color":"" }'
                    stylecheckbox='{ "color":"blue" }'
                    stylecheckboxlabel='{ "color":"" }'
                    type="checkbox"
                    id = "checkbox"
                >
                    Checkbox
                </Checkbox> 
            </Form>
        </Formik>
    );
};

test("Render checkbox", () => {
    render(component());
    const input = screen.getByTestId("checkbox");
    expect(input).toBeTruthy();
  });

test("initially unchecked", () => {
    const { getByTestId } = render(component());
    const checkbox = getByTestId('checkbox');
    expect(checkbox).not.toBeChecked();
});

test("test checkbox is able to checked", () => {
    const { container } = render(component());
    const element = container.querySelector(`input[id="checkbox"]`);
    fireEvent.click(element);
    expect(element).toBeChecked();
});

test('should match the snapshot', () => {
    const { asFragment } = render(component());
    expect(asFragment).toMatchSnapshot();
});
