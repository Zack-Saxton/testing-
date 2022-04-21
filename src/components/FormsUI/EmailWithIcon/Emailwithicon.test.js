import { cleanup, render } from '@testing-library/react';
import React from 'react';
import EmailWithIconWrapper from './index.js';

 afterEach(cleanup);

const component = () => {
  return(
    <EmailWithIconWrapper
    name="userName"
    label="Enter Username"
    icon="lock"
    iconColor="#595E6E"
    iconPosition="left"
    materialProps={ { "data-testid": "test" } }
  />
  )
}

test("renders icon", ()=>{
  const container = render(component());
  const input = container.getByTestId('icon');
  expect(input).toBeTruthy();
})

test("renders icon", ()=>{
  const container = render(component());
  const input = container.getByTestId('test');
  expect(input).toBeTruthy();
})