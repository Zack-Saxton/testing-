import React from 'react'
import {render, cleanup, fireEvent, screen, userEvent } from '@testing-library/react'
import AccountOverview from './AccountOverview'
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
          <AccountOverview />
        </Router>
      )
      const titleEl = screen.getByTestId("title");
      expect(titleEl).toBeTruthy();
      
  });


// expect(getByTestId('background')).toHaveStyle(`background-image: url(${props.image})`)
// const headerPage = mount();
//     expect(headerPage.find('img').prop('src')).toBeTruthy();

// test('Checks the image in the page', () => {
//     const history = createMemoryHistory()

//     render(
//         <Router history={history}>
//           <AccountOverview />
//         </Router>
//       )
//       const displayimage =screen.getByTestId("background");
//           expect(displayimage).toBeTruthy();
      
//   }); 

//   test('Checks the subtitle', () => {
//     const history = createMemoryHistory()

//     render(
//         <Router history={history}>
//           <AccountOverview />
//         </Router>
//       )
//       const displayimage =screen.getByTestId("subtitle");
//           expect(displayimage).toBeTruthy();
      
//   }); 