import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import {useStylesAccountOverview} from "./Style";
import {ButtonWithIcon} from "../../FormsUI";

export default function RecentApplications({ userApplicationsData }) {
  const classes = useStylesAccountOverview();
  let userApplications = (userApplicationsData != null) ? userApplicationsData : null;

  return (
    <Grid item xs={12} style={{ width: "100%", paddingBottom: "10px" }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>
                Applied on
              </TableCell>
              <TableCell className={classes.tableHead} align="left">
                Product Type
              </TableCell>
              <TableCell className={classes.tableHead} align="left">
                Requested Amount
              </TableCell>
              <TableCell className={classes.tableHead} align="left">
                Loan Purpose
              </TableCell>
              <TableCell className={classes.tableHead} align="left">
                Status
              </TableCell>
              <TableCell className={classes.tableHead} align="left">
                Resume
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userApplications === null ? (
              <TableRow>
                <TableCell
                  colSpan="7"
                  component="th"
                  className={classes.tableHeadRow}
                  scope="row"
                  align="center"
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) :
              userApplications.length
                ?
                userApplications.map((appData,index) => (
                  <TableRow key={index}>
                    <TableCell className={classes.tableheadrow} >
                      {appData.submissionDate}
                    </TableCell>
                    <TableCell className={classes.tableheadrow} align="left">
                      {appData.product}
                    </TableCell>
                    <TableCell className={classes.tableheadrow} align="left">
                      ${appData.amountRequested}
                    </TableCell>
                    <TableCell className={classes.tableheadrow} align="left">
                      {appData.loanPurpose}
                    </TableCell>
                    <TableCell className={classes.tableheadrow} align="left">
                      {appData.status}
                    </TableCell>
                    <TableCell align="left">
                      {" "}
                      <ButtonWithIcon
                        icon="arrow_forwardIcon"
                        iconposition="left"
                        stylebutton='{"background": "", "color":"" }'
                        styleicon='{ "color":"" }'
                        href="/select-amount"
                      />
                    </TableCell>
                  </TableRow>
                ))
                :
                <TableRow>
                  <TableCell
                    colSpan="7"
                    align="center"
                  >
                    You do not have any recent applications
                  </TableCell>
                </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
