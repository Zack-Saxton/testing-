import { cleanup, render } from '@testing-library/react';
import React from 'react';
import PasswordWithIcon from './index.js';

 afterEach(cleanup);

const component = () => {
  return(
    <PasswordWithIcon
    name="userName"
    label="Enter Username"
    icon="lock"
    iconColor="#595E6E"
    iconPosition="left"
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
  const input = container.getByTestId('passProps');
  expect(input).toBeTruthy();
})
