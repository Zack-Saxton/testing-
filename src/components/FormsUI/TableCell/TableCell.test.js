import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import TableCellWrapper from "./index";
//Test Data
const parData = [
  {
    date: {
      value: "12/04/2022",
      align: "left",
      className: ""
    },
    description: {
      value: "Transaction details",
      align: "left",
      className: ""
    },
    principal: {
      value: 200,
      align: "right",
      className: ""
    },
    interest: {
      value: 20,
      align: "right",
      className: ""
    },
    other: {
      value: 10,
      align: "right",
      className: ""
    },
    totalAmount: {
      value: 150,
      align: "right",
      className: ""
    },
    balance: {
      value: 100,
      align: "right",
      className: ""
    },
  },
  {
    date: {
      value: "12/04/2022",
      align: "left",
      className: ""
    },
    description: {
      value: "Transaction details",
      align: "left",
      className: ""
    },
    principal: {
      value: 200,
      align: "right",
      className: ""
    },
    interest: {
      value: 20,
      align: "right",
      className: ""
    },
    other: {
      value: 10,
      align: "right",
      className: ""
    },
    totalAmount: {
      value: 150,
      align: "right",
      className: ""
    },
    balance: {
      value: 100,
      align: "right",
      className: ""
    },
  }
]

const component = () => {
  return (
    <table>
      <TableCellWrapper parseData={parData} />
    </table>
  );
}
test("Check the TableCell is available", () => {
  render(component());
  const element = screen.getByTestId('test-table-body');
  expect(element).toBeTruthy();
});

test("Check number of rows rendered", () => {
  render(component());
  expect(screen.getAllByRole('row')).toHaveLength(2);
});

test('should match the snapshot', () => {
  const { asFragment } = render(component());
  expect(asFragment).toMatchSnapshot();
});
