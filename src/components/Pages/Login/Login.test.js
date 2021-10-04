import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import Login from './Login'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect';
// afterEach(cleanup)


//  test('render the title of an application', () => {
//     render(<Login />);
 
//     const titleEl = screen.getByText(/ Sign In/);
//     expect(titleEl).toBeInTheDocument();
//   });

//   test(' form ', () => {
//     // const { getByText } =
//     const container = render(<Login />);

//     // const div = document.createElement('div');

// //   ReactDom.render(
// //     <BrowserRouter>
// //       <Login />
// //     </BrowserRouter>,  
// //   div);
//   const nameLabel = container.getByText(/ Sign In/);
   
//     expect(nameLabel).toBeInTheDocument();
   
//   });

  test('Checks the title of the page', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Login />
        </Router>
      )
      const titleEl = screen.getByTestId("title");
      expect(titleEl).toBeTruthy();
      
  });



  test('Render email', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Login />
        </Router>
      )
  const inputEl = screen.getByLabelText("Email *");
  expect(inputEl).toBeTruthy();
  expect(inputEl.hasAttribute('name')).toBe(true);

});


test('pass valid email to test email input field', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Login />
        </Router>
      )
 
      const inputEl = screen.getByLabelText("Email *");
      //userEvent.type(inputEl, "test@mail.com");
      fireEvent.change(inputEl, { target: { value: "test@mail.com" } });
      expect(inputEl.value).toBe('test@mail.com');
    expect(screen.getByLabelText("Email *")).toHaveValue("test@mail.com");
    expect(screen.queryByLabelText("error-msg")).not.toBeInTheDocument();
  });
  

  test('Render password', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Login />
        </Router>
      )

      const inputEl = screen.getByLabelText("password *");
      expect(inputEl).toBeTruthy();
      expect(inputEl.hasAttribute('name')).toBe(true);
 
});


test("Render checkbox", () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Login />
        </Router>
      )
   
    const checkbox = screen.getByLabelText('Remember Me');
    expect(checkbox).toBeInTheDocument();

  });

  test("checkbox initially unchecked", () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Login />
        </Router>
      )
    const checkbox = screen.getByLabelText('Remember Me');
    expect(checkbox).not.toBeChecked();
  });


//   test('submit button should be disabled when Name is empty', () => {
//     const { getByLabelText, getByRole } = render(<App />);
//     const input = getByLabelText(/Name:/i);
//     fireEvent.change(input, { 'target': { 'value': '' } });
//     const submitBtn = getByRole('button', { name: 'Submit' });
//     expect(submitBtn).toHaveAttribute('disabled');
//   });


test('button Availability', () => {
    const history = createMemoryHistory()

    render(
        <Router history={history}>
          <Login />
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
            <Login />
          </Router>
        )
    const button =  screen.getByTestId("submit");
    fireEvent.click(button)
   // expect(HandleSubmit).toHaveBeenCalledTimes(1)
    
    })
  
