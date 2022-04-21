import { fireEvent, render } from '@testing-library/react';
import { Form, Formik } from 'formik';
import React from "react";
import Radio from './index.js';

const component = () =>{  
    return (
        <Formik>
            <Form>
                <Radio
                    name="gender"
                    labelforform="Gender"
                    radiolabel='[{"label":"Male", "value":"male"}, {"label":"Female", "value":"female"}]'
                    value="male"
                    row={ true }
                    required={ true }
                    labelplacement={ "end" }
                > Gender
                </Radio>
            </Form>
        </Formik>
    );
  };

test('radio Button Availability', () => {
    const container = render(component());
    const input = container.getByText('Gender');
    expect(input).toBeTruthy();
  });

test("renders Radio Button", () => {  
    const container = render(component());
    const val1 = container.getByLabelText('Male');
    expect(val1).toBeTruthy();
    const val2 = container.getByLabelText('Female');
    expect(val2).toBeTruthy();
});

test("Changing Radio Button Value", () => {
    const container = render(component());
    const radio = container.getByLabelText('Male');
    fireEvent.change(radio, { target: { value: "female" } });
    expect(radio.value).toBe('female');
});

test('should match the snapshot', () => {
    const { asFragment } = render(component());
    expect(asFragment).toMatchSnapshot();
});