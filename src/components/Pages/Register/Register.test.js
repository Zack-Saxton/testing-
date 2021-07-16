import React from 'react'
import {render, cleanup, fireEvent, screen, userEvent } from '@testing-library/react'
import Register from './Register'
import ReactDom from 'react-dom';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { format } from "date-fns";



  test('Checks the title of the page', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Register />
        </Router>
      )
      const titleEl = screen.getByTestId("title");
      expect(titleEl).toBeTruthy();
      
  });

  
  test('Checks the subtitle of the page', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Register />
        </Router>
      )
      const titleEl = screen.getByTestId("subtitle");
      expect(titleEl).toBeTruthy();
      
  });

  test('Textbox Firstname', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Register />
        </Router>
      )
    const input = screen.getByLabelText("Firstname");
    expect(input).toBeTruthy();
    expect(input.hasAttribute('name')).toBe(true);
  });

  test('Invalid Firstname', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Register />
        </Router>
      )
    const input = screen.getByLabelText("Firstname");
    fireEvent.change(input, { target: { value: "123" } }); 
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.change(input, { target: { value: "test123" } });
   
    expect(screen.getByLabelText("Firstname")).not.toBe(true);
  });


  test('Textbox Lastname', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Register />
        </Router>
      )
    const input = screen.getByLabelText("Lastname");
    expect(input).toBeTruthy();
    expect(input.hasAttribute('name')).toBe(true);
  });

  test('Invalid Lastname', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Register />
        </Router>
      )
    const input = screen.getByLabelText("Lastname");
    fireEvent.change(input, { target: { value: "123" } }); 
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.change(input, { target: { value: "test123" } });
   
    expect(screen.getByLabelText("Lastname")).not.toBe(true);
  });



  test('Render email', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Register />
        </Router>
      )
  const inputEl = screen.getByLabelText("Email");
  expect(inputEl).toBeTruthy();
  expect(inputEl.hasAttribute('name')).toBe(true);

});


test('pass valid email to test email input field', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Register />
        </Router>
      )
 
      const inputEl = screen.getByLabelText("Email");
      fireEvent.change(inputEl, { target: { value: "test@mail.com" } });
      expect(inputEl.value).toBe('test@mail.com');
      
    expect(screen.getByLabelText("Email")).toHaveValue("test@mail.com");
    expect(screen.queryByLabelText("error-msg")).not.toBeInTheDocument();
  });


  test('pass invalid email to test input value', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Register />
        </Router>
      )
 
    const inputEl = screen.getByLabelText("Email");
    fireEvent.change(inputEl, { target: { value: "test" } }); 
    fireEvent.change(inputEl, { target: { value: "test@" } });
    fireEvent.change(inputEl, { target: { value: "test@gmail" } });
    fireEvent.change(inputEl, { target: { value: "123" } });
    fireEvent.change(inputEl, { target: { value: "@test" } });
    expect(screen.getByLabelText("Email")).not.toBe(true);

   
  });


//   test('Render SSN Field', () => {
//     const history = createMemoryHistory()

//     render(
//         <Router history={history}>
//           <Register />
//         </Router>
//       )
  
//     const input = screen.getByTestId('ssn');
//     expect(input).toBeTruthy();
//     expect(input.value).toBe('');
 
//   });
 
//   test('SSN Change input and check the value', () => {
//     const history = createMemoryHistory()

//     render(
//         <Router history={history}>
//           <Register />
//         </Router>
//       )
  
//     const input = screen.getByTestId('ssn');
 
//    fireEvent.change(input, { target: { value: "123456780" } });
//    expect(input).toHaveAttribute('unmaskedval', '123456780');
//  });
 
//  test('SSN Accept only 9 digits as social security Number', () => {
//     const history = createMemoryHistory()

//     render(
//         <Router history={history}>
//           <Register />
//         </Router>
//       )
  
//     const input = screen.getByTestId('ssn');
 
//    fireEvent.change(input, { target: { value: "1234567800124334234232" } });
//    expect(input).toHaveAttribute('unmaskedval', '123456780');
//  });

  test('Zipcode availability test', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Register />
        </Router>
      )
    const input = screen.getByLabelText("Zipcode");
    expect(input).toBeTruthy();
    expect(input.value).toBe('');
    expect(input.hasAttribute('name')).toBe(true);
 
  });
 
  
  test('Zipcode Input test', () => {
    
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Register />
        </Router>
      )
    const input =  screen.getByLabelText("Zipcode");
    fireEvent.change(input, { target: { value: "123" } });
    expect(input.value).toBe('123');
  });
 
  
  test('Get only numeric value for zipcode', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Register />
        </Router>
      )
    const input =  screen.getByLabelText("Zipcode");
    fireEvent.change(input, { target: { value: "abc" } });
    expect(input.value).toBe('');
    fireEvent.change(input, { target: { value: "123" } });
    expect(input.value).toBe('123');
  });
 
  it('zipcode should be 5 digits', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Register />
        </Router>
      )
    const input =  screen.getByLabelText("Zipcode");
   expect(input.maxLength).toBe(5);
 });

 test('Render Date of birth', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Register />
        </Router>
      )
  
    const input = screen.getByTestId('datePicker');
  
    
    expect(input).toBeTruthy();
    // var myDate = new Date();
    // myDate.setDate(myDate.getDate() - 6570);
    // var formattedDate = format(myDate, "dd-MM-yyyy");
    // expect(input.value).toBe(formattedDate );
    //expect(input.hasAttribute('name')).toBe(true);
  });
 
 

  
  test('Render password', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Register />
        </Router>
      )

      const inputEl = screen.getByLabelText("Confirm Password");
      expect(inputEl).toBeTruthy();
      expect(inputEl.hasAttribute('name')).toBe(true);
      fireEvent.change(inputEl, { target: { value: "Test@123" } });
      expect(inputEl.value).toBe("Test@123");
 
});

// test('Invalid Password', () => {
//   const history = createMemoryHistory()

//   render(
//       <Router history={history}>
//         <Register />
//       </Router>
//     )
//   const input = screen.getByLabelText("Confirm Password");
//   fireEvent.change(input, { target: { value: "123@" } }); 
//   fireEvent.change(input, { target: { value: "Test@" } });
//   fireEvent.change(input, { target: { value: "test123" } });
//   fireEvent.change(input, { target: { value: "123test" } });
//   fireEvent.change(input, { target: { value: "test@123" } });
//   fireEvent.change(input, { target: { value: "Test" } });
//   fireEvent.change(input, { target: { value: "Test" } });
//   expect(input).getAttribute("aria-invalid").toBe(true)
// });


test('Render confirm  password', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Register />
        </Router>
      )

      const inputEl = screen.getByLabelText("Re-enter your Password");
      expect(inputEl).toBeTruthy();
      expect(inputEl.hasAttribute('name')).toBe(true);
 
});

test('button Availability', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
         <Register />
        </Router>
      )
  const button = screen.getByTestId("submit");
 
  expect(button).toBeTruthy();
  })
  
  
  test('Button Onclick', () => {
      //const handleClick = jest.fn();
    
      const history = createMemoryHistory()

      render(
          <Router history={history}>
            <Register />
          </Router>
        )
    const button =  screen.getByTestId("submit");
    fireEvent.click(button)
   // expect(handleSubmit).toHaveBeenCalledTimes(1)
    
    })

    // test('submit button should be disabled when Name is empty', () => {
    //   const { getByLabelText, getByRole, debug } = render(<App />);
    //   const input = getByLabelText(/Name:/i);
    //   fireEvent.change(input, { 'target': { 'value': '' } });
    //   const submitBtn = getByRole('button', { name: 'Submit' });
    //   expect(submitBtn).toHaveAttribute('disabled');
    //   debug(submitBtn);
    //   fireEvent.change(input, { 'target': { 'value': 'submit' } });
    //   debug(submitBtn);
    //   expect(submitBtn).not.toHaveAttribute('disabled');
    // });