import { cleanup, render } from '@testing-library/react';
import React from 'react';
import ButtonWithIcon from './index.js';

afterEach(cleanup);
let component = () => {
    return (<ButtonWithIcon
        icon="close"
        iconposition="left"
        stylebutton='{"background": "", "color":"" }'
        styleicon='{ "color":"" }'
    >
        Cancel
    </ButtonWithIcon>);
}
test("renders icon", () => {
    const container = render(component());
    const input = container.getByTestId('icon');
    expect(input).toBeTruthy();
});

test('should match the snapshot', () => {
    const { asFragment } = render(component());
    expect(asFragment).toMatchSnapshot();
});
