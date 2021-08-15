import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { ButtonWithIcon, Radio, Checkbox } from "../../FormsUI";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { NavLink } from "react-router-dom";
import "./applyloan.css"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

function TabVerticalPanel(props) {
  const { children, value, verticalindex, ...other } = props;

  return (
    <div
      //role="tabpanel"
      hidden={value !== verticalindex}
      id={`scrollable-auto-tabpanel-${verticalindex}`}
      aria-labelledby={`scrollable-auto-tab-${verticalindex}`}
      {...other}
    >
      {value === verticalindex && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabVerticalPanel.propTypes = {
  children: PropTypes.node,
  verticalindex: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function tabVerticalProps(verticalindex) {
  return {
    id: `scrollable-auto-tab-vertical-${verticalindex}`,
    "aria-controls": `scrollable-auto-tabpanel-${verticalindex}`,
  };
}

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,
  },
  paperverticaltab:{    
    paddingTop:"20px",
    paddingBottom: "20px",
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,
  },
  heading: {
    color: "white",
    fontWeight: "normal",
  },
  tablabel: {
    background: "white",
    margin: "10px",
    fontFamily: " system-ui",
    color: "#3f51b5",
    textTransform: "none",
    fontWeight: "700",
  },
  tabverticallabel: {
    fontFamily: " system-ui",
    color: "#3f51b5",
    textTransform: "none",
    fontWeight: "700",
    textAlign: "start",
  },
  
  table: {
    minWidth: 650,
  },
  indicator: {
    left: "0px",
    background: "unset"
   
  },
}));

function createData(
  select,
  loanamount,
  availability,
  apr,
  monthlypayment,
  compare
) {
  return {
    select,
    loanamount,
    availability,
    apr,
    monthlypayment,
    compare,
  };
}

const rows48term = [
  createData("", "$10,000", "In Branch", "23.99%", "$325.96", ""),
  createData("", "$9,500", "In Branch", "23.99%", "$315.96", ""),
  createData("", "$9,000", "In Branch", "23.99%", "$305.96", ""),
  createData("", "$8,500", "Online", "23.99%", "$285.96", ""),
  createData("", "$8,000", "Online", "23.99%", "$275.96", ""),
  createData("", "$7,000", "Online", "23.99%", "$265.96", ""),
];

const rows36term = [
  createData("", "$10,000", "In Branch", "23.99%", "$309.96", ""),
  createData("", "$9,000", "In Branch", "23.99%", "$298.96", ""),
];

const rows24term = [
  createData("", "$10,000", "In Branch", "18.99%", "$303.96", ""),
  createData("", "$9,000", "In Branch", "18.99%", "$289.96", ""),
];

const rows12term = [
  createData("", "$10,000", "In Branch", "18.99%", "$300.96", ""),
  createData("", "$9,000", "In Branch", "18.99%", "$281.96", ""),
];

const rowschart = [
  createData("", "$10,000", "In Branch", "23.99%", "$325.96", "12 mo"),
  createData("", "$9,000", "In Branch", "23.99%", "$309.96", "48 mo"),
];

export default function ApplyLoan() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [values, setValues] = React.useState(0);
  const handleTabChange = (event, newValues) => {
    setValues(newValues);
  };
  
  return (
    <div>
      <Grid container justify={"center"} style={{ marginTop: "-150px" }}>
        <Grid item xs={10} fullWidth={true} direction="row">
          <Typography>
            <h3 className={classes.heading} data-testid="title">
              Apply for a loan
            </h3>
          </Typography>
        </Grid>

        <Grid item xs={10}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab
              label="1. Select Offer"
              className={classes.tablabel}
              {...a11yProps(0)}
            />
            <Tab
              label="2. Review & Sign"
              disabled={true}
              className={classes.tablabel}
            />
            <Tab
              label="3. Final Verification"
              disabled={true}
              className={classes.tablabel}
            />
            <Tab
              label="4. Receive your money"
              disabled={true}
              className={classes.tablabel}
            />
          </Tabs>

          <TabPanel value={value} index={0}>
            <Grid container xs={12}>
              <Grid
                item
                xs={12}
                sm={3}
                fullWidth={true}
                direction="row"
                style={{ padding: "5px" }}
              >
                <Paper className={classes.paperverticaltab}>
                  <Tabs
                    value={values}
                    onChange={handleTabChange}
                    classes={{
                      indicator: classes.indicator,
                    }}
                    textColor="primary"
                    scrollButtons="auto"
                    orientation="vertical"
                    variant="scrollable"
                    aria-label="scrollable auto tabs example"
                    className={classes.tabsvertical}
                  >
                    <Tab
                      label={
                        <span style={{ float: "left", width: "100%" }}>
                          48 Month term
                        </span>
                      }
                      className={classes.tabverticallabel}
                      {...tabVerticalProps(0)}
                     
                    />

                    <Tab
                      label={
                        <span style={{ float: "left", width: "100%" }}>
                          36 Month term
                        </span>
                      }
                     
                      className={classes.tabverticallabel }
                      {...tabVerticalProps(1)}
                    />

                    <Tab
                      id="tabvertica"
                      label={
                        <span style={{ float: "left", width: "100%" }}>
                          24 Month term
                        </span>
                      }
                      className={classes.tabverticallabel}
                      {...tabVerticalProps(2)}
                    />
                    <Tab
                      label={
                        <span style={{ float: "left", width: "100%" }}>
                          12 Month term
                        </span>
                      }
                      className={classes.tabverticallabel}
                      {...tabVerticalProps(3)}
                    />
                    <Tab
                      label={
                        <span style={{ float: "left", width: "100%" }}>
                          Comparison Chart
                        </span>
                      }
                      className={classes.tabverticallabel}
                      {...tabVerticalProps(4)}
                    />
                  </Tabs>
                </Paper>
              </Grid>

              <Grid
                item
                xs={12}
                sm={9}
                fullWidth={true}
                direction="row"
                style={{ padding: "5px" }}
              >
                <Paper className={classes.paper}>
                  <TabVerticalPanel value={values} verticalindex={0}>
                    <Grid
                      item
                      xs={12}
                      fullWidth={true}
                      direction="row"
                      style={{ paddingBottom: "10px" }}
                    >
                      <TableContainer>
                        <Table
                          className={classes.table}
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell style={{ fontWeight: "600" }}>
                                Select
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                Loan Amount
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                Availability
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                APR
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                Monthly Payment
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                Compare
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows48term.map((row) => (
                              <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                  <Radio
                                    name="select"
                                    radiolabel='[{ "value":"select"}]'
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  {row.loanamount}
                                </TableCell>
                                <TableCell align="center">
                                  {row.availability}
                                </TableCell>
                                <TableCell align="center">{row.apr}</TableCell>
                                <TableCell align="center">
                                  {row.monthlypayment}
                                </TableCell>
                                <TableCell align="center">
                                  <Checkbox
                                    name="rememberme"
                                    label="Add"
                                    labelid="rememberme"
                                    testid="checkbox"
                                    stylelabelform='{ "color":"" }'
                                    stylecheckbox='{ "color":"" }'
                                    stylecheckboxlabel='{ "color":"" }'
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid container  direction="row">
                      <Grid
                        item 
                        xs={10}
                        sm={1}
                        direction="row"
                        style={{ paddingTop: "10px" }}
                      >
                        <ButtonWithIcon
                          stylebutton='{"margin-right": "" }'
                          styleicon='{ "color":"" }'
                          id="applyloan-resetbutton"
                        >
                          Reset
                        </ButtonWithIcon>
                      </Grid>

                      <Grid
                        item
                        xs={10}
                        sm={3}
                        direction="row"
                        style={{ padding: "10px" }}
                        id="applyloan-continuebutton-grid"
                      >
                        <NavLink
                          to="/customer/reviewandsign"
                          style={{ textDecoration: "none" }}
                        >
                          <ButtonWithIcon
                            stylebutton='{"margin-left": "35px" }'
                            styleicon='{ "color":"" }'
                            id="applyloan-continuebutton"
                          >
                            Continue
                          </ButtonWithIcon>
                        </NavLink>
                      </Grid>

                      <Grid
                        item
                        xs={10}
                        sm={8}
                        fullWidth={true}
                        direction="row"
                        style={{ padding: "10px" }}
                        id="applyloan-comparisionbutton-grid"
                      >
                        <ButtonWithIcon
                          fullWidth={true}
                          stylebutton='{"background": "", "float":"right"  }'
                          styleicon='{ "color":"" }'
                          id="applyloan-comparisionbutton"
                        >
                          View Comparison
                        </ButtonWithIcon>
                      </Grid>
                    </Grid>
                  </TabVerticalPanel>

                  <TabVerticalPanel value={values} verticalindex={1}>
                    <Grid
                      item
                      xs={12}
                      fullWidth={true}
                      direction="row"
                      style={{ paddingBottom: "10px" }}
                    >
                      <TableContainer>
                        <Table
                          className={classes.table}
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell style={{ fontWeight: "600" }}>
                                Select
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                Loan Amount
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                Availability
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                APR
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                Monthly Payment
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                Compare
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows36term.map((row) => (
                              <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                  <Radio
                                    name="select"
                                    radiolabel='[{ "value":"select"}]'
                                    value="select"
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  {row.loanamount}
                                </TableCell>
                                <TableCell align="center">
                                  {row.availability}
                                </TableCell>
                                <TableCell align="center">{row.apr}</TableCell>
                                <TableCell align="center">
                                  {row.monthlypayment}
                                </TableCell>
                                <TableCell align="center">
                                  <Checkbox
                                    name="rememberme"
                                    label="Add"
                                    labelid="rememberme"
                                    testid="checkbox"
                                    stylelabelform='{ "color":"" }'
                                    stylecheckbox='{ "color":"" }'
                                    stylecheckboxlabel='{ "color":"" }'
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid container  direction="row">
                      <Grid
                        item 
                        xs={10}
                        sm={1}
                        direction="row"
                        style={{ paddingTop: "10px" }}
                      >
                        <ButtonWithIcon
                          stylebutton='{"margin-right": "" }'
                          styleicon='{ "color":"" }'
                          id="applyloan-resetbutton"
                        >
                          Reset
                        </ButtonWithIcon>
                      </Grid>

                      <Grid
                        item
                        xs={10}
                        sm={3}
                        direction="row"
                        style={{ padding: "10px" }}
                        id="applyloan-continuebutton-grid"
                      >
                        <NavLink
                          to="/customer/reviewandsign"
                          style={{ textDecoration: "none" }}
                        >
                          <ButtonWithIcon
                            stylebutton='{"margin-left": "35px" }'
                            styleicon='{ "color":"" }'
                            id="applyloan-continuebutton"
                          >
                            Continue
                          </ButtonWithIcon>
                        </NavLink>
                      </Grid>

                      <Grid
                        item
                        xs={10}
                        sm={8}
                        fullWidth={true}
                        direction="row"
                        style={{ padding: "10px" }}
                        id="applyloan-comparisionbutton-grid"
                      >
                        <ButtonWithIcon
                          fullWidth={true}
                          stylebutton='{"background": "", "float":"right"  }'
                          styleicon='{ "color":"" }'
                          id="applyloan-comparisionbutton"
                        >
                          View Comparison
                        </ButtonWithIcon>
                      </Grid>
                    </Grid>
                  </TabVerticalPanel>

                  <TabVerticalPanel value={values} verticalindex={2}>
                    <Grid
                      item
                      xs={12}
                      fullWidth={true}
                      direction="row"
                      style={{ paddingBottom: "10px" }}
                    >
                      <TableContainer>
                        <Table
                          className={classes.table}
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell style={{ fontWeight: "600" }}>
                                Select
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                Loan Amount
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                Availability
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                APR
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                Monthly Payment
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                Compare
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows24term.map((row) => (
                              <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                  <Radio
                                    name="select"
                                    radiolabel='[{ "value":"select"}]'
                                    value="select"
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  {row.loanamount}
                                </TableCell>
                                <TableCell align="center">
                                  {row.availability}
                                </TableCell>
                                <TableCell align="center">{row.apr}</TableCell>
                                <TableCell align="center">
                                  {row.monthlypayment}
                                </TableCell>
                                <TableCell align="center">
                                  <Checkbox
                                    name="rememberme"
                                    label="Add"
                                    labelid="rememberme"
                                    testid="checkbox"
                                    stylelabelform='{ "color":"" }'
                                    stylecheckbox='{ "color":"" }'
                                    stylecheckboxlabel='{ "color":"" }'
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid container  direction="row">
                      <Grid
                        item 
                        xs={10}
                        sm={1}
                        direction="row"
                        style={{ paddingTop: "10px" }}
                      >
                        <ButtonWithIcon
                          stylebutton='{"margin-right": "" }'
                          styleicon='{ "color":"" }'
                          id="applyloan-resetbutton"
                        >
                          Reset
                        </ButtonWithIcon>
                      </Grid>

                      <Grid
                        item
                        xs={10}
                        sm={3}
                        direction="row"
                        style={{ padding: "10px" }}
                        id="applyloan-continuebutton-grid"
                      >
                        <NavLink
                          to="/customer/reviewandsign"
                          style={{ textDecoration: "none" }}
                        >
                          <ButtonWithIcon
                            stylebutton='{"margin-left": "35px" }'
                            styleicon='{ "color":"" }'
                            id="applyloan-continuebutton"
                          >
                            Continue
                          </ButtonWithIcon>
                        </NavLink>
                      </Grid>

                      <Grid
                        item
                        xs={10}
                        sm={8}
                        fullWidth={true}
                        direction="row"
                        style={{ padding: "10px" }}
                        id="applyloan-comparisionbutton-grid"
                      >
                        <ButtonWithIcon
                          fullWidth={true}
                          stylebutton='{"background": "", "float":"right"  }'
                          styleicon='{ "color":"" }'
                          id="applyloan-comparisionbutton"
                        >
                          View Comparison
                        </ButtonWithIcon>
                      </Grid>
                    </Grid>
                  </TabVerticalPanel>
                  <TabVerticalPanel value={values} verticalindex={3}>
                    <Grid
                      item
                      xs={12}
                      fullWidth={true}
                      direction="row"
                      style={{ paddingBottom: "10px" }}
                    >
                      <TableContainer>
                        <Table
                          className={classes.table}
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell style={{ fontWeight: "600" }}>
                                Select
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                Loan Amount
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                Availability
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                APR
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                Monthly Payment
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                Compare
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows12term.map((row) => (
                              <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                  <Radio
                                    name="select"
                                    radiolabel='[{ "value":"select"}]'
                                    value="select"
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  {row.loanamount}
                                </TableCell>
                                <TableCell align="center">
                                  {row.availability}
                                </TableCell>
                                <TableCell align="center">{row.apr}</TableCell>
                                <TableCell align="center">
                                  {row.monthlypayment}
                                </TableCell>
                                <TableCell align="center">
                                  <Checkbox
                                    name="rememberme"
                                    label="Add"
                                    labelid="rememberme"
                                    testid="checkbox"
                                    stylelabelform='{ "font-size":"12px" }'
                                    stylecheckbox='{ "font-size":"12px" }'
                                    stylecheckboxlabel='{ "font-size":"12px" }'
                                  />{" "}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid container  direction="row">
                      <Grid
                        item 
                        xs={10}
                        sm={1}
                        direction="row"
                        style={{ paddingTop: "10px" }}
                      >
                        <ButtonWithIcon
                          stylebutton='{"margin-right": "" }'
                          styleicon='{ "color":"" }'
                          id="applyloan-resetbutton"
                        >
                          Reset
                        </ButtonWithIcon>
                      </Grid>

                      <Grid
                        item
                        xs={10}
                        sm={3}
                        direction="row"
                        style={{ padding: "10px" }}
                        id="applyloan-continuebutton-grid"
                      >
                        <NavLink
                          to="/customer/reviewandsign"
                          style={{ textDecoration: "none" }}
                        >
                          <ButtonWithIcon
                            stylebutton='{"margin-left": "35px" }'
                            styleicon='{ "color":"" }'
                            id="applyloan-continuebutton"
                          >
                            Continue
                          </ButtonWithIcon>
                        </NavLink>
                      </Grid>

                      <Grid
                        item
                        xs={10}
                        sm={8}
                        fullWidth={true}
                        direction="row"
                        style={{ padding: "10px" }}
                        id="applyloan-comparisionbutton-grid"
                      >
                        <ButtonWithIcon
                          fullWidth={true}
                          stylebutton='{"background": "", "float":"right"  }'
                          styleicon='{ "color":"" }'
                          id="applyloan-comparisionbutton"
                        >
                          View Comparison
                        </ButtonWithIcon>
                      </Grid>
                    </Grid>
                  </TabVerticalPanel>
                  <TabVerticalPanel value={values} verticalindex={4}>
                    <Grid
                      item
                      xs={12}
                      fullWidth={true}
                      direction="row"
                      style={{ paddingBottom: "10px" }}
                    >
                      <TableContainer>
                        <Table
                          className={classes.table}
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell style={{ fontWeight: "600" }}>
                                Select
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                Loan Amount
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                Availability
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                APR
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                Monthly Payment
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: "600" }}
                                align="center"
                              >
                                Term
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rowschart.map((row) => (
                              <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                  <Radio
                                    name="select"
                                    radiolabel='[{ "value":"select"}]'
                                    value="select"
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  {row.loanamount}
                                </TableCell>
                                <TableCell align="center">
                                  {row.availability}
                                </TableCell>
                                <TableCell align="center">{row.apr}</TableCell>
                                <TableCell align="center">
                                  {row.monthlypayment}
                                </TableCell>
                                <TableCell align="center">
                                  {row.compare}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid container  direction="row">
                      <Grid
                        item 
                        xs={10}
                        sm={1}
                        direction="row"
                        style={{ paddingTop: "10px" }}
                      >
                        <ButtonWithIcon
                          stylebutton='{"margin-right": "" }'
                          styleicon='{ "color":"" }'
                          id="applyloan-resetbutton"
                        >
                          Reset
                        </ButtonWithIcon>
                      </Grid>

                      <Grid
                        item
                        xs={10}
                        sm={3}
                        direction="row"
                        style={{ padding: "10px" }}
                        id="applyloan-continuebutton-grid"
                      >
                        <NavLink
                          to="/customer/reviewandsign"
                          style={{ textDecoration: "none" }}
                        >
                          <ButtonWithIcon
                            stylebutton='{"margin-left": "35px" }'
                            styleicon='{ "color":"" }'
                            id="applyloan-continuebutton"
                          >
                            Continue
                          </ButtonWithIcon>
                        </NavLink>
                      </Grid>

                     
                    </Grid>
                  </TabVerticalPanel>
                </Paper>
              </Grid>
            </Grid>
            <Grid item fullWidth={true}>
              <p
                style={{
                  textAlign: "justify",
                  fontFamily: " system-ui",
                  fontSize: "13px",
                  color: "#6b6f82",
                }}
              >
                {" "}
                <small>
                  *Loan funding subject to normal lending requirements,
                  including, but not limited to, verification of applicant
                  identity, submission of any required supporting documentation,
                  and review of credit information. You must not have opened a
                  loan account with Mariner Finance, LLC or one of its
                  affiliates in the last 60 days. Loan proceeds may not be used
                  for business or commercial purposes, to finance direct
                  postsecondary education expenses, for the purchase of
                  securities, for gambling, or for any illegal purpose.
                </small>
              </p>

              <p
                style={{
                  textAlign: "justify",
                  fontFamily: " system-ui",
                  fontSize: "13px",
                  color: "#6b6f82",
                }}
              >
                <small>
                  †The stated APR represents the cost of credit as a yearly rate
                  and will be determined based upon the applicant’s credit at
                  the time of application, subject to state law limits and
                  individual underwriting. APR’s are generally higher on loans
                  not secured by a vehicle, and the lowest rates typically apply
                  to the most creditworthy borrowers. All terms and conditions
                  of a loan offer, including the APR, will be disclosed during
                  the application process.
                </small>
              </p>

              <p
                style={{
                  textAlign: "justify",
                  fontFamily: " system-ui",
                  fontSize: "13px",
                  color: "#6b6f82",
                }}
              >
                <small>
                  *The process uses a “soft” credit inquiry to determine whether
                  a loan offer is available, which does not impact your credit
                  score. If you continue with the application process online and
                  accept a loan offer, or are referred to a branch and continue
                  your application there, we will pull your credit report and
                  credit score again using a “hard” credit inquiry. This “hard”
                  credit inquiry may impact your credit score.
                </small>
              </p>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
