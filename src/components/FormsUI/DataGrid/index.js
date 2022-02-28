/*#################################################################################################################

File Name           :    Zipcode/index.js
Component Name      :    Zipcode
Functionality       :    To use this component to validate and get the Zip code in the correct format from the user.

#################################################################################################################*/
import { DataGrid } from "@material-ui/data-grid";
import * as React from "react";
import PropTypes from "prop-types";


const DataGridWrapper = ({ name, rows, columns, height, width, ...otherProps }) => {
  return (
    <div style={ { height: height ?? "300", width: width ?? "100%" } }>
      <DataGrid rows={ rows } columns={ columns } pageSize={ 15 } { ...otherProps } />
    </div>
  );
};

DataGridWrapper.propTypes = {
  name: PropTypes.string,
  rows: PropTypes.array,
  columns: PropTypes.array,
  height: PropTypes.string,
  width: PropTypes.string
};

export default DataGridWrapper;
