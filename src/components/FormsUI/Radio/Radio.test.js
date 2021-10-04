import React from "react";
import {cleanup, fireEvent, render} from '@testing-library/react'
import Radio from './index.js';
import {Form, Formik} from 'formik';

afterEach(cleanup)

test("renders Radio Button",()=>{
    const container = render(
        <Formik>
            <Form>
                <Radio
                name="gender"
                labelforform="Gender"
                radiolabel='[{"label":"Male", "value":"male"}, {"label":"Female", "value":"female"}]'
                value="male"
                row={true}
                required={true}
                labelplacement={"end"}
                />
            </Form>
        </Formik>
       
    );

    const val1 = container.getByLabelText('Male');
    expect(val1).toBeTruthy();
    const val2 = container.getByLabelText('Female');
    expect(val2).toBeTruthy();
});


test("Changing Radio value",()=>{
    const container = render(
        <Formik>
            <Form>
                <Radio
                name="gender"
                labelforform="Gender"
                radiolabel='[{"label":"Male", "value":"male"}, {"label":"Female", "value":"female"}]'
                value="male"
                row={true}
                required={true}
                labelplacement={"end"}
                />
            </Form>
        </Formik>
       
    );

    const radio = container.getByLabelText('Male');
    fireEvent.change(radio, { target: { value: "female" } });
    expect(radio.value).toBe('female')
});

test('should match the snapshot', () => {
    const { asFragment } = render(<Formik>
        <Form>
            <Radio
            name="gender"
            labelforform="Gender"
            radiolabel='[{"label":"Male", "value":"male"}, {"label":"Female", "value":"female"}]'
            value="male"
            row={true}
            required={true}
            labelplacement={"end"}
            />
        </Form>
    </Formik>)
    expect(asFragment).toMatchSnapshot()
   });