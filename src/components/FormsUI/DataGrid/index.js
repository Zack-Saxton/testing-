/*#################################################################################################################

File Name           :    Zipcode/index.js
Component Name      :    Zipcode
Functionality       :    To use this component to validate and get the Zip code in the correct format from the user.

#################################################################################################################*/
import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

const DataGrdiWrapper = ({
  name,
  rows,
  columns,
  height,
  width,
  ...otherProps
}) => {
  return (
    <div
      style={{ height: height ? height : "300", width: width ? width : "100%" }}
    >
      <DataGrid rows={rows} columns={columns} pageSize={15} {...otherProps} />
    </div>
  );
};

export default DataGrdiWrapper;
