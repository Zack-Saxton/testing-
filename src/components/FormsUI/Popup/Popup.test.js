import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import Popup from './index'
import '@testing-library/jest-dom'


const closePopup = jest.fn();
const component = () => {
  return (
    <Popup
      onClose={closePopup}
      aria-labelledby="customized-dialog-title"
      data-testid="popup"
      popupFlag={true}
      id="customeDialogBox"
      >
    </Popup>
  )
}

test("Popup availability test", ()=>{
  let container = render(component());
  const element = container.getByTestId("popup");
  expect(element).toBeTruthy();
})

test("Popup has Close Icon test", ()=>{
  let container = render(component());
  const element = container.getByTestId("closeIcon");
  expect(element).toBeTruthy();
})

test("Popup has OK button test", ()=>{
  let container = render(component());
  const element = container.getByTestId("modalButton");
  expect(element).toBeTruthy();
})

test("Popup Close Icon functionality test",async()=>{
  let container = render(component());
  const element = container.getByTestId("closeIcon");
  fireEvent.click(element);
  await waitFor(() => expect(element.getAttribute("aria-hidden")).toBe("true"))
})

test("Popup OK button functionality test",async()=>{
  let container = render(component());
  const element = container.getByTestId("modalButton");
  fireEvent.click(element);
  await waitFor(() => expect(element.getAttribute("aria-hidden")).not.toBe("true"))
})

test("Popup Content presence test", ()=>{
  let container = render(component());
  const element = container.getByTestId("content");
  expect(element).toBeTruthy();
})




