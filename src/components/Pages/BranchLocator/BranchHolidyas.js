import React  from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";

const BranchHolidays = (props) => {
    return (
  <Grid className="holidayList">
    <Grid container className="workingSaturdays">
      <Grid item sm={12} md={4}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Heading</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Content</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Content</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Content</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Content</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Content</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item sm={12} md={8}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Heading 1</TableCell>
                <TableCell>Heading 2</TableCell>
                <TableCell>Heading 3</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Content 1</TableCell>
                <TableCell>Content 2</TableCell>
                <TableCell>Content 3</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Content 1</TableCell>
                <TableCell>Content 2</TableCell>
                <TableCell>Content 3</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Content 1</TableCell>
                <TableCell>Content 2</TableCell>
                <TableCell>Content 3</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Content 1</TableCell>
                <TableCell>Content 2</TableCell>
                <TableCell>Content 3</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Content 1</TableCell>
                <TableCell>Content 2</TableCell>
                <TableCell>Content 3</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Content 1</TableCell>
                <TableCell>Content 2</TableCell>
                <TableCell>Content 3</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Content 1</TableCell>
                <TableCell>Content 2</TableCell>
                <TableCell>Content 3</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Content 1</TableCell>
                <TableCell>Content 2</TableCell>
                <TableCell>Content 3</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Content 1</TableCell>
                <TableCell>Content 2</TableCell>
                <TableCell>Content 3</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Content 1</TableCell>
                <TableCell>Content 2</TableCell>
                <TableCell>Content 3</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  </Grid>
    );
};

export default BranchHolidays;
