import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {ButtonPrimary, ButtonSecondary, ButtonWithIcon, Checkbox, Radio,} from "../../../FormsUI";
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
import {NavLink} from "react-router-dom";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import ScrollToTopOnMount from '../../scrollToTop';
import "./selectoffer.css"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tab-panel-${index}`}
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
    "aria-controls": `scrollable-auto-tab-panel-${index}`,
  };
}

function TabVerticalPanel(props) {
  const { children, value, verticalIndex, ...other } = props;

  return (
    <div
      //role="tab-panel"
      hidden={value !== verticalIndex}
      id={`scrollable-auto-tab-panel-${verticalIndex}`}
      aria-labelledby={`scrollable-auto-tab-${verticalIndex}`}
      {...other}
    >
      {value === verticalIndex && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabVerticalPanel.propTypes = {
  children: PropTypes.node,
  verticalIndex: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function tabVerticalProps(verticalIndex) {
  return {
    id: `scrollable-auto-tab-vertical-${verticalIndex}`,
    "aria-controls": `scrollable-auto-tab-panel-${verticalIndex}`,
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
  paperVerticalTab: {
    paddingTop: "20px",
    paddingBottom: "20px",
    display: "flex",
    flexDirection: "column",
    color: theme.palette.text.secondary,
  },
  heading: {
    color: "#fff",
    fontWeight: "400",
    fontSize: "1.64rem",
    paddingLeft:"7px",
    paddingBottom:"25px"
  },
  tabLabel: {
    background: "white",
    margin: "10px",
    color: "#3f51b5",
    fontFamily: "'Multi', sans-serif !important",
    fontSize: "1rem",
    textTransform: "none",
    fontWeight: "600",
  },
  tabVerticalLabel: {
    color: "#3f51b5",
    textTransform: "none",
    fontWeight: "600",
    fontFamily: "'Multi', sans-serif !important",
    fontSize: "1rem",
    textAlign: "start",
  },

  table: {
    minWidth: 650,
  },
  tableHead: {
    color: "#171717!important",
    fontWeight: "600",
    fontSize: "1rem",
  },
  tableHeadRow: {
    color: "#171717!important",
    fontSize: "15px",
  },
  indicator: {
    left: "0px",
    background: "unset",
  },
}));

function createData(
  select,
  loanAmount,
  availability,
  apr,
  monthlyPayment,
  compare,
  name
) {
  return {
    select,
    loanAmount,
    availability,
    apr,
    monthlyPayment,
    compare,
    name
  };
}
const branch = (
  <Grid container direction="row" alignItems="center">
    <AccountBalanceIcon /> In branch
  </Grid>
);

const online = (
  <Grid container direction="row" alignItems="center">
    <DesktopMacIcon /> Online
  </Grid>
);
const rows48term = [
  createData("", "$10,000", branch, "23.99%", "$325.96", "","Tori Vega"),
  createData("", "$9,500", branch, "23.99%", "$315.96", "","Jade"),
  createData("", "$9,000", branch, "23.99%", "$305.96", "","Christy"),
  createData("", "$8,500", online, "23.99%", "$285.96", "","Gaby"),
  createData("", "$8,000", online, "23.99%", "$275.96", "","Sam"),
  createData("", "$7,000", online, "23.99%", "$265.96", "","Cat"),
];

const rows36term = [
  createData("", "$10,000", branch, "23.99%", "$309.96", "","Finch"),
  createData("", "$9,000", online, "23.99%", "$298.96", "","Andre"),
];

const rows24term = [
  createData("", "$10,000", online, "18.99%", "$303.96", "","Robbie"),
  createData("", "$9,000", branch, "18.99%", "$289.96", "","Beck"),
];

const rows12term = [
  createData("", "$10,000", branch, "18.99%", "$300.96", "","Roscoe"),
  createData("", "$9,000", online, "18.99%", "$281.96", "","John"),
];

const rowChart = [
  createData("", "$10,000", branch, "23.99%", "$325.96", "12 mo","Annie"),
  createData("", "$9,000", online, "23.99%", "$309.96", "48 mo","Anne"),
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
      <ScrollToTopOnMount />
      <Grid container justifyContent={"center"} style={{ marginTop: "-150px", paddingRight:"30px", paddingLeft:"30px" }}>
      <Grid container item xs={12}   direction="row" style={{ marginBottom: "-20px", width:"100%"}}>
            <Typography className={classes.heading} variant="h3">
              <NavLink
                to="/customers/accountOverview"
                style={{ textDecoration: "none" }}
              >
                <ButtonWithIcon
                  icon="arrow_backwardIcon"
                  iconposition="left"
                  stylebutton='{"background": "#fff", "color":"#214476",
                        "minWidth": "0px",
                        "width": "36px",
                        "padding": "0px",
                        "marginRight": "5px",
                      "marginTop":"unset" }'
                  styleicon='{ "color":"" }'
                />
              </NavLink>{" "}
              Apply for a Loan
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            style={{paddingTop:"10px"}}
            aria-label="scrollable auto tabs example"
          >
            <Tab
              label="1. Select Offer"
              className={classes.tabLabel}
              {...a11yProps(0)}
            />
            <Tab
              label="2. Review & Sign"
              disabled={true}
              className={classes.tabLabel}
            />
            <Tab
              label="3. Final Verification"
              disabled={true}
              className={classes.tabLabel}
            />
            <Tab
              label="4. Receive your money"
              disabled={true}
              className={classes.tabLabel}
            />
          </Tabs>

          <TabPanel value={value} index={0}>
            <Grid container item xs={12}>
              <Grid
                item
                xs={12}
                sm={3}
                style={{ padding: "5px", width: "100%"}}
              >
                <Paper className={classes.paperVerticalTab}>
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
                    style={{paddingTop:"5px"}}
                    aria-label="scrollable auto tabs example"
                  >
                    <Tab
                      label={
                        <span style={{ float: "left", width: "100%" }}>
                          48 Month Term
                        </span>
                      }
                      className={classes.tabVerticalLabel}
                      {...tabVerticalProps(0)}
                    />

                    <Tab
                      label={
                        <span style={{ float: "left", width: "100%" }}>
                          36 Month Term
                        </span>
                      }
                      className={classes.tabVerticalLabel}
                      {...tabVerticalProps(1)}
                    />

                    <Tab
                      id="tab-vertical"
                      label={
                        <span style={{ float: "left", width: "100%" }}>
                          24 Month Term
                        </span>
                      }
                      className={classes.tabVerticalLabel}
                      {...tabVerticalProps(2)}
                    />
                    <Tab
                      label={
                        <span style={{ float: "left", width: "100%" }}>
                          12 Month Term
                        </span>
                      }
                      className={classes.tabVerticalLabel}
                      {...tabVerticalProps(3)}
                    />
                    <Tab
                      label={
                        <span style={{ float: "left", width: "100%" }}>
                          Comparison Chart
                        </span>
                      }
                      className={classes.tabVerticalLabel}
                      {...tabVerticalProps(4)}
                    />
                  </Tabs>
                </Paper>
              </Grid>

              <Grid 
                item
                xs={12}
                sm={9}
                style={{ padding: "5px", width: "100%" }}
              >
                <Paper className={classes.paper}>
                  <TabVerticalPanel value={values} verticalIndex={0}>
                    <Grid
                      item
                      xs={12}
                      style={{ paddingBottom: "10px",width:"100%"}}
                    >
                      <TableContainer>
                        <Table
                          className={classes.table}
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell className={classes.tableHead}>
                                Select
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                Loan Amount
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                Availability
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                               <Grid container direction="row" alignItems="center"> APR &nbsp;
                               <Tooltip title="APR" placement="top-start" enterTouchDelay={200}>
                               <InfoOutlinedIcon style={{ fontSize:"small", color:"blue"}} /></Tooltip>
                               </Grid>
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                Monthly Payment
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                Compare
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows48term.map((row) => (
                              <TableRow key={row.name}>
                                <TableCell
                                  component="th"
                                  className={classes.tableHeadRow}
                                  scope="row"
                                >
                                  <Radio
                                    name="select"
                                    radiolabel='[{ "value":"select"}]'
                                  />
                                </TableCell>
                                <TableCell
                                  className={classes.tableHeadRow}
                                  align="left"
                                >
                                  {row.loanAmount}
                                </TableCell>
                                <TableCell
                                  className={classes.tableHeadRow}
                                  align="left"
                                >
                                  {row.availability}
                                </TableCell>
                                <TableCell
                                  className={classes.tableHeadRow}
                                  align="left"
                                >
                                  {row.apr}
                                </TableCell>
                                <TableCell
                                  className={classes.tableHeadRow}
                                  align="left"
                                >
                                  {row.monthlyPayment}
                                </TableCell>
                                <TableCell
                                  className={classes.tableHeadRow}
                                  align="left"
                                >
                                  <Checkbox
                                    name="rememberme"
                                    label="Add"
                                    labelid="remember-me"
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
                    <Grid container direction="row">
                        
                      <Grid
                        container
                        item
                        xs={20}
                        sm={1}
                        direction="row"
                        style={{ paddingTop: "10px" ,float:"left"}}
                      >
                        <ButtonSecondary
                          stylebutton='{"marginRight": "" }'
                          styleicon='{ "color":"" }'
                          id="apply-loan-reset-button"
                        >
                          Reset
                        </ButtonSecondary>
                      </Grid>

                      <Grid
                        container
                        item
                        xs={10}
                        sm={3}
                        direction="row"
                        style={{ padding: "10px",float:"left", }}
                        id="apply-loan-continue-button-grid"
                      >
                        <NavLink
                          to="/customers/reviewAndSign"
                          style={{ textDecoration: "none",width:"inherit",}}
                        >
                          <ButtonPrimary
                            stylebutton='{"marginLeft": "10px" ,"fontSize":"1rem"}'
                            id="apply-loan-continue-button"
                          >
                            Continue
                          </ButtonPrimary>
                        </NavLink>
                      </Grid>


                       <Grid
                        container
                        item
                        xs={20}
                        sm={8}
                        direction="row"
                        style={{ padding: "10px",width: "100%",float:"right",justifyContent: "end" }}
                        id="apply-loan-comparison-button-grid"
                      >
                        <ButtonSecondary
                          fullWidth={true}
                          stylebutton='{"background": "", "float":"right"  }'
                          styleicon='{ "color":"" }'
                          id="apply-loan-comparison-button"
                        >
                          View Comparison
                        </ButtonSecondary>
                      </Grid>

                      
                    </Grid>
                  </TabVerticalPanel>

                  <TabVerticalPanel value={values} verticalIndex={1}>
                    <Grid container
                      item
                      xs={12}
                      direction="row"
                      style={{ paddingBottom: "10px",width:"100%" }}
                    >
                      <TableContainer>
                        <Table
                          className={classes.table}
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell className={classes.tableHead}>
                                Select
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                Loan Amount
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                Availability
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                <Grid
                                  container
                                  direction="row"
                                  alignItems="center"
                                >
                                  {" "}
                                  APR &nbsp;
                                  <Tooltip title="APR" placement="left-start">
                                    <InfoOutlinedIcon
                                      style={{
                                        fontSize: "small",
                                        color: "blue",
                                      }}
                                    />
                                  </Tooltip>
                                </Grid>
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                Monthly Payment
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
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
                                <TableCell align="left">
                                  {row.loanAmount}
                                </TableCell>
                                <TableCell align="left">
                                  {row.availability}
                                </TableCell>
                                <TableCell align="left">{row.apr}</TableCell>
                                <TableCell align="left">
                                  {row.monthlyPayment}
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    name="rememberme"
                                    label="Add"
                                    labelid="remember-me"
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
                    <Grid container direction="row">
                      <Grid container
                        item
                        xs={20}
                        sm={1}
                        direction="row"
                        style={{ paddingTop: "10px" }}
                      >
                        <ButtonSecondary
                          stylebutton='{"marginRight": "" }'
                          styleicon='{ "color":"" }'
                          id="apply-loan-reset-button"
                        >
                          Reset
                        </ButtonSecondary>
                      </Grid>

                      <Grid container
                        item
                        xs={10}
                        sm={3}
                        direction="row"
                        style={{ padding: "10px" }}
                        id="apply-loan-continue-button-grid"
                      >
                        <NavLink
                          to="/customers/reviewAndSign"
                          style={{ textDecoration: "none",width:"inherit" }}
                        >
                          <ButtonPrimary
                            stylebutton='{"marginLeft": "10px","fontSize":"1rem" }'
                            styleicon='{ "color":"" }'
                            id="apply-loan-continue-button"
                          >
                            Continue
                          </ButtonPrimary>
                        </NavLink>
                      </Grid>

                      <Grid container
                        item
                        xs={20}
                        sm={8}
                        direction="row"
                        style={{ padding: "10px",width: "100%",justifyContent: "end" }}
                        id="apply-loan-comparison-button-grid"
                      >
                        <ButtonSecondary
                          fullWidth={true}
                          stylebutton='{"background": "", "float":"right"  }'
                          styleicon='{ "color":"" }'
                          id="apply-loan-comparison-button"
                        >
                          View Comparison
                        </ButtonSecondary>
                      </Grid>
                    </Grid>
                  </TabVerticalPanel>

                  <TabVerticalPanel value={values} verticalIndex={2}>
                    <Grid container
                      item
                      xs={12}
                      direction="row"
                      style={{ paddingBottom: "10px",width:"100%" }}
                    >
                      <TableContainer>
                        <Table
                          className={classes.table}
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell className={classes.tableHead}>
                                Select
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                Loan Amount
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                Availability
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                <Grid
                                  container
                                  direction="row"
                                  alignItems="center"
                                >
                                  {" "}
                                  APR &nbsp;
                                  <Tooltip title="APR" placement="start-top">
                                    <InfoOutlinedIcon
                                      style={{
                                        fontSize: "small",
                                        color: "blue",
                                      }}
                                    />
                                  </Tooltip>
                                </Grid>
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                Monthly Payment
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
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
                                <TableCell align="left">
                                  {row.loanAmount}
                                </TableCell>
                                <TableCell align="left">
                                  {row.availability}
                                </TableCell>
                                <TableCell align="left">{row.apr}</TableCell>
                                <TableCell align="left">
                                  {row.monthlyPayment}
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    name="rememberme"
                                    label="Add"
                                    labelid="remember-me"
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
                    <Grid container direction="row">
                      <Grid container
                        item
                        xs={20}
                        sm={1}
                        direction="row"
                        style={{ paddingTop: "10px" }}
                      >
                        <ButtonSecondary
                          stylebutton='{"marginRight": "" }'
                          styleicon='{ "color":"" }'
                          id="apply-loan-reset-button"
                        >
                          Reset
                        </ButtonSecondary>
                      </Grid>

                      <Grid container
                        item
                        xs={10}
                        sm={3}
                        direction="row"
                        style={{ padding: "10px" }}
                        id="apply-loan-continue-button-grid"
                      >
                        <NavLink
                          to="/customers/reviewAndSign"
                          style={{ textDecoration: "none",width:"inherit" }}
                        >
                          <ButtonPrimary
                            stylebutton='{"marginLeft": "10px","fontSize":"1rem" }'
                            styleicon='{ "color":"" }'
                            id="apply-loan-continue-button"
                          >
                            Continue
                          </ButtonPrimary>
                        </NavLink>
                      </Grid>

                      <Grid container
                        item
                        xs={20}
                        sm={8}
                        direction="row"
                        style={{ padding: "10px",width:"100%",justifyContent: "end"}}
                        id="apply-loan-comparison-button-grid"
                      >
                        <ButtonSecondary
                          fullWidth={true}
                          stylebutton='{"background": "", "float":"right"  }'
                          styleicon='{ "color":"" }'
                          id="apply-loan-comparison-button"
                        >
                          View Comparison
                        </ButtonSecondary>
                      </Grid>
                    </Grid>
                  </TabVerticalPanel>
                  <TabVerticalPanel value={values} verticalIndex={3}>
                    <Grid container
                      item
                      xs={12}
                      direction="row"
                      style={{ paddingBottom: "10px",width:"100%" }}
                    >
                      <TableContainer>
                        <Table
                          className={classes.table}
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell className={classes.tableHead}>
                                Select
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                Loan Amount
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                Availability
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                <Grid
                                  container
                                  direction="row"
                                  alignItems="center"
                                >
                                  {" "}
                                  APR &nbsp;
                                  <Tooltip title="APR" placement="start-top">
                                    <InfoOutlinedIcon
                                      style={{
                                        fontSize: "small",
                                        color: "blue",
                                      }}
                                    />
                                  </Tooltip>
                                </Grid>
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                Monthly Payment
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
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
                                <TableCell align="left">
                                  {row.loanAmount}
                                </TableCell>
                                <TableCell align="left">
                                  {row.availability}
                                </TableCell>
                                <TableCell align="left">{row.apr}</TableCell>
                                <TableCell align="left">
                                  {row.monthlyPayment}
                                </TableCell>
                                <TableCell align="left">
                                  <Checkbox
                                    name="rememberme"
                                    label="Add"
                                    labelid="remember-me"
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
                    <Grid container direction="row">
                      <Grid container
                        item
                        xs={20}
                        sm={1}
                        direction="row"
                        style={{ paddingTop: "10px" }}
                      >
                        <ButtonSecondary
                          stylebutton='{"marginRight": "" }'
                          styleicon='{ "color":"" }'
                          id="apply-loan-reset-button"
                        >
                          Reset
                        </ButtonSecondary>
                      </Grid>

                      <Grid container
                        item
                        xs={10}
                        sm={3}
                        direction="row"
                        style={{ padding: "10px" }}
                        id="apply-loan-continue-button-grid"
                      >
                        <NavLink
                          to="/customers/reviewAndSign"
                          style={{ textDecoration: "none",width:"inherit" }}
                        >
                          <ButtonPrimary
                            stylebutton='{"marginLeft": "10px","fontSize":"1rem"}'
                            styleicon='{ "color":"" }'
                            id="apply-loan-continue-button"
                          >
                            Continue
                          </ButtonPrimary>
                        </NavLink>
                      </Grid>

                      <Grid container
                        item
                        xs={20}
                        sm={8}
                        direction="row"
                        style={{ padding: "10px",width: "100%",justifyContent: "end" }}
                        id="apply-loan-comparison-button-grid"
                      >
                        <ButtonSecondary
                          fullWidth={true}
                          stylebutton='{"background": "", "float":"right"  }'
                          styleicon='{ "color":"" }'
                          id="apply-loan-comparison-button"
                        >
                          View Comparison
                        </ButtonSecondary>
                      </Grid>
                    </Grid>
                  </TabVerticalPanel>
                  <TabVerticalPanel value={values} verticalIndex={4}>
                    <Grid container
                      item
                      xs={12}
                      direction="row"
                      style={{ paddingBottom: "10px", width:"100%" }}
                    >
                      <TableContainer>
                        <Table
                          className={classes.table}
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell className={classes.tableHead}>
                                Select
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                Loan Amount
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                Availability
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                <Grid
                                  container
                                  direction="row"
                                  alignItems="center"
                                >
                                  {" "}
                                  APR &nbsp;
                                  <Tooltip title="APR" placement="start-top">
                                    <InfoOutlinedIcon
                                      style={{
                                        fontSize: "small",
                                        color: "blue",
                                      }}
                                    />
                                  </Tooltip>
                                </Grid>
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                Monthly Payment
                              </TableCell>
                              <TableCell
                                className={classes.tableHead}
                                align="left"
                              >
                                Term
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rowChart.map((row) => (
                              <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                  <Radio
                                    name="select"
                                    radiolabel='[{ "value":"select"}]'
                                    value="select"
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  {row.loanAmount}
                                </TableCell>
                                <TableCell align="left">
                                  {row.availability}
                                </TableCell>
                                <TableCell align="left">{row.apr}</TableCell>
                                <TableCell align="left">
                                  {row.monthlyPayment}
                                </TableCell>
                                <TableCell align="left">
                                  {row.compare}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                    <Grid container direction="row">
                      <Grid container
                        item
                        xs={20}
                        sm={1}
                        direction="row"
                        style={{ paddingTop: "10px" }}
                      >
                        <ButtonSecondary
                          stylebutton='{"marginRight": "" }'
                          styleicon='{ "color":"" }'
                          id="apply-loan-reset-button"
                        >
                          Reset
                        </ButtonSecondary>
                      </Grid>

                      <Grid container
                        item
                        xs={10}
                        sm={3}
                        direction="row"
                        style={{ padding: "10px" }}
                        id="apply-loan-continue-button-grid"
                      >
                        <NavLink
                          to="/customers/reviewAndSign"
                          style={{ textDecoration: "none",width:"inherit" }}
                        >
                          <ButtonPrimary
                            stylebutton='{"marginLeft": "10px","fontSize":"1rem" }'
                            styleicon='{ "color":"" }'
                            id="apply-loan-continue-button"
                          >
                            Continue
                          </ButtonPrimary>
                        </NavLink>
                      </Grid>
                    </Grid>
                  </TabVerticalPanel>
                </Paper>
              </Grid>
            </Grid>
            <Grid item  style={{ width: "100%",paddingTop:"25px",paddingBottom:"70px"}}>
                <Typography style={{textAlign: "justify",fontSize: ".8rem", color: "#6b6f82",lineHeight:"20px",paddingBottom:"20px"}}>
                *Loan funding subject to normal lending requirements,
                  including, but not limited to, verification of applicant
                  identity, submission of any required supporting documentation,
                  and review of credit information. You must not have opened a
                  loan account with Mariner Finance, LLC or one of its
                  affiliates in the last 60 days. Loan proceeds may not be used
                  for business or commercial purposes, to finance direct
                  post secondary education expenses, for the purchase of
                  securities, for gambling, or for any illegal purpose.
                </Typography>
                <Typography style={{textAlign: "justify",fontSize: ".8rem",color: "#6b6f82",lineHeight:"20px",paddingBottom:"20px"}}>
                †The stated APR represents the cost of credit as a yearly rate
                  and will be determined based upon the applicant’s credit at
                  the time of application, subject to state law limits and
                  individual underwriting. APR’s are generally higher on loans
                  not secured by a vehicle, and the lowest rates typically apply
                  to the most creditworthy borrowers. All terms and conditions
                  of a loan offer, including the APR, will be disclosed during
                  the application process.
                </Typography>
                <Typography style={{textAlign: "justify",fontSize: ".8rem",color: "#6b6f82",lineHeight:"20px",paddingBottom:"20px"}}>
                 *The process uses a “soft” credit inquiry to determine whether
                  a loan offer is available, which does not impact your credit
                  score. If you continue with the application process online and
                  accept a loan offer, or are referred to a branch and continue
                  your application there, we will pull your credit report and
                  credit score again using a “hard” credit inquiry. This “hard”
                  credit inquiry may impact your credit score.
                </Typography>
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
