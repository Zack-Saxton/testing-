import React from 'react'
import {cleanup, render} from '@testing-library/react'
import TextFieldWithIcon from './index.js'

afterEach(cleanup)


 test("renders icon",()=>{
    const container = render(										
        <TextFieldWithIcon
        name="userName1"
        label="Enter Username"
        icon="cloud"
        iconColor="#595E6E"
        iconPosition="right"
        required={true}
    />);
    const input = container.getByTestId('icon');
    expect(input).toBeTruthy();
    });

    test("renders input field",()=>{
        const container = render(										
            <TextFieldWithIcon
            name="userName1"
            label="Enter Username"
            icon="cloud"
            iconColor="#595E6E"
            iconPosition="right"
            required={true}
            materialProps={{"data-test-id": "test"}}
        />);
        const input = container.getByTestId('test');
        expect(input).toBeTruthy();
        });


        test('should match the snapshot', () => {
            const { asFragment } = render(<TextFieldWithIcon
                name="userName1"
                label="Enter Username"
                icon="cloud"
                iconColor="#595E6E"
                iconPosition="right"
                required={true}
                materialProps={{"data-test-id": "test"}}
            />)
            
            expect(asFragment(<TextFieldWithIcon
                name="userName1"
                label="Enter Username"
                icon="cloud"
                iconColor="#595E6E"
                iconPosition="right"
                required={true}
                materialProps={{"data-test-id": "test"}}
            />)).toMatchSnapshot()
           });