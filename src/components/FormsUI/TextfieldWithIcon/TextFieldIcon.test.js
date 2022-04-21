import { cleanup, render, fireEvent } from '@testing-library/react';
import React from 'react';
import TextFieldWithIcon from './index.js';

afterEach(cleanup);
const component = () =>{
    return(<TextFieldWithIcon
        name="userName1"
        label="Enter Username"
        icon="cloud"
        iconColor="#595E6E"
        iconPosition="right"
        materialProps={ { "data-testid": "test" } }
        required={ true }
    />);
}

test("Check the text filed is render", () => {
    const container = render(component());
    const input = container.getByTestId('test');
    expect(input).toBeTruthy();
});

test("Check the text filed is render with Icon", () => {
    const container = render(component());
    const input = container.getByTestId('icon');
    expect(input).toBeTruthy();
});

test("Check can able to enter value", () => {
    const container = render(component());
    const input = container.getByTestId('test');
    fireEvent.change(input, { target: { value: "Mariner" } });
    expect(input.value).toBe('Mariner');
});
  

test('should match the snapshot', () => {
    const { asFragment } = render(component());
    expect(asFragment).toMatchSnapshot();
});