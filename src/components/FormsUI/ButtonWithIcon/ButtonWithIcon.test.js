import React from 'react'
import {cleanup, render} from '@testing-library/react'
import ButtonWithIcon from './index.js'

afterEach(cleanup)


 test("renders icon",()=>{
    const container = render(										
        <ButtonWithIcon
        icon="close"
        iconposition="left"
        stylebutton='{"background": "", "color":"" }'
        styleicon='{ "color":"" }'
    >
        Cancel
    </ButtonWithIcon>);
    const input = container.getByTestId('icon');
    expect(input).toBeTruthy();
    });

    test('should match the snapshot', () => {
        const { asFragment } = render(<ButtonWithIcon
            icon="close"
            iconposition="left"
            stylebutton='{"background": "", "color":"" }'
            styleicon='{ "color":"" }'
        >
            Cancel
        </ButtonWithIcon>)
        expect(asFragment).toMatchSnapshot()
       });

