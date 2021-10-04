import React from 'react'
import {cleanup, render} from '@testing-library/react'
import TextArea from './index.js'

afterEach(cleanup)

 test('TextField availability', () => {
   const container = render(										
                  <TextArea
										placeholder="Enter here..."
										row="4"
										label="TextArea"
										variant="outlined"
										required={true}
										character_limit="20"
										name="TextArea"
										value="TextArea"
									/>);
 
   const input = container.getByTestId('textarea');
   expect(input).toBeTruthy();
   expect(input.value).toBe('');
   expect(input.hasAttribute('name')).toBe(true);
 });

 test('Initially empty', () => {
    const container = render(										
      <TextArea
      placeholder="Enter here..."
      row="4"
      label="TextArea"
      variant="outlined"
      required={true}
      character_limit="20"
      name="TextArea"
      value="TextArea"
    />);
  
    const input = container.getByTestId('textarea');
    expect(input.value).toBe('');
  });

  test('should match the snapshot', () => {
    const { asFragment } = render(<TextArea
      placeholder="Enter here..."
      row="4"
      label="TextArea"
      variant="outlined"
      required={true}
      character_limit="20"
      name="TextArea"
      value="TextArea"
    />)
    
    expect(asFragment).toMatchSnapshot()
   });