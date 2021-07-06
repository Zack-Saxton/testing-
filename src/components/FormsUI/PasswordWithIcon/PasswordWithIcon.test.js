import React from 'react'
import {render, cleanup } from '@testing-library/react'
import PasswordWithIcon from './index.js'

 afterEach(cleanup)


 test("renders icon",()=>{
    const container = render(										
        <PasswordWithIcon
            name="userName"
            label="Enter Username"
            icon="lock"
            iconColor="#595E6E"
            iconPosition="left"
        />);
    const input = container.getByTestId('icon');
    expect(input).toBeTruthy();
    });

    test("renders input field",()=>{
        const container = render(										
            <PasswordWithIcon
            name="userName"
            label="Enter Username"
            icon="lock"
            iconColor="#595E6E"
            iconPosition="left"
        />);
        const input = container.getByTestId('pass');
        expect(input).toBeTruthy();
        });


        test('should match the snapshot', () => {
            const { asFragment } = render(<PasswordWithIcon
                name="userName"
                label="Enter Username"
                icon="lock"
                iconColor="#595E6E"
                iconPosition="left"
            />)
            expect(asFragment).toMatchSnapshot()
           });